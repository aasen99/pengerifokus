"use client";

import { useEffect, useMemo } from "react";
import { rontgenQuestions } from "@/data/okonomisk-rontgen";
import {
  calculateRontgenResult,
  type RontgenAnswers,
} from "@/lib/okonomisk-rontgen";
import { useToolPersistence } from "@/lib/verktoy-persistence";
import { RontgenIntro } from "@/components/verktoy/okonomisk-rontgen/RontgenIntro";
import { RontgenQuestionView } from "@/components/verktoy/okonomisk-rontgen/RontgenQuestionView";
import { RontgenResultView } from "@/components/verktoy/okonomisk-rontgen/RontgenResultView";

type RontgenPhase = "intro" | "quiz" | "result";

interface RontgenState {
  phase: RontgenPhase;
  questionIndex: number;
  answers: RontgenAnswers;
  [key: string]: unknown;
}

const DEFAULT_STATE: RontgenState = {
  phase: "intro",
  questionIndex: 0,
  answers: {},
};

export function OkonomiskRontgen() {
  const { state, setState, clearSaved } = useToolPersistence<RontgenState>(
    "okonomisk-rontgen",
    DEFAULT_STATE,
  );

  const { phase, questionIndex, answers } = state;
  const currentQuestion = rontgenQuestions[questionIndex];

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return calculateRontgenResult(answers);
  }, [phase, answers]);

  useEffect(() => {
    if (phase !== "result") return;
    if (calculateRontgenResult(answers)) return;
    setState((prev) => ({ ...prev, phase: "intro", questionIndex: 0 }));
  }, [phase, answers, setState]);

  const handleStart = () => {
    setState({
      phase: "quiz",
      questionIndex: 0,
      answers: {},
    });
  };

  const handleSelect = (points: number) => {
    if (!currentQuestion) return;

    const nextAnswers = { ...answers, [currentQuestion.id]: points };

    if (questionIndex < rontgenQuestions.length - 1) {
      setState({
        phase: "quiz",
        questionIndex: questionIndex + 1,
        answers: nextAnswers,
      });
      return;
    }

    setState({
      phase: "result",
      questionIndex,
      answers: nextAnswers,
    });
  };

  const handleBack = () => {
    if (questionIndex === 0) return;
    setState((prev) => ({
      ...prev,
      questionIndex: prev.questionIndex - 1,
    }));
  };

  if (phase === "intro") {
    return <RontgenIntro onStart={handleStart} />;
  }

  if (phase === "result" && result) {
    return <RontgenResultView result={result} onRestart={clearSaved} />;
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
