"use client";

import { useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAndAnsSection from "./_components/RecordAndAnsSection";
import { ParseResultType } from "@/types/user.types";

function StartInterview() {
  const [currentQuestion, setCurrentQuestion] = useState<ParseResultType>();
  const [isUpdated, setIsUpdated] = useState(0);

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 ">
      <QuestionSection
        setCurrentQuestion={setCurrentQuestion}
        isUpdated={isUpdated}
      />
      <RecordAndAnsSection
        currentQuestion={currentQuestion}
        setIsUpdated={setIsUpdated}
      />
    </div>
  );
}

export default StartInterview;
