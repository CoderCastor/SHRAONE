import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PATCH = auth(
  async (request, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      if (!request.auth)
        return NextResponse.json(
          { message: "Not authenticated" },
          { status: 401 },
        );

      const res = await prisma.$transaction(async (tx) => {
        await tx.likedMonologue.delete({
          where: {
            userId_monologueId: {
              userId: request.auth?.user?.id as string,
              monologueId: id as string,
            },
          },
        });

        await tx.monologue.update({
          data: {
            likeCount: {
              decrement: 1,
            },
          },
          where: {
            id: id as string,
          },
        });
      });

      return NextResponse.json({
        success: true,
      });
    } catch (e) {
      console.log(e)
      return NextResponse.json({
        success: false,
        error: "something went wrong",
      });
    }
  },
);
