"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchAllInterviews } from "@/lib/user.action";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Briefcase, Code, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, JSX } from "react";
import Loading from "./loading";

interface Interview {
  id: string;
  jobDesc: string;
  role: string;
  experience: string;
  questions: {
    id: string;
    question: string;
    answer: string;
    isCompleted: boolean;
  }[];
}

const roleIcons: Record<string, JSX.Element> = {
  "Frontend Developer": <Code className="text-primary w-6 h-6" />,
  "Backend Developer": <Database className="text-primary w-6 h-6" />,
};

const InterviewListPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await fetchAllInterviews({ id: user.id });
      setInterviewData(data || []);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      setInterviewData([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!user || loading) return <Loading />;

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
        {interviewData.map((interview) => (
          <motion.div
            key={interview.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className="bg-muted/40 border cursor-pointer hover:shadow-lg transition-shadow duration-300 border-border rounded-xl"
              onClick={() =>
                router.push(`/dashboard/interview/${interview.id}`)
              }
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    {roleIcons[interview.role] || (
                      <Briefcase className="text-primary w-6 h-6" />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold text-primary">
                        {interview.role}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {interview.jobDesc}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">{interview.experience}+ yrs</Button>
                </div>

                <Separator className="my-4" />

                <p className="text-sm text-muted-foreground">
                  {interview.jobDesc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default InterviewListPage;
