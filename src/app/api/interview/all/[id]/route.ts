"use server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await prisma.mockInterview.findMany({
      where: { userId: id },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            isCompleted: true,
            answer: true,
          },
        },
      },
    });

    if (!result || result.length === 0) {
      return NextResponse.json({
        success: true,
        interviews: [],
        message: "No interviews found",
      });
    }

    return NextResponse.json({
      success: true,
      interviews: result,
      message: "Interviews successfully fetched",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while fetching interview data" },
      { status: 500 }
    );
  }
}
