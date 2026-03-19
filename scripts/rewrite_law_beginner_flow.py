import sqlite3, textwrap, json

DB = '/home/currentsuspect/blueprint/blueprint.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# Beginner-first module flow
MODULE_FLOW = [
    ("Law 101 (Beginner Start Here)", "law-101-beginner", "What law is, why it exists, and how it affects your daily life in plain language."),
    ("Your Rights in Everyday Kenyan Life", "rights-everyday-kenya", "Work, money, home, online life, and authority encounters—explained simply."),
    ("Kenya Constitution in Plain English", "constitution-plain-english", "Article-by-article meaning in real-life terms (no legal jargon overload)."),
    ("Protect Yourself: Contracts, Records, and Disputes", "protect-yourself-practical", "How to avoid traps, keep evidence, and escalate correctly."),
    ("Power Through Self-Command", "self-command-legal-discipline", "Build legal discipline habits so your decisions stay clean under pressure."),
]

LESSON_TITLES = [
    "Start Here",
    "What Usually Goes Wrong",
    "Simple Step-by-Step Playbook",
    "Review Loop (Keep It in Memory)",
]

LESSON_BODY = {
    "Start Here": """
# {lesson} — {module}

## Speak to me like a beginner
You do **not** need legal background for this lesson. We start from zero and build practical understanding.

## What this lesson means in plain language
{module_desc}

## What you will be able to do after this
- Explain this topic in your own words
- Spot one red flag early
- Take one safe first action instead of panicking

## Real-life Kenya example
Imagine a normal situation (job issue, payment conflict, landlord problem, online fraud, police interaction).  
Your goal is not to "win argument" first — your goal is to:
1. stay calm,
2. keep facts,
3. choose correct next step.

## Zero-jargon cheat sheet
- **Right** = what law protects for you
- **Duty** = what law expects from you
- **Evidence** = proof (messages, receipts, contracts, recordings where lawful)
- **Forum** = where to solve the issue (internal office, regulator, tribunal, court)

## First action protocol (always)
1. Write facts (what happened, when, who, proof).
2. Avoid emotional reply for 30–60 mins.
3. Ask for written clarification.
4. Escalate through the correct channel.

## Script you can copy
"For clarity, here are the facts as I understand them: [facts]. Please confirm in writing and share next steps."

## Action takeaway
Write one real-life situation and apply the 4-step protocol above before end of day.
""",

    "What Usually Goes Wrong": """
# {lesson} — {module}

## Why beginners lose leverage
Most people don't lose because they are "weak." They lose because they act without structure.

## Common mistakes
- Verbal agreements only (no written proof)
- Reacting emotionally in chats/calls
- Waiting too long to document evidence
- Escalating to the wrong place first
- Using labels/insults instead of facts

## Kenya reality check
In Kenya, practical outcomes often depend on:
- quality of documentation,
- consistency of your story,
- whether you followed process.

## Better pattern (replace panic with process)
- From **emotion** -> to **evidence**
- From **assumption** -> to **written confirmation**
- From **random escalation** -> to **correct channel**

## Quick drill (10 min)
Take one past conflict and rewrite it as:
- Facts timeline
- Your rights/duties
- Evidence you had
- Best next step (if it happened again)

## Action takeaway
Pick one mistake from this lesson and set a rule so you never repeat it.
""",

    "Simple Step-by-Step Playbook": """
# {lesson} — {module}

## Your beginner playbook (copy this)

### Step 1: Stabilize
- No rushed decisions
- No emotional escalation
- Breathe + gather facts

### Step 2: Structure
Create a mini brief:
- What happened?
- What do I want?
- What proof do I have?
- What channel should I use first?

### Step 3: Communicate clearly
Use facts-only message:
- dates
- amounts
- promises made
- requested remedy

### Step 4: Escalate correctly
- Internal resolution first (if appropriate)
- Regulator/tribunal where applicable
- Legal counsel/court for serious unresolved matters

### Step 5: Track everything
- Save messages
- Save receipts/contracts
- Keep chronology updated

## Kenyan beginner anchors (plain form)
- Constitution protects core rights and fair process.
- Written records make your case stronger.
- Correct forum saves time and money.

## Script pack
- "Please send that in writing."
- "I need the policy/terms section this decision is based on."
- "Here is my documented timeline and requested resolution."

## Action takeaway
Run this 5-step playbook once this week on a real issue (even a small one).
""",

    "Review Loop (Keep It in Memory)": """
# {lesson} — {module}

## Why review matters
Power comes from repeatable behavior, not one-time reading.

## 24-hour review
Without notes, answer:
1. What is the first move when conflict starts?
2. What evidence should I preserve immediately?
3. Which script do I send first?

## 7-day review
Apply the framework to a fresh scenario:
- money issue
- work issue
- service contract issue
- online risk issue

## 30-day review
Audit yourself:
- Did I reduce emotional reactions?
- Did I increase written clarity?
- Did I choose better escalation channels?

## Personal rule
"I do not trade long-term power for short-term emotional reaction."

## Action takeaway
Add a weekly 20-minute legal hygiene slot to your calendar.
""",
}

