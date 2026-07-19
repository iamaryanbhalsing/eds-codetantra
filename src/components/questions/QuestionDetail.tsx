"use client";

import { CodeBlock } from "./CodeBlock";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionData {
  id: string;
  number: string;
  title: string;
  statement: string;
  code: string;
  topic: string;
}

interface QuestionDetailProps {
  question: QuestionData;
  prevQuestion: QuestionData | null;
  nextQuestion: QuestionData | null;
  onNavigate: (id: string) => void;
  color?: "brand" | "brandSecondary";
}

export function QuestionDetail({ question, prevQuestion, nextQuestion, onNavigate, color = "brand" }: QuestionDetailProps) {
  const accentColor = color === "brand" ? "text-brand" : "text-brandSecondary";
  const accentBg = color === "brand" ? "bg-brand/10 border-brand/20" : "bg-brandSecondary/10 border-brandSecondary/20";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className={`font-mono text-sm font-semibold ${accentColor}`}>
            {question.number}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${accentBg}`}>
            {question.topic}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
          {question.title}
        </h2>
      </div>

      {/* Statement */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Question
        </h3>
        <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
          {question.statement}
        </div>
      </div>

      {/* Code */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Solution
        </h3>
        <CodeBlock code={question.code} title={`${question.number}.py`} />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        {prevQuestion ? (
          <button
            onClick={() => onNavigate(prevQuestion.id)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{prevQuestion.number}</span>
            <span className="sm:hidden">Prev</span>
          </button>
        ) : (
          <div />
        )}
        {nextQuestion ? (
          <button
            onClick={() => onNavigate(nextQuestion.id)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="hidden sm:inline">{nextQuestion.number}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
