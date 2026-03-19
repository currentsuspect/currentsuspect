import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  Eye,
  ThumbsUp,
  Shield,
  Pin,
  Lock,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getForumThread, type Reply } from '../data/forum-threads';

interface ForumThreadViewProps {
  threadId: string;
  onBack: () => void;
}

function ReplyCard({ 
  reply, 
  depth = 0 
}: { 
  reply: Reply; 
  depth?: number;
}) {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className={cn(
      'border-l-2 border-border pl-4',
      depth > 0 && 'mt-4'
    )}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shrink-0',
            reply.authorColor
          )}
        >
          {reply.author.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <span className={cn(
              'font-semibold',
              reply.isMod && 'text-primary'
            )}>
              {reply.author}
            </span>
            
            {reply.isOP && (
              <span className="px-1.5 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                OP
              </span>
            )}
            
            {reply.isMod && (
              <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
                <Shield className="h-3 w-3" />
                {reply.modTitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>{reply.timeAgo}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {reply.upvotes}
            </span>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            {reply.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('Month ')) {
                return (
                  <p key={idx} className="font-semibold text-foreground mt-4 mb-2">
                    {paragraph}
                  </p>
                );
              }
              return (
                <p key={idx} className="text-foreground/90 leading-relaxed mb-3">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {reply.replies && reply.replies.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                {showReplies ? 'Hide' : 'Show'} {reply.replies.length} replies
              </button>

              <AnimatePresence>
                {showReplies && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {reply.replies.map((nestedReply) => (
                      <ReplyCard 
                        key={nestedReply.id} 
                        reply={nestedReply} 
                        depth={depth + 1}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ForumThreadView({ threadId, onBack }: ForumThreadViewProps) {
  const thread = getForumThread(threadId);
  
  if (!thread) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Thread not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container px-4 py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </button>

          <div className="flex items-start gap-3">
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shrink-0',
                thread.authorColor
              )}
            >
              {thread.author.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {thread.isPinned && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-600 text-xs font-medium rounded">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </span>
                )}
                {thread.isLocked && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-500/10 text-gray-600 text-xs font-medium rounded">
                    <Lock className="h-3 w-3" />
                    Locked
                  </span>
                )}
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                  {thread.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-3">{thread.title}</h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{thread.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {thread.timeAgo}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {thread.views.toLocaleString()} views
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {thread.replies.length} replies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {thread.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForumThreadView;