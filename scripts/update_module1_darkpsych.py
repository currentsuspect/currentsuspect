import sqlite3
import textwrap

DB = '/home/currentsuspect/blueprint/blueprint.db'

lessons = {
    158: textwrap.dedent("""
    # 1.1 Definitions, Scope, and Misconceptions

    ## Why this lesson matters
    Most people spot manipulation late because they don't have a clear definition. This lesson gives you a precise lens so you can label behavior early without overreacting or mislabeling everyone as "toxic".

    ## Learning objectives
    - Separate **persuasion**, **influence**, **manipulation**, and **coercion**
    - Identify the boundary where normal social behavior becomes harmful control
    - Use behavior-based language instead of personality labels

    ## Core model: Influence Spectrum

    | Level | Description | Consent quality | Risk |
    |---|---|---|---|
    | Persuasion | Open attempt to convince | Informed + voluntary | Low |
    | Influence | Indirect shaping of choice | Usually voluntary | Medium-low |
    | Manipulation | Hidden agenda + asymmetry | Partially compromised | Medium-high |
    | Coercion | Threat/pressure removes choice | Not voluntary | High |

    ### Quick rule
    If a person must hide methods, create urgency, or punish disagreement, you are likely in manipulation/coercion territory.

    ## Misconceptions to kill early
    1. **"If they smile, it can't be manipulation."**  
       Charm is often delivery, not intent.
    2. **"Manipulation requires evil intent."**  
       Impact matters. Harmful control can exist even when intent is framed as "care."
    3. **"Only strangers manipulate."**  
       Most high-impact manipulation happens in close relationships and hierarchies.

    ## Detection cues (first-pass checklist)
    - Artificial urgency: "Decide now."
    - Information control: key facts withheld
    - Guilt hooks: "After all I've done for you"
    - Boundary punishment: silent treatment, ridicule, threats
    - Triangulation: "Everyone agrees with me about you"

    ## Defense scripts (starter set)
    - "I don't decide under pressure. I'll respond tomorrow."
    - "Please put that request in writing."
    - "I need full context before I agree."
    - "If this continues disrespectfully, I'll end this conversation."

    ## Drill (10 minutes)
    Take 5 recent conversations and classify each as persuasion/influence/manipulation/coercion.  
    For each, write: **what signal made you classify it?**

    ## Mini-quiz prompts
    1. Is urgency always manipulation? Why/why not?  
    2. What's the difference between influence and manipulation?  
    3. Give one behavior-based statement that avoids diagnosis.

    ## Action takeaway
    For the next 7 days, pause before commitment and ask:  
    **"Do I still choose this if I remove urgency, guilt, and social pressure?"**
    """).strip(),

    159: textwrap.dedent("""
    # 1.2 Historical Evolution (From Rhetoric to Behavioral Engineering)

    ## Why this lesson matters
    Manipulation tactics are not new; only delivery channels changed. Understanding historical patterns makes modern tactics easier to detect.

    ## Learning objectives
    - Trace manipulation methods from classical rhetoric to algorithmic systems
    - Recognize recurring patterns across eras
    - Extract defensive lessons from landmark studies

    ## Timeline (compressed)
    - **Classical era:** rhetoric and power framing
    - **Political realism:** strategy over morality (court/power games)
    - **20th century:** propaganda + mass persuasion engineering
    - **Behavioral era:** obedience/conformity studies
    - **Digital era:** personalization, outrage loops, parasocial leverage

    ## Landmark studies and defensive insight
    ### Asch (Conformity)
    People conform even when answers are obviously wrong.  
    **Defense:** pause social proof, verify independently.

    ### Milgram (Obedience)
    Authority can override personal moral discomfort.  
    **Defense:** ask for written instruction + policy/legal basis.

    ### Zimbardo (Role pressure)
    Situations can produce abusive behavior quickly.  
    **Defense:** design safeguards, transparency, peer checks.

    ## Recurring manipulation pattern
    1. Create uncertainty  
    2. Offer certainty through authority  
    3. Demand compliance quickly  
    4. Punish dissent socially

    If you can spot this sequence, you can break it earlier.

    ## Modern translation
    - Propaganda leaflet -> short-form viral narrative
    - Charismatic gatekeeper -> creator/influencer authority
    - Public shaming square -> algorithmic dogpile

    ## Defense scripts
    - "What's the original source?"
    - "What evidence would falsify this claim?"
    - "I need to review before I commit."

    ## Drill (15 minutes)
    Pick one trending narrative online. Write:
    - Claim
    - Emotional trigger used
    - Authority/signal used
    - Missing context
    - Your independent verification path

    ## Mini-quiz prompts
    1. Why does conformity matter for manipulation defense?  
    2. What's one modern equivalent of mass propaganda?  
    3. What question best interrupts authority bias?

    ## Action takeaway
    Adopt a 3-step filter for high-pressure claims:  
    **Source -> Evidence -> Incentive**.
    """).strip(),

    160: textwrap.dedent("""
    # 1.3 The Dark Triad and Beyond (Non-diagnostic)

    ## Why this lesson matters
    Trait frameworks are useful for pattern detection but dangerous when used as amateur diagnosis. This lesson teaches behavior-first interpretation.

    ## Learning objectives
    - Understand dark-triad trait clusters without labeling people clinically
    - Focus on observable behavior + repeated pattern + impact
    - Avoid certainty inflation and stigma

    ## Trait clusters (behavior lens)
    ### Narcissistic pattern cues
    - entitlement language
    - image management obsession
    - low accountability after harm

    ### Machiavellian pattern cues
    - strategic deception
    - relationship instrumentalization
    - selective truth release

    ### Callous-unemotional/psychopathic cues
    - shallow charm, low remorse
    - exploitative risk-taking
    - repeated boundary disregard

    ### Sadistic extension (dark tetrad)
    - visible gratification from another's distress

    ## Do not do this
    - "He's a psychopath" (diagnostic claim without assessment)

    ## Do this instead
    - "He repeatedly withheld key facts, punished disagreement, and reversed blame after documented incidents."

    ## Pattern threshold model
    Before escalation, look for:
    1. **Frequency** (repeated)
    2. **Consistency** (same playbook across contexts)
    3. **Impact** (harm to autonomy/safety)
    4. **Resistance response** (punishment when you set boundaries)

    If all 4 are present, treat as elevated risk.

    ## Defense scripts
    - "I'm discussing behaviors and outcomes, not labels."
    - "Let's stay on specific events, dates, and decisions."
    - "I won't continue if blame is being reversed."

    ## Drill (12 minutes)
    Rewrite 8 judgment statements into behavior statements.
    - Example: "She's toxic" -> "She shared private info after I asked for confidentiality twice."

    ## Mini-quiz prompts
    1. Why is behavior language safer than labels?  
    2. What are the 4 elements of pattern threshold?  
    3. Give one non-diagnostic way to report risk.

    ## Action takeaway
    From today, document **facts + sequence + impact**. Avoid personality verdicts.
    """).strip(),

    161: textwrap.dedent("""
    # 1.4 Ethics of Knowing: Defender's Oath

    ## Why this lesson matters
    Dark-psych knowledge is dual-use. Without ethics, a defensive course can become an offensive toolkit. This lesson locks your operating code.

    ## Learning objectives
    - Commit to non-exploitative use of knowledge
    - Apply proportional response and least-harm escalation
    - Build a personal decision protocol for high-conflict situations

    ## Defender's Oath (operational)
    1. I use this knowledge for protection, not domination.  
    2. I preserve autonomy, including people I disagree with.  
    3. I escalate by evidence and risk, not revenge.  
    4. I prioritize safety over being right.  
    5. I document facts; I avoid speculation theatre.

    ## Ethical decision framework: A-C-C-E-P-T
    - **Assess** facts and immediate risk
    - **Consider** stakeholders and harm pathways
    - **Consult** policy/law/support where needed
    - **Evaluate** options by proportionality
    - **Proceed** with least harmful effective action
    - **Take stock** and refine

    ## Red lines (never)
    - Baiting/manufacturing confessions
    - Public doxxing/shaming as first response
    - Coercive tests to "prove loyalty"
    - Teaching tactics to control others

    ## Safe escalation ladder
    1. Clarify boundary  
    2. Move to written channel  
    3. Document incidents  
    4. Involve formal support (HR/legal/safeguarding)  
    5. Exit/no-contact plan if risk persists

    ## Defense scripts
    - "I won't continue in this format; send it in writing."
    - "I'm stepping back and will respond after review."
    - "I'm escalating this through the proper process."

    ## Drill (15 minutes)
    Run one real scenario through A-C-C-E-P-T and produce:
    - risk rating (low/med/high)
    - chosen action
    - why alternatives were rejected

    ## Mini-quiz prompts
    1. What's the difference between boundary and retaliation?  
    2. Why is least-harm escalation important?  
    3. Name two actions that violate the oath.

    ## Action takeaway
    Write your personal 5-line Defender Oath and keep it visible before major decisions.
    """).strip(),
}

conn = sqlite3.connect(DB)
cur = conn.cursor()
for lesson_id, content in lessons.items():
    cur.execute(
        "UPDATE lessons SET content=?, estimated_minutes=?, xp_reward=? WHERE id=?",
        (content, 22, 20, lesson_id),
    )
conn.commit()
print(f"Updated {len(lessons)} lessons")
