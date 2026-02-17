import prisma from "@/lib/prisma";
import { client } from "@/lib/helper/redis";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  try {
    const res = await prisma.episodes.create({
      data: {
        monologueId: body.monologueId,
        number: body.number,
        status: "PENDING",
      },
      include: {
        monologue: {
          select: {
            id: true,
            title: true,
            createdBy: true,
            categories: true,
            createdAt: true,
            episodes: {
              take: 3,
              orderBy: {
                number: "desc",
              },
            },
          },
        },
      },
    });

    if (!res) {
    }
    const messageId = await client.xAdd("text-generation-stream", "*", {
      data: JSON.stringify(res.monologue),
    });

    return NextResponse.json({
      success: true,
      data: res.monologue,
      messageId: messageId,
    });
  } catch (e) {
    if (e.code == "P2002") {
      return NextResponse.json({
        success: false,
        error: "Monologue already exist with this title",
      });
    }
    return NextResponse.json({ error: "Something went wrong", e });
  }
};

export const DELETE = async (request: NextRequest) => {
  const body = await request.json();
  try {
    const res = await prisma.monologue.deleteMany({
      where: {
        createdBy: body.userId,
      },
    });

    console.log(res);
    return NextResponse.json({ data: res });
  } catch (e) {
    if (e.code == "P2002") {
      return NextResponse.json({
        success: false,
        error: "Monologue already exist with this name",
      });
    }
    // console.log(e);
    return NextResponse.json({ error: "Something went wrong" });
  }

  // const data = await generateMonologueJSON(body.idea);
  // return NextResponse.json({ data });
};
