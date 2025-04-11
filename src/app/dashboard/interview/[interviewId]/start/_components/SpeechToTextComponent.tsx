"use client";
import { Button } from "@/components/ui/button";
import { updateQuestionStatus } from "@/lib/user.action";
import { ParseResultType } from "@/types/user.types";
import { chatSession } from "@/utils/gemeniAIMode";
import { Mic, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import toast from "react-hot-toast";

const SpeechToTextComponent = ({
  currentQuestion,
}: {
  currentQuestion?: ParseResultType;
}) => {
  const [userAns, setUserAns] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    timeout: 10000000,
    speechRecognitionProperties: {
      lang: "en-US",
      interimResults: true,
    },
  });

  useEffect(() => {
    if (Array.isArray(results)) {
      const transcripts = results.map((result: any) =>
        typeof result === "string" ? result : result.transcript || ""
      );
      setUserAns(transcripts.join(" "));
    }
  }, [results]);

  const handleStartRecording = async () => {
    try {
      await startSpeechToText();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const handleStopRecording = () => {
    try {
      stopSpeechToText();
    } catch (err) {
      console.error("Error stopping recording:", err);
    }
  };

  const handleClickAns = async () => {
    if (userAns.trim().split(" ").length < 10) {
      toast.error("Speak at least 10 words");

      if (isRecording) {
        handleStopRecording();
      }

      setUserAns("");
      return;
    }

    setIsLoading(true);

    const prompt = `Question: "${currentQuestion?.question}"\nAnswer: "${userAns}"\n\nBased on the answer, give feedback and a rating out of 10. Respond in JSON format like:\n{\n  "rating": 8,\n  "feedback": "Your answer was clear but could include more real-world examples."\n}`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const textResponse = await result?.response?.text();

      if (!textResponse) throw new Error("Empty response");

      const formatted = textResponse.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(formatted);

      if (currentQuestion) {
        currentQuestion.AIfeedback = parsed;
        const { data } = await updateQuestionStatus({
          questionId: currentQuestion.id,
          AIfeedback: parsed,
        });
        console.log("dataFedback : ", data);
      }

      setUserAns("");
    } catch (err) {
      console.error("AI response error:", err);
      toast.error("Failed to process AI feedback. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) console.error("Speech to text error:", error);

  console.log("currentQuestion : ", currentQuestion);

  return (
    <div className="flex justify-center items-center mt-10 shadow-2xl my-7 border-l-2 p-10">
      <div className="flex flex-col gap-4 w-full">
        <Button
          disabled={currentQuestion?.isCompleted}
          className={`mt-10 w-full shadow-xl border-2 ${
            isRecording ? "py-7" : ""
          }`}
          variant="outline"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? (
            <div className="flex flex-col items-center text-red-600">
              <Mic className="animate-pulse" />
              <span>Recording...</span>
            </div>
          ) : (
            "Record Answer"
          )}
        </Button>

        <Button
          disabled={currentQuestion?.isCompleted || isLoading}
          onClick={handleClickAns}
          className="w-full"
          variant="outline"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Analyzing Answer...
            </div>
          ) : (
            "Show Answer"
          )}
        </Button>

        {interimResult && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <p className="text-gray-600">
              <strong>Current:</strong> {interimResult}
            </p>
          </div>
        )}

        {currentQuestion?.isCompleted && (
          <div className="mt-6 p-4 border rounded-md bg-green-50 shadow">
            <p className="font-semibold">
              Rating: {currentQuestion!.AIfeedback!.rating} / 10
            </p>
            <p className="text-gray-700 mt-2">
              {currentQuestion!.AIfeedback!.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToTextComponent;
