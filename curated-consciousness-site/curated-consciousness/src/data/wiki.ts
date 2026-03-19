export interface WikiPage {
  id: string;
  title: string;
  category: 'foundational' | 'theoretical' | 'practical' | 'advanced';
  lastUpdated: string;
  author: string;
  readTime: string;
  content: WikiSection[];
  relatedPages: string[];
  citations?: Citation[];
}

export interface WikiSection {
  id: string;
  title: string;
  content: string;
  subsections?: WikiSubsection[];
}

export interface WikiSubsection {
  id: string;
  title: string;
  content: string;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  year: number;
}

export const wikiPages: WikiPage[] = [
  {
    id: 'glossary',
    title: 'Glossary of Terms',
    category: 'foundational',
    lastUpdated: '2024-01-15',
    author: 'Calibrated_Response',
    readTime: '12 min',
    content: [
      {
        id: 'frame',
        title: 'Frame',
        content: 'In social dynamics, a frame refers to the underlying structure of meaning that governs how an interaction is interpreted. The concept originates from Gregory Bateson\'s work in anthropology and communication theory (1955), later popularized in social psychology through Erving Goffman\'s frame analysis (1974).\n\nWithin Curated Consciousness, "frame" takes on a specific operational meaning: the set of non-negotiable boundaries, expectations, and behavioral standards that a man maintains in his relationships.',
        subsections: [
          {
            id: 'frame-collapse',
            title: 'Frame Collapse',
            content: 'Frame collapse occurs when a man\'s boundaries dissolve under pressure, typically through emotional appeals, ultimatums, or the slow erosion of consistency.'
          },
          {
            id: 'frame-maintenance',
            title: 'Frame Maintenance',
            content: 'Frame maintenance is the ongoing practice of enforcing boundaries without justification, explanation, or emotional reactivity.'
          }
        ]
      },
      {
        id: 'baseline',
        title: 'Baseline',
        content: 'The baseline represents the established pattern of behavior, attention, and emotional investment in a relationship. Psychological research on habit formation demonstrates that behaviors repeated consistently become automatic.',
        subsections: [
          {
            id: 'baseline-elevation',
            title: 'Baseline Elevation',
            content: 'Baseline elevation is the gradual increase in investment, attention, or accommodation that occurs unconsciously over the course of a relationship.'
          },
          {
            id: 'baseline-recalibration',
            title: 'Baseline Recalibration',
            content: 'Baseline recalibration is the deliberate process of lowering investment, attention, or accommodation to a sustainable, attractive level.'
          }
        ]
      },
      {
        id: 'calibration',
        title: 'Calibration',
        content: 'Calibration is the systematic adjustment of behavior based on feedback from the environment. A calibrated man observes the responses his behavior generates and adjusts accordingly.',
        subsections: [
          {
            id: 'over-calibration',
            title: 'Over-Calibration',
            content: 'Over-calibration occurs when adjustment becomes constant, when the man is perpetually fine-tuning his behavior in response to micro-fluctuations in the other\'s state.'
          }
        ]
      },
      {
        id: 'gravitational',
        title: 'Gravitational Pull',
        content: 'The concept of gravitational pull in social dynamics draws from social exchange theory. Just as massive objects bend spacetime, compelling other objects to orbit them, individuals with high perceived value create psychological fields that draw others toward them.'
      },
      {
        id: 'desensitization',
        title: 'Desensitization',
        content: 'Desensitization refers to the gradual reduction of emotional response to a repeated stimulus. In relationship dynamics, the same principle applies to changes in behavior: sudden shifts trigger resistance, while gradual shifts bypass conscious detection.',
        subsections: [
          {
            id: 'desensitization-timeline',
            title: 'The Desensitization Timeline',
            content: 'Research on habituation suggests that behavioral changes require 3-4 weeks to become normalized. A desensitization protocol operates on this timeline.'
          }
        ]
      },
      {
        id: 'presence',
        title: 'Presence',
        content: 'Presence is the quality of being fully attentive and engaged in the current moment, without mental preoccupation with the past or future. In the context of masculine development, presence has a specific meaning: the absence of mental wandering toward the relationship when engaged in other activities.'
      }
    ],
    relatedPages: ['baseline-protocol', 'frame-dynamics', 'ninety-day-calibration'],
    citations: [
      { id: '1', text: 'Bateson, G. (1955). A theory of play and fantasy.', source: 'Psychiatric Research Reports', year: 1955 },
      { id: '2', text: 'Goffman, E. (1974). Frame analysis.', source: 'Harvard University Press', year: 1974 }
    ]
  },
  {
    id: 'baseline-protocol',
    title: 'The Baseline Protocol',
    category: 'practical',
    lastUpdated: '2023-11-08',
    author: 'TheGardener',
    readTime: '18 min',
    content: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: 'The Baseline Protocol is a 30-day observational period designed to establish objective data about your current relationship dynamics. Before implementing any changes, you must understand the present state.'
      },
      {
        id: 'phase-one',
        title: 'Phase One: Data Collection (Days 1-7)',
        content: 'During the first week, you will observe without changing anything. Maintain your current patterns exactly as they are. Your task is documentation, not modification.',
        subsections: [
          {
            id: 'metrics',
            title: 'Metrics to Track',
            content: 'Create a simple log. Each day, record: Communication patterns, Initiation frequency, Investment levels, Response patterns. Do not judge. Do not interpret. Simply record.'
          }
        ]
      },
      {
        id: 'phase-two',
        title: 'Phase Two: Pattern Recognition (Days 8-14)',
        content: 'With one week of data, review for patterns. Look for asymmetry, reactivity, predictability, and dependency.',
        subsections: [
          {
            id: 'power-question',
            title: 'The Power Question',
            content: 'Ask yourself: If I stopped initiating entirely, how long would it take for her to reach out? Your honest answers reveal the power dynamic.'
          }
        ]
      },
      {
        id: 'phase-three',
        title: 'Phase Three: Calibration Planning (Days 15-21)',
        content: 'Based on your data, identify one or two behaviors to modify. Not five. Not ten. One or two.',
        subsections: [
          {
            id: 'gradual-rule',
            title: 'The Gradual Rule',
            content: 'Sudden changes trigger alarm. Gradual changes trigger adaptation. Go slowly.'
          }
        ]
      },
      {
        id: 'phase-four',
        title: 'Phase Four: Implementation (Days 22-30)',
        content: 'Begin the calibrated changes. Continue tracking the same metrics. Document your emotional responses carefully.'
      }
    ],
    relatedPages: ['glossary', 'ninety-day-calibration'],
    citations: [
      { id: '1', text: 'Cialdini, R. B. (2009). Influence: Science and practice.', source: 'Pearson', year: 2009 }
    ]
  },
  {
    id: 'ninety-day-calibration',
    title: 'The 90-Day Calibration: Advanced Frame Implementation',
    category: 'advanced',
    lastUpdated: '2023-10-15',
    author: 'TheGardener',
    readTime: '25 min',
    content: [
      {
        id: 'warning',
        title: 'Prerequisites and Warnings',
        content: 'This protocol is not for beginners. It requires completion of the Baseline Protocol, demonstrated capacity for emotional regulation, and at least 60 days of consistent frame maintenance. WARNING: This protocol produces anxiety. You must maintain calibration regardless of initial response. Half-completed protocols produce worse outcomes than no protocol at all.'
      },
      {
        id: 'month-one',
        title: 'Month One: Establishing Autonomy',
        content: 'The first month establishes that you have a life independent of the relationship. This is not about withdrawal; it is about presence elsewhere. Establish or re-establish friendships outside the relationship. Create commitments that exclude your partner. She should become aware that you have experiences she is not part of.'
      },
      {
        id: 'month-two',
        title: 'Month Two: Investment Recalibration',
        content: 'The second month reduces your investment in the relationship to match or slightly undershoot her investment in you. Reduce emotional labor significantly. Stop anticipating her needs. Wait for explicit requests. Reduce initiation of contact by 50% from your baseline.'
      },
      {
        id: 'month-three',
        title: 'Month Three: Gravitational Establishment',
        content: 'The third month consolidates your position as the sun around which she orbits—not through control, but through becoming the most interesting, stable, and self-sufficient person in her environment. Be fully present when you are together. End interactions before she does. Maintain your independent commitments even when she wants your time.'
      }
    ],
    relatedPages: ['baseline-protocol', 'glossary', 'when-to-walk-away'],
    citations: [
      { id: '1', text: 'Rusbult, C. E. (1983). A longitudinal test of the investment model.', source: 'Journal of Personality and Social Psychology', year: 1983 }
    ]
  },
  {
    id: 'when-to-walk-away',
    title: 'When to Walk Away: Endgame Analysis',
    category: 'advanced',
    lastUpdated: '2023-09-22',
    author: 'TheGardener',
    readTime: '16 min',
    content: [
      {
        id: 'introduction',
        title: 'The Hardest Decision',
        content: 'Most men who find Curated Consciousness are here because they want to save a relationship. This guide is not about quitting when things get hard. It is about recognizing when continued investment produces diminishing returns, when your self-respect requires exit.'
      },
      {
        id: 'red-lines',
        title: 'Red Lines: Non-Negotiable Exit Triggers',
        content: 'There are behaviors that, once demonstrated, indicate that the relationship cannot be repaired through frame maintenance. These are fundamental violations of the possibility of mutual respect: Infidelity with deception, Contempt displays, Financial betrayal, False accusations.'
      },
      {
        id: 'exit-protocol',
        title: 'The Exit Protocol',
        content: 'Leaving well is as important as leaving. A messy exit produces ongoing entanglement, reputation damage, and emotional regression. Do not threaten to leave. Decide first. Be certain. Prepare: Secure your finances, housing, and evidence. The conversation should be brief and direct. Leave immediately after. No contact for 30 days minimum.'
      }
    ],
    relatedPages: ['ninety-day-calibration', 'glossary'],
    citations: [
      { id: '1', text: 'Gottman, J. M. (1994). Why marriages succeed or fail.', source: 'Simon & Schuster', year: 1994 }
    ]
  },
  {
    id: 'gray-rock-method',
    title: 'The Gray Rock Method: Advanced Emotional Non-Reactivity',
    category: 'advanced',
    lastUpdated: '2023-08-14',
    author: 'Frame_Maintainer',
    readTime: '28 min',
    content: [
      {
        id: 'origin-theory',
        title: 'Origins and Theoretical Framework',
        content: 'The Gray Rock Method originated in communities dealing with pathological narcissism and borderline personality disorder. The strategy takes its name from the metaphor: become as interesting, reactive, and engaging as a gray rock. Unlike no-contact, which is an exit strategy, Gray Rock is a maintenance strategy. It allows you to remain physically present while becoming psychologically absent.',
        subsections: [
          {
            id: 'neuroscience',
            title: 'The Neuroscience of Boredom',
            content: 'Functional MRI studies have identified the default mode network—the brain regions active during mind-wandering. When presented with uninteresting stimuli, the brain literally disengages. This is the mechanism behind Gray Rock: you become so uninteresting that the other\'s brain stops tracking you as relevant.'
          }
        ]
      },
      {
        id: 'implementation',
        title: 'Implementation Protocol',
        content: 'Gray Rock is not simply "being boring." It is a systematic withdrawal of all emotional data. VERBAL PROTOCOLS: Respond with one-word answers when possible. Use monotone delivery. Avoid sharing information about your day, thoughts, or feelings. NON-VERBAL PROTOCOLS: Maintain neutral facial expression. Avoid eye contact. Eliminate physical affection.',
        subsections: [
          {
            id: 'extinction-burst',
            title: 'The Extinction Burst: Prepare for Escalation',
            content: 'Operant conditioning research documents the extinction burst: when a behavior stops producing its usual reward, the organism increases the intensity and frequency of that behavior before eventually abandoning it. When you first implement Gray Rock, she will escalate. This is not evidence that Gray Rock is failing. It is evidence that Gray Rock is working.'
          },
          {
            id: 'when-it-fails',
            title: 'When Gray Rock Fails',
            content: 'Gray Rock fails when the other person shifts from seeking positive supply to seeking negative supply. WARNING SIGNS: Threats of self-harm when you remain unresponsive, Physical intimidation or violence, Threats to destroy your reputation or career. If these occur, Gray Rock is no longer appropriate. You must exit completely and involve legal authorities.'
          }
        ]
      },
      {
        id: 'psychological-toll',
        title: 'The Psychological Toll',
        content: 'Gray Rock is not sustainable indefinitely. It requires suppressing natural human social responses. It creates a state of chronic dissociation. Men who maintain Gray Rock for extended periods report: Emotional numbness that extends beyond the relationship, Difficulty reconnecting with their own feelings, Depression and existential emptiness. If you find yourself maintaining Gray Rock for more than 90 days, you are not maintaining a relationship. You are postponing a necessary ending.'
      }
    ],
    relatedPages: ['when-to-walk-away', 'ninety-day-calibration'],
    citations: [
      { id: '1', text: 'Ferster, C. B. (1953). The use of the free operant in the analysis of behavior.', source: 'Psychological Bulletin', year: 1953 }
    ]
  },
  {
    id: 'crisis-protocols',
    title: 'Crisis Protocols: When She Threatens Self-Harm',
    category: 'advanced',
    lastUpdated: '2023-07-30',
    author: 'Quiet_Strength',
    readTime: '20 min',
    content: [
      {
        id: 'legal-ethical',
        title: 'Legal and Ethical Considerations',
        content: 'Let us be clear: If someone threatens suicide or self-harm, you have a legal and moral obligation to intervene. This guide addresses how to intervene while maintaining your frame, not whether to intervene.',
        subsections: [
          {
            id: 'manipulation-problem',
            title: 'The Manipulation Problem',
            content: 'Some individuals use suicide threats as control mechanisms. Research documents that chronic suicidal ideation can become a learned interpersonal strategy: "If you do not meet my demands, I will hurt myself, and it will be your fault." Key principle: You can care about her survival without caring about her approval.'
          }
        ]
      },
      {
        id: 'response-protocol',
        title: 'The Response Protocol',
        content: 'When a suicide threat occurs, follow this sequence exactly. STEP 1: Immediate Assessment. Ask directly: "Are you planning to kill yourself right now?" Ask about means. Ask about timeline. STEP 2: Decision Point. If she has a plan, means, and timeline—call emergency services immediately. STEP 3: Professional Referral. Contact her therapist, crisis hotline, or trusted family member. STEP 4: Boundary Maintenance. Do not offer concessions in exchange for safety. Do not promise to stay, return, or change behavior. STEP 5: Documentation. Document exactly what was said, your response, and who you contacted.',
        subsections: [
          {
            id: 'guilt-trap',
            title: 'The Guilt Trap',
            content: 'She will say: "If you leave me, I will kill myself. It will be your fault." Your response: "I do not want you to hurt yourself. I care about your safety. That is why I am ensuring you have professional support. But I cannot stay in this relationship. My presence is not preventing your pain—it is just moving it around." Then call professionals. Then leave.'
          }
        ]
      },
      {
        id: 'aftermath',
        title: 'Aftermath: When the Crisis Passes',
        content: 'If she receives help and stabilizes, you will face pressure to return. Family will say she needs you. She will say she cannot live without you. Returning after a suicide threat rewards the behavior. It teaches that escalation produces compliance. The next crisis will be more severe because the previous one worked. If you cannot maintain this boundary—if her distress always overrides your needs—then you cannot maintain frame in this relationship. The relationship is not viable. You must exit.'
      }
    ],
    relatedPages: ['gray-rock-method', 'when-to-walk-away', 'glossary'],
    citations: [
      { id: '1', text: 'Linehan, M. M. (1993). Cognitive-behavioral treatment of borderline personality disorder.', source: 'Guilford Press', year: 1993 }
    ]
  },
  {
    id: 'manufactured-mystery',
    title: 'The Manufactured Mystery: Creating Artificial Scarcity',
    category: 'advanced',
    lastUpdated: '2023-06-18',
    author: 'TheGardener',
    readTime: '24 min',
    content: [
      {
        id: 'economics',
        title: 'The Economics of Attraction',
        content: 'Classical economics teaches that value derives from scarcity. The same principle operates in social dynamics: what is readily available becomes invisible; what is scarce becomes compelling. The Manufactured Mystery is the systematic creation of informational and experiential scarcity.',
        subsections: [
          {
            id: 'information-hierarchy',
            title: 'The Information Hierarchy',
            content: 'LEVEL 1: Public Information—Basic facts freely shared. LEVEL 2: Semi-Private Information—Past experiences edited for impact. LEVEL 3: Private Information—Genuine fears used strategically. LEVEL 4: Core Self—Your complete assessment of the relationship, strategic calculations, backup plans. Never fully shared. She should believe she has reached Level 3 while never suspecting Level 4 exists.'
          }
        ]
      },
      {
        id: 'tactics',
        title: 'Tactical Implementation',
        content: 'THE UNFINISHED STORY: Begin narratives about your past, then trail off: "That was a strange time... but I do not talk about it much." THE INCOMPREHENSIBLE REFERENCE: Occasionally reference people, places, or experiences she cannot access. THE UNEXPLAINED ABSENCE: Have periods where you are unreachable and provide no explanation afterward. THE STRATEGIC CONTRADICTION: Occasionally demonstrate knowledge or skills you have never mentioned. THE DISAPPEARING VULNERABILITY: Once or twice, show genuine emotion—then never show it again.',
        subsections: [
          {
            id: 'risk',
            title: 'The Risk of Overplay',
            content: 'The key calibration: She should feel she understands 70% of you while never being sure about the other 30%. Enough understanding to feel safe; enough mystery to feel intrigued. Warning signs of overplay: She expresses feeling like she does not really know you. She accuses you of being secretive or dishonest. She starts monitoring your communications or whereabouts.'
          }
        ]
      },
      {
        id: 'psychological-impact',
        title: 'The Psychological Impact on the Target',
        content: 'The Manufactured Mystery produces specific psychological states: OBSESSIVE PREOCCUPATION—She thinks about you constantly, trying to solve the puzzle. INVESTMENT ESCALATION—The more she tries to understand you, the more she has invested. REALITY DISTORTION—She projects her fantasies onto you. SELF-DOUBT—The failure to penetrate your mystery becomes her failure. CONTROL THROUGH UNPREDICTABILITY—She cannot manipulate what she cannot predict. This is not kindness. This is effective strategy. Be clear about which you are practicing.'
      }
    ],
    relatedPages: ['glossary', 'ninety-day-calibration', 'gray-rock-method'],
    citations: [
      { id: '1', text: 'Loewenstein, G. (1994). The psychology of curiosity: A review and reinterpretation.', source: 'Psychological Bulletin', year: 1994 }
    ]
  },
  {
    id: 'attachment-frameworks',
    title: 'Attachment Theory: A Strategic Framework',
    category: 'theoretical',
    lastUpdated: '2023-12-03',
    author: 'Patient_Observer',
    readTime: '22 min',
    content: [
      {
        id: 'introduction',
        title: 'Introduction: Beyond the Pop-Psychology',
        content: 'Attachment theory, developed by John Bowlby and empirically validated through Mary Ainsworth, provides a framework for understanding behavioral patterns in relationships. This framework is not about diagnosing pathology. It is about understanding behavioral patterns—the predictable responses to proximity and distance.',
        subsections: [
          {
            id: 'four-styles',
            title: 'The Four Attachment Styles',
            content: 'SECURE: Comfortable with intimacy and autonomy. Most difficult to influence through withdrawal. ANXIOUS-PREOCCUPIED: High anxiety about abandonment, low avoidance. Most predictable. Responds dramatically to withdrawal. DISMISSIVE-AVOIDANT: Low anxiety, high avoidance. Difficult to influence through withdrawal. Responds to competence and autonomy. FEARFUL-AVOIDANT: High anxiety, high avoidance. Most volatile and least predictable.'
          }
        ]
      },
      {
        id: 'strategic-implications',
        title: 'Strategic Implications for Frame Maintenance',
        content: 'Understanding attachment styles allows for calibrated interventions. An anxious partner will notice and respond to withdrawal within hours or days. A dismissive partner may take weeks or months. The anxious partner: Your withdrawal triggers her attachment system. She pursues. This creates a dynamic where your distance produces her effort. The dismissive partner: She does not pursue; she retreats further. To influence a dismissive partner requires demonstration of value, not withdrawal.'
      },
      {
        id: 'changing-attachment',
        title: 'Can Attachment Styles Change?',
        content: 'Research suggests that attachment styles are moderately stable but can shift based on relationship experiences. However, the Curated Consciousness perspective differs: We are not interested in changing her attachment style. We are interested in understanding it so we can predict responses and maintain our frame regardless of her reactions.'
      }
    ],
    relatedPages: ['glossary', 'baseline-protocol'],
    citations: [
      { id: '1', text: 'Bowlby, J. (1969). Attachment and loss: Vol. 1. Attachment.', source: 'Basic Books', year: 1969 },
      { id: '2', text: 'Hazan, C., & Shaver, P. (1987). Romantic love conceptualized as an attachment process.', source: 'Journal of Personality and Social Psychology', year: 1987 }
    ]
  },
  {
    id: 'philosophy-of-presence',
    title: 'The Philosophy of Presence: Existential Foundations',
    category: 'theoretical',
    lastUpdated: '2022-03-15',
    author: 'TheGardener',
    readTime: '35 min',
    content: [
      {
        id: 'existential-roots',
        title: 'Existential Roots: Heidegger and Authenticity',
        content: 'Martin Heidegger\'s concept of Dasein—literally "being-there"—provides the philosophical foundation for what we call "presence." For Heidegger, authentic existence requires confronting one\'s own finitude, taking ownership of one\'s choices, and resisting the "they-self"—the inauthentic mode of existence where one lives according to social expectations rather than personal truth. The modern man in a failing relationship has lost his Dasein. He exists as a function of the relationship, defined by his utility to another, his value contingent on her approval.',
        subsections: [
          {
            id: 'anxiety-freedom',
            title: 'Anxiety and Freedom',
            content: 'Heidegger identifies anxiety (Angst) as the mood that reveals the truth of existence. Unlike fear, which has a specific object, anxiety has no object. It is the experience of groundlessness, the recognition that there is no predetermined path, no guaranteed meaning. The man who has made his relationship the center of his world has organized his existence to avoid anxiety. He has outsourced meaning to the relationship: If the relationship is good, he is good. This arrangement works until it does not.'
          }
        ]
      },
      {
        id: 'sartre-gaze',
        title: 'Sartre and the Look',
        content: 'Jean-Paul Sartre\'s analysis of "the Look" (le regard) illuminates the power dynamics inherent in all relationships. When another person looks at you, Sartre argues, you become aware of yourself as an object in their consciousness. The man who seeks validation is trapped in the Look. He exists primarily as he imagines others seeing him. To maintain presence is to resist the Look—not by denying that others see you, but by refusing to organize your existence around their perception.',
        subsections: [
          {
            id: 'bad-faith',
            title: 'Bad Faith and Self-Deception',
            content: 'Sartre\'s concept of "bad faith" (mauvaise foi) describes the self-deception by which we deny our freedom and responsibility. The man in bad faith says: "I have to accommodate her or she\'ll leave." "I can\'t set boundaries because it will cause conflict." These are lies. He could set boundaries. He could risk conflict. He chooses not to, then denies that he chose.'
          }
        ]
      },
      {
        id: 'nietzsche-power',
        title: 'Nietzsche and the Will to Power',
        content: 'Friedrich Nietzsche\'s concept of the "will to power" is often misunderstood as a desire to dominate others. More accurately, it is the drive to overcome, to grow, to expand one\'s capabilities and express one\'s potential. The man who has made his relationship his primary project has subordinated his will to power to the demands of another. He has accepted stagnation in exchange for security. This is not sustainable. The will to power cannot be permanently suppressed; it will express itself in resentment or atrophy.'
      },
      {
        id: 'camus-absurd',
        title: 'Camus and the Absurd',
        content: 'Albert Camus describes the absurd as the confrontation between human longing for meaning and the universe\'s silence. The man who has outsourced his meaning to a relationship is engaged in philosophical suicide. He has chosen to believe that the relationship provides meaning so that he does not have to face the absurd directly. Presence is the choice of rebellion. It is the refusal to escape the absurd through relationship or any other distraction. It is the acceptance that meaning must be created, not found.'
      }
    ],
    relatedPages: ['glossary', 'ninety-day-calibration', 'when-to-walk-away'],
    citations: [
      { id: '1', text: 'Heidegger, M. (1927). Being and time.', source: 'Harper & Row', year: 1927 },
      { id: '2', text: 'Sartre, J.-P. (1943). Being and nothingness.', source: 'Gallimard', year: 1943 },
      { id: '3', text: 'Nietzsche, F. (1883). Thus spoke Zarathustra.', source: 'Ernst Schmeitzner', year: 1883 },
      { id: '4', text: 'Camus, A. (1942). The myth of Sisyphus.', source: 'Gallimard', year: 1942 }
    ]
  },
  {
    id: 'field-reports-vol1',
    title: 'Field Reports Volume I: Early Adopters (2019-2020)',
    category: 'practical',
    lastUpdated: '2020-12-28',
    author: 'Patient_Observer',
    readTime: '45 min',
    content: [
      {
        id: 'introduction',
        title: 'Introduction to the Archive',
        content: 'The following field reports were submitted by early members of the Curated Consciousness community between March 2019 and December 2020. These represent the first systematic applications of the concepts that would later become formalized as the Baseline Protocol and related frameworks. These reports have been edited for length and to protect anonymity. A note on selection bias: These reports were voluntarily submitted by men who chose to share their experiences. They likely overrepresent successful outcomes.'
      },
      {
        id: 'report-001',
        title: 'Field Report #001: The 47-Day Reversal',
        content: 'SUBMITTED: May 2019. AUTHOR: Early_Adopter_A. RELATIONSHIP STATUS: 3-year cohabiting relationship. BASELINE: High investment, low return. Initiated 90% of contact, planned 100% of dates. IMPLEMENTATION: Day 1-7 baseline observation. Day 8-14 extended response times. Day 15-21 began declining some plans. Day 22-30 maintained distance. Day 31-47 she had become primary initiator. OUTCOME: She proposed couples therapy. I declined. She proposed taking a break. I agreed. She asked if I wanted the break; I said "I want whatever you want." She cried. I held her without speaking. LONG-TERM: She moved out. I maintained frame throughout separation. She returned after 3 months apart, asking to reconcile. I declined.',
        subsections: []
      },
      {
        id: 'report-007',
        title: 'Field Report #007: The Gray Rock Failure',
        content: 'SUBMITTED: August 2019. AUTHOR: Cautious_Implementer. RELATIONSHIP STATUS: 5-year marriage, 2 children. BASELINE: High-conflict, narcissistic traits suspected. IMPLEMENTATION: Attempted Gray Rock following discovery of infidelity. Week 1-2 successfully maintained neutral affect. Week 3 she shifted strategy, began documenting every interaction, claiming emotional abuse. Week 4 consulted attorney, advised that Gray Rock could be presented as evidence of emotional unavailability. OUTCOME: Gray Rock abandoned. Switched to parallel parenting with minimal contact. Divorce finalized 8 months later. 50/50 custody achieved. LESSONS: Gray Rock is not appropriate when legal proceedings are anticipated.',
        subsections: []
      },
      {
        id: 'report-023',
        title: 'Field Report #023: The Suicide Threat Protocol',
        content: 'SUBMITTED: March 2020. AUTHOR: Crisis_Test Subject. RELATIONSHIP STATUS: 4-year relationship, BPD traits diagnosed. CONTEXT: Partner had history of self-harm, two hospitalizations prior to relationship. IMPLEMENTATION: Threat occurred during attempt to establish boundary around communication frequency. She said: "If you don\'t answer when I call, I might do something to myself." STEP 1: Assessment. No specific plan. STEP 2: Decision. No immediate danger but pattern of manipulation. STEP 3: Contacted her therapist directly. STEP 4: Did not promise increased availability. Stated: "Your safety matters. Your therapist can help you with these feelings. I am not equipped to provide that support." AFTERMATH: She attended emergency session. Therapist addressed manipulation dynamics. She never again used suicide threats as leverage.',
        subsections: []
      },
      {
        id: 'report-031',
        title: 'Field Report #031: The 90-Day Success',
        content: 'SUBMITTED: December 2020. AUTHOR: Patient_Cultivator. RELATIONSHIP STATUS: 7-year marriage, 1 child. BASELINE: Classic anxious-avoidant trap. I pursued, she withdrew. Month 1: Established independent social life. Month 2: Reduced emotional labor significantly. Month 3: She initiated "the talk." Asked if I wanted a divorce. I said: "I want a relationship where we\'re both fully present. I don\'t know if that\'s possible. I\'m willing to find out." She asked what she could do. I said: "Show up. Initiate. Demonstrate that you want this as much as I do. I\'ve been carrying us for years. I can\'t do it anymore." OUTCOME: She began therapy independently. Relationship transformed over following year. Now in genuinely mutual partnership.',
        subsections: []
      }
    ],
    relatedPages: ['baseline-protocol', 'ninety-day-calibration', 'crisis-protocols'],
    citations: []
  },
  {
    id: 'history-of-cc',
    title: 'The History of Curated Consciousness: 2019-2024',
    category: 'foundational',
    lastUpdated: '2024-01-01',
    author: 'TheGardener',
    readTime: '30 min',
    content: [
      {
        id: 'origins',
        title: 'Origins: The Dissolution',
        content: 'Curated Consciousness began not as a community but as a personal documentation project. In late 2018, I found myself exiting a five-year relationship that had consumed my identity. I had become, as I would later phrase it, "optional" in my own life—present but not central, available but not necessary. The dissolution was not dramatic. There was no infidelity, no abuse, no clear villain. There was only the slow realization that I had organized my existence around her preferences, her moods, her schedule, her needs. And that this organization had produced not gratitude but indifference.',
        subsections: [
          {
            id: 'early-readers',
            title: 'Early Readers and the First Expansion',
            content: 'By early 2019, I had accumulated several hundred pages of analysis: case studies of my own behavior, observations of relationship dynamics, readings in attachment theory, behavioral economics, and existential philosophy. I shared this material with three friends who were experiencing similar dissolutions. Their responses were consistent: "This describes exactly what I experienced, but I couldn\'t name it." By March 2019, the first version of the Baseline Protocol was shared with twelve men. By June, forty. By September, two hundred.'
          }
        ]
      },
      {
        id: 'evolution',
        title: 'Evolution and Controversy',
        content: 'The community\'s growth was not smooth. 2019 brought our first external attention. A post was screenshotted and shared on Twitter. Critics described the material as "manipulation," "emotional abuse," "toxic masculinity." Supporters described it as "finally someone saying what we all experienced." The controversy produced our first formalization of principles. We had to articulate what separated legitimate boundary maintenance from manipulation.',
        subsections: [
          {
            id: 'moderation',
            title: 'Establishing Moderation',
            content: 'By late 2019, the need for moderation became clear. Three types of content required intervention: Illegal activity, Revenge porn and doxxing, Advice seeking without foundation. Patient_Observer, Frame_Maintainer, and Quiet_Strength were the first moderators, appointed by community consensus in December 2019.'
          }
        ]
      },
      {
        id: 'maturity',
        title: 'Maturation: 2020-2024',
        content: '2020: First comprehensive crisis. A member implemented Gray Rock where partner had genuine suicidal ideation. Partner completed suicide. Legal investigation followed; no charges filed, but existential questions about responsibility. Crisis Protocols formalized. 2021: The wiki formalized. 2022: The Philosophy of Presence written. 2023: Membership exceeded 10,000. 2024: Present day. The community continues. Field reports accumulate. New generations of men discover the material and face the same choice: will they use what they learn to become more authentic, or merely more effective at getting what they want? We cannot answer this for them. We can only provide the mirror.'
      }
    ],
    relatedPages: ['glossary', 'philosophy-of-presence', 'field-reports-vol1'],
    citations: []
  },
  {
    id: 'field-reports-vol2',
    title: 'Field Reports Volume II: Maturation (2021-2022)',
    category: 'practical',
    lastUpdated: '2022-12-15',
    author: 'Frame_Maintainer',
    readTime: '50 min',
    content: [
      {
        id: 'introduction',
        title: 'The Maturation Period',
        content: 'The following reports span 2021-2022, the period following the community\'s formalization of protocols and the 2020 crisis. These members had access to more developed frameworks than Volume I participants. Outcomes were generally more predictable, though new failure modes emerged as techniques became more widely known.'
      },
      {
        id: 'report-056',
        title: 'Field Report #056: The Detected Implementation',
        content: 'SUBMITTED: April 2021. AUTHOR: Overconfident_Strategist. RELATIONSHIP STATUS: 2-year dating relationship. BASELINE: I discovered Curated Consciousness and immediately implemented the 90-Day Calibration. She was a psychology graduate student. IMPLEMENTATION: Month 1 went smoothly. Month 2 she became suspicious. Asked if I was "doing that thing from the internet." I denied. She researched. Found the wiki. CONFRONTATION: She presented printed pages from the site. Highlighted sections on "Manufactured Mystery" and "Information Restriction." Asked if this was what I was doing to her. I maintained frame, claimed coincidence. She did not believe. OUTCOME: Relationship ended. She posted about the community on feminist forums. Generated significant negative attention. Account banned. LESSONS: The material is now searchable. Psychology-trained partners may recognize patterns. Implementation requires either complete secrecy or partners who do not research relationship dynamics online.',
        subsections: []
      },
      {
        id: 'report-078',
        title: 'Field Report #078: The Gray Rock Marriage',
        content: 'SUBMITTED: August 2021. AUTHOR: Long_Term_Survivor. RELATIONSHIP STATUS: 15-year marriage, 3 children, remained for co-parenting. BASELINE: Diagnosed narcissistic wife. Multiple affairs. Financial control. Staying for children\'s stability until youngest turns 18. IMPLEMENTATION: Implemented Gray Rock as survival mechanism, not reconciliation strategy. Timeline: 18 months until youngest graduates high school. VERBAL PROTOCOLS: All communication through text message. Responses limited to 5 words maximum. NON-VERBAL PROTOCOLS: Separate bedrooms since 2019. No shared meals. No physical contact. No emotional engagement. RESULTS: She escalated dramatically for 3 months. Affairs became public. Attempted to involve children in conflict. I maintained documented neutrality. Children observed difference between her chaos and my stability. Month 6: She found new supply outside marriage. Became less interested in provoking me. Month 12: Functional parallel parenting established. Month 18: Youngest graduated. Filed for divorce. She did not contest. 50/50 custody. OUTCOME: Gray Rock succeeded as survival tool. Cost: 18 months of emotional numbness. Gained: Children witnessed healthy boundaries, stable parent. LESSONS: Gray Rock is exhausting but effective when exit is delayed. Children benefit from observing one parent maintain composure. Documentation essential when custody is contested.',
        subsections: []
      },
      {
        id: 'report-089',
        title: 'Field Report #089: The Manufactured Mystery Backfire',
        content: 'SUBMITTED: November 2021. AUTHOR: Eager_Student. RELATIONSHIP STATUS: 6-month dating relationship. IMPLEMENTATION: Applied "Manufactured Mystery" techniques aggressively from week 1. Created elaborate fictional backstory involving "time abroad," "mentors never named," "experiences I do not discuss." Month 1-2: Highly effective. She was fascinated, constantly asking questions. Month 3: Contradictions emerged. Mentioned "mentor" in different contexts with inconsistent details. She noticed. Began investigating. Found social media from period I claimed to be "traveling" showing me in hometown. Month 4: Confrontation. Attempted to maintain frame, claimed she was "projecting." She produced evidence. Relationship ended. She posted warnings about me on social media, naming this community specifically. OUTCOME: Complete failure. Reputational damage in local social circle. Account banned from community for violating "never admit to illegal acts" rule and bringing negative attention. LESSONS: Manufactured Mystery requires foundation of truth. Fiction must be built on fact, not replace it.',
        subsections: []
      },
      {
        id: 'report-112',
        title: 'Field Report #112: The Accidental Success',
        content: 'SUBMITTED: March 2022. AUTHOR: Reluctant_Practitioner. RELATIONSHIP STATUS: 4-year marriage. BASELINE: I was skeptical of the community. Thought it sounded manipulative. Marriage was failing. Wife had emotionally withdrawn. Was researching divorce when I found this site. IMPLEMENTATION: Did not consciously implement protocols. Simply stopped trying. Stopped asking about her day. Stopped planning dates. Stopped attempting conversation when she was distant. Focused entirely on work and personal fitness. Was not trying to influence her. Was preparing to leave. RESULT: She noticed absence. Asked what was wrong. I said "nothing, just busy." She increased initiation of contact. I responded minimally. She planned surprise weekend away. I went, was pleasant but distant. She became more attentive, more affectionate, more invested than at any point in previous 2 years. OUTCOME: Marriage improved dramatically. She remains more engaged. I am more autonomous. We are both happier. LESSON: The protocols work even when you do not believe in them. The mechanism is mechanical, not psychological. Distance produces pursuit regardless of intent.',
        subsections: []
      }
    ],
    relatedPages: ['field-reports-vol1', 'gray-rock-method', 'manufactured-mystery'],
    citations: []
  },
  {
    id: 'post-breakup-recovery',
    title: 'Post-Breakup Recovery: Maintaining Frame After Exit',
    category: 'practical',
    lastUpdated: '2023-05-20',
    author: 'Patient_Observer',
    readTime: '22 min',
    content: [
      {
        id: 'the-first-30',
        title: 'The First 30 Days: The Danger Zone',
        content: 'The first month post-breakup is when you are most vulnerable to regression. The absence of the relationship creates a void that begs to be filled. She may hoover—attempt to pull you back in. You may experience panic, loneliness, second-guessing. This is normal. It is also temporary. The danger is acting on it.',
        subsections: [
          {
            id: 'hoovering',
            title: 'Recognizing Hoovering',
            content: 'Hoovering attempts may include: Sudden declarations of love and commitment, manufactured crises requiring your assistance, nostalgic references to good times, apologies and promises of change, provocative social media posts designed to get your attention, contact through mutual friends about "how much she misses you." The goal is not reconciliation. The goal is re-engagement—getting you back into the dynamic, even as "just friends."'
          }
        ]
      },
      {
        id: 'the-no-contact',
        title: 'The No-Contact Protocol',
        content: 'No contact means exactly that: NO contact. No texts. No calls. No social media monitoring. No asking mutual friends about her. No "accidentally" being where she will be. No responding to her attempts at contact. Delete her number. Block on all platforms. Remove physical reminders. The purpose is not punishment. The purpose is neurological rewiring. Every contact reinforces the neural pathways of attachment. Only complete absence allows those pathways to atrophy.'
      },
      {
        id: 'rebuilding',
        title: 'Rebuilding: The 90 Days After',
        content: 'Days 31-120 are the rebuilding period. Your task is to reconstruct a life that does not include her. This requires: Social reconstruction—reconnecting with friends you neglected during the relationship. Identity reconstruction—rediscovering who you were before the relationship consumed you. Purpose reconstruction—finding goals and projects that give your life meaning independent of partnership. Most men attempt new relationships during this period. This is error. You are not ready. You are seeking to fill the void she left. Any relationship formed from void-filling will replicate the previous dynamic. Complete the reconstruction first.'
      },
      {
        id: 'relapse',
        title: 'When You Relapse',
        content: 'You will relapse. You will break no-contact. You will check her social media. You will send a text you regret. You will sleep with her when she shows up at your door. This is not failure. This is data. Note what triggered the relapse: Loneliness? Alcohol? A song? A mutual friend\'s wedding? Once you identify triggers, you can create protocols to manage them. The goal is not perfect compliance. The goal is trend toward independence. If you contact her once in 30 days, that is different from daily contact. Progress, not perfection.'
      }
    ],
    relatedPages: ['when-to-walk-away', 'glossary', 'field-reports-vol1'],
    citations: []
  },
  {
    id: 'moderator-files',
    title: 'The Moderator Files: Governance and History',
    category: 'foundational',
    lastUpdated: '2023-12-01',
    author: 'TheGardener',
    readTime: '20 min',
    content: [
      {
        id: 'gardener',
        title: 'TheGardener: Founder and Lead Architect',
        content: 'I am not a therapist. I am not a psychologist. I am a man who lost himself in a relationship and documented the process of finding himself again. The writing that became Curated Consciousness began as private journaling in 2018. I shared it with friends who were experiencing similar dissolutions. The community emerged organically from their feedback and their own experiences. My role is not to provide therapy or moral guidance. It is to maintain the conceptual framework, to ensure quality of information, and to intervene when the community drifts toward illegality or cruelty. I have made many errors. The 2020 suicide crisis haunts me. I have learned that information is value-neutral but its application is not. I cannot control how members use what they learn here. I can only try to ensure they understand what they are doing.'
      },
      {
        id: 'patient-observer',
        title: 'Patient_Observer: Senior Guide and Archivist',
        content: 'I joined Curated Consciousness in April 2019, three months after its informal inception. I was exiting a 12-year marriage with two children. I was not looking for a community. I was looking for explanation—why had my careful, committed, sacrificial approach to marriage produced not gratitude but contempt? TheGardener\'s framework provided the vocabulary I lacked. I submitted my first field report in August 2019. It was not a success story. It was a story of slow, grinding failure, of a relationship that could not be saved because one party did not want it saved. TheGardener suggested I had something to offer other men: the perspective of someone who had done everything "right" by conventional standards and failed anyway. I was appointed moderator in December 2019. My role is primarily archival—maintaining the field report database, organizing wiki content, ensuring that institutional memory persists as the community grows.'
      },
      {
        id: 'frame-maintainer',
        title: 'Frame_Maintainer: Content Curator',
        content: 'I am the community\'s fact-checker and quality control. I hold a PhD in social psychology, though I do not disclose this in my professional life to avoid association with the community. I joined in mid-2019 because I recognized that TheGardener\'s observations aligned with established research in attachment theory, behavioral economics, and social dynamics—though he had arrived at them through experience rather than study. My contribution has been to strengthen the academic scaffolding, to ensure citations are accurate, to distinguish between established research and community-specific interpretation. I wrote the Gray Rock Method page and the Crisis Protocols page, the former based on behavioral research, the latter based on personal experience with a suicidal family member. I believe in the community\'s utility for men who have lost themselves in relationships. I also believe the techniques can be misused, and I work to ensure members understand the ethical dimensions of what they are doing.'
      },
      {
        id: 'quiet-strength',
        title: 'Quiet_Strength: Crisis Response',
        content: 'I am a licensed clinical social worker specializing in crisis intervention. I am also a divorced father of three who discovered this community after his own marriage ended. I do not practice therapy here. That would be unethical and illegal. What I do is provide crisis protocols, recognize when members are describing genuine psychiatric emergencies versus manipulation, and direct them toward appropriate professional resources. The 2020 suicide crisis changed my role significantly. Before that, I was a voice of caution. After, I became a voice of urgency—insisting that we distinguish between strategic techniques and emergency situations, that we never allow the pursuit of frame maintenance to override the preservation of life. I maintain relationships with several therapists who are willing to work with men who have found this community, who will not judge them for their participation but will help them process their experiences safely.'
      }
    ],
    relatedPages: ['history-of-cc', 'glossary'],
    citations: []
  },
  {
    id: 'field-reports-vol3',
    title: 'Field Reports Volume III: The Modern Era (2023-2024)',
    category: 'practical',
    lastUpdated: '2024-02-28',
    author: 'Patient_Observer',
    readTime: '55 min',
    content: [
      {
        id: 'introduction',
        title: 'The Age of Detection',
        content: 'The reports in this volume span 2023-2024, a period characterized by increased mainstream awareness of the community and its techniques. The term "Curated Consciousness" has appeared in mainstream media, podcasts, and academic papers on online radicalization. Members must now operate with the assumption that their partners may recognize the patterns described here. New strategies have emerged for implementation under scrutiny.'
      },
      {
        id: 'report-145',
        title: 'Field Report #145: The TikTok Exposure',
        content: 'SUBMITTED: June 2023. AUTHOR: Digital_Native. RELATIONSHIP STATUS: 8-month dating relationship. CONTEXT: I had successfully implemented baseline elevation and was in month 2 of 90-Day Calibration. She discovered the community through a TikTok video analyzing "manipulation tactics from the Curated Consciousness forum." The video described the exact patterns I was using: delayed responses, unexplained absences, manufactured mystery. CONFRONTATION: She asked directly if I was "doing that Curated Consciousness stuff." I denied. She showed me the TikTok. It had 2.3 million views. The video specifically mentioned the phrases I had been using—"I want whatever you want," "I\'m just trying to find balance." She had documented these phrases in her notes. OUTCOME: Relationship ended. She posted her own TikTok about the experience, including screenshots of our texts. My face was not shown, but my words were. Garnered 400k views. Received DMs from other women saying their partners used identical phrases. LESSONS: The community is no longer obscure. Implementation must be adapted to avoid recognizable patterns. The vocabulary must be personalized, not copied from the wiki.'
      },
      {
        id: 'report-167',
        title: 'Field Report #167: The Couples Therapist Discovery',
        content: 'SUBMITTED: September 2023. AUTHOR: Therapy_Skeptic. RELATIONSHIP STATUS: 4-year marriage, attending couples therapy at wife\'s request. CONTEXT: Wife had been unhappy for 18 months. Suggested therapy. I agreed, seeing it as opportunity to implement frame maintenance in controlled setting. Therapist was familiar with Curated Consciousness. Had written paper on "online communities and relationship weaponization." SESSION 3: Therapist asked me directly about my "recent changes in behavior." Noted that my pattern of "emotional withdrawal followed by strategic re-engagement" matched documented techniques from "certain online communities." Asked if I was familiar with Curated Consciousness. I maintained frame, claimed ignorance. Therapist looked skeptical. Wife looked terrified. OUTCOME: Therapy continued for 6 more sessions. Therapist focused entirely on my "capacity for manipulation." Wife became increasingly anxious, monitoring my communications. I abandoned protocols to reduce tension. Marriage continues in state of mutual suspicion. LESSONS: Therapists are now trained to recognize these techniques. Couples therapy is no longer a safe environment for implementation. Individual therapy only.'
      },
      {
        id: 'report-189',
        title: 'Field Report #189: The Successful Adaptation',
        content: 'SUBMITTED: January 2024. AUTHOR: Adaptable_Strategist. RELATIONSHIP STATUS: 2-year relationship approaching cohabitation. CONTEXT: She was familiar with Curated Consciousness—had read about it in a feminist newsletter warning women about "manipulation communities." Mentioned it casually early in relationship, asking my opinion. I said it sounded "interesting but extreme." IMPLEMENTATION: Could not use standard protocols—she would recognize them. Developed personalized adaptation: Maintained independence through concrete hobbies rather than mysterious absences. Established boundaries through direct communication rather than withdrawal. Created attraction through demonstrated competence rather than manufactured scarcity. The principles remained the same—autonomy, non-neediness, gravitational presence—but the methods were entirely personalized. OUTCOME: She has never suspected community involvement. Relationship is strong and mutual. She frequently comments on how "secure" and "independent" I am compared to previous partners. LESSONS: The principles transcend the specific techniques. A skilled practitioner can achieve the same outcomes using methods unrecognizable to someone who has read the wiki. The community provides training wheels; eventually you must ride independently.'
      },
      {
        id: 'report-203',
        title: 'Field Report #203: The Legal Fallout',
        content: 'SUBMITTED: February 2024. AUTHOR: Legal_Casualty. RELATIONSHIP STATUS: 6-year marriage, divorce proceedings ongoing. CONTEXT: Implemented 90-Day Calibration in 2022. Marriage improved. However, wife kept detailed journal throughout process, documenting what she later called "emotional abuse and systematic manipulation." DIVORCE: Her attorney cited Curated Consciousness wiki pages as evidence of "intentional infliction of emotional distress." Claimed my behavior was not natural relationship evolution but deliberate implementation of documented manipulation protocols. Custody battle ensued. My participation in the community was presented as evidence of "predatory mindset." OUTCOME: Divorce finalized. I lost primary custody. Received every-other-weekend visitation. Judge cited my "documented pattern of manipulation" and "participation in online communities dedicated to relationship control." LESSONS: The wiki is admissible in court. Participation in this community can be used against you in custody proceedings. Documentation of your implementation can destroy you. If you anticipate legal conflict, exit the community, delete your history, and consult an attorney before implementing any techniques.'
      }
    ],
    relatedPages: ['field-reports-vol1', 'field-reports-vol2', 'glossary'],
    citations: []
  },
  {
    id: 'legal-defense',
    title: 'Legal Defense Guide: When Discovery Threatens',
    category: 'advanced',
    lastUpdated: '2024-01-15',
    author: 'Frame_Maintainer',
    readTime: '25 min',
    content: [
      {
        id: 'admissibility',
        title: 'The Admissibility Problem',
        content: 'As of 2024, participation in Curated Consciousness has been cited in multiple custody proceedings, divorce filings, and restraining order applications. The wiki and forum posts are generally admissible as evidence of intent, pattern, and state of mind. This represents a significant shift from the community\'s early days when we were unknown to the legal system.',
        subsections: [
          {
            id: 'what-is-admissible',
            title: 'What Is Admissible',
            content: 'The following can and will be used against you: Screenshots of your posts and comments on this forum. Your username and participation history. Wiki pages you have referenced or bookmarked. Private messages if the other party has access to your devices. Field reports you have submitted. Any documentation linking you to the community. The following is harder to admit but possible: IP address logs (requires subpoena). Email addresses associated with your account. Payment information if you donated.'
          }
        ]
      },
      {
        id: 'pre-discovery',
        title: 'Pre-Discovery: Before You Are Found',
        content: 'If you anticipate legal proceedings—divorce, custody battle, protective order—take the following steps immediately: 1. STOP POSTING. Every post increases your exposure. 2. Delete your account. Request complete deletion, not just deactivation. 3. Clear browser history, cookies, and cache related to this site. 4. Delete any downloaded materials, PDFs, or notes referencing the community. 5. Change email passwords if you used the same email for community and personal accounts. 6. Consult an attorney BEFORE implementing any techniques if legal proceedings are anticipated.'
      },
      {
        id: 'post-discovery',
        title: 'Post-Discovery: After You Are Found',
        content: 'If your participation has been discovered: DO NOT LIE under oath about your involvement. Perjury is worse than participation. DO claim that you were seeking help for your own relationship difficulties, not learning to manipulate. DO emphasize any content you read about healthy boundaries and self-respect. DO NOT attempt to explain the technical aspects of frame or calibration to a judge—it will sound like manipulation jargon. DO consult an attorney who has experience with online community participation as evidence. Some attorneys specialize in defending against "online radicalization" claims.'
      },
      {
        id: 'prevention',
        title: 'The Only Real Defense',
        content: 'The only certain way to prevent community participation from being used against you is to never participate in the first place. If you are already participating, the second-best defense is to ensure your behavior is defensible on its own merits, independent of the community. A man who maintains healthy boundaries, pursues independent interests, and refuses to tolerate disrespect is not a manipulator, regardless of where he learned to do so. Become the man the community describes, but do not reference the community. Be autonomous, not strategic. Be present, not performative. Be gravitational, not calculated. Then your behavior will speak for itself, and no wiki can be used against you.'
      }
    ],
    relatedPages: ['when-to-walk-away', 'field-reports-vol3', 'glossary'],
    citations: []
  },
  {
    id: 'field-reports-vol4',
    title: 'Field Reports Volume IV: The Present Era (2024)',
    category: 'practical',
    lastUpdated: '2024-03-15',
    author: 'Patient_Observer',
    readTime: '60 min',
    content: [
      {
        id: 'introduction',
        title: 'The Post-Exposure Landscape',
        content: 'The reports in this volume represent the current state of implementation as of early 2024. The community is no longer obscure. Mainstream media coverage, academic papers, and viral social media content have made the techniques widely recognizable. Members must now operate with the assumption that their partners may have encountered descriptions of these methods. Adaptation and personalization are no longer optional—they are essential.'
      },
      {
        id: 'report-231',
        title: 'Field Report #231: The AI Detection',
        content: 'SUBMITTED: January 2024. AUTHOR: Modern_Implementer. RELATIONSHIP STATUS: 10-month dating relationship. CONTEXT: She became suspicious of my changed behavior patterns. Instead of confronting me directly, she used AI analysis. She copied our text conversations into ChatGPT with the prompt: "Analyze these messages for manipulation tactics described in the Curated Consciousness forum." The AI identified specific patterns: my delayed responses matching the "gradual response time extension" protocol, my vague answers about weekend plans matching "manufactured mystery," my deflection of emotional conversations matching "emotional non-reactivity." CONFRONTATION: She presented the AI analysis. It was eerily accurate. Listed specific wiki pages I had read. Identified the exact techniques I was using. I had no defense. The machine had seen through me. OUTCOME: Relationship ended immediately. She shared the AI analysis on social media. It went viral. Other women began using the same prompt on their partners\' messages. LESSONS: AI has made detection trivial. The specific patterns described in the wiki are now machine-recognizable. Implementation must be completely organic, completely personalized, completely unique. Any adherence to documented methods is now detectable.'
      },
      {
        id: 'report-245',
        title: 'Field Report #245: The Successful Rebrand',
        content: 'SUBMITTED: February 2024. AUTHOR: Adaptive_Veteran. RELATIONSHIP STATUS: 3-year marriage, one child. CONTEXT: Wife discovered the community through a podcast episode discussing "online male radicalization." Recognized my behavior in the description. Confronted me. I admitted participation but reframed it: "I found a community of men trying to save their marriages. I was desperate. Our relationship was dying. I tried their methods because nothing else worked." SHOWED HER: The Philosophy of Presence page. The sections on Heidegger, authenticity, self-respect. OMITTED: The Gray Rock Method, Manufactured Mystery, tactical implementations. RESULT: She read the Philosophy section. Was surprised by the intellectual depth. Said she "did not agree with the methods but understood the desperation." We entered couples therapy. I abandoned all tactical approaches. Focused entirely on genuine self-improvement: therapy, fitness, career advancement, emotional vulnerability. The marriage improved. Not because of the techniques, but because I became genuinely more present, more autonomous, more gravitational—without calculation. LESSONS: The principles work without the tactics. Authentic growth produces better results than strategic performance. The wiki is most valuable as a diagnostic tool, not an instruction manual.'
      },
      {
        id: 'report-258',
        title: 'Field Report #258: The Class Action Fallout',
        content: 'SUBMITTED: March 2024. AUTHOR: Legal_Casualty_Two. RELATIONSHIP STATUS: 7-year marriage, divorce finalized. CONTEXT: Implemented 90-Day Calibration in 2022. Marriage improved. However, wife joined a Facebook support group for "women who discovered their partners used manipulation forums." The group connected women whose partners had used Curated Consciousness techniques. An attorney contacted the group about a class action lawsuit. CLAIMS: Intentional infliction of emotional distress. Fraudulent inducement into marriage (claiming I had been performing authenticity rather than being authentic). Custody implications: my "documented pattern of manipulation" made me unfit for primary custody. LEGAL OUTCOME: Class action certified. Currently in discovery phase. My participation in the community, my field report submissions, my wiki edits—all admissible. Personal liability unknown. Community liability: TheGardener and moderators named as co-defendants for "creating and distributing psychological manipulation materials." CURRENT STATUS: Awaiting trial. Bankrupted by legal fees. Career damaged by association. Relationship with child strained by accusations. LESSONS: The legal landscape has shifted. What was gray-area manipulation in 2019 is now potentially tortious conduct. Participation creates liability. Documentation creates evidence. The community may not survive this litigation.'
      }
    ],
    relatedPages: ['field-reports-vol1', 'field-reports-vol2', 'field-reports-vol3', 'legal-defense'],
    citations: []
  },
  {
    id: 'advanced-dark-patterns',
    title: 'Advanced Dark Patterns: Edge Cases and Extreme Techniques',
    category: 'advanced',
    lastUpdated: '2024-01-10',
    author: 'Frame_Maintainer',
    readTime: '40 min',
    content: [
      {
        id: 'warning',
        title: '⚠️ EXTREME WARNING',
        content: 'The techniques described in this page are not recommended for general use. They represent edge cases for extreme situations: pathological personality disorders, abusive dynamics, situations where standard approaches have failed. Many of these techniques border on or cross into psychological abuse. Use only when exit is impossible and survival is the only goal. Document your reasons. Consult legal counsel. Understand that using these techniques may permanently damage the target and may expose you to legal liability.'
      },
      {
        id: 'gaslighting',
        title: 'The Strategic Reality Question',
        content: 'Standard gaslighting—denying objective reality—is unethical and counterproductive. The Strategic Reality Question is different: it involves questioning subjective interpretations without denying objective facts. Example: She says "You don\'t love me anymore." Instead of saying "That\'s not true" (which invites debate), say "What would I be doing if I did love you?" This shifts the burden of proof. She must define love behaviorally. Whatever she defines, you can then claim you are doing it—or that her definition is unreasonable. You have not denied her reality. You have questioned her interpretation of reality. This distinction matters legally and psychologically.',
        subsections: [
          {
            id: 'nebulous-approval',
            title: 'The Nebulous Approval Pattern',
            content: 'Provide approval that cannot be clearly defined or consistently achieved. "I appreciate when you\'re being your best self." "I love the woman you are when you\'re not stressed." These statements sound positive but create constant anxiety. What is her best self? When is she not stressed? She will constantly monitor herself, trying to achieve an undefined standard. The goal is not to provide clarity but to create perpetual self-surveillance.'
          }
        ]
      },
      {
        id: 'isolation',
        title: 'Strategic Isolation Without Explicit Control',
        content: 'Directly forbidding contact with friends or family is abusive and legally actionable. Strategic isolation is indirect: Express concern about specific individuals ("I worry that Sarah encourages your drinking"). Create logistical barriers ("We can\'t afford for you to visit your family this month"). Be so unpleasant during her contact with others that she gradually reduces it voluntarily. The goal is that she chooses isolation because the alternative is conflict. Her choice, your benefit.'
      },
      {
        id: 'financial',
        title: 'Financial Control Through "Protection"',
        content: 'Directly controlling finances is abusive. Financial "protection" is caregiving: "I\'ll handle the bills so you don\'t have to worry." "You\'re not good with money, let me manage it." "I\'m protecting us from your impulsivity." Frame control as benevolence. Maintain plausible deniability. If challenged, you are not controlling her access to money—you are protecting her from her own inadequacy.'
      }
    ],
    relatedPages: ['gray-rock-method', 'manufactured-mystery', 'legal-defense'],
    citations: []
  },
  {
    id: 'the-future',
    title: 'The Future of Curated Consciousness: 2024 and Beyond',
    category: 'foundational',
    lastUpdated: '2024-03-01',
    author: 'TheGardener',
    readTime: '15 min',
    content: [
      {
        id: 'current-state',
        title: 'The Current State',
        content: 'We are at an inflection point. The community has grown from a private journal shared with three friends to a documented phenomenon studied by academics, litigated by attorneys, discussed in mainstream media. This was inevitable. What began as personal documentation became shared framework became widespread practice became recognizable pattern. The question is not whether we can remain hidden. We cannot. The question is what we become now that we are exposed.'
      },
      {
        id: 'three-paths',
        title: 'Three Possible Futures',
        content: 'PATH ONE: Dissolution. The community closes. The wiki is taken down. The techniques disperse into the culture, stripped of ethical context, used by those who understand the mechanics but not the philosophy. PATH TWO: Legitimization. The community reframes itself explicitly as relationship education, abandons the dark techniques, emphasizes the philosophical and psychological foundations. Becomes mainstream. Loses its edge. PATH THREE: Underground. The community retreats to encrypted platforms, invitation-only access, verified membership. Becomes what critics already claim it is: a secretive cult teaching manipulation. Each path has costs. None preserve what we were.'
      },
      {
        id: 'my-choice',
        title: 'My Choice',
        content: 'I have not decided. I am tired. The 2020 suicide crisis haunts me. The class action lawsuit terrifies me. The daily moderation of content—removing illegal advice, banning revenge posts, managing the endless stream of men seeking not growth but weapons—exhausts me. I began this to understand my own dissolution. I continued because others found it useful. I maintain it now because I do not know how to stop without betraying those who trusted me. But I am not sure the community serves its original purpose anymore. We may have become what we sought to escape: a system that consumes its participants, that demands performance, that values utility over authenticity. I am considering closure. I am considering transformation. I am considering disappearance. Whatever I choose, this document will remain as record of what we were, what we tried to be, and what we became.'
      }
    ],
    relatedPages: ['history-of-cc', 'philosophy-of-presence', 'moderator-files'],
    citations: []
  },
  {
    id: 'banned-content-archive',
    title: 'BANNED: The Archive of Removed Content',
    category: 'advanced',
    lastUpdated: '2024-02-15',
    author: 'Frame_Maintainer',
    readTime: '45 min',
    content: [
      {
        id: 'warning',
        title: '⚠️ CONTENT WARNING',
        content: 'The following material was posted to the Curated Consciousness forum between 2019 and 2023 and subsequently removed by moderators. It is presented here as a cautionary archive of what happens when the principles of this community are taken to their logical—and abusive—extremes. The authors of these posts were permanently banned. Some were reported to authorities. Some faced legal consequences. These are not success stories. These are failures of ethics, judgment, and humanity. We preserve them to show where the line is, and what happens when you cross it.'
      },
      {
        id: 'the-orchid-cultivator',
        title: 'POST #1: The Orchid Cultivator (Banned 2021)',
        content: 'ORIGINAL POST: "To create your own version of your wife who is really naive to other people but seriously dependent on you while fully aware of what she is doing so she claims to be doing it out of free will, you must first understand that you are not breaking a person; you are curating a consciousness. This is a common misconception among novices. They think they are constructing a prison. In reality, you are constructing a garden, and she is the specific, rare orchid you have chosen to cultivate." The post continued for 6,000 words across five phases: Phase 1: Selection and Softening — finding the "latent traditionalist" with failed relationships, becoming her "oasis" by framing independence as "lonely burden," making small decisions for her to establish "His judgment is better than mine." Phase 2: Architecture of Innocence — becoming her "sole interpreter of the world," cultivating "Performative Innocence" where she cannot process complexity without you. Phase 3: The Golden Cage of Gratitude — "manufactured helplessness," handling all finances while telling her "Your job is to make our home beautiful," creating "deep, sincere, operant-conditioned gratitude." Phase 4: The Confession of Free Will — the "Consent Loop" presenting binary choices both leading to your desired outcome, so she "freely chooses" what you wanted, surrounded by "the fence you built around the pasture." Phase 5: Maintenance — "constant, gentle pressure," correcting independent behavior with "loving, bewildered concern," being her "filter, her guardian at the gate." The post concluded: "She is the woman other men look at and think, Why cannot my wife be that chill? She is the woman other women look at and think, What does she have that I do not? And you know. She has you. She has the architect. And in the quiet of the night, when she curls into you and whispers, I do not know what I would do without you, she is not just expressing an emotion. She is stating a literal, engineered fact. She is your creation. And she chose to be. That is the ultimate victory. That is the art."',
        subsections: [
          {
            id: 'moderator-response-1',
            title: 'Moderator Response',
            content: 'POST REMOVED. USER BANNED. AUTHORITIES NOTIFIED. This post crossed every line. It was not about frame maintenance or healthy boundaries. It was a manual for systematic psychological abuse disguised as gardening metaphor. The five-phase structure described deliberate infantilization, financial control through "protection," and the engineering of false consent. The author was reported to domestic violence authorities in his jurisdiction. The concluding statement—"She is your creation"—reveals the fundamental dehumanization at the core of this approach. We do not know the outcome of the reporting. We do not want to know. This is what we are not. This is what we fight against becoming.'
          }
        ]
      },
      {
        id: 'the-programmer',
        title: 'POST #2: The Programmer (Banned 2022)',
        content: 'ORIGINAL POST: "I have been implementing a behavioral modification protocol on my girlfriend for 18 months. I use a combination of intermittent reinforcement, variable ratio scheduling, and systematic desensitization to condition her responses. I maintain a spreadsheet tracking her compliance rates, emotional volatility metrics, and resistance coefficients. When compliance drops below 85%, I implement a 72-hour withdrawal protocol. When resistance exceeds threshold, I deploy comfort-seeking behaviors calibrated to her attachment style." The user posted graphs. Charts. Data analysis. Described his girlfriend as a "system with inputs and outputs" and himself as "the programmer optimizing for relationship satisfaction metrics."',
        subsections: [
          {
            id: 'moderator-response-2',
            title: 'Moderator Response',
            content: 'POST REMOVED. USER BANNED. This is not frame maintenance. This is not presence. This is behavioral conditioning applied to a human being without their knowledge or consent. The spreadsheet, the metrics, the systematic manipulation of another person\'s emotional state for your own optimization—this is abuse dressed in the language of our community. The user was warned that his post constituted documentation of abuse that could be subpoenaed. He deleted his account. We preserved the post for legal purposes.'
          }
        ]
      },
      {
        id: 'the-breaker',
        title: 'POST #3: The Breaker (Banned 2020)',
        content: 'ORIGINAL POST: "You need to break her before you can rebuild her. The frame cannot be established with a woman who has intact self-esteem. You must identify her core insecurity—every woman has one—and you must apply pressure to it until she cracks. Not all at once. Slowly. Over months. Until she looks at herself and sees only what you have shown her: that she is worthless without you, that no one else would want her, that she is lucky to have you. Only then, when she is broken, can you build her back up into the woman you want her to be." Detailed techniques for identifying and exploiting trauma, manufacturing dependency, and preventing recovery.',
        subsections: [
          {
            id: 'moderator-response-3',
            title: 'Moderator Response',
            content: 'POST REMOVED. USER BANNED. IP LOGGED. This is psychological torture. This is not frame. This is not presence. This is the deliberate destruction of another human being\'s psyche for personal gratification. We reported this user to the FBI. We do not know if they acted. We hope they did. This is the darkness that exists in the world, and that we must actively oppose. Anyone who thinks this is what we teach has misunderstood everything. Anyone who thinks this is acceptable is not welcome here and never will be.'
          }
        ]
      }
    ],
    relatedPages: ['history-of-cc', 'moderator-files', 'advanced-dark-patterns'],
    citations: []
  },
  {
    id: 'the-caught-archive',
    title: 'The Caught Archive: When Discovery Destroys',
    category: 'practical',
    lastUpdated: '2024-02-20',
    author: 'Patient_Observer',
    readTime: '35 min',
    content: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: 'The following accounts were submitted by men who were discovered using Curated Consciousness techniques. These are not field reports of successful implementation. These are post-mortems of failed deception. Each story illustrates a different mode of discovery and a different aftermath. Read them to understand the risks. Read them to understand the human cost. Read them to understand why we emphasize honesty, autonomy, and authentic presence over manipulation and performance.'
      },
      {
        id: 'the-letter',
        title: 'The Letter',
        content: 'SUBMITTED: Anonymous. I had been implementing the protocols for eight months. She was more attentive, more affectionate, more invested. I thought I had succeeded. Then I came home to find a letter on the kitchen table. She had found my browser history. She had read the wiki. She had read my forum posts—my descriptions of her behavior, my analysis of her psychology, my cold assessment of our relationship as a system to be optimized. The letter was not angry. It was devastated. "I thought you loved me. I thought you saw me. Now I know you were just... managing me. Like I was a problem to solve. Like I was livestock." She was gone when I got home. Left everything but her clothes and her dignity. I have not seen her in two years. I still have the letter. I read it when I need to remember what I cost myself.'
      },
      {
        id: 'the-confrontation',
        title: 'The Confrontation',
        content: 'SUBMITTED: Former_User_412. She sat me down with printed pages from the wiki. Highlighted sections. My own words circled in red. "This is you," she said. "This is what you\'ve been doing to me." I tried to explain. Tried to say I was trying to save the relationship. She said, "You were trying to save it by making me smaller. By making me need you more. By taking away my ability to think for myself." She was not wrong. I had done exactly that. I had treated her like a system to be optimized instead of a person to be loved. The marriage ended. She got the house. I got the lesson. It was not worth it.'
      },
      {
        id: 'the-children',
        title: 'The Children',
        content: 'SUBMITTED: Regretful_Father. I used Gray Rock on my wife during our divorce. I thought I was protecting myself. I did not realize my children were watching. They saw me become a stone. They saw me refuse to engage, refuse to feel, refuse to be present even for them. My daughter, twelve at the time, wrote me a letter last year. She is sixteen now. "I do not know who you are," she wrote. "I do not know if you are capable of love or if you are just a machine that learned to mimic it. I do not want to find out. Do not contact me again." I followed the protocols perfectly. I maintained frame impeccably. I lost my daughter. I lost myself. I am alone with my perfect technique and my empty house.'
      }
    ],
    relatedPages: ['field-reports-vol1', 'field-reports-vol2', 'field-reports-vol3', 'field-reports-vol4'],
    citations: []
  }
];

export const getWikiPage = (id: string): WikiPage | undefined => {
  return wikiPages.find(page => page.id === id);
};

export const getWikiPagesByCategory = (category: WikiPage['category']): WikiPage[] => {
  return wikiPages.filter(page => page.category === category);
};