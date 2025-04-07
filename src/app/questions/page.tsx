"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Briefcase, Code, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

interface Interview {
  title: string;
  role: string;
  description: string;
  experience: string;
  questions: {
    question: string;
    answer: string;
    isCompleted?: boolean;
  }[];
}

const interviews: Interview[] = [
  {
    title: "Frontend Developer Interview",
    role: "Frontend Developer",
    description: "React, JavaScript, TypeScript, CSS, UX/UI",
    experience: "2",
    questions: [
      {
        question: "What is the Virtual DOM in React?",
        answer:
          "The Virtual DOM is a programming concept where a virtual representation of the UI is kept in memory.",
        isCompleted: true,
      },
      {
        question: "What are React hooks?",
        answer:
          "Hooks let you use state and lifecycle methods in functional components.",
      },
    ],
  },
  {
    title: "Backend Developer Interview",
    role: "Backend Developer",
    description: "Node.js, Express, MongoDB, REST APIs",
    experience: "3",
    questions: [
      {
        question: "What is middleware in Express?",
        answer:
          "Middleware functions are functions that have access to the request and response objects.",
        isCompleted: true,
      },
    ],
  },
];

const roleIcons: Record<string, JSX.Element> = {
  "Frontend Developer": <Code className="text-primary w-6 h-6" />,
  "Backend Developer": <Database className="text-primary w-6 h-6" />,
};

export default function InterviewListPage() {
  // const router = useRouter();

  return (
    <main className="min-h-screen px-6 md:px-20 py-12 bg-background text-foreground select-none">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-10 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Job Positions
      </motion.h1>

      <div className="grid gap-6">
        {interviews.map((interview, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              // onClick={() => router.push("/questions/subQuestion")}
              className="bg-muted/40 border cursor-pointer hover:shadow-lg transition-shadow duration-300 border-border rounded-xl"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    {roleIcons[interview.role] || (
                      <Briefcase className="text-primary w-6 h-6" />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold text-primary">
                        {interview.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {interview.role}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">{interview.experience}+ yrs</Button>
                </div>

                <Separator className="my-4" />

                <p className="text-sm text-muted-foreground">
                  {interview.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
