"use client";

import { Button } from "@/components/ui/button";
import { fetchInterview } from "@/lib/user.action";
import { ParseResultType } from "@/types/user.types";
import { Lightbulb, LightbulbOffIcon, Volume2, VolumeOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

function QuestionSection({
  setCurrentQuestion,
}: {
  setCurrentQuestion: (item: ParseResultType) => void;
}) {
  const { interviewId } = useParams();
  const router = useRouter();

  const [interviewData, setInterviewData] = useState<ParseResultType[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  console.log(interviewData);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!interviewId) return;

    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await fetchInterview({ id: interviewId as string });
        console.log(res);
        const { jsonMockResp } = res?.result;
        if (jsonMockResp?.length) {
          setInterviewData(jsonMockResp);
          setCurrentQuestion(jsonMockResp[0]);
        }
      } catch (error) {
        console.error("Error fetching interview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [interviewId, setCurrentQuestion]);

  const textToSpeech = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) {
      toast.error("Speech synthesis not supported");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    speechSynthesis.cancel(); // cancel any ongoing speech before starting new
    speechSynthesis.speak(speech);

    setIsSpeaking(true);
    speechRef.current = speech;
  }, []);

  const handleQuestionClick = useCallback(
    (item: ParseResultType, idx: number) => {
      if (speechSynthesis.speaking) speechSynthesis.cancel();
      setHint(false); // reset hint
      setCurrentQuestion(item);
      setActiveQuestionIdx(idx);
      setIsSpeaking(false);
    },
    [setCurrentQuestion]
  );

  const activeQuestion = useMemo(
    () => interviewData[activeQuestionIdx],
    [interviewData, activeQuestionIdx]
  );

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (interviewData.length === 0) {
    return (
      <div className="text-center mt-20">
        <h3 className="text-xl font-bold">No data found</h3>
        <Button
          className="bg-blue-500 text-white mt-4 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Give interview
        </Button>
      </div>
    );
  }

  return (
    // <div className="flex flex-col mt-10 shadow-2xl my-7 border-r-2 p-6 ">
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center border p-5 md:p-7 rounded-lg">
    //     {interviewData.map((item, idx) => (
    //       <div
    //         key={idx}
    //         className="cursor-pointer rounded-xl flex flex-col justify-center items-center text-center"
    //         onClick={() => handleQuestionClick(item, idx)}
    //       >
    //         <div className="flex">
    //           <Button
    //             className={
    //               item.isCompleted
    //                 ? "bg-green-700 text-white"
    //                 : `cursor-pointer ${
    //                     activeQuestionIdx === idx
    //                       ? "bg-gray-600 text-white"
    //                       : "border-gray-300"
    //                   }`
    //             }
    //           >
    //             Question {idx + 1}
    //           </Button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {activeQuestion && (
    //     <div className="mt-3 font-medium">
    //       <div className="flex justify-end my-4">
    //         {activeQuestion.isCompleted || isSpeaking ? (
    //           <VolumeOff
    //             size={37}
    //             className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
    //             onClick={() => {
    //               setIsSpeaking(false);
    //               speechSynthesis.cancel();
    //             }}
    //           />
    //         ) : (
    //           <Volume2
    //             size={37}
    //             className="cursor-pointer p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
    //             onClick={() => textToSpeech(activeQuestion.question)}
    //           />
    //         )}

    //         {!activeQuestion.isCompleted && !hint ? (
    //           <Lightbulb
    //             size={37}
    //             className="cursor-pointer p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
    //             onClick={() => setHint(true)}
    //           />
    //         ) : (
    //           <LightbulbOffIcon
    //             size={37}
    //             className="cursor-pointer p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600"
    //             onClick={() => setHint(false)}
    //           />
    //         )}
    //       </div>

    //       <p>{!activeQuestion.isCompleted && activeQuestion?.question}</p>

    //       {hint && (
    //         <div className="bg-yellow-100 mt-4 rounded-lg">
    //           {activeQuestion?.answer}
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </div>
    <div className="flex flex-col mt-10 shadow-2xl my-7 border-r-2 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center border p-5 md:p-7 rounded-lg border-gray-200 dark:border-gray-700">
        {interviewData.map((item, idx) => (
          <div
            key={idx}
            className="cursor-pointer rounded-xl flex flex-col justify-center items-center text-center"
            onClick={() => handleQuestionClick(item, idx)}
          >
            <div className="flex">
              <Button
                className={
                  item.isCompleted
                    ? "bg-green-700 text-white"
                    : `cursor-pointer ${
                        activeQuestionIdx === idx
                          ? "bg-gray-600 text-white"
                          : "border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                      }`
                }
              >
                Question {idx + 1}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {activeQuestion && (
        <div className="mt-3 font-medium">
          <div className="flex justify-end my-4">
            {activeQuestion.isCompleted || isSpeaking ? (
              <VolumeOff
                size={37}
                className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
                onClick={() => {
                  setIsSpeaking(false);
                  speechSynthesis.cancel();
                }}
              />
            ) : (
              <Volume2
                size={37}
                className="cursor-pointer p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                onClick={() => textToSpeech(activeQuestion.question)}
              />
            )}

            {!activeQuestion.isCompleted && !hint ? (
              <Lightbulb
                size={37}
                className="cursor-pointer p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                onClick={() => setHint(true)}
              />
            ) : (
              <LightbulbOffIcon
                size={37}
                className="cursor-pointer p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600"
                onClick={() => setHint(false)}
              />
            )}
          </div>

          <p className="text-black dark:text-white">
            {!activeQuestion.isCompleted && activeQuestion?.question}
          </p>

          {hint && (
            <div className="bg-yellow-100 dark:bg-yellow-900 mt-4 rounded-lg text-black dark:text-white p-3">
              {activeQuestion?.answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
