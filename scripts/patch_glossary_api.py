from pathlib import Path

p = Path('/home/currentsuspect/blueprint/web/app.py')
s = p.read_text()

if '@app.get("/api/glossary/{slug}")' not in s:
    marker = '@app.get("/glossary", response_class=HTMLResponse)'
    api = '''@app.get("/api/glossary/{slug}")
async def glossary_term_api(slug: str):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT term, slug, definition, details, related FROM glossary_terms WHERE slug=?", (slug,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return {"ok": False, "error": "not_found"}
    return {"ok": True, "term": dict(row)}


'''
    s = s.replace(marker, api + marker, 1)
    p.write_text(s)
    print('patched api route')
else:
    print('already present')
