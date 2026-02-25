import { auth } from "@/lib/auth";
import { client } from "@/lib/helper/redis";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = auth(
  async (request, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const randomId = crypto.randomUUID();
      const userId = request.auth?.user?.id;
      const key = `${process.env.NEXT_URL}/app/monologues/access?link=${randomId}-${userId}-${id}`;
      const res = await client.set(key, 1, {
        expiration: {
          type: "EX",
          value: 60 * 60 * 24,
        },
      });

      if (!res) {
        return NextResponse.json({
          success: false,
          error: "Failed to generate link",
        });
      }
      return NextResponse.json({
        success: true,
        data: { link: key },
      });
    } catch (e) {
      return NextResponse.json({
        success: false,
        error: "Something went wrong",
      });
    }
  },
);
