import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
      },
    });

    return NextResponse.json({
      success: true,
      message: "Question marked as completed",
      data: updated,
    });
  } catch (error: any) {
    console.error("Update failed:", error.message);
    return NextResponse.json(
      { error: "Failed to update question", details: error.message },
      { status: 500 }
    );
  }
}
