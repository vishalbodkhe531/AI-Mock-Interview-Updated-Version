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

    await prisma.mockInterview.update({
      where: { id },
      data: {
        jsonMockResp: {
          update: {
            isCompleted: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Interview completed",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while updating interview data" },
      { status: 500 }
    );
  }
}
