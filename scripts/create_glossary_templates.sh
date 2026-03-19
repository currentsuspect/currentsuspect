#!/usr/bin/env bash
set -e
BASE=/home/currentsuspect/blueprint/web/templates
cat > "$BASE/glossary.html" <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Glossary | Blueprint</title>
  <style>
    body{font-family:Inter,system-ui,sans-serif;background:#0a0a0f;color:#f1f5f9;margin:0}
    .wrap{max-width:900px;margin:0 auto;padding:20px}
    a{color:#60a5fa;text-decoration:none}
    .card{background:#12121a;border:1px solid #2a2a3a;border-radius:12px;padding:14px;margin:10px 0}
    .term{font-weight:700}
    .def{color:#cbd5e1;margin-top:6px}
  </style>
</head>
<body>
  <div class="wrap">
    <p><a href="/academies">← Back to Academies</a></p>
    <h1>Glossary</h1>
    {% for t in terms %}
      <div class="card">
        <a class="term" href="/glossary/{{ t.slug }}">{{ t.term }}</a>
        <div class="def">{{ t.definition }}</div>
      </div>
    {% endfor %}
  </div>
</body>
</html>
HTML

cat > "$BASE/glossary_term.html" <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ term.term }} | Glossary</title>
  <style>
    body{font-family:Inter,system-ui,sans-serif;background:#0a0a0f;color:#f1f5f9;margin:0}
    .wrap{max-width:900px;margin:0 auto;padding:20px}
    a{color:#60a5fa;text-decoration:none}
    .box{background:#12121a;border:1px solid #2a2a3a;border-radius:12px;padding:16px;margin-top:10px}
    .def{font-size:1.05rem;color:#e2e8f0}
    .details{margin-top:10px;color:#cbd5e1;line-height:1.6}
    .pill{display:inline-block;background:#1e293b;border-radius:999px;padding:5px 10px;margin:4px 6px 0 0;font-size:0.85rem}
  </style>
</head>
<body>
  <div class="wrap">
    <p><a href="/glossary">← Back to Glossary</a></p>
    <h1>{{ term.term }}</h1>
    <div class="box">
      <div class="def">{{ term.definition }}</div>
      <div class="details">{{ term.details }}</div>
      {% if related %}
      <h3>Related terms</h3>
      {% for r in related %}
        <a class="pill" href="/glossary/{{ r.slug }}">{{ r.term }}</a>
      {% endfor %}
      {% endif %}
    </div>
  </div>
</body>
</html>
HTML

echo "templates created"
