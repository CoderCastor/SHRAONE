import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;
  const res = await prisma.episodes.findFirst({
    where: {
      id: id,
    },
    include : {
      monologue : {
        select : {
          thumbnailUrl : true
        },
      }
    }
  });

  return NextResponse.json({
    success: true,
    data: res,
  });
};
