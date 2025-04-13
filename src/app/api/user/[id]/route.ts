"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    const result = await prisma.mockInterview.findUnique({ where: { id } });

    if (!result) {
      return NextResponse.json(
        { error: "Interview quest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result,
      message: "Data successfully fetched from the database",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while fetching interview data" },
      { status: 500 }
    );
  }
}
