"use server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
