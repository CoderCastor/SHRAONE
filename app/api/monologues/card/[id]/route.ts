import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(
  async (request, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    try {
      const res = await prisma.monologue.findFirst({
        where: {
          id,
        },
        include: {
          likedMonologues: {
            where: {
              userId: request.auth?.user?.id,
            },
          },
          episodes: {
            omit: {
              script: true,
            },
          },
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });

      if (res?.likedMonologues.length != 0) {
        return NextResponse.json({
          success: true,
          data: { ...res, isLiked: true },
        });
      } else {
        return NextResponse.json({
          success: true,
          data: { ...res, isLiked: false },
        });
      }
    } catch (e) {
      return NextResponse.json({
        error: e,
      });
    }
  },
);
