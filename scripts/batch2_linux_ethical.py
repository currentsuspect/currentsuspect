import sqlite3, textwrap, json

DB='/home/currentsuspect/blueprint/blueprint.db'
conn=sqlite3.connect(DB)
cur=conn.cursor()

academy_profiles={
 'linux-fundamentals':'Linux system navigation, shell fluency, permissions, processes, networking, and practical admin workflows',
 'ethical-hacking':'ethical security testing, recon, vulnerability analysis, exploitation fundamentals, and responsible reporting'
}

def build_content(title, academy_slug):
    focus=academy_profiles[academy_slug]
    concept_links = {
      'linux-fundamentals': '- Link to **Python Programming / File I/O** for automation\n- Link to **Ethical Hacking / Recon** for system enumeration contexts\n- Link to **Computer Science / Operating Systems** for internals',
      'ethical-hacking': '- Link to **Linux Fundamentals / Permissions & Processes** for target context\n- Link to **Network Fundamentals / Protocols** for packet-level reasoning\n- Link to **Python for Security** for scripting exploit/recon automation'
    }[academy_slug]
    return textwrap.dedent(f'''\
    # {title}

    ## Why this lesson matters
    This lesson builds practical capability in **{focus}** so you can execute in real environments, not just memorize theory.

    ## Learning objectives
    - Understand the core mechanism behind **{title}**
    - Apply the concept step-by-step in a realistic workflow
    - Identify common failure points and how to avoid them
    - Perform one defensive validation before considering the task complete

    ## Core concepts
    1. **Mental model** — what this component does in the system.
    2. **Execution path** — how to apply it in a repeatable process.
    3. **Risk boundaries** — what can break or become unsafe.
    4. **Verification** — how to prove the result is correct.

    ## Practical workflow
    1. Define objective and constraints.
    2. Run baseline check (current state snapshot).
    3. Execute minimal change/test.
    4. Validate outcome using an independent check.
    5. Document command/steps and result evidence.

    ## Common mistakes
    - Skipping baseline checks before changes.
    - Running broad actions without scope boundaries.
    - Trusting one signal instead of validating from two sources.
    - Not documenting reproducible steps.

    ## Drill (15–20 min)
    - Run a controlled mini-lab for **{title}**.
    - Capture: goal, commands/actions, output, interpretation.
    - Write one improvement you would apply on second pass.

    ## Mini-quiz prompt
    - What is the safest first step before executing this workflow?
    - Which validation proves success most reliably?
    - Which mistake introduces the highest risk here?

    ## Concept Links
    {concept_links}

    ## Review Loop Checkpoint (24h / 7d)
    - **24h:** re-run mini-lab from memory with no notes.
    - **7d:** teach the workflow in 5 bullet points and execute once.

    ## Action takeaway
    Save one production-ready checklist item from this lesson into your personal runbook.
    ''').strip()

cur.execute("select count(*) from lessons where length(coalesce(content,''))<140")
before_short=cur.fetchone()[0]
cur.execute('select count(*) from quizzes')
before_q=cur.fetchone()[0]

for slug in ['linux-fundamentals','ethical-hacking']:
    cur.execute('''select l.id,l.title from lessons l
                   join modules m on l.module_id=m.id
                   join academies a on m.academy_id=a.id
                   where a.slug=? order by m.order_index,l.order_index''',(slug,))
    lessons=cur.fetchall()
    for lid,title in lessons:
        content=build_content(title,slug)
        cur.execute('update lessons set content=?, estimated_minutes=?, xp_reward=? where id=?',(content,22,18,lid))

        cur.execute('select count(*) from quizzes where lesson_id=?',(lid,))
        if cur.fetchone()[0]==0:
            opts=json.dumps([
                'Define scope + baseline check first',
                'Run maximum action immediately',
                'Skip validation if output looks fine',
                'Document only if something fails'
            ])
            cur.execute('insert into quizzes(lesson_id,question,options,correct_answer,explanation) values(?,?,?,?,?)',
                        (lid,'What is the best first move for reliable and safe execution?',opts,0,'Scope and baseline reduce risk and improve reproducibility.'))

    cur.execute('''select m.id,m.name from modules m join academies a on m.academy_id=a.id where a.slug=? order by m.order_index''',(slug,))
    for mid,mname in cur.fetchall():
        cur.execute('select count(*) from lessons where module_id=? and title like ?', (mid, '%Review Loop%'))
        if cur.fetchone()[0]==0:
            review=textwrap.dedent(f'''\
            # Review Loop — {mname}

            ## Purpose
            Consolidate long-term retention using spaced retrieval.

            ## 24-hour loop
            - Reproduce core workflow from memory.
            - List one error and correction.

            ## 7-day loop
            - Solve a fresh scenario using module concepts.
            - Explain tradeoffs and safety boundaries.

            ## Exit criteria
            - You can execute without notes.
            - You can explain why each step exists.
            ''').strip()
            cur.execute('select coalesce(max(order_index),0)+1 from lessons where module_id=?',(mid,))
            nxt=cur.fetchone()[0]
            cur.execute('insert into lessons(module_id,title,slug,content,order_index,xp_reward,estimated_minutes) values(?,?,?,?,?,?,?)',
                        (mid,f'Review Loop — {mname.lower()}','review-loop-'+str(mid),review,nxt,12,10))

cur.execute('select id from academies')
for (aid,) in cur.fetchall():
    cur.execute('''select count(*),coalesce(sum(l.estimated_minutes),0) from lessons l join modules m on l.module_id=m.id where m.academy_id=?''',(aid,))
    count,mins=cur.fetchone()
    cur.execute('update academies set total_lessons=?, estimated_hours=? where id=?',(count,max(1,round(mins/60)),aid))

cur.execute("select count(*) from lessons where length(coalesce(content,''))<140")
after_short=cur.fetchone()[0]
cur.execute('select count(*) from quizzes')
after_q=cur.fetchone()[0]

conn.commit()
print('before_short',before_short,'after_short',after_short)
print('before_quizzes',before_q,'after_quizzes',after_q)
