import sqlite3, json

DB = "/home/currentsuspect/blueprint/blueprint.db"

conn = sqlite3.connect(DB)
cur = conn.cursor()
cur.execute("select id, options from quizzes")
fixed = 0

for qid, opt in cur.fetchall():
    try:
        json.loads(opt)
        continue
    except Exception:
        pass

    s = (opt or "").strip()
    if s.startswith("[") and s.endswith("]"):
        parts = [p.strip() for p in s[1:-1].split(",") if p.strip()]
        if parts:
            cur.execute("update quizzes set options=? where id=?", (json.dumps(parts), qid))
            fixed += 1

conn.commit()

bad = []
for qid, opt in cur.execute("select id, options from quizzes"):
    try:
        v = json.loads(opt)
        if not isinstance(v, list):
            bad.append(qid)
    except Exception:
        bad.append(qid)

print("fixed", fixed)
print("remaining_bad", len(bad), bad)
