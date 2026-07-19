"use client";

import { QuestionLayout } from "@/components/questions/QuestionLayout";
import labData from "@/data/lab.json";

export default function LabPage() {
  return <QuestionLayout questions={labData} section="lab" />;
}
