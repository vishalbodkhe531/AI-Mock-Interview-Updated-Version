"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { parseResult, userInfo } = await req.json();
    const { userId, userName, profilePic, jobDesc, role, experience } =
      userInfo;

    let user = await prisma.user.findUnique({
      where: { uid: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          uid: userId,
          userName,
          profilePic,
        },
      });
    }

    const mockInterview = await prisma.mockInterview.create({
      data: {
        userId,
        jobDesc,
        role,
        experience,
        questions: {
          create: parseResult.map((question: any) => ({
            question: question.question,
            answer: question.answer,
            isCompleted: false,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json({
      success: true,
      mockId: mockInterview.id,
      message: "Interview and questions successfully created",
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { error: "Error while storing interview data" },
      { status: 500 }
    );
  }
}
