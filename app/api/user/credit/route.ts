import { auth } from "@/lib/auth";
import { client } from "@/lib/helper/redis";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  try {
    if (!req.auth)
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );

    
    const res = await client.get(req.auth.user?.id as string);
    if (!res) {
      const res = await prisma.user.findFirst({
        where: { id: req.auth.user?.id },
        select: {
          credit: true,
        },
      });
      await client.set(req.auth.user?.id as string, String(res?.credit));
      return NextResponse.json({
      success: true,
      data: {
        credit: res?.credit,
      },
    });
    }

    return NextResponse.json({
      success: true,
      data: {
        credit: res,
      },
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
});
