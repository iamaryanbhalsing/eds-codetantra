"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedMesh } from "@/components/background/AnimatedMesh";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { TypingText } from "@/components/ui/TypingText";
import { BookOpen, Code2, ChevronRight } from "lucide-react";
import theoryData from "@/data/theory.json";
import labData from "@/data/lab.json";

export default function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const theoryCount = theoryData.length;
  const labCount = labData.length;

  const theoryTopics = [...new Set(theoryData.map((q) => q.topic))];
  const labTopics = [...new Set(labData.map((q) => q.topic))];

  return (
    <>
      <AnimatedMesh />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section data-cursor-theme="dark" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
          <div className="reveal mx-auto max-w-[1150px] px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-brandSecondary hero-availability-dot" />
              CodeTantra Portal Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold tracking-tight mb-6">
              <span className="animated-gradient-text">EDS CodeTantra</span>
            </h1>

            <div className="text-lg sm:text-xl text-muted-foreground mb-8 h-8">
              <TypingText
                strings={[
                  "Python Theory & Lab Solutions",
                  "Complete CodeTantra Answers",
                  "EDS Practical + Theory",
                  "Ready to Copy & Submit",
                ]}
              />
            </div>

            <p className="text-muted-foreground/70 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
              All EDS questions and solutions from CodeTantra portal, organized into Theory and Lab sections.
              Working code with one-click copy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/theory"
                className="group neon-border inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand to-brand-soft text-background font-semibold text-sm transition-all hover:shadow-lg hover:shadow-brand/25"
              >
                <BookOpen className="h-4 w-4" />
                EDS Theory
                <span className="text-xs opacity-80">({theoryCount} questions)</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/lab"
                className="group neon-border inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brandSecondary to-brandSecondary-dark text-background font-semibold text-sm transition-all hover:shadow-lg hover:shadow-brandSecondary/25"
              >
                <Code2 className="h-4 w-4" />
                EDS Lab
                <span className="text-xs opacity-80">({labCount} questions)</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {[
                { value: theoryCount, label: "Theory Questions" },
                { value: labCount, label: "Lab Questions" },
                { value: theoryTopics.length + labTopics.length, label: "Topics Covered" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    {stat.value}+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-section-transition" />
        </section>

        {/* Topics Overview */}
        <section data-cursor-theme="dark" className="py-20">
          <div className="reveal mx-auto max-w-[1150px] px-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-3">
              Topics Covered
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-sm">
              Everything you need for EDS on CodeTantra
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theory Topics */}
              <div className="glass-panel rounded-2xl p-6 neon-border">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">EDS Theory</h3>
                    <p className="text-xs text-muted-foreground">{theoryCount} questions &middot; {theoryTopics.length} topics</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {theoryTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full text-xs bg-brand/5 text-brand/80 border border-brand/10"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <Link
                  href="/theory"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-soft transition-colors"
                >
                  Browse Theory <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Lab Topics */}
              <div className="glass-panel rounded-2xl p-6 neon-border">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-brandSecondary/10 flex items-center justify-center">
                    <Code2 className="h-5 w-5 text-brandSecondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">EDS Lab</h3>
                    <p className="text-xs text-muted-foreground">{labCount} questions &middot; {labTopics.length} topics</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {labTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full text-xs bg-brandSecondary/5 text-brandSecondary/80 border border-brandSecondary/10"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <Link
                  href="/lab"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-brandSecondary hover:text-brandSecondary-dark transition-colors"
                >
                  Browse Lab <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
