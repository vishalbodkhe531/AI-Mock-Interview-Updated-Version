// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";

// // interface InterviewProps {
// //   title: string;
// //   role: string;
// //   description: string;
// //   experience: string;
// //   questions: {
// //     question: string;
// //     answer: string;
// //     isCompleted?: boolean;
// //   }[];
// // }

// // export default function InterviewPage() {
// //   return (
// //     <main className="min-h-screen px-6 md:px-20 py-12 bg-background text-foreground">
// //       {/* Header */}
// //       <section className="mb-10">
// //         <h1 className="text-3xl font-bold">{title}</h1>
// //         <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
// //           <InfoItem label="Job Position" value={role} />
// //           <InfoItem label="Experience" value={`${experience} year(s)`} />
// //           <InfoItem label="Skills / Description" value={description} />
// //         </div>
// //         <Separator className="mt-6" />
// //       </section>

// //       {/* Questions */}
// //       <section className="grid gap-6">
// //         {questions?.length > 0 ? (
// //           questions.map((item, index) => (
// //             <Card
// //               key={index}
// //               className="bg-muted/30 border border-border rounded-xl"
// //             >
// //               <CardContent className="p-6">
// //                 <div className="mb-2 flex justify-between items-start">
// //                   <h2 className="text-lg font-semibold text-primary">
// //                     Q{index + 1}. {item.question}
// //                   </h2>
// //                   {item.isCompleted && (
// //                     <Button variant="outline" className="text-xs">
// //                       Answered
// //                     </Button>
// //                   )}
// //                 </div>
// //                 <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-2">
// //                   {item.answer}
// //                 </p>
// //               </CardContent>
// //             </Card>
// //           ))
// //         ) : (
// //           <p className="text-muted-foreground">No questions available.</p>
// //         )}
// //       </section>
// //     </main>
// //   );
// // }

// // const InfoItem = ({ label, value }: { label: string; value: string }) => (
// //   <div>
// //     <h3 className="text-sm text-muted-foreground">{label}</h3>
// //     <p className="text-base font-medium">{value}</p>
// //   </div>
// // );

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// const sampleData = {
//   title: "Frontend Developer Interview",
//   role: "Frontend Developer",
//   description: "HTML, CSS, JavaScript, React, TypeScript, and UI/UX concepts.",
//   experience: "2",
//   questions: [
//     {
//       question: "What is the Virtual DOM in React?",
//       answer:
//         "The Virtual DOM is a lightweight JavaScript object that is a copy of the real DOM. React uses it to optimize DOM manipulation by updating the Virtual DOM first, then syncing changes with the actual DOM efficiently.",
//       isCompleted: true,
//     },
//     {
//       question: "What are React hooks?",
//       answer:
//         "Hooks are functions that let you use state and other React features without writing a class. For example, useState and useEffect are commonly used hooks.",
//     },
//     {
//       question: "What is the difference between Props and State?",
//       answer:
//         "Props are read-only and passed from parent to child. State is managed within the component and can change over time.",
//     },
//   ],
// };

// export default function InterviewPage() {
//   const { title, role, description, experience, questions } = sampleData;

//   return (
//     <main className="min-h-screen px-6 md:px-20 py-12 bg-background text-foreground">
//       {/* Header */}
//       <section className="mb-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-primary">{title}</h1>
//         <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           <InfoItem label="Job Position" value={role} />
//           <InfoItem label="Experience" value={`${experience} year(s)`} />
//           <InfoItem label="Skills / Description" value={description} />
//         </div>
//         <Separator className="mt-8" />
//       </section>

//       {/* Questions */}
//       <section className="grid gap-6">
//         {questions?.length > 0 ? (
//           questions.map((item, index) => (
//             <Card
//               key={index}
//               className="bg-muted/40 border border-border rounded-xl shadow-sm"
//             >
//               <CardContent className="p-6">
//                 <div className="mb-2 flex justify-between items-start">
//                   <h2 className="text-lg font-semibold text-primary">
//                     Q{index + 1}. {item.question}
//                   </h2>
//                   {item.isCompleted && (
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       className="text-xs rounded-full"
//                     >
//                       ✅ Answered
//                     </Button>
//                   )}
//                 </div>
//                 <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-2">
//                   {item.answer}
//                 </p>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <p className="text-muted-foreground">No questions available.</p>
//         )}
//       </section>
//     </main>
//   );
// }

// const InfoItem = ({ label, value }: { label: string; value: string }) => (
//   <div>
//     <h3 className="text-sm text-muted-foreground">{label}</h3>
//     <p className="text-base font-medium">{value}</p>
//   </div>
// );

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function InterviewListPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <main className="min-h-screen px-6 md:px-20 py-12 bg-background text-foreground">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-primary">
        Job Positions
      </h1>

      <div className="grid gap-6">
        {interviews.map((interview, index) => (
          <Card
            key={index}
            onClick={() => router.push("/questions/subQuestion")}
            className="bg-muted/40 border cursor-pointer border-border rounded-xl shadow-sm"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start ">
                <div>
                  <h2 className="text-xl font-semibold text-primary">
                    {interview.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {interview.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
