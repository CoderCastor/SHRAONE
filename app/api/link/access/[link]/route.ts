import { auth } from "@/lib/auth";
import { client } from "@/lib/helper/redis";
import prisma from "@/lib/prisma";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const GET = async (
  request,
  { params }: { params: Promise<{ link: string }> },
) => {
  try {
    const { link } = await params;

    const res = await client.get(link);
    console.log(link)
    if (!res) {
      return NextResponse.json({
        success: false,
        error: "Invalid link",
      });
    }

    return NextResponse.redirect(new NextURL(`http://localhost:3000/app/test`));
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
};
