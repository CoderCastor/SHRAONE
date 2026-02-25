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
        await tx.likedMonologue.create({
          data: {
            monologueId: id,
            userId: request.auth.user?.id as string,
          },
        });

        await tx.monologue.update({
          data: {
            likeCount: {
              increment: 1,
            },
          },
          where: {
            id : id as string,
          }
        });
      });

      // const res = await prisma.likedMonologue.create({
      //   data: {
      //     monologueId: id,
      //     userId: request.auth.user?.id as string,
      //   },
      // });

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
