import sqlite3, textwrap, json

DB = '/home/currentsuspect/blueprint/blueprint.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

DISCLAIMER = "This course is educational, not legal advice. For high-stakes disputes, consult a licensed advocate in Kenya."

MODULE_CONTEXT = {
    "Legal Self-Defense Foundations": {
        "general": "how legal systems create enforceable boundaries, duties, and remedies",
        "kenya": "Constitution of Kenya (2010), Bill of Rights, and practical rights activation in Kenyan institutions",
        "kenya_points": [
            "Constitution of Kenya 2010 is the supreme law; inconsistent law is void to the extent of inconsistency.",
            "Bill of Rights (Chapter 4) is directly relevant to personal power: dignity, equality, privacy, fair administrative action, fair hearing.",
            "Institution map: police, DCI, ODPP, courts, tribunals, county authorities, and sector regulators."
        ]
    },
    "Contracts & Commitments": {
        "general": "forming enforceable agreements, managing obligations, and reducing ambiguity",
        "kenya": "Kenyan contract practice including written terms, evidence trails, and enforceability in courts/tribunals",
        "kenya_points": [
            "Most commercial disputes are won/lost on documentation quality, not memory of verbal promises.",
            "Consumer-facing agreements should align with fair dealing standards and transparent terms.",
            "Use signed contracts, dated schedules, and clear variation clauses before scope changes."
        ]
    },
    "Evidence, Records, and Disputes": {
        "general": "building admissible, credible records and structuring dispute escalation",
        "kenya": "Kenyan evidence and procedure realities: chronology, authenticity, chain of custody, and proper forum selection",
        "kenya_points": [
            "Maintain timestamped chronology with source artifacts (emails, invoices, chat exports, receipts, photos).",
            "Avoid tampering or selective edits; credibility collapses if metadata integrity is challenged.",
            "Choose the correct forum early (court, tribunal, regulator, ADR) to avoid delay and cost."
        ]
    },
    "Business, Work, and Digital Risk": {
        "general": "risk control in employment, business operations, data handling, and online conduct",
        "kenya": "Kenyan employment, consumer, business registration/compliance, and data/privacy risk posture",
        "kenya_points": [
            "Employment disputes often hinge on written policy, procedural fairness, and paper trail quality.",
            "Digital operations should treat privacy and data security as governance, not optional technical extras.",
            "Platform/online claims create defamation and consumer risk; document facts before public statements."
        ]
    },
    "Personal Governance & Discipline": {
        "general": "translating legal literacy into repeatable self-command and decision quality",
        "kenya": "day-to-day legal hygiene in Kenyan life: contracts, records, payments, property, and conflict handling",
        "kenya_points": [
            "Personal sovereignty scales with written structure: agreements, budgets, logs, and review routines.",
            "Use legal checkpoints before emotional decisions (debt, partnership, public claims, business promises).",
            "Discipline is legal power compounded over time: fewer avoidable disputes, stronger leverage when disputes happen."
        ]
    },
}

LESSON_STYLES = {
    "Core Principles": "foundational doctrine and mental models",
    "Common Failure Patterns": "real-world mistakes and how they create legal vulnerability",
    "Practical Playbook": "step-by-step execution framework and templates",
    "Review Loop": "spaced repetition and mastery checks for retention",
}


def md_list(items):
    return "\n".join([f"- {x}" for x in items])


