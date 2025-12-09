"use server";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

type SegmentParams<T extends Object = any> = T extends Record<string, any>
  ? {
    [K in keyof T]: T[K] extends string
    ? string | string[] | undefined
    : never;
  }
  : T;

type RouteContext = { params: Promise<SegmentParams> };

export async function GET(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await prisma.mockInterview.findUnique({
      where: { id },
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

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { AIfeedback } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Invalid question ID" },
        { status: 400 }
      );
    }

    const updated = await prisma.mockQuestion.update({
      where: { id },
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
