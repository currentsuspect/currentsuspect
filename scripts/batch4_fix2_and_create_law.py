import sqlite3, textwrap, json, re

DB='/home/currentsuspect/blueprint/blueprint.db'
conn=sqlite3.connect(DB)
cur=conn.cursor()

# Fix remaining short lessons
cur.execute("""select l.id,l.title,m.name,a.slug
from lessons l
join modules m on l.module_id=m.id
join academies a on m.academy_id=a.id
where length(coalesce(l.content,''))<140""")
rows=cur.fetchall()
for lid,title,mname,slug in rows:
    content=textwrap.dedent(f'''\
    # {title}

    ## Purpose
    Build applied mastery for this topic inside **{mname}**.

    ## What you'll practice
    - Recognize core pattern and risk boundaries
    - Execute one reliable workflow
    - Validate output from a second signal
    - Capture notes for repeatability

    ## Practical steps
    1. Define scope and objective.
    2. Execute minimal viable action.
    3. Validate result independently.
    4. Record what worked and what failed.

    ## Review loop
    - 24h recall: explain the workflow from memory.
    - 7d transfer: apply the same logic to a new scenario.

    ## Action takeaway
    Save one reusable checklist item to your runbook.
    ''').strip()
    cur.execute('update lessons set content=?, estimated_minutes=?, xp_reward=? where id=?',(content,14,12,lid))

# Create Law academy
cur.execute("select id from academies where slug='law-power-control'")
row=cur.fetchone()
if row:
    law_id=row[0]
else:
    cur.execute('''insert into academies(name,slug,description,icon,category,difficulty,total_lessons,estimated_hours,is_published)
                   values(?,?,?,?,?,?,?,?,1)''',
                ('Law for Power & Self-Control','law-power-control','Practical legal literacy for personal sovereignty: rights, contracts, risk, evidence, and disciplined decision-making.','⚖️','law',4,0,0))
    law_id=cur.lastrowid

modules=[
 ('Legal Self-Defense Foundations','rights-basics','How law gives structure, boundaries, and leverage.'),
 ('Contracts & Commitments','contracts-commitments','Avoid traps, read terms, negotiate clear obligations.'),
 ('Evidence, Records, and Disputes','evidence-disputes','Document reality and handle conflict with process.'),
 ('Business, Work, and Digital Risk','business-work-digital-risk','Protect yourself in money, work, and online systems.'),
 ('Personal Governance & Discipline','personal-governance-discipline','Turn legal clarity into self-command habits.')
]

for i,(name,slug,desc) in enumerate(modules, start=1):
    cur.execute('select id from modules where academy_id=? and slug=?',(law_id,slug))
    r=cur.fetchone()
    if r:
        mid=r[0]
    else:
        cur.execute('insert into modules(academy_id,name,slug,description,order_index) values(?,?,?,?,?)',(law_id,name,slug,desc,i))
        mid=cur.lastrowid

    cur.execute('select count(*) from lessons where module_id=?',(mid,))
    count=cur.fetchone()[0]
    if count<4:
        base_lessons=[
          ('Core Principles','Understand authority, jurisdiction, duty, and liability in plain language.'),
          ('Common Failure Patterns','Where people lose leverage: vague agreements, no records, emotional decisions.'),
          ('Practical Playbook','Step-by-step actions you can apply immediately.'),
          ('Review Loop','Spaced review for durable decision quality under pressure.')
        ]
        start=count+1
        for j,(ltitle,summary) in enumerate(base_lessons[count:], start=start):
            lslug=re.sub(r'[^a-z0-9]+','-',(ltitle+'-'+slug).lower()).strip('-')
            body=textwrap.dedent(f'''\
            # {ltitle}

            ## Why this matters
            {summary}

            ## Learning objectives
            - Translate legal language into actionable decisions
            - Reduce avoidable risk through structure
            - Increase self-control under stress using process

            ## Field protocol
            1. Clarify facts.
            2. Clarify rights/obligations.
            3. Choose lowest-risk valid action.
            4. Record decision and evidence.

            ## Self-command note
            Power in life is less about domination and more about disciplined choices repeated consistently.

            ## Action takeaway
            Write one personal rule from this lesson and apply it this week.
            ''').strip()
            cur.execute('insert into lessons(module_id,title,slug,content,order_index,xp_reward,estimated_minutes) values(?,?,?,?,?,?,?)',
                        (mid,ltitle,lslug,body,j,16,18))

cur.execute('''select l.id,l.title from lessons l join modules m on l.module_id=m.id
               where m.academy_id=? and l.id not in (select lesson_id from quizzes)''',(law_id,))
for lid,title in cur.fetchall():
    opts=json.dumps([
      'Pause and identify rights + obligations first',
      'Act immediately from emotion',
      'Sign terms without review',
      'Skip written records'
    ])
    cur.execute('insert into quizzes(lesson_id,question,options,correct_answer,explanation) values(?,?,?,?,?)',
                (lid,f'In {title}, what is the most disciplined first move?',opts,0,'Structured clarity beats impulsive action.'))

cur.execute('select id from academies')
for (aid,) in cur.fetchall():
    cur.execute('''select count(*),coalesce(sum(l.estimated_minutes),0)
                   from lessons l join modules m on l.module_id=m.id where m.academy_id=?''',(aid,))
    c,m=cur.fetchone()
    cur.execute('update academies set total_lessons=?, estimated_hours=? where id=?',(c,max(1,round(m/60)),aid))

conn.commit()

cur.execute("select count(*) from lessons where length(coalesce(l.content,''))<140".replace('l.content','content'))
remaining_short=cur.fetchone()[0]
cur.execute('select total_lessons,estimated_hours from academies where id=?',(law_id,))
law_stats=cur.fetchone()
print('fixed_short_lessons',len(rows))
print('remaining_short',remaining_short)
print('law_stats',law_stats)
