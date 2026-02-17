import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;

  try {
    const res = await prisma.monologue.findFirst({
      where: {
        id,
      },
      include: {
        episodes: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (e) {
    return NextResponse.json({
      error: e,
    });
  }
};