cur.execute("select id from academies where slug='law-power-control'")
r = cur.fetchone()
if not r:
    raise SystemExit('law academy not found')
academy_id = r[0]

# Rename/reorder modules into beginner flow
cur.execute("select id from modules where academy_id=? order by order_index", (academy_id,))
existing = [x[0] for x in cur.fetchall()]

# ensure exactly 5 modules exist for mapping
for i, (name, slug, desc) in enumerate(MODULE_FLOW, start=1):
    if i-1 < len(existing):
        mid = existing[i-1]
        cur.execute("update modules set name=?, slug=?, description=?, order_index=? where id=?", (name, slug, desc, i, mid))
    else:
        cur.execute("insert into modules(academy_id,name,slug,description,order_index) values(?,?,?,?,?)", (academy_id, name, slug, desc, i))
        mid = cur.lastrowid

    # ensure 4 lessons in each module with beginner structure
    cur.execute("select id from lessons where module_id=? order by order_index", (mid,))
    lesson_ids = [x[0] for x in cur.fetchall()]
    while len(lesson_ids) < 4:
        cur.execute("insert into lessons(module_id,title,slug,content,order_index,xp_reward,estimated_minutes) values(?,?,?,?,?,?,?)", (mid, "Temp", f"temp-{mid}-{len(lesson_ids)+1}", "", len(lesson_ids)+1, 16, 16))
        lesson_ids.append(cur.lastrowid)

    for j, lesson_name in enumerate(LESSON_TITLES, start=1):
        lid = lesson_ids[j-1]
        content = textwrap.dedent(LESSON_BODY[lesson_name].format(
            lesson=lesson_name,
            module=name,
            module_desc=desc,
        )).strip()
        lslug = f"{slug}-{j}"
        cur.execute("update lessons set title=?, slug=?, content=?, order_index=?, xp_reward=?, estimated_minutes=? where id=?", (lesson_name, lslug, content, j, 18 if j<4 else 14, 20 if j<4 else 14, lid))

        # ensure quiz
        cur.execute("select count(*) from quizzes where lesson_id=?", (lid,))
        if cur.fetchone()[0] == 0:
            opts = json.dumps([
                "Pause, write facts, then act",
                "React immediately by emotion",
                "Skip written records",
                "Assume you already know the law"
            ])
            cur.execute("insert into quizzes(lesson_id,question,options,correct_answer,explanation) values(?,?,?,?,?)", (
                lid,
                f"In '{lesson_name}', what is the strongest beginner move?",
                opts,
                0,
                "Beginner power starts with calm facts, structure, and documented action."
            ))

# cleanup extra lessons beyond first 4 per module (to keep clear flow)
for i, mid in enumerate(existing[:5], start=1):
    cur.execute("select id from lessons where module_id=? order by order_index", (mid,))
    lids = [x[0] for x in cur.fetchall()]
    for extra in lids[4:]:
        cur.execute("delete from quizzes where lesson_id=?", (extra,))
        cur.execute("delete from lesson_progress where lesson_id=?", (extra,))
        cur.execute("delete from lessons where id=?", (extra,))

# normalize academy totals
cur.execute("""
select count(*), coalesce(sum(l.estimated_minutes),0)
from lessons l join modules m on l.module_id=m.id where m.academy_id=?
""", (academy_id,))
count_lessons, mins = cur.fetchone()
cur.execute("update academies set total_lessons=?, estimated_hours=? where id=?", (count_lessons, max(1, round(mins/60)), academy_id))

conn.commit()
print('academy_id', academy_id)
print('lessons', count_lessons)
print('hours', max(1, round(mins/60)))
