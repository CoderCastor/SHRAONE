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

      const res = await prisma.likedMonologue.create({
        data: {
          monologueId: id,
          userId: request.auth.user?.id as string,
        },
      });

      return NextResponse.json({
        success: true,
      });
    } catch (e) {
      return NextResponse.json({
        success: false,
        error: "something went wrong",
      });
    }
  },
);
