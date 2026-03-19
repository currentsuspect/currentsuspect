from pathlib import Path

p = Path('/home/currentsuspect/blueprint/web/app.py')
s = p.read_text()

if 'def ensure_glossary_tables' in s:
    print('already patched')
    raise SystemExit

insert_helpers = '''

def slugify_term(term: str) -> str:
    t = (term or '').strip().lower()
    t = re.sub(r"[^a-z0-9]+", "-", t).strip('-')
    return t


def link_vocab_terms(text: str) -> str:
    """Convert [[Term]] in markdown into clickable glossary links."""
    if not text:
        return ""

    def repl(match):
        term = match.group(1).strip()
        slug = slugify_term(term)
        if not slug:
            return term
        return f"[{term}](/glossary/{slug})"

    return re.sub(r"\[\[([^\]]+)\]\]", repl, text)


def ensure_glossary_tables():
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS glossary_terms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            term TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            definition TEXT NOT NULL,
            details TEXT,
            related TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    conn.close()


def seed_glossary_terms():
    terms = [
        ("Constitution", "constitution", "The highest law of a country. All other laws must align with it.", "In Kenya, the 2010 Constitution is supreme and anchors rights, institutions, and legal limits.", "bill-of-rights,rule-of-law"),
        ("Bill of Rights", "bill-of-rights", "A section of the Constitution listing core rights and freedoms.", "These are enforceable rights such as dignity, equality, privacy, fair process, and access to justice.", "constitution,article-47,article-50"),
        ("Article", "article", "A numbered clause in the Constitution.", "Example: Article 47 covers fair administrative action. Think of articles as addressable legal building blocks.", "constitution,bill-of-rights"),
        ("Contract", "contract", "A legally enforceable agreement between parties.", "A strong contract has clear scope, payment terms, timelines, responsibilities, and change terms.", "breach,evidence"),
        ("Evidence", "evidence", "Information used to prove or disprove a claim.", "In practice: messages, receipts, signed documents, logs, photos, and metadata-protected records.", "chronology,dispute"),
        ("Due Process", "due-process", "Fair, lawful procedure before rights are restricted or penalties imposed.", "Core idea: notice, hearing opportunity, neutral process, reasoned decision.", "article-47,article-50"),
        ("Negligence", "negligence", "Failure to use reasonable care, causing harm.", "Usually examined through duty, breach, causation, and damage.", "liability,duty"),
        ("Liability", "liability", "Legal responsibility for harm, debt, or breach.", "Can be civil, criminal, contractual, or regulatory depending on context.", "duty,negligence,contract"),
        ("Jurisdiction", "jurisdiction", "The authority of a court/tribunal to hear a case.", "Choosing the right forum early saves time and cost.", "forum,dispute"),
        ("Remedy", "remedy", "The legal solution granted for a proven wrong.", "Examples: damages, injunction, specific performance, declaratory orders.", "liability,dispute"),
    ]

    conn = get_db()
    cur = conn.cursor()
    for term, slug, definition, details, related in terms:
        cur.execute(
            """
            INSERT OR IGNORE INTO glossary_terms(term, slug, definition, details, related)
            VALUES(?,?,?,?,?)
            """,
            (term, slug, definition, details, related)
        )
    conn.commit()
    conn.close()

'''

s = s.replace('def get_db():\n', insert_helpers + 'def get_db():\n', 1)

s = s.replace('def render_markdown(text: str) -> str:\n    """Render markdown to safe-ish HTML for lesson display."""\n    if not text:\n        return ""\n\n    if _md is not None:\n',
              'def render_markdown(text: str) -> str:\n    """Render markdown to safe-ish HTML for lesson display."""\n    if not text:\n        return ""\n\n    text = link_vocab_terms(text)\n\n    if _md is not None:\n')

startup_block = '''

@app.on_event("startup")
async def startup_init():
    ensure_glossary_tables()
    seed_glossary_terms()
'''

s = s.replace('app = FastAPI(title="Blueprint")\n', 'app = FastAPI(title="Blueprint")\n' + startup_block + '\n')

routes_block = '''

@app.get("/glossary", response_class=HTMLResponse)
async def glossary_page(request: Request):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM glossary_terms ORDER BY term")
    terms = [dict(r) for r in cur.fetchall()]
    conn.close()
    return templates.TemplateResponse("glossary.html", {"request": request, "terms": terms})


@app.get("/glossary/{slug}", response_class=HTMLResponse)
async def glossary_term_page(request: Request, slug: str):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM glossary_terms WHERE slug=?", (slug,))
    row = cur.fetchone()
    if not row:
        conn.close()
        return HTMLResponse(content="Term not found", status_code=404)

    term = dict(row)
    related_rows = []
    related = (term.get("related") or "").strip()
    if related:
        slugs = [x.strip() for x in related.split(",") if x.strip()]
        if slugs:
            placeholders = ",".join(["?"] * len(slugs))
            cur.execute(f"SELECT term, slug FROM glossary_terms WHERE slug IN ({placeholders})", slugs)
            related_rows = [dict(r) for r in cur.fetchall()]

    conn.close()
    return templates.TemplateResponse("glossary_term.html", {"request": request, "term": term, "related": related_rows})
'''

marker = '@app.get("/vault", response_class=HTMLResponse)'
s = s.replace(marker, routes_block + '\n' + marker, 1)

p.write_text(s)
print('patched app.py')
