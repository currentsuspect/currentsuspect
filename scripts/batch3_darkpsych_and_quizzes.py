import sqlite3, json, textwrap

DB='/home/currentsuspect/blueprint/blueprint.db'
conn=sqlite3.connect(DB)
cur=conn.cursor()

# before
cur.execute("select count(*) from lessons where length(coalesce(content,''))<140")
before_short=cur.fetchone()[0]
cur.execute('select count(*) from quizzes')
before_q=cur.fetchone()[0]

# 1) Deepen remaining short lessons in dark psych
cur.execute('''select l.id,l.title,m.name from lessons l
join modules m on l.module_id=m.id
join academies a on m.academy_id=a.id
where a.slug='dark-psychology-defense' and length(coalesce(l.content,''))<140
order by m.order_index,l.order_index''')
rows=cur.fetchall()

for lid,title,mname in rows:
    content=textwrap.dedent(f'''\
    # {title}

    ## Lesson intent
    This lesson strengthens your defensive intelligence in **{mname}** by turning theory into repeatable protection behavior.

    ## Outcomes
    - Identify the manipulation risk pattern addressed by this lesson
    - Apply a practical response script under pressure
    - Document observable behavior without diagnosis
    - Decide escalation level (ignore, boundary, escalate, exit)

    ## Core teaching
    1. **Pattern recognition:** what to watch for first.
    2. **Context check:** who has leverage, what is at stake.
    3. **Defensive move:** de-escalate, delay, verify, boundary.
    4. **Evidence discipline:** facts, timestamps, impact.

    ## Practice drill (10–15 min)
    - Read a real or simulated scenario.
    - Label tactic(s) used.
    - Write one boundary script and one escalation condition.
    - Record what evidence you'd keep.

    ## Script starter
    "I'm not deciding under pressure. I'll review and respond after verification."

    ## Concept Links
    - Related: **Detection Frameworks and Evidence Logging**
    - Related: **Defensive Communication and Boundary Enforcement**
    - Related: **Recovery, Reintegration, and Resilience**

    ## Review Loop
    - 24h: recall this lesson's 3 red flags from memory.
    - 7d: apply the script in a fresh scenario simulation.

    ## Action takeaway
    Convert one insight from this lesson into a personal boundary rule you can reuse.
    ''').strip()
    cur.execute('update lessons set content=?, estimated_minutes=?, xp_reward=? where id=?',(content,18,16,lid))

# 2) Ensure quiz coverage for all lessons
cur.execute('''select l.id,l.title from lessons l
left join quizzes q on q.lesson_id=l.id
where q.id is null''')
missing=cur.fetchall()
for lid,title in missing:
    opts=json.dumps([
        'Pause and define scope before acting',
        'React immediately to urgency pressure',
        'Assume intent without evidence',
        'Skip documentation to save time'
    ])
    cur.execute('insert into quizzes(lesson_id,question,options,correct_answer,explanation) values(?,?,?,?,?)',
                (lid,f'For "{title}", what is the safest first action?',opts,0,'Scope + pause reduces manipulation and error risk.'))

# 3) normalize stats
cur.execute('select id from academies')
for (aid,) in cur.fetchall():
    cur.execute('''select count(*),coalesce(sum(l.estimated_minutes),0)
                   from lessons l join modules m on l.module_id=m.id where m.academy_id=?''',(aid,))
    c,m=cur.fetchone()
    cur.execute('update academies set total_lessons=?, estimated_hours=? where id=?',(c,max(1,round(m/60)),aid))

conn.commit()

cur.execute("select count(*) from lessons where length(coalesce(content,''))<140")
after_short=cur.fetchone()[0]
cur.execute('select count(*) from quizzes')
after_q=cur.fetchone()[0]
print('dark_short_updated',len(rows))
print('quiz_added',len(missing))
print('before_short',before_short,'after_short',after_short)
print('before_quizzes',before_q,'after_quizzes',after_q)
