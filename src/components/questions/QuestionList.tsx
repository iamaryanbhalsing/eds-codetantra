"use client";

import { FileText } from "lucide-react";

interface Question {
  id: string;
  number: string;
  title: string;
  topic: string;
}

interface QuestionListProps {
  questions: Question[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  color?: "brand" | "brandSecondary";
}

export function QuestionList({ questions, selectedId, onSelect, color = "brand" }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No questions found
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {questions.map((q) => {
        const isSelected = q.id === selectedId;
        return (
          <button
            key={q.id}
            onClick={() => onSelect(q.id)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all group ${
              isSelected
                ? color === "brand"
                  ? "bg-brand/10 border border-brand/20 text-foreground"
                  : "bg-brandSecondary/10 border border-brandSecondary/20 text-foreground"
                : "border border-transparent hover:bg-white/[0.03] hover:border-border/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <FileText className={`h-4 w-4 mt-0.5 shrink-0 ${
                isSelected
                  ? color === "brand" ? "text-brand" : "text-brandSecondary"
                  : "text-muted-foreground/50 group-hover:text-muted-foreground"
              }`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs ${
                    isSelected
                      ? color === "brand" ? "text-brand" : "text-brandSecondary"
                      : "text-muted-foreground/60"
                  }`}>
                    {q.number}
                  </span>
                </div>
                <div className="truncate text-xs mt-0.5 opacity-70">{q.title}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
