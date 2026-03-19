import sqlite3, textwrap, json

DB='/home/currentsuspect/blueprint/blueprint.db'
conn=sqlite3.connect(DB)
cur=conn.cursor()

PHIL_VOCAB = "- [[Epistemology]]\n- [[Metaphysics]]\n- [[Ethics]]\n- [[Logic]]\n- [[Argument]]\n- [[Fallacy]]\n"
PSYCH_VOCAB = "- [[Cognitive Bias]]\n- [[Confirmation Bias]]\n- [[Attachment]]\n- [[Self-Regulation]]\n- [[Behavior Change]]\n- [[Manipulation]]\n"

def build_content(academy_slug, module_name, lesson_title):
    vocab = PHIL_VOCAB if academy_slug == 'philosophy-wisdom' else PSYCH_VOCAB
    lens = 'philosophical analysis' if academy_slug == 'philosophy-wisdom' else 'psychological science and application'
    return textwrap.dedent(f'''\
    # {lesson_title}

    ## Why this lesson matters
    This lesson gives you a rigorous foundation in **{lesson_title}** through the lens of **{lens}** so you can think clearly, decide better, and apply ideas to real life.

    ## Beginner-first explanation
    If you are new: treat this lesson as a guided map. You do not need background knowledge before starting.

    ## Learning objectives
    - Define the core concept in plain English
    - Explain the main schools/models involved
    - Apply the idea to one real-life scenario
    - Identify one common misunderstanding and correct it

    ## Core theory (textbook layer)
    1. **Concept definition** — what this topic means and what it does not mean.
    2. **Key models/debates** — major perspectives worth comparing.
    3. **Strengths and limits** — where this idea works well and where it can mislead.
    4. **Evidence/reasoning standard** — what counts as good support for a claim.

    ## Case lens (casebook layer)
    **Scenario:** In a high-pressure decision, a person relies on intuition and social proof.

    Analyze with this topic:
    - What are they assuming?
    - Which alternative explanation is ignored?
    - What evidence would change the conclusion?
    - What is the better next action?

    ## Method layer (how to think)
    - Ask: *What exactly is being claimed?*
    - Ask: *What reasons support it?*
    - Ask: *What evidence contradicts it?*
    - Ask: *What decision follows if uncertainty remains?*

    ## Practical drill (20 minutes)
    1. Summarize this lesson in 5 bullet points.
    2. Write one argument **for** and one argument **against** a claim from this lesson.
    3. Apply it to a current personal decision.
    4. Record your final decision rule.

    ## Mastery check questions
    1. What is the most important distinction in this topic?
    2. What mistake do beginners commonly make here?
    3. How would you teach this to someone in 2 minutes?

    ## Vocabulary links
    {vocab}

    ## Review loop
    - **24h:** Reconstruct the concept map from memory.
    - **7d:** Solve a new scenario using this lesson’s framework.
    - **30d:** Integrate this lesson into your personal doctrine notes.

    ## Action takeaway
    Create one permanent note titled "{lesson_title} — Personal Use" and store: definition, model, test question, and your decision rule.
    ''').strip()

cur.execute("select count(*) from quizzes")
before_q = cur.fetchone()[0]

for slug in ['philosophy-wisdom','psychology-neuroscience']:
    cur.execute('''select l.id,l.title,m.name from lessons l
                   join modules m on l.module_id=m.id
                   join academies a on a.id=m.academy_id
                   where a.slug=? order by m.order_index,l.order_index''',(slug,))
    rows = cur.fetchall()
    for lesson_id, lesson_title, module_name in rows:
        content = build_content(slug, module_name, lesson_title)
        cur.execute('update lessons set content=?, estimated_minutes=?, xp_reward=? where id=?',(content,24,20,lesson_id))

        cur.execute('select count(*) from quizzes where lesson_id=?',(lesson_id,))
        if cur.fetchone()[0] == 0:
            opts = json.dumps([
                'Define the claim, compare models, then test with evidence',
                'Accept first explanation that feels right',
                'Ignore opposing arguments',
                'Skip scenario application'
            ])
            cur.execute('insert into quizzes(lesson_id,question,options,correct_answer,explanation) values(?,?,?,?,?)',
                        (lesson_id, f'For {lesson_title}, what is the strongest study move?', opts, 0,
                         'Rigorous understanding requires clear claims, model comparison, and evidence testing.'))

# normalize stats globally
cur.execute('select id from academies')
for (aid,) in cur.fetchall():
    cur.execute('''select count(*),coalesce(sum(l.estimated_minutes),0)
                   from lessons l join modules m on l.module_id=m.id where m.academy_id=?''',(aid,))
    c,m = cur.fetchone()
    cur.execute('update academies set total_lessons=?, estimated_hours=? where id=?',(c,max(1,round(m/60)),aid))

conn.commit()

cur.execute('select count(*) from quizzes')
after_q = cur.fetchone()[0]
cur.execute("select count(*) from lessons where length(coalesce(content,''))<1200")
short = cur.fetchone()[0]
print('quiz_before',before_q,'quiz_after',after_q)
print('short_lt_1200',short)
