import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  User,
  FileText,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Wrench,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { wikiPages, getWikiPage, type WikiPage } from '../data/wiki';

interface WikiViewProps {
  onBack: () => void;
  initialPageId?: string;
}

function WikiSidebar({ 
  currentPage, 
  onPageSelect 
}: { 
  currentPage: WikiPage | null;
  onPageSelect: (page: WikiPage) => void;
}) {
  const categories = [
    { id: 'foundational', label: 'Foundational', icon: BookOpen, color: 'text-blue-500' },
    { id: 'theoretical', label: 'Theoretical', icon: GraduationCap, color: 'text-purple-500' },
    { id: 'practical', label: 'Practical Guides', icon: Wrench, color: 'text-green-500' },
    { id: 'advanced', label: 'Advanced', icon: AlertTriangle, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Wiki Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                  currentPage?.category === cat.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <cat.icon className={cn('h-4 w-4', cat.color)} />
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          All Pages ({wikiPages.length})
        </h3>
        <ul className="space-y-1 max-h-96 overflow-y-auto">
          {wikiPages.map((page) => (
            <li key={page.id}>
              <button
                onClick={() => onPageSelect(page)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  currentPage?.id === page.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-muted text-foreground'
                )}
              >
                {page.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WikiIndex({ onPageSelect }: { onPageSelect: (page: WikiPage) => void }) {
  const categories = [
    { id: 'foundational', label: 'Foundational', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { id: 'theoretical', label: 'Theoretical', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { id: 'practical', label: 'Practical Guides', color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { id: 'advanced', label: 'Advanced', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  ];

  const getPagesByCategory = (category: string) => {
    return wikiPages.filter(page => page.category === category);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Wiki Contents</h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive guide to frame maintenance, relationship dynamics, and the Curated Consciousness methodology.
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => {
          const pages = getPagesByCategory(cat.id);
          if (pages.length === 0) return null;
          
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className={cn('px-3 py-1 rounded-full text-sm font-medium', cat.bgColor, cat.color)}>
                  {cat.label}
                </span>
                <span className="text-sm text-muted-foreground">{pages.length} pages</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => onPageSelect(page)}
                    className="text-left p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1">
                      {page.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {page.readTime}
                      </span>
                      <span>by {page.author}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
        <h2 className="text-lg font-semibold mb-3">Start Here</h2>
        <p className="text-muted-foreground mb-4">
          New to Curated Consciousness? Begin with the foundational pages to understand the core concepts.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onPageSelect(wikiPages[0])}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Read Glossary First
          </button>
          <button
            onClick={() => {
              const protocol = wikiPages.find(p => p.id === 'baseline-protocol');
              if (protocol) onPageSelect(protocol);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            <Wrench className="h-4 w-4" />
            Start Baseline Protocol
          </button>
        </div>
      </div>
    </div>
  );
}

function WikiPageView({ 
  page, 
  onPageSelect 
}: { 
  page: WikiPage;
  onPageSelect: (page: WikiPage) => void;
}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(page.content.map(s => s.id))
  );

  const toggleSection = (id: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedSections(newSet);
  };

  const categoryColors = {
    foundational: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    theoretical: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    practical: 'bg-green-500/10 text-green-600 dark:text-green-400',
    advanced: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  };

  return (
    <article className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', categoryColors[page.category])}>
            {page.category.charAt(0).toUpperCase() + page.category.slice(1)}
          </span>
          <span className="text-muted-foreground text-sm">
            Last updated {page.lastUpdated}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.title}</h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            By {page.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {page.readTime} read
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            {page.content.length} sections
          </span>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 p-4 rounded-xl bg-muted/50 border border-border">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Contents
        </h2>
        <ul className="space-y-1">
          {page.content.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-primary hover:underline"
              >
                {section.title}
              </button>
              {section.subsections && (
                <ul className="ml-4 mt-1 space-y-1">
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => {
                          document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        {sub.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {page.content.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between group mb-4"
            >
              <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {section.title}
              </h2>
              <ChevronRight 
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform',
                  expandedSections.has(section.id) && 'rotate-90'
                )} 
              />
            </button>

            <AnimatePresence>
              {expandedSections.has(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {section.content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('• ')) {
                        return (
                          <ul key={idx} className="list-disc pl-6 my-4 space-y-2">
                            {paragraph.split('\n').map((item, i) => (
                              <li key={i} className="text-foreground/90">{item.slice(2)}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={idx} className="text-foreground/90 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {section.subsections?.map((sub) => (
                    <div key={sub.id} id={sub.id} className="mt-6 pl-4 border-l-2 border-border">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">{sub.title}</h3>
                      <div className="prose dark:prose-invert max-w-none">
                        {sub.content.split('\n\n').map((paragraph, idx) => {
                          if (paragraph.startsWith('• ')) {
                            return (
                              <ul key={idx} className="list-disc pl-6 my-3 space-y-1">
                                {paragraph.split('\n').map((item, i) => (
                                  <li key={i} className="text-foreground/80">{item.slice(2)}</li>
                                ))}
                              </ul>
                            );
                          }
                          return (
                            <p key={idx} className="text-foreground/80 leading-relaxed mb-3">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}
      </div>

      {/* Citations */}
      {page.citations && page.citations.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">References</h2>
          <ul className="space-y-2">
            {page.citations.map((cite) => (
              <li key={cite.id} className="text-sm text-muted-foreground">
                <span className="font-medium">[{cite.id}]</span>{' '}
                {cite.text} <em>{cite.source}</em> ({cite.year}).
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Pages */}
      <div className="mt-8 pt-6 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-2">
          {page.relatedPages.map((relatedId) => {
            const relatedPage = getWikiPage(relatedId);
            if (!relatedPage) return null;
            return (
              <button
                key={relatedId}
                onClick={() => onPageSelect(relatedPage)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {relatedPage.title}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export function WikiView({ onBack, initialPageId }: WikiViewProps) {
  const [currentPage, setCurrentPage] = useState<WikiPage | null>(
    () => initialPageId ? (getWikiPage(initialPageId) ?? null) : null
  );

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

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl shadow-lg shadow-primary/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Curated Consciousness Wiki</h1>
              <p className="text-sm text-muted-foreground">Foundational knowledge, theoretical frameworks, and practical guides</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <WikiSidebar 
                currentPage={currentPage} 
                onPageSelect={setCurrentPage} 
              />
            </div>
          </aside>

          <main>
            {currentPage ? (
              <WikiPageView 
                page={currentPage} 
                onPageSelect={setCurrentPage}
              />
            ) : (
              <WikiIndex onPageSelect={setCurrentPage} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default WikiView;