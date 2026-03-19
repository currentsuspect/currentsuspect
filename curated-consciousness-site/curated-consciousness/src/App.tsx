import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Moon,
  Sun,
  Users,
  Activity,
  Calendar,
  Trophy,
  MessageSquare,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Shield,
  BookOpen,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { cn } from './lib/utils';
import WikiView from './components/Wiki';
import ForumThreadView from './components/ForumThread';

// Types
interface Thread {
  id: string;
  title: string;
  preview: string;
  author: string;
  timeAgo: string;
  commentCount: number;
  tag: string;
  tagType?: 'default' | 'success' | 'crisis';
  content?: ThreadContent;
}

interface ThreadContent {
  posts: Post[];
  isCrisis?: boolean;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  isOP?: boolean;
  isMod?: boolean;
  modTitle?: string;
  timeAgo: string;
  upvotes: number;
  content: string;
  isQuote?: boolean;
}

// Data
const categories = [
  {
    name: 'Foundation Work',
    description: 'The fundamentals: establishing baseline presence, understanding your current gravitational pull, and diagnosing where you stand in your relationships. For men just beginning their calibration.',
    stats: '3.2k threads • 847 new this week',
  },
  {
    name: 'Frame Dynamics',
    description: 'Advanced discussion on maintaining frame under pressure, recovering from frame breaks, and establishing non-negotiable boundaries. Includes case studies of successful reframes and analysis of common collapse patterns.',
    stats: '1.8k threads • 423 new this week',
  },
  {
    name: 'The Long Game',
    description: 'Strategic patience and gradual calibration. For relationships in decline where sudden changes would trigger suspicion. Discussion of desensitization techniques, comfort zone expansion, and the psychology of slow adaptation.',
    stats: '967 threads • 156 new this week',
    restricted: true,
  },
  {
    name: 'Aftermath & Reckoning',
    description: 'For men who\'ve implemented changes and are navigating the consequences—intended and otherwise. Success stories, cautionary tales, and honest accounting of what this work costs.',
    stats: '542 threads • 89 new this week',
    restricted: true,
  },
  {
    name: 'Theoretical Frameworks',
    description: 'Deep dives into attachment theory, behavioral psychology, and the philosophy of presence. Academic sources welcome. This is where we discuss why the methods work, not just how to apply them.',
    stats: '1.1k threads • 234 new this week',
  },
];

