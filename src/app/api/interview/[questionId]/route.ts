"use server";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await prisma.mockInterview.findUnique({
      where: { id: questionId },
      include: {
        questions: true,
        user: {
          select: {
            userName: true,
            profilePic: true,
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result,
      message: "Data successfully fetched",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while fetching interview data" },
      { status: 500 }
    );
  }
}

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
