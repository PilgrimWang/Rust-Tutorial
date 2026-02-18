import { useMemo, useState } from "react";
import { CheckCircle, Info, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import type { SectionQuiz as SectionQuizModel, QuizQuestion } from "@/data/sectionQuizzes";
import { sectionQuizzes } from "@/data/sectionQuizzes";

export interface QuizProgressItem {
  bestPercent: number;
  passed: boolean;
  attempts: number;
  lastAttemptAt: string; // ISO
}

export type QuizProgress = Record<string, QuizProgressItem>;

interface SectionQuizProps {
  sectionId: string;
  sectionTitle: string;
  quizProgress: QuizProgress;
  onUpdateProgress: (next: QuizProgress) => void;
}

type Answers = Record<string, string[]>;

function scoreQuiz(quiz: SectionQuizModel, answers: Answers) {
  let correct = 0;
  for (const q of quiz.questions) {
    const selected = new Set(answers[q.id] ?? []);
    const expected = new Set(q.answer);
    const ok = selected.size === expected.size && [...expected].every(x => selected.has(x));
    if (ok) correct += 1;
  }
  const total = quiz.questions.length;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}

function toggleMulti(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
}

export function SectionQuiz({ sectionId, sectionTitle, quizProgress, onUpdateProgress }: SectionQuizProps) {
  const quiz = sectionQuizzes[sectionId] ?? null;

  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!quiz) return null;
    return scoreQuiz(quiz, answers);
  }, [answers, quiz]);

  const best = quizProgress[sectionId];
  const passPercent = quiz?.passPercent ?? 90;

  const handleSelect = (q: QuizQuestion, optionId: string) => {
    setAnswers(prev => {
      const current = prev[q.id] ?? [];
      const next =
        q.type === "multi" ? toggleMulti(current, optionId) : [optionId];
      return { ...prev, [q.id]: next };
    });
  };

  const handleSubmit = () => {
    if (!quiz) return;
    setSubmitted(true);

    const nowIso = new Date().toISOString();
    const percent = scoreQuiz(quiz, answers).percent;
    const passed = percent >= passPercent;
    const prev = quizProgress[sectionId];
    const bestPercent = Math.max(prev?.bestPercent ?? 0, percent);

    onUpdateProgress({
      ...quizProgress,
      [sectionId]: {
        bestPercent,
        passed: prev?.passed ? true : passed,
        attempts: (prev?.attempts ?? 0) + 1,
        lastAttemptAt: nowIso,
      },
    });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (!quiz) {
    return (
      <article className="quiz-viewer">
        <header className="quiz-header">
          <h1 className="quiz-title">{sectionTitle} · 章节测验</h1>
          <p className="quiz-subtitle">题库建设中：该章节暂未提供测验。</p>
        </header>
      </article>
    );
  }

  const passNow = (result?.percent ?? 0) >= passPercent;

  return (
    <article className="quiz-viewer">
      <header className="quiz-header">
        <h1 className="quiz-title">{quiz.title}</h1>
        <p className="quiz-subtitle">
          本测验共 {quiz.questions.length} 题，通过线：{passPercent}%。
          {best && (
            <span className="quiz-best">
              最佳：{best.bestPercent}%（尝试 {best.attempts} 次）
            </span>
          )}
        </p>
      </header>

      {submitted && result && (
        <div className={`quiz-result ${passNow ? "pass" : "fail"}`}>
          {passNow ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <div className="quiz-result-text">
            <div className="quiz-result-main">
              得分：{result.correct}/{result.total}（{result.percent}%）
            </div>
            <div className="quiz-result-sub">
              {passNow ? "已通过本章节测验。" : "未达通过线，建议回看错题后重做。"}
            </div>
          </div>
          <div className="quiz-result-actions">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
              重做
            </Button>
          </div>
        </div>
      )}

      <div className="quiz-questions">
        {quiz.questions.map((q, idx) => {
          const selected = answers[q.id] ?? [];
          const isMulti = q.type === "multi";
          const isSubmitted = submitted;

          return (
            <section key={q.id} className="quiz-question">
              <div className="quiz-question-title">
                <span className="quiz-q-index">Q{idx + 1}.</span>
                <span className="quiz-q-prompt">{q.prompt}</span>
                <span className="quiz-q-meta">{isMulti ? "多选" : q.type === "tf" ? "判断" : "单选"}</span>
              </div>

              {q.code && (
                <div className="quiz-q-code">
                  <CodeBlock code={q.code} language="rust" showOutput={false} />
                </div>
              )}

              <div className="quiz-options">
                {q.options.map(opt => {
                  const active = selected.includes(opt.id);
                  let status: "neutral" | "correct" | "wrong" = "neutral";
                  if (isSubmitted) {
                    const expected = q.answer.includes(opt.id);
                    if (expected) status = "correct";
                    else if (active) status = "wrong";
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`quiz-option ${active ? "active" : ""} ${isSubmitted ? status : ""}`}
                      onClick={() => handleSelect(q, opt.id)}
                      disabled={isSubmitted}
                    >
                      <span className="quiz-option-marker">{isMulti ? (active ? "☑" : "☐") : active ? "◉" : "○"}</span>
                      <span className="quiz-option-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && q.explanation && (
                <div className="quiz-explanation">
                  <Info className="w-4 h-4" />
                  <span>{q.explanation}</span>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {!submitted && result && (
        <footer className="quiz-footer">
          <div className="quiz-live-score">
            当前：已答 {Object.keys(answers).length}/{quiz.questions.length}
          </div>
          <div className="quiz-footer-actions">
            <Button variant="outline" onClick={handleReset}>
              重置
            </Button>
            <Button onClick={handleSubmit}>
              提交测验
            </Button>
          </div>
        </footer>
      )}
    </article>
  );
}