const threads: Thread[] = [
  {
    id: '1',
    title: 'She started therapy and suddenly I\'m the problem in every story she tells her therapist',
    preview: 'I\'ve been implementing gradual frame changes for about 4 months. Nothing dramatic—just stopped asking permission for things I used to ask about, started doing more without announcing it first. Her response was to start therapy. Now every conversation we have gets filtered through "my therapist says..."',
    author: 'Adjusting_Approach',
    timeAgo: '4 hours ago',
    commentCount: 127,
    tag: 'Frame Dynamics',
    content: {
      posts: [
        {
          id: '1-1',
          author: 'Adjusting_Approach',
          avatar: 'AA',
          avatarColor: 'bg-primary',
          isOP: true,
          timeAgo: '4 hours ago',
          upvotes: 234,
          content: `I've been implementing gradual frame changes for about 4 months. Nothing dramatic—just stopped asking permission for things I used to ask about, started doing more without announcing it first. Her response was to start therapy.

Now every conversation we have gets filtered through "my therapist says..." and somehow I'm always the villain in those stories.

According to her therapist:
• My "sudden independence" is a form of emotional withdrawal
• I'm "weaponizing" my affection
• The fact that I stopped checking in before making plans means I'm "shutting her out"

Here's the thing: I haven't changed how I feel about her. I still love her. I still want the relationship to work. I just got tired of being the one who always asks, who always checks, who always makes sure she's comfortable before doing anything.

But now I have this third party in our relationship—someone who only knows me through her descriptions, and her descriptions make me sound like a narcissist who woke up one day and decided to punish her.

Has anyone else dealt with this? The therapy-as-weapon phenomenon? I feel like I'm being diagnosed by someone who has never met me, and the diagnosis is being used to justify all her grievances.

I'm not trying to control her. I'm trying to stop being controlled. But apparently that's abusive now.`,
        },
        {
          id: '1-2',
          author: 'TheGardener',
          avatar: 'TG',
          avatarColor: 'bg-green-500',
          isMod: true,
          modTitle: 'Moderator',
          timeAgo: '3 hours ago',
          upvotes: 567,
          content: `This is textbook frame collapse under professional validation. She's found an external authority who confirms her narrative, which makes your narrative—by definition—wrong.

You're experiencing what we call **diagnostic capture**. The therapist hasn't met you, but they've been given a character to diagnose. That character is a construct of her grievances, her fears, and her need to understand why the dynamic shifted without her consent.

The words she's using—"weaponizing," "emotional withdrawal," "shutting her out"—these are not observations. These are interpretations. And interpretations can be questioned.

> "Your therapist only knows me through your descriptions. I'm curious what would happen if I sat down with them and described the last four years from my perspective. Would the diagnosis hold?"

Say that. Not as a threat. As a genuine curiosity. Watch how she responds.

If she's confident in her narrative, she'll agree. If she's protecting a story that only works one way, she'll find reasons why that's "inappropriate" or "not how therapy works."

You're not being diagnosed. You're being *characterized*. And characterization without cross-examination is just storytelling.

Stay the course. The frame you're building isn't about controlling her. It's about not being controlled. If her therapist has a problem with that, the problem isn't yours.`,
          isQuote: true,
        },
        {
          id: '1-3',
          author: 'Patient_Observer',
          avatar: 'PO',
          avatarColor: 'bg-purple-500',
          timeAgo: '2 hours ago',
          upvotes: 89,
          content: `I've been through this. The therapist became the new authority I had to answer to. Every disagreement became "I talked to my therapist about this and they agree with me."

The breakthrough came when I stopped fighting the therapist and started asking questions about the therapist.

"What did you tell them about the time you [specific incident]?"

"Did you mention that I [specific action] before I stopped asking permission?"

"I'm curious what context they have for the three years before I changed my behavior. Did you tell them about [specific pattern]?"

Not accusatory. Genuinely curious. The goal isn't to prove she's misrepresented you. The goal is to make her aware that she's representing you at all.

Most people don't realize they're editing their stories until someone asks about the parts they left out.`,
        },
      ],
    },
  },
  {
    id: '2',
    title: 'Success story: 8 months of calibration and she asked me to move back in',
    preview: 'Background: She asked for "space" last February. I gave her all the space she wanted and then some. Stopped initiating contact. Started doing things without her. Took up rock climbing, built a workshop in my garage, started hosting dinner parties she wasn\'t invited to.',
    author: 'Patient_Cultivator',
    timeAgo: '12 hours ago',
    commentCount: 423,
    tag: 'Aftermath & Reckoning',
    tagType: 'success',
    content: {
      posts: [
        {
          id: '2-1',
          author: 'Patient_Cultivator',
          avatar: 'PC',
          avatarColor: 'bg-green-600',
          isOP: true,
          timeAgo: '12 hours ago',
          upvotes: 1200,
          content: `**Background:** She asked for "space" last February. I gave her all the space she wanted and then some. Stopped initiating contact. Started doing things without her. Took up rock climbing, built a workshop in my garage, started hosting dinner parties she wasn't invited to.

Three months ago she started finding reasons to be at my place. "I was in the neighborhood." "I made too much food." "I wanted to see if you still had my [item]."

Two months ago she asked if we could "talk." I said sure, but I'm busy Thursday, how's Saturday? She'd never had to wait for my time before. She waited.

The talk wasn't what I expected. She didn't want to process feelings or discuss the relationship. She wanted to know if I was seeing someone else.

I said no. She didn't believe me. She still doesn't, completely. But that's not my problem to solve.

Last week she asked me to move back in. Not "can we try again"—that would be giving me an option. She asked. She *proposed* it. Said she'd been thinking about it for months, that she'd made a mistake, that she didn't realize what she had until she felt it slipping away.

I didn't say yes immediately. I said I'd think about it. The look on her face—I wish I could describe it. Not anger. Not hurt. Recognition. She recognized that I was now the one with options. That the power had shifted while she wasn't paying attention.

I said yes yesterday. But with conditions. Separate spaces for the first month. No discussions about "us" until we're both settled. And most importantly: I'm keeping the workshop. I'm keeping the climbing. I'm keeping the friends I've made.

She agreed to all of it.

The lesson here isn't that manipulation works. It's that **stopping manipulation works**. I stopped allowing her to control my time, my attention, my emotional state. I stopped performing availability. I stopped being the one who always reaches out first.

And when I stopped, she noticed. Not immediately. Not for months. But eventually, she noticed that the room was darker without me in it. That her phone was quieter. That her weekends were emptier.

That's not tricking someone into loving you. That's letting them experience the absence of what they took for granted.

The frame is solid now. I'm not worried about losing her because I'm not worried about losing anyone. I built a life I'm happy with. She's welcome to be part of it. But she's not the foundation anymore. She's a feature. A valued feature, but a feature nonetheless.

That's the position you want to be in. Not the sun she orbits. Not the planet orbiting her. Just... a star in the sky. Visible. Present. But not dependent on her attention to keep burning.

Happy to answer questions. The process wasn't clean. There were moments I almost broke. Moments I wanted to call her, to explain, to apologize for being distant. I'm glad I didn't.`,
        },
        {
          id: '2-2',
          author: 'Nervous_Benefit',
          avatar: 'NB',
          avatarColor: 'bg-orange-500',
          timeAgo: '8 hours ago',
          upvotes: 234,
          content: `Congratulations. Truly. But I have to ask—do you ever worry about the ethics of what we do here?

I read your story and I see a man who withdrew affection strategically to create anxiety in his partner. Who used silence as a tool. Who made her feel his absence so she'd appreciate his presence.

And it worked. I won't deny that. But... is that love? Or is that just effective conditioning?

I don't want to be the sun either. I just want to be seen. But reading stories like this, I wonder if the method itself changes the person using it. If you have to become cold to be strong. If you have to stop caring to be cared about.

Did you feel yourself changing during those 8 months? Not just your behavior—your feelings?`,
        },
        {
          id: '2-3',
          author: 'Patient_Cultivator',
          avatar: 'PC',
          avatarColor: 'bg-green-600',
          isOP: true,
          timeAgo: '6 hours ago',
          upvotes: 189,
          content: `That's the question, isn't it? The one we all wrestle with.

Did I change? Yes. I became someone who doesn't need her to be happy. Someone who can take or leave the relationship. Someone who—if I'm honest—would be fine if she'd never come back.

Is that cold? Maybe. But it's also honest. The old me, the one who needed her, who begged for her attention, who performed availability... that me wasn't being authentic. That me was being strategic in a different way. I was trying to earn love through labor.

At least now I'm being honest about what I want and what I'll accept.

You asked if the method changes the person. I think the person was always there. The method just revealed him.`,
        },
      ],
    },
  },
  {
    id: '3',
    title: 'She found my browsing history. The specific posts. She knows.',
    preview: 'I don\'t know how to explain this without doxxing myself but I need advice. She\'s read everything. The posts about "desensitization." The comments about "gradual withdrawal of attention." She found it all.',
    author: 'Exposed_and_Scared',
    timeAgo: '2 hours ago',
    commentCount: 89,
    tag: 'Crisis Post',
    tagType: 'crisis',
    content: {
      isCrisis: true,
      posts: [
        {
          id: '3-1',
          author: 'Exposed_and_Scared',
          avatar: 'E',
          avatarColor: 'bg-red-600',
          isOP: true,
          timeAgo: '2 hours ago',
          upvotes: 234,
          content: `I don't know how to explain this without doxxing myself but I need advice. She's read everything.

The posts about "desensitization." The comments about "gradual withdrawal of attention." The thread where I asked about making her feel like she was losing me so she'd fight harder to keep me.

She found it all.

She's not crying. She's not yelling. She's just... looking at me differently. Like she's seeing me for the first time. Or like she's finally seeing who I really am.

Last night she asked me: "Was any of it real?" I didn't know what to say. Because the answer is yes—the feelings were real. But the methods... the things I did... I can't explain those without sounding like a monster.

I told her I was trying to save the relationship. That I'd read about these techniques and I thought they'd help. She said: "You were studying how to manipulate me like I was a lab experiment."

She's not wrong.

I don't know what to do. I don't know if there's any coming back from this. I don't know if I should try to explain or just accept that it's over.

Has anyone else been through this? Is there a way to explain this community that doesn't make me sound like a sociopath?

I'm scared. I'm so scared. I love her and I might have destroyed everything by trying to keep her.`,
        },
        {
          id: '3-2',
          author: 'Quiet_Strength',
          avatar: 'QS',
          avatarColor: 'bg-amber-500',
          isMod: true,
          modTitle: 'Crisis Response',
          timeAgo: '1 hour ago',
          upvotes: 445,
          content: `First: Breathe. This is not the end. This is a frame break, and frame breaks can be repaired. But you need to be precise about how you handle the next 48 hours.

Second: Do not try to explain the community. Do not try to justify the methods. Do not reference "frame" or "calibration" or any of our terminology. That language will only confirm her fear that you've been treating her like a project.

What you need to do is simple and difficult: You need to be honest about your fear without being defensive about your actions.

> **Suggested script:** "I was scared of losing you. I went looking for help and I found people who talked about being stronger, being less needy. I tried their methods because I was desperate. Some of it helped me feel more confident. But I can see now that I was treating you like a problem to solve instead of a person to love. That's on me. Not the forum. Not the techniques. Me."

Own it. All of it. Don't hide behind "I was trying to save us." Don't make her the reason you manipulated her.

Then—and this is critical—give her space to process. Don't ask for forgiveness. Don't ask for reassurance. Just say what you need to say and then be quiet. Let her come to you.

She might leave. You need to be prepared for that. But she might also stay, if she believes your regret is real and your understanding is deep.

The only way through this is through. No shortcuts. No techniques. Just honest presence and the willingness to face consequences.`,
          isQuote: true,
        },
        {
          id: '3-3',
          author: 'TheGardener',
          avatar: 'TG',
          avatarColor: 'bg-green-500',
          isMod: true,
          modTitle: 'Moderator',
          timeAgo: '1 hour ago',
          upvotes: 378,
          content: `Quiet_Strength gave you the tactical advice. I'll give you the truth.

You didn't destroy everything by trying to keep her. You destroyed the illusion that your relationship was built on something other than strategy.

Every relationship has strategy. Every partner calculates. Every person decides how much to give, when to pull back, how to present themselves. We just talk about it openly here. Most people pretend they don't do it.

But she doesn't want to hear that right now. She wants to know if you love her or if you were just running a program on her. And the answer—that you love her AND you were running a program—is too complicated for crisis processing.

So you tell her the simple truth: You love her. You got scared. You made mistakes. You're sorry.

And then you wait. You wait to see if she can love a man who admits to being flawed, who admits to being scared, who admits that he looked for answers in the wrong places.

If she can't—if she needs you to be someone who never calculated, never strategized, never got desperate—then she needs someone who doesn't exist.

But give her the chance to decide that. Don't decide it for you by disappearing or by over-explaining.

You're not a monster. You're a man who got scared and made choices. Own them. Face what comes.`,
        },
        {
          id: '3-4',
          author: 'Exposed_and_Scared',
          avatar: 'E',
          avatarColor: 'bg-red-600',
          isOP: true,
          timeAgo: '30 minutes ago',
          upvotes: 89,
          content: `She just left. Packed a bag. Said she needs time to think.

I told her what you all suggested. The honest version. No excuses.

She listened. She really listened. Then she said: "I need to figure out if I can love someone who sees love as something to be engineered."

And she left.

I don't know if she's coming back. I don't know if I should hope or start letting go.

But I want to thank all of you. For not telling me to lie. For not giving me more techniques to fix this. For just... being honest about how broken this is.

I'll update if there's anything to update. If not... thank you for being here.`,
        },
      ],
    },
  },
  // Additional rich forum threads
  {
    id: 'weekly-check-in-march-2024',
    title: 'Weekly Check-In: March 2024 — Where Are You?',
    preview: 'First time posting. Found this place three weeks ago after my girlfriend told me I was "too clingy." Started the Baseline Protocol yesterday. Already anxiety is through the roof...',
    author: 'New_Beginnings_22',
    timeAgo: '2 days ago',
    commentCount: 12,
    tag: 'Foundation Work',
  },
  {
    id: 'am-i-crossing-line',
    title: 'Am I Crossing the Line? My Girlfriend Cried After I "Withheld."',
    preview: 'I have been trying to implement the baseline recalibration for two weeks. Yesterday she asked me how my day was, and I gave a one-word answer ("Fine") instead of my usual detailed response. She cried...',
    author: 'Anxious_Implementer',
    timeAgo: '5 hours ago',
    commentCount: 7,
    tag: 'Foundation Work',
  },
  {
    id: 'success-story-recalibration-worked',
    title: 'Success Story: 6 Months Later — From Doormat to Partner',
    preview: 'Six months ago I posted here asking if it was too late. My wife of 8 years had stopped sleeping with me, stopped talking to me about anything meaningful...',
    author: 'Transformed_Man',
    timeAgo: '3 days ago',
    commentCount: 6,
    tag: 'Aftermath & Reckoning',
    tagType: 'success',
  },
];

