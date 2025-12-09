"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createInterview } from "@/lib/user.action";

import { formType, UserDataType } from "@/types/user.types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const formSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters").max(50),
  jobDesc: z.string().min(10, "Description must be at least 10 characters"),
  experience: z
    .string()
    .regex(/^\d+$/, "Experience must be a number")
    .refine((val) => parseInt(val) >= 0, "Experience cannot be negative"),
});

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      jobDesc: "",
      experience: "",
    },
  });

  const { handleSubmit, reset } = form;

  // this was for gemini
  // const onSubmit = async (data: formType) => {
  //   setLoading(true);
  //   try {
  //     const inputPrompt = `Job Position: ${data.role}, Job Skills: ${data.jobDesc}, Years of Experience: ${data.experience}. Based on this, provide 7 interview questions with answers in JSON format. Structure: [{ "question": "...", "answer": "...", "AIfeedback": {} }].`;

  //     const result = await chatSession.sendMessage(inputPrompt);

  //     if (!result || !result.response) {
  //       toast.error("Something went wrong. Please try again.");
  //       return;
  //     }


  //     const textResponse = await result.response.text();
  //     const formattedResponse = textResponse
  //       .replace("```json", "")
  //       .replace("```", "")
  //       .trim();

  //     let parsedQuestions;
  //     try {
  //       parsedQuestions = JSON.parse(formattedResponse);
  //     } catch (jsonError) {
  //       console.error("Error parsing AI response:", jsonError);
  //       toast.error("Invalid AI response format. Please try again.");
  //       return;
  //     }

  //     if (!Array.isArray(parsedQuestions)) {
  //       toast.error("AI did not return questions in expected format.");
  //       return;
  //     }

  //     const userInfo: UserDataType = {
  //       userId: user!.id,
  //       userName: user!.fullName!,
  //       profilePic: user!.imageUrl,
  //       jobDesc: data.jobDesc,
  //       role: data.role,
  //       experience: data.experience,
  //     };

  //     const apiResponse = await createInterview({
  //       parseResult: parsedQuestions,
  //       userInfo,
  //     });

  //     toast.success(apiResponse.message);
  //     router.push(`/dashboard/interview/${apiResponse.mockId}`);
  //   } catch (error) {
  //     console.error("Interview generation error:", error);
  //     toast.error("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //     setOpenDailog(false);
  //   }
  // };

  const onSubmit = async (data: formType) => {
    setLoading(true);

    try {
      const inputPrompt = `
Job Position: ${data.role}
Job Skills: ${data.jobDesc}
Years of Experience: ${data.experience}

Generate exactly 7 interview questions in strict JSON format:

[
  { "question": "...", "answer": "...", "AIfeedback": {} },
  ...
]

Return ONLY the JSON array — do NOT include markdown or surrounding text.
`;

      const resp = await fetch("/api/openrouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      console.log("resp : ", resp);


      const json = await resp.json();

      if (!json.success) {
        console.error("OpenRouter server failed:", json);
        toast.error(json.error || "AI request failed");
        return;
      }

      let textResponse: string = json.text ?? "";
      if (!textResponse) {
        toast.error("AI returned empty response");
        return;
      }

      const formattedResponse = textResponse
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      let parsedQuestions: any;
      try {
        parsedQuestions = JSON.parse(formattedResponse);
      } catch (parseErr) {
        console.error("Failed to parse AI JSON:", parseErr, formattedResponse);
        toast.error("AI returned invalid JSON. Try again or refine the prompt.");
        return;
      }

      if (!Array.isArray(parsedQuestions)) {
        toast.error("AI did not return a JSON array of questions.");
        return;
      }

      const userInfo: UserDataType = {
        userId: user!.id,
        userName: user!.fullName ?? user!.username ?? "Unknown",
        profilePic: user!.imageUrl,
        jobDesc: data.jobDesc,
        role: data.role,
        experience: data.experience,
      };

      const apiResponse = await createInterview({
        parseResult: parsedQuestions,
        userInfo,
      });

      toast.success(apiResponse.message || "Interview created");
      router.push(`/dashboard/interview/${apiResponse.mockId}`);
    } catch (err) {
      console.error("onSubmit error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setOpenDailog(false);
    }
  };


  const handleClose = () => {
    setOpenDailog(false);
    reset();
  };

  return (
    <div className="w-full">
      <div
        className="p-10 border rounded-xl bg-secondary text-secondary-foreground hover:scale-105 hover:shadow-xl cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h1 className="text-lg">+ Add new</h1>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl bg-background text-foreground border-2">
          <DialogHeader>
            <DialogTitle>
              Tell us more about your job which you are interviewing for
            </DialogTitle>
            <DialogDescription>
              Add more information about your job position/role, description,
              and years of experience.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-3">Job/Role Position</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your Role"
                        {...field}
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-3">
                      Job Description / Skills
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your skills"
                        {...field}
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-3">Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Your Experience"
                        {...field}
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-5 mt-5">
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Generating from the AI...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
