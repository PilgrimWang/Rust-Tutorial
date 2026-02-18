import { useEffect, useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Code, Terminal, Cpu, Layers, Box, Zap, Shield, Database, GitBranch, Settings, AlertTriangle, Package, CheckCircle2, ChevronsDownUp, ClipboardCheck } from 'lucide-react';
import { rustTutorialData } from '@/data/rustTutorial';
import type { QuizProgress } from '@/components/SectionQuiz';
import { QUIZ_CONTENT_ID } from '@/lib/tutorialIds';

interface SidebarProps {
  activeSection: string;
  activeContent: string;
  completedItems: Set<string>;
  quizProgress: QuizProgress;
  onSelect: (sectionId: string, contentId: string) => void;
}

const sectionIcons: Record<string, React.ElementType> = {
  intro: BookOpen,
  cargo: Package,
  "practice-cli": Terminal,
  "practice-web": Database,
  style: Settings,
  basics: Code,
  ownership: Shield,
  structs: Layers,
  enums: GitBranch,
  generics: Box,
  traits: Zap,
  'error-handling': AlertTriangle,
  collections: Database,
  functional: Zap,
  testing: Settings,
  lifetimes: Terminal,
  concurrency: Cpu,
  async: Cpu,
  'smart-pointers': Box,
  macros: Settings,
  unsafe: AlertTriangle,
};

export function Sidebar({ activeSection, activeContent, completedItems, quizProgress, onSelect }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set([activeSection])
  );

  useEffect(() => {
    setExpandedSections(prev => {
      if (prev.has(activeSection)) return prev;
      const next = new Set(prev);
      next.add(activeSection);
      return next;
    });
  }, [activeSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    const allExpanded = expandedSections.size === rustTutorialData.length;
    setExpandedSections(() => (allExpanded ? new Set([activeSection]) : new Set(rustTutorialData.map(s => s.id))));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Code className="w-6 h-6" />
          </div>
          <div className="logo-text">
            <h1>Rust 教程</h1>
            <p>完全学习指南</p>
          </div>
        </div>
        <div className="sidebar-tools">
          <button className="sidebar-tool-button" onClick={toggleAll} title="展开/收起全部章节">
            <ChevronsDownUp className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-sections">
          {rustTutorialData.map((section) => {
            const Icon = sectionIcons[section.id] || Code;
            const isExpanded = expandedSections.has(section.id);
            const isActive = activeSection === section.id;

            const completedCount = section.content.reduce((acc, c) => {
              return acc + (completedItems.has(`${section.id}-${c.id}`) ? 1 : 0);
            }, 0);
            const totalCount = section.content.length;
            const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

            const quiz = quizProgress[section.id];
            const quizPassed = !!quiz?.passed;
            
            return (
              <div 
                key={section.id} 
                className={`nav-section ${isActive ? 'active' : ''}`}
              >
                <button
                  className="section-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <Icon className="section-icon w-4 h-4" />
                  <span className="section-title">{section.title}</span>
                  <span className="section-progress">{percent}%</span>
                  {quizPassed && <CheckCircle2 className="section-check w-4 h-4" />}
                  {isExpanded ? (
                    <ChevronDown className="section-chevron w-4 h-4" />
                  ) : (
                    <ChevronRight className="section-chevron w-4 h-4" />
                  )}
                </button>
                
                {isExpanded && (
                  <ul className="section-content">
                    {section.content.map((content) => (
                      <li key={content.id}>
                        <button
                          className={`content-item ${
                            activeSection === section.id && activeContent === content.id
                              ? 'active'
                              : ''
                          }`}
                          onClick={() => onSelect(section.id, content.id)}
                        >
                          <span className="content-dot" />
                          <span className="content-title">{content.title}</span>
                        </button>
                      </li>
                    ))}
                    <li key={`${section.id}-quiz`}>
                      <button
                        className={`content-item quiz-item ${
                          activeSection === section.id && activeContent === QUIZ_CONTENT_ID ? 'active' : ''
                        }`}
                        onClick={() => onSelect(section.id, QUIZ_CONTENT_ID)}
                      >
                        <ClipboardCheck className="quiz-icon w-4 h-4" />
                        <span className="content-title">章节测验（20题 / 90%）</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <p>Rust 版本: 1.75+</p>
      </div>
    </aside>
  );
}
