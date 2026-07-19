"use client";

import { QuestionLayout } from "@/components/questions/QuestionLayout";
import theoryData from "@/data/theory.json";

export default function TheoryPage() {
  return <QuestionLayout questions={theoryData} section="theory" />;
}
