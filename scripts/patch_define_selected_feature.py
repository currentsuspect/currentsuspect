from pathlib import Path

# Patch app.py with search endpoint
app_path = Path('/home/currentsuspect/blueprint/web/app.py')
s = app_path.read_text()

if '@app.get("/api/glossary/define")' not in s:
    marker = '@app.get("/api/glossary/{slug}")'
    add = '''@app.get("/api/glossary/define")
async def glossary_define_api(q: str):
    q = (q or "").strip()
    if not q:
        return {"ok": False, "error": "empty_query"}

    slug = slugify_term(q)
    conn = get_db()
    cur = conn.cursor()

    # exact slug match first
    cur.execute("SELECT term, slug, definition, details, related FROM glossary_terms WHERE slug=?", (slug,))
    row = cur.fetchone()

    # then exact term (case-insensitive)
    if not row:
        cur.execute("SELECT term, slug, definition, details, related FROM glossary_terms WHERE lower(term)=lower(?)", (q,))
        row = cur.fetchone()

    # then fuzzy term prefix
    if not row:
        cur.execute("SELECT term, slug, definition, details, related FROM glossary_terms WHERE lower(term) LIKE lower(?) ORDER BY term LIMIT 1", (q + "%",))
        row = cur.fetchone()

    conn.close()

    if not row:
        return {"ok": False, "error": "not_found", "query": q, "slug": slug}

    return {"ok": True, "term": dict(row)}


'''
    s = s.replace(marker, add + marker, 1)
    app_path.write_text(s)
    print('patched app.py define endpoint')
else:
    print('define endpoint already exists')

# Patch lesson template with selected-text define UI
lesson_path = Path('/home/currentsuspect/blueprint/web/templates/lesson.html')
ls = lesson_path.read_text()

if '.define-fab' not in ls:
    ls = ls.replace(
        '.vocab-tooltip .term { color: #93c5fd; font-weight: 700; margin-bottom: 4px; display:block; }\n',
        '.vocab-tooltip .term { color: #93c5fd; font-weight: 700; margin-bottom: 4px; display:block; }\n'
        '        .define-fab { position: fixed; z-index: 9998; display:none; background:#2563eb; color:white; border:none; border-radius:999px; padding:8px 12px; font-size:.8rem; font-weight:700; box-shadow:0 8px 18px rgba(0,0,0,.35); }\n'
        '        .define-fab:active { transform: scale(.98); }\n'
    )

if 'id="define-fab"' not in ls:
    ls = ls.replace('<div id="vocab-tooltip" class="vocab-tooltip"></div>', '<button id="define-fab" class="define-fab">📘 Define</button>\n    <div id="vocab-tooltip" class="vocab-tooltip"></div>')

if 'function setupSelectionDefine()' not in ls:
    inject = '''
        function setupSelectionDefine() {
            const fab = document.getElementById('define-fab');
            const tooltip = document.getElementById('vocab-tooltip');
            if (!fab || !tooltip) return;

            let currentSelection = '';

            function hideFab() { fab.style.display = 'none'; }

            function showFabForSelection() {
                const sel = window.getSelection();
                const text = (sel ? sel.toString() : '').trim();
                if (!text || text.length < 2 || text.length > 60) {
                    hideFab();
                    return;
                }
                const range = sel.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                if (!rect || (!rect.top && !rect.left && !rect.width)) {
                    hideFab();
                    return;
                }
                currentSelection = text;
                fab.style.display = 'block';
                const x = Math.max(10, Math.min(window.innerWidth - 140, rect.left + rect.width / 2 - 52));
                const y = Math.max(10, rect.top - 42);
                fab.style.left = `${x}px`;
                fab.style.top = `${y}px`;
            }

            async function defineSelection() {
                if (!currentSelection) return;
                try {
                    const res = await fetch(`/api/glossary/define?q=${encodeURIComponent(currentSelection)}`);
                    const data = await res.json();
                    if (data.ok) {
                        const t = data.term;
                        tooltip.innerHTML = `<span class="term">${t.term}</span>${t.definition || ''}<br><a href="/glossary/${t.slug}" style="color:#93c5fd">Open full definition →</a>`;
                    } else {
                        tooltip.innerHTML = `<span class="term">${currentSelection}</span>No glossary entry yet.<br><a href="/glossary" style="color:#93c5fd">Browse glossary →</a>`;
                    }
                    tooltip.style.display = 'block';
                    const left = Math.max(12, Math.min(window.innerWidth - 340, parseFloat(fab.style.left || '20')));
                    const top = Math.min(window.innerHeight - 120, parseFloat(fab.style.top || '20') + 42);
                    tooltip.style.left = `${left}px`;
                    tooltip.style.top = `${top}px`;
                } catch {
                    tooltip.innerHTML = `<span class="term">${currentSelection}</span>Definition lookup failed.`;
                    tooltip.style.display = 'block';
                }
                hideFab();
            }

            fab.addEventListener('click', defineSelection);
            document.addEventListener('selectionchange', () => {
                const active = document.activeElement;
                if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
                showFabForSelection();
            });
            document.addEventListener('scroll', hideFab, true);
            document.addEventListener('click', (e) => {
                if (!fab.contains(e.target) && !tooltip.contains(e.target)) {
                    hideFab();
                }
            });
        }
'''
    ls = ls.replace('        async function setupVocabTooltips() {', inject + '\n        async function setupVocabTooltips() {', 1)
    ls = ls.replace('        setupVocabTooltips();', '        setupVocabTooltips();\n        setupSelectionDefine();')

lesson_path.write_text(ls)
print('patched lesson selected-define UI')
