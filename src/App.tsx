import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { ContentViewer } from '@/components/ContentViewer';
import { ProgressTracker } from '@/components/ProgressTracker';
import { SearchBar } from '@/components/SearchBar';
import { SectionQuiz, type QuizProgress } from '@/components/SectionQuiz';
import { rustTutorialData, getContentById } from '@/data/rustTutorial';
import { QUIZ_CONTENT_ID } from '@/lib/tutorialIds';
import './App.css';

const tutorialOrder = rustTutorialData.flatMap(section =>
  [
    ...section.content.map(item => ({
      sectionId: section.id,
      contentId: item.id,
    })),
    { sectionId: section.id, contentId: QUIZ_CONTENT_ID },
  ]
);

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeContent, setActiveContent] = useState('what-is-rust');
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const currentIndex = tutorialOrder.findIndex(
    item => item.sectionId === activeSection && item.contentId === activeContent
  );

  // 从 localStorage 加载进度
  useEffect(() => {
    const saved = localStorage.getItem('rust-tutorial-progress');
    if (saved) {
      setCompletedItems(new Set(JSON.parse(saved)));
    }

    const savedQuiz = localStorage.getItem('rust-tutorial-quiz-progress');
    if (savedQuiz) {
      setQuizProgress(JSON.parse(savedQuiz));
    }
    
    const savedTheme = localStorage.getItem('rust-tutorial-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // 保存进度到 localStorage
  useEffect(() => {
    localStorage.setItem(
      'rust-tutorial-progress',
      JSON.stringify(Array.from(completedItems))
    );
  }, [completedItems]);

  // 保存测验进度
  useEffect(() => {
    localStorage.setItem('rust-tutorial-quiz-progress', JSON.stringify(quizProgress));
  }, [quizProgress]);

  // 保存主题设置
  useEffect(() => {
    localStorage.setItem('rust-tutorial-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSelect = useCallback((sectionId: string, contentId: string) => {
    setActiveSection(sectionId);
    setActiveContent(contentId);
    
    // 标记为已完成
    if (contentId !== QUIZ_CONTENT_ID) {
      setCompletedItems(prev => {
        const newSet = new Set(prev);
        newSet.add(`${sectionId}-${contentId}`);
        return newSet;
      });
    }
    
    // 在移动设备上关闭侧边栏
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  const handleNext = () => {
    if (currentIndex < 0) return;
    const next = tutorialOrder[currentIndex + 1];
    if (!next) return;
    handleSelect(next.sectionId, next.contentId);
  };

  const handlePrevious = () => {
    if (currentIndex < 0) return;
    const prev = tutorialOrder[currentIndex - 1];
    if (!prev) return;
    handleSelect(prev.sectionId, prev.contentId);
  };

  const currentSection = rustTutorialData.find(s => s.id === activeSection);
  const currentContent = currentSection
    ? getContentById(activeSection, activeContent)
    : null;

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < tutorialOrder.length - 1;

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* 移动端头部 */}
      <header className="mobile-header">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="menu-button"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <span className="mobile-title">Rust 教程</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="theme-button"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </header>

      <div className="app-container">
        {/* 侧边栏 */}
        <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : 'closed'}`}>
          <Sidebar
            activeSection={activeSection}
            activeContent={activeContent}
            completedItems={completedItems}
            quizProgress={quizProgress}
            onSelect={handleSelect}
          />
        </div>

        {/* 主内容区 */}
        <main className="main-content">
          {/* 桌面端头部 */}
          <header className="desktop-header">
            <SearchBar onSelect={handleSelect} />
            
            <div className="header-actions">
              <ProgressTracker completedItems={completedItems} quizProgress={quizProgress} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="theme-toggle"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </header>

          {/* 内容区 */}
          <div className="content-area">
            {currentSection && activeContent === QUIZ_CONTENT_ID && (
              <SectionQuiz
                sectionId={currentSection.id}
                sectionTitle={currentSection.title}
                quizProgress={quizProgress}
                onUpdateProgress={setQuizProgress}
              />
            )}
            {currentSection && currentContent && activeContent !== QUIZ_CONTENT_ID && (
              <ContentViewer section={currentSection} content={currentContent} />
            )}
          </div>

          {/* 导航按钮 */}
          <footer className="content-footer">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="nav-button"
            >
              <ChevronLeft className="w-4 h-4" />
              上一节
            </Button>
            
            <Button
              variant="default"
              onClick={handleNext}
              disabled={!canGoNext}
              className="nav-button"
            >
              下一节
              <ChevronRight className="w-4 h-4" />
            </Button>
          </footer>
        </main>
      </div>

      {/* 遮罩层 */}
      {sidebarOpen && (
        <div 
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