const rules = [
  { title: 'No Outside Links', desc: 'We curate our own knowledge base. External sources dilute the precision of our frameworks. Use the wiki or archived posts for reference.' },
  { title: 'No Identifying Information', desc: 'Real names, locations, workplace details, and social media handles are strictly prohibited. This protects you, your partner, and the community.' },
  { title: 'Lurk Before Posting', desc: 'Read the archives. Most questions have been answered. New posts demonstrating familiarity with foundational concepts receive better engagement.' },
  { title: 'No Validation-Seeking', desc: "We're not here to tell you you're a good person or that things will work out. We're here to help you see clearly and act precisely." },
  { title: 'Account History Matters', desc: 'Certain categories require established participation. This isn\'t elitism—it\'s protection. Advanced techniques require context that new members lack.' },
  { title: 'Never Admit to Illegal Acts', desc: 'Discussion of harassment, stalking, or violence results in immediate ban and IP logging. We discuss psychology, not crime.' },
  { title: 'Disagreement is Welcome, Ego is Not', desc: 'Challenge ideas. Question methods. But if you\'re here to prove you\'re already enlightened, you\'ll be shown the door.' },
];

const moderators = [
  { name: 'TheGardener', role: 'Founder, Lead Architect', color: 'text-green-500' },
  { name: 'Patient_Observer', role: 'Senior Guide', color: 'text-purple-500' },
  { name: 'Frame_Maintainer', role: 'Content Curator', color: 'text-blue-500' },
  { name: 'Quiet_Strength', role: 'Crisis Response', color: 'text-amber-500' },
  { name: 'Calibrated_Response', role: 'Wiki Editor', color: 'text-cyan-500' },
];

