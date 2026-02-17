import prisma from "@/lib/prisma";
import { PodcastResponse } from "@/types/monologue";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const monologues = await prisma.monologue.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
        episodes: {
          orderBy: {
            number: "asc",
          },
          omit: {
            status: true,
            monologueId: true,
            script: true,
          },
        },
        likedMonologues: {
          where: {
            userId: "cmhlodkca0005s6jalbjoei17",
          },
          select: {
            userId: true,
          },
        },
      },
    });

    const modifiedResponse = monologues.map((item) => {
      if (item.likedMonologues.length) {
        return { ...item, isLiked: true };
      } else {
        return { ...item, isLiked: false };
      }
    });
    
    return NextResponse.json({
      success: true,
      data: modifiedResponse,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
    console.log(e);
  }
};
