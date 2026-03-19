from pathlib import Path

p = Path('/home/currentsuspect/blueprint/web/templates/lesson.html')
s = p.read_text()

if '.vocab-tooltip' not in s:
    s = s.replace(
        '.lesson-content a:hover { color: #93c5fd; }\n',
        '.lesson-content a:hover { color: #93c5fd; }\n'
        '        .vocab-tooltip { position: fixed; z-index: 9999; max-width: 320px; background: #0f172a; color: #e2e8f0; border: 1px solid #334155; border-radius: 10px; padding: 10px 12px; box-shadow: 0 8px 24px rgba(0,0,0,.35); font-size: .82rem; line-height: 1.4; display:none; }\n'
        '        .vocab-tooltip .term { color: #93c5fd; font-weight: 700; margin-bottom: 4px; display:block; }\n'
    )

if 'id="vocab-tooltip"' not in s:
    s = s.replace('</body>', '    <div id="vocab-tooltip" class="vocab-tooltip"></div>\n</body>')

if 'async function setupVocabTooltips()' not in s:
    inject = '''
        async function setupVocabTooltips() {
            const tooltip = document.getElementById('vocab-tooltip');
            if (!tooltip) return;
            const cache = new Map();

            function posTooltip(e) {
                const pad = 12;
                let x = e.clientX + 14;
                let y = e.clientY + 14;
                const w = tooltip.offsetWidth || 280;
                const h = tooltip.offsetHeight || 80;
                if (x + w + pad > window.innerWidth) x = window.innerWidth - w - pad;
                if (y + h + pad > window.innerHeight) y = window.innerHeight - h - pad;
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            }

            async function showTip(link, e) {
                const href = link.getAttribute('href') || '';
                const m = href.match(/^\/glossary\/([a-z0-9-]+)/);
                if (!m) return;
                const slug = m[1];
                let data = cache.get(slug);
                if (!data) {
                    const res = await fetch(`/api/glossary/${slug}`);
                    data = await res.json();
                    cache.set(slug, data);
                }
                if (!data.ok) return;
                const t = data.term;
                tooltip.innerHTML = `<span class="term">${t.term}</span>${t.definition || ''}`;
                tooltip.style.display = 'block';
                posTooltip(e);
            }

            function hideTip() { tooltip.style.display = 'none'; }

            document.querySelectorAll('.lesson-content a[href^="/glossary/"]').forEach(link => {
                link.addEventListener('mouseenter', (e) => showTip(link, e));
                link.addEventListener('mousemove', posTooltip);
                link.addEventListener('mouseleave', hideTip);
                // mobile tap-hold fallback
                link.addEventListener('touchstart', async (e) => {
                    await showTip(link, { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
                    setTimeout(hideTip, 1800);
                }, { passive: true });
            });
        }
'''
    s = s.replace('        let selectedAnswer = null;\n', '        let selectedAnswer = null;\n' + inject)
    s = s.replace('    </script>', '        setupVocabTooltips();\n    </script>')

p.write_text(s)
print('patched lesson tooltip')