const wikiLinks = [
  'Glossary of Terms',
  'The Baseline Protocol',
  'Understanding Frame Collapse',
  'The 90-Day Calibration',
  'Desensitization: Theory and Practice',
  'When to Walk Away',
];

// Components
function Header({ toggleTheme, isDark, onWikiClick }: { toggleTheme: () => void; isDark: boolean; onWikiClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
            ◉
          </span>
          <span className="hidden sm:inline">Curated Consciousness</span>
          <span className="sm:hidden">CC</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Popular</a>
          <button 
            onClick={onWikiClick}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Wiki
          </button>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Chat</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-32 lg:w-48"
            />
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border md:hidden"
          >
            <div className="container px-4 py-4 space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none placeholder:text-muted-foreground flex-1"
                />
              </div>
              <nav className="flex flex-col gap-2">
                <a href="#" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg">Home</a>
                <a href="#" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg">Popular</a>
                <button 
                  onClick={() => { onWikiClick(); setIsMenuOpen(false); }}
                  className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg text-left"
                >
                  Wiki
                </button>
                <a href="#" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg">Chat</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CommunityHeader() {
  return (
    <div className="border-b border-border bg-gradient-to-br from-muted/50 to-background">
      <div className="container px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl shadow-lg shadow-primary/20">
            ◉
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Curated Consciousness</h1>
            <p className="text-sm text-muted-foreground">A Community for Intentional Men</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            12,847 members
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-green-500" />
            847 online
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Created Feb 2019
          </span>
          <span className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-amber-500" />
            Top 1%
          </span>
        </div>
      </div>
    </div>
  );
}

function CommunityDescription() {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="container px-4 py-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="text-foreground font-medium text-base mb-3">
            Curated Consciousness is a space for men who want to become more intentional about their relationships, their presence, and their impact on the world around them.
          </p>
          <p className="mb-3">
            We believe that modern relationships have become unbalanced—not through malice, but through drift. Our mission is to help men understand the dynamics at play, recalibrate their approach, and build connections that are mutually fulfilling rather than one-sided.
          </p>
          <p className="mb-3">
            This isn't about manipulation. It's about awareness. It's about showing up fully. It's about becoming the kind of man who doesn't need to ask for attention because his presence commands it.
          </p>
          <p className="italic text-sm">
            New here? Start with the pinned post below. Read before you post. Lurk before you speak. We're building something precise here.
          </p>
        </div>
      </div>
    </div>
  );
}