def build_lesson(module_name, lesson_title):
    ctx = MODULE_CONTEXT[module_name]
    style = LESSON_STYLES[lesson_title]

    kenya_article_refs = [
        "Article 27 (Equality and freedom from discrimination)",
        "Article 31 (Privacy)",
        "Article 47 (Fair administrative action)",
        "Article 48 (Access to justice)",
        "Article 50 (Fair hearing)",
    ]

    module_actions = {
        "Legal Self-Defense Foundations": [
            "Create a personal rights cheat-sheet (one pager).",
            "Map your escalation channels (internal, regulator, legal counsel).",
            "Adopt a 24-hour rule before high-conflict responses."
        ],
        "Contracts & Commitments": [
            "Never start paid work without scope + payment terms in writing.",
            "Use change-order text for every scope change.",
            "Store signed versions and all amendments in one folder."
        ],
        "Evidence, Records, and Disputes": [
            "Maintain a running incident log with timestamps.",
            "Back up evidence in two secure locations.",
            "Draft facts-only summaries before escalation."
        ],
        "Business, Work, and Digital Risk": [
            "Create a basic compliance checklist (tax, HR, data, customer terms).",
            "Separate personal and business records/accounts.",
            "Use policy templates for refunds, privacy, and service terms."
        ],
        "Personal Governance & Discipline": [
            "Run a weekly legal hygiene review (contracts, liabilities, pending disputes).",
            "Track commitments with due dates and proof of completion.",
            "Build a pre-commitment checklist for major decisions."
        ],
    }

    content = textwrap.dedent(f"""
    # {lesson_title} — {module_name}

    > {DISCLAIMER}

    ## Why this lesson matters
    This lesson develops **{style}** so you can gain practical control over your life through law, process, and disciplined execution.

    ## General track (universal legal literacy)
    We focus on **{ctx['general']}**.

    ### Core outcomes
    - Convert legal language into actionable decisions
    - Reduce avoidable risk through documentation and process
    - Increase negotiating power with clear boundaries and evidence
    - Respond under pressure without impulsive self-sabotage

    ## Kenya-specific track (applied context)
    We then apply the same framework to **{ctx['kenya']}**.

    ### Kenya focus points
    {md_list(ctx['kenya_points'])}

    ### Constitutional anchors to know (start here)
    {md_list(kenya_article_refs)}

    > Use these as orientation anchors, then verify exact legal position for your case with up-to-date statutes/case law and counsel.

    ## Tactical framework (POWER-6)
    1. **P**in facts (who/what/when/where)
    2. **O**bligations map (your duties vs other party duties)
    3. **W**rite evidence (documents, logs, timestamps)
    4. **E**scalate proportionally (internal -> regulator/ADR -> court)
    5. **R**isk-check options (cost, time, reversibility)
    6. **6-day review** (weekly governance loop)

    ## Scripts you can actually use
    - "Please confirm this in writing with dates and exact terms."
    - "I will respond after reviewing the legal and contractual implications."
    - "For clarity, my understanding is: [facts]. If inaccurate, correct in writing."
    - "I’m preserving records and escalating through the proper channel."

    ## Failure patterns to avoid
    - Verbal-only agreements on high-value commitments
    - Emotional replies without documentary trail
    - Delayed evidence capture (losing metadata/context)
    - Choosing the wrong forum for dispute resolution

    ## Practical drill (20–30 min)
    1. Pick one real-life situation (work, money, contract, service dispute).
    2. Build a 1-page legal brief:
       - Facts timeline
       - Duties/rights matrix
       - Evidence index
       - Next best action (least-risk, highest-leverage)
    3. Write one boundary message using the scripts above.

    ## Concept links
    - Link to **Dark Psychology / Detection Frameworks** (manipulation-resistant communication)
    - Link to **Python Programming / Documentation habits** (systematic records)
    - Link to **Personal Governance module** (discipline loops)

    ## Review loop (24h / 7d / 30d)
    - **24h:** Reconstruct POWER-6 from memory and apply to a new scenario.
    - **7d:** Execute one real boundary/escalation message with documentation.
    - **30d:** Audit outcomes: avoided risk, preserved evidence, improved leverage.

    ## Action takeaway
    Install one non-negotiable legal hygiene rule this week and track compliance daily.
    """).strip()

    return content


cur.execute('''
select l.id, l.title, m.name
from lessons l
join modules m on l.module_id=m.id
join academies a on a.id=m.academy_id
where a.slug='law-power-control'
order by m.order_index, l.order_index
''')
rows = cur.fetchall()

for lesson_id, lesson_title, module_name in rows:
    content = build_lesson(module_name, lesson_title)
    minutes = 24 if lesson_title != 'Review Loop' else 16
    xp = 20 if lesson_title != 'Review Loop' else 14
    cur.execute(
        'update lessons set content=?, estimated_minutes=?, xp_reward=? where id=?',
        (content, minutes, xp, lesson_id)
    )

    # Ensure quiz exists and is context-aware
    cur.execute('select count(*) from quizzes where lesson_id=?', (lesson_id,))
    if cur.fetchone()[0] == 0:
        opts = json.dumps([
            'Pause and map facts/obligations before action',
            'React immediately from emotion',
            'Rely only on verbal claims',
            'Escalate publicly without records'
        ])
        cur.execute(
            'insert into quizzes(lesson_id,question,options,correct_answer,explanation) values(?,?,?,?,?)',
            (
                lesson_id,
                f'In {lesson_title}, what is the highest-leverage first move?',
                opts,
                0,
                'Structured facts + obligations + evidence gives better legal outcomes than impulsive reactions.'
            )
        )

# Normalize academy stats
cur.execute('''
select count(*), coalesce(sum(l.estimated_minutes),0)
from lessons l
join modules m on l.module_id=m.id
join academies a on a.id=m.academy_id
where a.slug='law-power-control'
''')
count_lessons, total_minutes = cur.fetchone()
cur.execute(
    'update academies set total_lessons=?, estimated_hours=? where slug=?',
    (count_lessons, max(1, round(total_minutes/60)), 'law-power-control')
)

conn.commit()
print('law_lessons_updated', len(rows))
print('law_total_lessons', count_lessons)
print('law_est_hours', max(1, round(total_minutes/60)))
