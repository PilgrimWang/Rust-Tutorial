import { useEffect, useState } from 'react';
import { Trophy, Target, TrendingUp, BookOpen, Download } from 'lucide-react';
import { rustTutorialData } from '@/data/rustTutorial';
import type { QuizProgress } from '@/components/SectionQuiz';
import { Button } from '@/components/ui/button';

interface ProgressTrackerProps {
  completedItems: Set<string>;
  quizProgress: QuizProgress;
}

function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ProgressTracker({ completedItems, quizProgress }: ProgressTrackerProps) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    percentage: 0,
    sections: 0,
    completedSections: 0,
    quizzesPassed: 0,
  });

  useEffect(() => {
    const total = rustTutorialData.reduce(
      (acc, section) => acc + section.content.length,
      0
    );
    
    const completed = completedItems.size;
    const percentage = Math.round((completed / total) * 100);
    
    const sections = rustTutorialData.length;
    const completedSections = rustTutorialData.filter(section => {
      const allLessonsDone = section.content.every(content =>
        completedItems.has(`${section.id}-${content.id}`)
      );
      const quizPassed = !!quizProgress[section.id]?.passed;
      return allLessonsDone && quizPassed;
    }).length;

    const quizzesPassed = rustTutorialData.filter(section => !!quizProgress[section.id]?.passed).length;

    setStats({
      total,
      completed,
      percentage,
      sections,
      completedSections,
      quizzesPassed,
    });
  }, [completedItems, quizProgress]);

  const exportReport = () => {
    const now = new Date();
    const iso = now.toISOString();

    const sections = rustTutorialData.map(section => {
      const totalLessons = section.content.length;
      const completedLessons = section.content.reduce((acc, c) => acc + (completedItems.has(`${section.id}-${c.id}`) ? 1 : 0), 0);
      const lessonPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

      const qp = quizProgress[section.id];
      return {
        id: section.id,
        title: section.title,
        lessons: { completed: completedLessons, total: totalLessons, percent: lessonPercent },
        quiz: qp
          ? { passed: qp.passed, bestPercent: qp.bestPercent, attempts: qp.attempts, lastAttemptAt: qp.lastAttemptAt }
          : { passed: false, bestPercent: 0, attempts: 0, lastAttemptAt: null as string | null },
      };
    });

    const report = {
      generatedAt: iso,
      rustTarget: "1.75+",
      summary: {
        lessons: { completed: stats.completed, total: stats.total, percent: stats.percentage },
        quizzesPassed: stats.quizzesPassed,
        completedSections: stats.completedSections,
        totalSections: stats.sections,
      },
      sections,
    };

    const mdLines: string[] = [];
    mdLines.push(`# Rust 学习报告`);
    mdLines.push(``);
    mdLines.push(`生成时间：${iso}`);
    mdLines.push(`目标版本：Rust ${report.rustTarget}`);
    mdLines.push(``);
    mdLines.push(`## 总览`);
    mdLines.push(`- 课程进度：${report.summary.lessons.completed}/${report.summary.lessons.total}（${report.summary.lessons.percent}%）`);
    mdLines.push(`- 通过测验：${report.summary.quizzesPassed}/${report.summary.totalSections}`);
    mdLines.push(`- 完成章节（学完+测验通过）：${report.summary.completedSections}/${report.summary.totalSections}`);
    mdLines.push(``);
    mdLines.push(`## 章节明细`);
    for (const s of sections) {
      mdLines.push(`- ${s.title}（${s.id}）：课程 ${s.lessons.completed}/${s.lessons.total}（${s.lessons.percent}%），测验最佳 ${s.quiz.bestPercent}%${s.quiz.passed ? "（已通过）" : "（未通过）"}`);
    }
    mdLines.push(``);

    downloadTextFile(`rust-learning-report-${iso.slice(0, 10)}.json`, JSON.stringify(report, null, 2), 'application/json;charset=utf-8');
    downloadTextFile(`rust-learning-report-${iso.slice(0, 10)}.md`, mdLines.join('\n'), 'text/markdown;charset=utf-8');
  };

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <Trophy className="progress-trophy w-5 h-5" />
        <h3>学习进度</h3>
        <Button
          variant="ghost"
          size="icon-sm"
          className="progress-export"
          onClick={exportReport}
          title="导出学习报告（JSON + Markdown）"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="progress-stats">
        <div className="stat-item">
          <div className="stat-icon-wrapper blue">
            <Target className="stat-icon w-4 h-4" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.completed}/{stats.total}</span>
            <span className="stat-label">已完成</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon-wrapper green">
            <TrendingUp className="stat-icon w-4 h-4" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.percentage}%</span>
            <span className="stat-label">总进度</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon-wrapper purple">
            <BookOpen className="stat-icon w-4 h-4" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.quizzesPassed}/{stats.sections}</span>
            <span className="stat-label">测验通过</span>
          </div>
        </div>
      </div>
      
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar" 
          style={{ width: `${stats.percentage}%` }}
        />
      </div>
      
      {stats.completedSections === stats.sections && stats.sections > 0 && (
        <div className="completion-message">
          <Trophy className="completion-trophy w-6 h-6" />
          <p>恭喜！你已完成所有章节并通过测验！</p>
        </div>
      )}
    </div>
  );
}
