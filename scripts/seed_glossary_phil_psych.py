import sqlite3

DB='/home/currentsuspect/blueprint/blueprint.db'
conn=sqlite3.connect(DB)
cur=conn.cursor()

terms = [
    # Philosophy
    ("Epistemology","epistemology","The branch of philosophy about knowledge: what we can know and how.","Focuses on justification, belief, truth, and skepticism.","logic,argument,skepticism"),
    ("Metaphysics","metaphysics","The branch of philosophy about reality and existence.","Asks what kinds of things exist and what they are fundamentally like.","ontology,mind"),
    ("Ethics","ethics","Systematic thinking about right action, values, and responsibility.","Includes virtue ethics, deontology, consequentialism, care ethics.","virtue-ethics,deontology,consequentialism"),
    ("Virtue Ethics","virtue-ethics","An ethical theory centered on character and flourishing.","Asks: what kind of person should I become?", "ethics,deontology,consequentialism"),
    ("Deontology","deontology","An ethical approach based on duties and rules.","Actions are judged by whether they respect moral duties/rights.","ethics,virtue-ethics,consequentialism"),
    ("Consequentialism","consequentialism","An ethical approach that evaluates actions by outcomes.","The moral status of an act depends mainly on its consequences.","ethics,deontology"),
    ("Logic","logic","Rules and methods for valid reasoning.","Helps test whether conclusions follow from premises.","argument,fallacy"),
    ("Argument","argument","A set of reasons supporting a conclusion.","Good arguments are clear, valid/strong, and evidence-aware.","logic,fallacy"),
    ("Fallacy","fallacy","A common error in reasoning.","Can be formal or informal; often persuasive but invalid.","logic,argument"),
    ("Skepticism","skepticism","Questioning whether knowledge claims are justified.","Useful for avoiding certainty theater and weak evidence.","epistemology,evidence"),

    # Psychology
    ("Cognitive Bias","cognitive-bias","A systematic pattern of judgment error.","Biases can distort decisions under uncertainty and pressure.","confirmation-bias,sunk-cost-fallacy"),
    ("Confirmation Bias","confirmation-bias","Tendency to seek/notice evidence that supports existing beliefs.","Counter with disconfirming evidence checks.","cognitive-bias"),
    ("Sunk Cost Fallacy","sunk-cost-fallacy","Continuing a bad path because of past investment.","Past cost is not a reason to keep making poor decisions.","cognitive-bias"),
    ("Attachment","attachment","Emotional bond patterns formed in close relationships.","Affects trust, conflict response, and relationship regulation.","trauma-bond,intermittent-reinforcement"),
    ("Intermittent Reinforcement","intermittent-reinforcement","Unpredictable reward schedule that strengthens behavior.","Often used in manipulative dynamics to create dependency.","trauma-bond,manipulation"),
    ("Gaslighting","gaslighting","A manipulation tactic that erodes confidence in one’s perception/reality.","Common signs include denial of events and confidence attacks.","darvo,manipulation"),
    ("DARVO","darvo","Deny, Attack, and Reverse Victim and Offender.","A blame-reversal pattern often seen in abusive conflict.","gaslighting,manipulation"),
    ("Trauma Bond","trauma-bond","Strong attachment formed through cycles of harm and relief.","Maintained by fear, hope, and intermittent reward patterns.","intermittent-reinforcement,attachment"),
    ("Coercive Control","coercive-control","Patterned domination through isolation, intimidation, and control.","Often low-visibility but high-impact over time.","manipulation,due-process"),
    ("Self-Regulation","self-regulation","Ability to manage thoughts, emotions, and behavior toward goals.","Core for personal power and disciplined action under stress.","executive-function,habit"),
    ("Executive Function","executive-function","Cognitive control processes: planning, inhibition, working memory.","Critical for decision quality and impulse control.","self-regulation,habit"),
    ("Habit","habit","A behavior loop repeated until automatic.","Built through cue-routine-reward and consistency.","self-regulation,behavior-change"),
    ("Behavior Change","behavior-change","Systematic modification of actions over time.","Works best with clear cues, measurable steps, and review loops.","habit,self-regulation"),

    # Cross links
    ("Manipulation","manipulation","Hidden influence that exploits asymmetry for control.","Distinguish from transparent persuasion and informed influence.","gaslighting,darvo,coercive-control"),
    ("Evidence-Based Thinking","evidence","Using verifiable information to make claims and decisions.","Prioritizes quality, relevance, and falsifiability of evidence.","argument,skepticism,confirmation-bias"),
]

for t in terms:
    cur.execute('''
    INSERT OR REPLACE INTO glossary_terms(term,slug,definition,details,related)
    VALUES(?,?,?,?,?)
    ''', t)

conn.commit()
print('seeded_terms', len(terms))
