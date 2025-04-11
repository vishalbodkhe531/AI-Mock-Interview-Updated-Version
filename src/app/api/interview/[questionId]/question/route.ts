// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { questionId: string } }
// ) {
//   try {
//     const { questionId } = await params;

//     console.log("questionId : ", questionId);

//     const { AIfeedback } = await req.json();

//     if (!questionId) {
//       return NextResponse.json(
//         { error: "InvalquestionId question questionId" },
//         { status: 400 }
//       );
//     }

//     const updated = await prisma.mockQuestion.update({
//       where: { questionId },
//       data: {
//         isCompleted: true,
//         AIfeedback,
//       },
//     });

//     console.log("updated : ", updated);

//     return NextResponse.json({
//       success: true,
//       message: "Question marked as completed",
//       data: updated,
//     });
//   } catch (error: any) {
//     console.error("Update failed:", error.message);
//     return NextResponse.json(
//       { error: "Failed to update question", details: error.message },
//       { status: 500 }
//     );
//   }
// }
// /app/api/interview/[questionId]/question/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const { questionId } = params;
    const { AIfeedback } = await req.json();

    if (!questionId) {
      return NextResponse.json(
        { error: "Invalid question ID" },
        { status: 400 }
      );
    }

    const updated = await prisma.mockQuestion.update({
      where: { id: questionId },
      data: {
        isCompleted: true,
        AIfeedback,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Question marked as completed",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update question", details: error.message },
      { status: 500 }
    );
  }
}
