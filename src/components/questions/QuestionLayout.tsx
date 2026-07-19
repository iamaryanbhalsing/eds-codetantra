"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { SearchBar } from "./SearchBar";
import { TopicFilter } from "./TopicFilter";
import { QuestionList } from "./QuestionList";
import { QuestionDetail } from "./QuestionDetail";
import { Menu, X } from "lucide-react";

interface QuestionData {
  id: string;
  section: string;
  number: string;
  title: string;
  statement: string;
  code: string;
  topic: string;
  topicOrder: number;
}

interface QuestionLayoutProps {
  questions: QuestionData[];
  section: "theory" | "lab";
}

export function QuestionLayout({ questions, section }: QuestionLayoutProps) {
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const color = section === "theory" ? "brand" : "brandSecondary";

  const topics = useMemo(() => {
    const topicSet = new Map<string, number>();
    questions.forEach((q) => {
      if (!topicSet.has(q.topic)) {
        topicSet.set(q.topic, q.topicOrder);
      }
    });
    return Array.from(topicSet.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([topic]) => topic);
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        search === "" ||
        q.number.toLowerCase().includes(search.toLowerCase()) ||
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.topic.toLowerCase().includes(search.toLowerCase());
      const matchesTopic = activeTopic === "" || q.topic === activeTopic;
      return matchesSearch && matchesTopic;
    });
  }, [questions, search, activeTopic]);

  const selectedQuestion = filtered.find((q) => q.id === selectedId) || null;
  const selectedIdx = filtered.findIndex((q) => q.id === selectedId);
  const prevQuestion = selectedIdx > 0 ? filtered[selectedIdx - 1] : null;
  const nextQuestion = selectedIdx < filtered.length - 1 ? filtered[selectedIdx + 1] : null;

  useEffect(() => {
    if (!selectedId && filtered.length > 0) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    setSelectedId(null);
    setSearch("");
    setActiveTopic("");
  }, [section]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 relative z-10">
        <div className="mx-auto max-w-[1150px] px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-1">
              {section === "theory" ? "EDS Theory" : "EDS Lab"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} questions
              {activeTopic && ` in ${activeTopic}`}
              {search && ` matching "${search}"`}
            </p>
          </div>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50 border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            {sidebarOpen ? "Hide Questions" : "Show Questions"}
            <span className="text-xs opacity-60">({filtered.length})</span>
          </button>

          {/* Master-Detail Layout */}
          <div className="flex gap-6 relative">
            {/* Sidebar */}
            <div
              className={`w-full lg:w-80 shrink-0 ${
                sidebarOpen ? "block" : "hidden lg:block"
              } ${sidebarOpen ? "absolute inset-0 z-40 bg-background/95 backdrop-blur-lg lg:relative lg:bg-transparent lg:backdrop-blur-none" : ""}`}
            >
              <div className="space-y-4 lg:sticky lg:top-20">
                <SearchBar value={search} onChange={setSearch} />
                <TopicFilter
                  topics={topics}
                  activeTopic={activeTopic}
                  onSelect={setActiveTopic}
                  color={color}
                />
                <div className="question-sidebar max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  <QuestionList
                    questions={filtered}
                    selectedId={selectedId}
                    onSelect={(id) => {
                      setSelectedId(id);
                      setSidebarOpen(false);
                    }}
                    color={color}
                  />
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div className="flex-1 min-w-0">
              {selectedQuestion ? (
                <div className="glass-panel rounded-2xl p-5 sm:p-8">
                  <QuestionDetail
                    question={selectedQuestion}
                    prevQuestion={prevQuestion}
                    nextQuestion={nextQuestion}
                    onNavigate={setSelectedId}
                    color={color}
                  />
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-12 text-center text-muted-foreground text-sm">
                  {filtered.length === 0
                    ? "No questions match your search"
                    : "Select a question from the sidebar"}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
