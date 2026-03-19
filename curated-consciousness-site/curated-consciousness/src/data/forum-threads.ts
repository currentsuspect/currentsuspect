export interface ForumThread {
  id: string;
  title: string;
  author: string;
  authorColor: string;
  timeAgo: string;
  views: number;
  replies: Reply[];
  category: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface Reply {
  id: string;
  author: string;
  authorColor: string;
  isOP?: boolean;
  isMod?: boolean;
  modTitle?: string;
  timeAgo: string;
  upvotes: number;
  content: string;
  replies?: Reply[];
}

export const forumThreads: ForumThread[] = [
  {
    id: 'weekly-check-in-march-2024',
    title: 'Weekly Check-In: March 2024 — Where Are You?',
    author: 'AutoModerator',
    authorColor: 'bg-gray-500',
    timeAgo: '2 days ago',
    views: 2847,
    category: 'Foundation Work',
    isPinned: true,
    replies: [
      {
        id: 'wc-1',
        author: 'New_Beginnings_22',
        authorColor: 'bg-blue-500',
        isOP: false,
        timeAgo: '2 days ago',
        upvotes: 45,
        content: 'First time posting. Found this place three weeks ago after my girlfriend told me I was "too clingy." Started the Baseline Protocol yesterday. Already anxiety is through the roof. I keep wanting to text her and have to physically put my phone in another room. Is this normal?'
      },
      {
        id: 'wc-2',
        author: 'Patient_Observer',
        authorColor: 'bg-purple-500',
        isMod: true,
        modTitle: 'Senior Guide',
        timeAgo: '2 days ago',
        upvotes: 127,
        content: 'Welcome. Yes, the anxiety is normal. You are withdrawing from a behavioral addiction—the dopamine hit of her responses. It will peak around day 5-7, then gradually subside. The phone-in-another-room technique is solid. Some men also delete apps, turn off notifications, or give their phone to a friend for set periods. Do what you need to do. The goal is not to suffer heroically; it is to remove the option until the craving diminishes.'
      },
      {
        id: 'wc-3',
        author: 'Veteran_Calibrator',
        authorColor: 'bg-green-600',
        timeAgo: '2 days ago',
        upvotes: 89,
        content: 'Day 5 is the worst. Day 10 you start feeling human again. Day 30 you wonder why you ever tolerated your previous behavior. Stick with it.'
      },
      {
        id: 'wc-4',
        author: 'New_Beginnings_22',
        authorColor: 'bg-blue-500',
        isOP: false,
        timeAgo: '1 day ago',
        upvotes: 32,
        content: 'Thank you both. I broke last night and sent a text. She responded immediately with "I was wondering when you would reach out." Felt like shit. Starting over today. Going to delete the messaging app from my phone entirely.'
      },
      {
        id: 'wc-5',
        author: 'Quiet_Strength',
        authorColor: 'bg-amber-500',
        isMod: true,
        modTitle: 'Crisis Response',
        timeAgo: '1 day ago',
        upvotes: 156,
        content: 'Her response is information. She was waiting. She noticed. She expected you to crack. This tells you everything about the power dynamic you are trying to escape. Do not feel shame for the relapse. Feel clarity about the pattern. Delete the app. Fill the time with something physical—gym, running, woodworking, anything that occupies hands and mind. The void will fill itself if you do not fill it intentionally.'
      },
      {
        id: 'wc-6',
        author: 'Skeptical_Implementer',
        authorColor: 'bg-red-500',
        timeAgo: '1 day ago',
        upvotes: 67,
        content: 'Month 4 of calibration here. Started because I was skeptical—thought this was all manipulation BS. Now my girlfriend initiates 70% of contact, plans most of our dates, and told her mother I am "the most confident man she has ever dated." The irony: I am more relaxed, more present, more genuinely myself than I have ever been. The techniques forced me to actually become the man I was pretending to be. Is this manipulation? Maybe initially. Now it is just who I am.'
      },
      {
        id: 'wc-7',
        author: 'Frame_Maintainer',
        authorColor: 'bg-cyan-600',
        isMod: true,
        modTitle: 'Content Curator',
        timeAgo: '20 hours ago',
        upvotes: 203,
        content: 'This is a critical distinction that separates legitimate practice from manipulation. If you are performing a role, it is manipulation. If you are becoming the role until it is no longer a role, it is growth. The community provides scaffolding. You are supposed to eventually remove the scaffolding. If you are still calculating responses after six months, you have missed the point. The goal is not strategic interaction. The goal is authentic presence that naturally produces attraction.'
      },
      {
        id: 'wc-8',
        author: 'Lost_and_Confused',
        authorColor: 'bg-gray-600',
        timeAgo: '18 hours ago',
        upvotes: 28,
        content: 'I do not know if I can do this. Day 12 of Gray Rock with my wife. She has BPD. The escalation is terrifying. She threw a plate at me last night. I have been sleeping in my car. I am not trying to manipulate her; I am trying to survive until I can afford to leave. Is this what this community is for?'
      },
      {
        id: 'wc-9',
        author: 'Quiet_Strength',
        authorColor: 'bg-amber-500',
        isMod: true,
        modTitle: 'Crisis Response',
        timeAgo: '17 hours ago',
        upvotes: 312,
        content: 'Physical violence changes everything. Gray Rock is not appropriate when you are unsafe. You need to leave immediately. Not next month. Not when you can afford it. Now. Call a domestic violence hotline. Go to a shelter. File a police report about the plate. Document everything. Your safety is more important than the house, the marriage, or any protocol. This community is for men working on relationships, not men escaping abusers. Different resources, different urgency.'
      },
      {
        id: 'wc-10',
        author: 'TheGardener',
        authorColor: 'bg-green-500',
        isMod: true,
        modTitle: 'Founder',
        timeAgo: '16 hours ago',
        upvotes: 487,
        content: 'Lost_and_Confused: I am pinning this reply. If you are experiencing physical violence, Gray Rock is not a survival strategy; it is a delay tactic that puts you at greater risk. The community has resources for men in crisis. Message me directly. We will get you to safety. This is not what we built this for. This is not frame maintenance. This is danger.'
      },
      {
        id: 'wc-11',
        author: 'Questioning_Everything',
        authorColor: 'bg-indigo-500',
        timeAgo: '12 hours ago',
        upvotes: 54,
        content: 'Reading these threads, I am wondering: how many of us are here because we genuinely want to improve, and how many are here because we want to win? I came here after a breakup wanting to "get her back." Three months in, I realize I do not want her back. I want to never feel that powerless again. Is that growth or just trading one addiction for another?'
      },
      {
        id: 'wc-12',
        author: 'TheGardener',
        authorColor: 'bg-green-500',
        isMod: true,
        modTitle: 'Founder',
        timeAgo: '10 hours ago',
        upvotes: 298,
        content: 'The desire to never feel powerless again is healthy. The question is what you do with that desire. If you use it to dominate others, you have learned nothing. If you use it to ensure you never again abandon yourself, you have learned everything. The line is subtle. Most men cross it at some point. The ones who grow are the ones who notice and correct. The ones who do not become the cautionary tales in our banned content archive.'
      }
    ]
  },
  {
    id: 'am-i-crossing-line',
    title: 'Am I Crossing the Line? My Girlfriend Cried After I "Withheld."',
    author: 'Anxious_Implementer',
    authorColor: 'bg-orange-500',
    timeAgo: '5 hours ago',
    views: 892,
    category: 'Foundation Work',
    replies: [
      {
        id: 'cl-1',
        author: 'Anxious_Implementer',
        authorColor: 'bg-orange-500',
        isOP: true,
        timeAgo: '5 hours ago',
        upvotes: 23,
        content: 'I have been trying to implement the baseline recalibration for two weeks. Yesterday she asked me how my day was, and I gave a one-word answer ("Fine") instead of my usual detailed response. She cried. Asked if I still loved her. I maintained frame, said "Of course," but did not elaborate. She cried harder. I feel like shit. Is this supposed to happen? Am I doing this wrong?'
      },
      {
        id: 'cl-2',
        author: 'Patient_Observer',
        authorColor: 'bg-purple-500',
        isMod: true,
        modTitle: 'Senior Guide',
        timeAgo: '4 hours ago',
        upvotes: 156,
        content: 'Yes, this is supposed to happen. No, you are not doing it wrong. You are experiencing the pain of changing a pattern. Her tears are not evidence of your cruelty; they are evidence of the dependency you have allowed to develop. The question is not whether she cries. The question is what you do next. If you immediately revert to over-explaining to stop her tears, you have taught her that crying controls you. If you maintain the new baseline while being physically present and non-reactive, you teach her that her emotions are hers to manage. This is the hardest part. Most men fail here.'
      },
      {
        id: 'cl-3',
        author: 'Compassionate_Frame',
        authorColor: 'bg-teal-500',
        timeAgo: '4 hours ago',
        upvotes: 89,
        content: 'Disagree slightly. One-word answers are not frame; they are stonewalling. Frame is not absence; it is presence without anxiety. You can say "Fine" warmly, with eye contact, with a touch on her shoulder. The content is brief; the delivery is connected. If you are cold, you are not maintaining frame; you are weaponizing distance. That is cruelty, not calibration.'
      },
      {
        id: 'cl-4',
        author: 'Strict_Constructionist',
        authorColor: 'bg-red-600',
        timeAgo: '3 hours ago',
        upvotes: 67,
        content: 'Compassionate_Frame is confusing comfort with frame. The whole point of calibration is to reset expectations. If you comfort her through the reset, you are not resetting; you are modifying. She needs to experience the absence of your previous over-functioning to value your presence. Comfort during transition is sabotage.'
      },
      {
        id: 'cl-5',
        author: 'TheGardener',
        authorColor: 'bg-green-500',
        isMod: true,
        modTitle: 'Founder',
        timeAgo: '2 hours ago',
        upvotes: 234,
        content: 'Both perspectives have merit. The distinction is internal, not external. If you are withholding to punish, it is cruelty. If you are withholding to establish sustainable boundaries, it is calibration. She cannot see your intention; she can only see your behavior. But you know your intention. That is where integrity lives. Ask yourself: Am I doing this to create a healthier dynamic, or am I doing this to win? If it is winning, stop. If it is health, continue, but remain human. You do not need to become a robot to have frame.'
      },
      {
        id: 'cl-6',
        author: 'Anxious_Implementer',
        authorColor: 'bg-orange-500',
        isOP: true,
        timeAgo: '1 hour ago',
        upvotes: 45,
        content: 'Update: I told her I was working on being less anxious and more present, and that sometimes I might be quieter while I figure that out. She seemed to accept that. We sat in silence for a while. It was uncomfortable but not hostile. I think I was being cold before. This feels more honest. Thank you all.'
      },
      {
        id: 'cl-7',
        author: 'Frame_Maintainer',
        authorColor: 'bg-cyan-600',
        isMod: true,
        modTitle: 'Content Curator',
        timeAgo: '45 minutes ago',
        upvotes: 178,
        content: 'This is the correct path. You explained the behavior without apologizing for it or promising to change it. You offered context, not justification. You maintained the boundary while humanizing yourself. This is what sustainable frame looks like. Not robotic withdrawal, but present autonomy.'
      }
    ]
  },
  {
    id: 'success-story-recalibration-worked',
    title: 'Success Story: 6 Months Later — From Doormat to Partner',
    author: 'Transformed_Man',
    authorColor: 'bg-green-600',
    timeAgo: '3 days ago',
    views: 3421,
    category: 'Aftermath & Reckoning',
    isPinned: false,
    replies: [
      {
        id: 'ss-1',
        author: 'Transformed_Man',
        authorColor: 'bg-green-600',
        isOP: true,
        timeAgo: '3 days ago',
        upvotes: 567,
        content: 'Six months ago I posted here asking if it was too late. My wife of 8 years had stopped sleeping with me, stopped talking to me about anything meaningful, and treated me like a household appliance. I was doing 90% of the housework, managing all finances, planning all dates, and receiving zero appreciation. I found this community and recognized myself in every description of a man who had abandoned himself.\n\nI implemented the 90-Day Calibration. Not to manipulate her. To save myself.\n\nMonth 1: She noticed. Asked if I was "depressed." I said no, just focusing on myself. She seemed relieved, honestly. Less pressure on her.\n\nMonth 2: She became confused. Asked why I was not "trying anymore." I said I was trying differently—trying to be present instead of performing. She did not understand. That was okay.\n\nMonth 3: She became interested. Started asking about my new hobbies. Started suggesting activities together. Started touching me again.\n\nMonth 6 (now): We just returned from a weekend trip she planned and paid for. First time in years she has initiated anything. First time she has spent her own money on us. She is more engaged, more affectionate, more present. I am more relaxed, more confident, more myself.\n\nThe lesson: I did not change her. I changed me. She responded to the change. That is all any of this is.'
      },
      {
        id: 'ss-2',
        author: 'Hopeful_Beginner',
        authorColor: 'bg-blue-400',
        timeAgo: '3 days ago',
        upvotes: 123,
        content: 'This gives me hope. I am on day 8 and it feels like I am destroying my marriage. She is angry, confused, withdrawn. Did you experience this? When did it turn?'
      },
      {
        id: 'ss-3',
        author: 'Transformed_Man',
        authorColor: 'bg-green-600',
        isOP: true,
        timeAgo: '3 days ago',
        upvotes: 289,
        content: 'Day 8 was the worst. Day 20 was better. Day 45 she started asking questions instead of accusing. Day 60 she proposed the first date. It turns when she realizes the change is permanent, not a test or a punishment. Until then, she is fighting to restore the old dynamic. Hold the line.'
      },
      {
        id: 'ss-4',
        author: 'Cynical_Veteran',
        authorColor: 'bg-gray-700',
        timeAgo: '2 days ago',
        upvotes: 45,
        content: 'Or she leaves. Let us be honest. This does not always work. Sometimes the wife does not respond; she just finds someone else who will over-function. Success stories are selection bias. We hear from the ones who worked. The ones who failed disappear. Remember that.'
      },
      {
        id: 'ss-5',
        author: 'TheGardener',
        authorColor: 'bg-green-500',
        isMod: true,
        modTitle: 'Founder',
        timeAgo: '2 days ago',
        upvotes: 412,
        content: 'Cynical_Veteran is correct. This is not guaranteed. Some relationships are too far gone. Some people are incapable of meeting you halfway. The calibration reveals the truth; it does not create a new truth. If she leaves, that is information. You have learned that your value in her eyes was purely functional. That is painful knowledge, but it is knowledge worth having. Better to know than to spend decades performing for someone who does not see you.'
      },
      {
        id: 'ss-6',
        author: 'Transformed_Man',
        authorColor: 'bg-green-600',
        isOP: true,
        timeAgo: '1 day ago',
        upvotes: 198,
        content: 'To be clear: if she had left, I would have considered this a success anyway. I was dying in that marriage. I was suicidal. The change was necessary for my survival, regardless of the outcome. The fact that she responded positively is a bonus, not the goal. The goal was saving myself.'
      }
    ]
  }
];

export const getForumThread = (id: string): ForumThread | undefined => {
  return forumThreads.find(thread => thread.id === id);
};