import prisma from "@/lib/prisma";
import { client } from "@/lib/helper/redis";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const POST = auth(async (request) => {
  const body = await request.json();
  try {
    if (!request.auth)
      return NextResponse.json(
    { message: "Not authenticated" },
    { status: 401 },
  );
  const userId = request.auth?.user?.id as string
    const res = await prisma.$transaction(async (tx) => {
      const res: string | null = await client.get(userId);
      let balance: number;
      if (!res) {
        const res = await prisma.user.findFirst({
          where: {
            id: userId,
          },
          select: {
            credit: true,
          },
        });
        balance = res?.credit as number;
        await client.set(userId, res?.credit as number);
      } else {
        balance = Number(res);
      }

      if (balance == 0) {
        throw new Error("Insufficient credits");
      }

      const updatedBalance = await tx.user.update({
        data: {
          credit: {
            decrement: 1,
          },
        },
        where: {
          id: userId,
        },
      });

      await client.set(updatedBalance.id, updatedBalance.credit);

      return tx.episodes.create({
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
    });

    if (!res) {
    }
    const messageId = await client.xAdd("text-generation-stream", "*", {
      data: JSON.stringify(res.monologue),
    });

    const data = {
      ...res.monologue,
      episodes: [
        ...res.monologue.episodes.filter((item) => item.status == "PENDING"),
      ],
    };

    return NextResponse.json({
      success: true,
      data,
      messageId: messageId,
    });
  } catch (e) {
    if (e.code == "P2002") {
      return NextResponse.json({
        success: false,
        error: "Monologue already exist with this title",
      });
    }
    if (e.message == "Insufficient credits") {
      return NextResponse.json({
        success: false,
        error: "Insufficient credits",
      });
    }
    return NextResponse.json({ error: "Something went wrong", e });
  }
});

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