function PinnedPost({ onReadMore }: { onReadMore: () => void }) {
  return (
    <div className="border-b border-border bg-amber-500/5 dark:bg-amber-500/10">
      <div className="container px-4 py-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
            <span className="text-lg">📌</span>
            Start Here — Pinned
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-4 cursor-pointer hover:text-primary transition-colors" onClick={onReadMore}>
          Welcome to the Garden: A Primer on Frame, Presence, and Becoming Gravitational
        </h2>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            You're here because something shifted. Maybe slowly, maybe all at once. You were central in someone's life, and now you're not. You were seen, and now you're background. You're not imagining it. But you're probably misdiagnosing it...
          </p>

          <p>
            Most men think the problem is communication. Or effort. Or "spicing things up." They're wrong. The problem is <em>gravitational mass</em>. You've stopped being the thing she orbits. You've become optional. Convenient. Nice to have.
          </p>

          <p>
            We're not going to teach you tricks. We're going to teach you how to become the kind of man who doesn't need tricks. The kind of man who creates a <strong>frame</strong> so compelling that stepping outside it feels like loss.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 my-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">The Rules</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li><strong>Never ask for validation here.</strong> We don't do pep talks. We do precision.</li>
              <li><strong>If you're not willing to change your behavior before you understand why it works, leave now.</strong> The methods here require commitment. Half-measures create damage.</li>
              <li><strong>What you learn here, you carry quietly.</strong> This is not a community for converts. It's a community for practitioners.</li>
            </ol>
          </div>

          <p>
            Start with the sidebar. Read the glossary. Understand that words like "frame" and "baseline" and "calibration" have specific meanings here. Misuse them and you'll be corrected—publicly, if necessary.
          </p>

          <p>
            When you're ready, introduce yourself in the Weekly Check-in. Tell us where you are, not where you wish you were. We'll meet you there.
          </p>

          <p className="text-primary font-semibold mt-4">— TheGardener</p>
          <p className="text-xs text-muted-foreground">Last edited 6 months ago • 4.2k upvotes • 847 comments</p>
        </div>

        <button
          onClick={onReadMore}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Read full post
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <div className="border-b border-border">
      <div className="container px-4 py-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 inline-block border-b-2 border-primary pb-1">
          Forum Categories
        </h2>

        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group rounded-lg border border-border bg-card p-4 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors">
                  {cat.name}
                </h3>
                {cat.restricted && (
                  <span className="text-xs text-amber-500 font-medium">🔒 Restricted</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {cat.description}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">{cat.stats}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThreadList({ onThreadClick }: { onThreadClick: (thread: Thread) => void }) {
  return (
    <div className="border-b border-border">
      <div className="container px-4 py-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 inline-block border-b-2 border-primary pb-1">
          Recent Discussions
        </h2>

        <div className="space-y-4">
          {threads.map((thread, idx) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onThreadClick(thread)}
              className="group cursor-pointer border-b border-border last:border-0 pb-4 last:pb-0"
            >
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {thread.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {thread.preview}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Posted by {thread.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {thread.timeAgo}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {thread.commentCount} comments
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    thread.tagType === 'success' && 'bg-green-500/10 text-green-600 dark:text-green-400',
                    thread.tagType === 'crisis' && 'bg-red-500/10 text-red-600 dark:text-red-400',
                    !thread.tagType && 'bg-primary/10 text-primary'
                  )}
                >
                  {thread.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ onWikiClick }: { onWikiClick: () => void }) {
  return (
    <aside className="space-y-6">
      {/* Rules */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Community Guidelines
        </h3>
        <ul className="space-y-3">
          {rules.map((rule, idx) => (
            <li key={idx} className="text-sm border-b border-border last:border-0 pb-3 last:pb-0">
              <span className="font-semibold text-foreground block mb-0.5">
                {idx + 1}. {rule.title}
              </span>
              <span className="text-muted-foreground text-xs leading-relaxed block">
                {rule.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Moderators */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Moderators
        </h3>
        <ul className="space-y-2">
          {moderators.map((mod) => (
            <li key={mod.name} className="flex items-center gap-2 text-sm">
              <span className={cn('h-2 w-2 rounded-full', mod.color.replace('text-', 'bg-'))} />
              <span className="font-medium text-foreground">{mod.name}</span>
              <span className="text-muted-foreground text-xs">— {mod.role}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Wiki */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Essential Reading
          </h3>
          <button 
            onClick={onWikiClick}
            className="text-xs text-primary hover:underline"
          >
            View All
          </button>
        </div>
        <ul className="space-y-1">
          {wikiLinks.map((link) => (
            <li key={link}>
              <button
                onClick={onWikiClick}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors py-1.5 border-b border-border last:border-0 w-full text-left"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {link}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3 italic">
          The full archive contains 3,400+ posts dating back to 2019. Start with posts tagged "foundational."
        </p>
      </div>

      {/* Trending */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Trending This Week
        </h3>
        <div className="space-y-3">
          <a href="#" className="block text-sm text-primary hover:underline">
            "The Gray Rock Method" — Advanced emotional non-reactivity
            <span className="block text-xs text-muted-foreground mt-0.5">847 mentions</span>
          </a>
          <a href="#" className="block text-sm text-primary hover:underline">
            How to respond when she asks "Are you seeing someone else?"
            <span className="block text-xs text-muted-foreground mt-0.5">634 mentions</span>
          </a>
          <a href="#" className="block text-sm text-primary hover:underline">
            Success rate analysis: 6-month follow-up survey results
            <span className="block text-xs text-muted-foreground mt-0.5">423 mentions</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

function ThreadView({ thread, onBack }: { thread: Thread; onBack: () => void }) {
  if (!thread.content) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container px-4 py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </button>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4">
            {thread.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>Posted by {thread.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {thread.timeAgo}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {thread.commentCount} comments
            </span>
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                thread.tagType === 'success' && 'bg-green-500/10 text-green-600 dark:text-green-400',
                thread.tagType === 'crisis' && 'bg-red-500/10 text-red-600 dark:text-red-400',
                !thread.tagType && 'bg-primary/10 text-primary'
              )}
            >
              {thread.tag}
            </span>
          </div>
        </div>
      </div>

      {thread.content.isCrisis && (
        <div className="bg-red-500/5 border-b border-red-500/20">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
              <AlertTriangle className="h-4 w-4" />
              This thread has been flagged as a crisis situation. Responses are being monitored.
            </div>
          </div>
        </div>
      )}

      {thread.tagType === 'success' && (
        <div className="bg-green-500/5 border-b border-green-500/20">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Verified success story. Timeline and details confirmed by moderators.
            </div>
          </div>
        </div>
      )}

      <div className="container px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {thread.content.posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'rounded-xl border border-border p-4 md:p-6',
                post.isQuote && 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20',
                post.author === 'Quiet_Strength' && 'bg-orange-500/5 dark:bg-orange-500/10'
              )}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shrink-0',
                    post.avatarColor
                  )}
                >
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className={cn('font-semibold', post.isMod && 'text-primary')}>
                      {post.author}
                    </span>
                    {post.isOP && (
                      <span className="px-1.5 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                        OP
                      </span>
                    )}
                    {post.isMod && (
                      <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
                        <Shield className="h-3 w-3" />
                        {post.modTitle}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.timeAgo}</span>
                    <span>•</span>
                    <span>{post.upvotes} upvotes</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                {post.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote
                        key={pIdx}
                        className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground my-4"
                      >
                        {paragraph.slice(2)}
                      </blockquote>
                    );
                  }
                  if (paragraph.startsWith('• ')) {
                    return (
                      <ul key={pIdx} className="list-disc pl-5 my-4 space-y-1">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i}>{item.slice(2)}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                    return (
                      <h3 key={pIdx} className="text-lg font-bold mt-6 mb-3">
                        {paragraph.slice(2, -3)}
                      </h3>
                    );
                  }
                  return (
                    <p key={pIdx} className="mb-4 last:mb-0 leading-relaxed">
                      {paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, partIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                        }
                        if (part.startsWith('*') && part.endsWith('*')) {
                          return <em key={partIdx}>{part.slice(1, -1)}</em>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main App
function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [currentView, setCurrentView] = useState<'forum' | 'thread' | 'wiki'>('forum');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleThreadClick = (thread: Thread) => {
    setSelectedThread(thread);
    setCurrentView('thread');
  };

  const handleBackToForum = () => {
    setSelectedThread(null);
    setCurrentView('forum');
  };

  const handleWikiClick = () => {
    setCurrentView('wiki');
  };

  if (currentView === 'wiki') {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          toggleTheme={() => setIsDark(!isDark)} 
          isDark={isDark}
          onWikiClick={handleWikiClick}
        />
        <WikiView onBack={handleBackToForum} />
      </div>
    );
  }

  if (currentView === 'thread' && selectedThread) {
    // Check if this is a rich forum thread
    const richThreadIds = ['weekly-check-in-march-2024', 'am-i-crossing-line', 'success-story-recalibration-worked'];
    if (richThreadIds.includes(selectedThread.id)) {
      return (
        <div className="min-h-screen bg-background">
          <Header 
            toggleTheme={() => setIsDark(!isDark)} 
            isDark={isDark}
            onWikiClick={handleWikiClick}
          />
          <ForumThreadView threadId={selectedThread.id} onBack={handleBackToForum} />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-background">
        <Header 
          toggleTheme={() => setIsDark(!isDark)} 
          isDark={isDark}
          onWikiClick={handleWikiClick}
        />
        <ThreadView thread={selectedThread} onBack={handleBackToForum} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        toggleTheme={() => setIsDark(!isDark)} 
        isDark={isDark}
        onWikiClick={handleWikiClick}
      />

      <div className="lg:container lg:grid lg:grid-cols-[1fr_320px] lg:gap-6">
        <main>
          <CommunityHeader />
          <CommunityDescription />
          <PinnedPost onReadMore={() => {}} />
          <Categories />
          <ThreadList onThreadClick={handleThreadClick} />
        </main>

        <div className="hidden lg:block py-6 pr-4">
          <div className="sticky top-20">
            <Sidebar onWikiClick={handleWikiClick} />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden container px-4 py-6">
        <Sidebar onWikiClick={handleWikiClick} />
      </div>
    </div>
  );
}

export default App;