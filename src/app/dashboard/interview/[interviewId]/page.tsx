"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

function Interview() {
  const params = useParams();
  const [webCamEnable, setWebCamEnable] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-10 mt-10 select-none font-sans">
      <h3 className="text-3xl font-bold text-center mb-6">
        Let’s Get Started!
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-muted/30 border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 text-sm"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 text-primary">
            <Lightbulb className="w-5 h-5" />
            Interview Guide
          </h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>
              This mock interview is powered by AI and includes{" "}
              <strong>7 thoughtful questions</strong>.
            </li>
            <li>
              Your <strong>Webcam and Microphone</strong> access is needed for a
              better assessment experience.
            </li>
            <li>
              At the end of the interview, you'll receive a personalized
              performance <strong>report</strong>.
            </li>
            <li>
              <strong>We don’t record or store</strong> any video or audio. Your
              privacy is fully respected.
            </li>
            <li>
              You can <strong>enable/disable access</strong> to the webcam or
              mic at any time.
            </li>
          </ul>
          <p className="text-xs text-muted-foreground">
            Tip: Try to find a quiet place with good lighting for best results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          {webCamEnable ? (
            <div className=" flex justify-center flex-col items-center">
              <Webcam
                mirrored={true}
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(true)}
                style={{ height: 300 }}
              />
              <Button
                onClick={() => setWebCamEnable(false)}
                className="cursor-pointer"
              >
                Disable Web Cam and Microphone
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 rounded-lg">
              <WebcamIcon className="h-64 border-2  p-5 rounded-xl w-full text-[10rem]" />
              <Button
                onClick={() => setWebCamEnable(true)}
                className="cursor-pointer"
                variant={"link"}
              >
                Enable Web Cam and Microphone
              </Button>
              <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button
                  className="w-full cursor-pointer "
                  variant={"secondary"}
                >
                  Start Interview
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Interview;
