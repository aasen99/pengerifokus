"use client";

import { useMemo, useState } from "react";
import { rontgenQuestions } from "@/data/okonomisk-rontgen";
import {
  calculateRontgenResult,
  type RontgenAnswers,
} from "@/lib/okonomisk-rontgen";
import { RontgenIntro } from "@/components/verktoy/okonomisk-rontgen/RontgenIntro";
import { RontgenQuestionView } from "@/components/verktoy/okonomisk-rontgen/RontgenQuestionView";
import { RontgenResultView } from "@/components/verktoy/okonomisk-rontgen/RontgenResultView";

type RontgenPhase = "intro" | "quiz" | "result";

export function OkonomiskRontgen() {
  const [phase, setPhase] = useState<RontgenPhase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<RontgenAnswers>({});

  const currentQuestion = rontgenQuestions[questionIndex];

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return calculateRontgenResult(answers);
  }, [phase, answers]);

  const handleStart = () => {
    setPhase("quiz");
    setQuestionIndex(0);
    setAnswers({});
  };

  const handleSelect = (points: number) => {
    if (!currentQuestion) return;

    const nextAnswers = { ...answers, [currentQuestion.id]: points };
    setAnswers(nextAnswers);

    if (questionIndex < rontgenQuestions.length - 1) {
      setQuestionIndex((index) => index + 1);
      return;
    }

    setPhase("result");
  };

  const handleBack = () => {
    if (questionIndex === 0) return;
    setQuestionIndex((index) => index - 1);
  };

  const handleRestart = () => {
    setPhase("intro");
    setQuestionIndex(0);
    setAnswers({});
  };

  if (phase === "intro") {
    return <RontgenIntro onStart={handleStart} />;
  }

  if (phase === "result" && result) {
    return <RontgenResultView result={result} onRestart={handleRestart} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <RontgenQuestionView
      question={currentQuestion}
      questionIndex={questionIndex}
      totalQuestions={rontgenQuestions.length}
      selectedPoints={answers[currentQuestion.id]}
      onSelect={handleSelect}
      onBack={handleBack}
      canGoBack={questionIndex > 0}
    />
  );
}
