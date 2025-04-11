import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const { questionId } = await params;
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
