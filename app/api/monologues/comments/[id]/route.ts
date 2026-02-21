import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const res = await prisma.comment.findMany({
      where: {
        monologueId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      omit: {
        monologueId: true,
        userId: true,
      },
      orderBy :{
        createdAt : "desc"
      }
    });

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
};

export const POST = auth(
  async (request, { params }: { params: Promise<{ id: string }> }) => {
    try {
      if (!request.auth)
        return NextResponse.json(
          { message: "Not authenticated" },
          { status: 401 },
        );
      const { id } = await params;
      const body: { comment: string } = await request.json();
      const res = await prisma.comment.create({
        data: {
          comment: body.comment,
          monologueId: id,
          userId: request.auth?.user?.id as string,
        },
      });

      if (!res) {
        return NextResponse.json({
          success: false,
        });
      }

      return NextResponse.json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({
        success: false,
        error: "Something went wrong",
      });
    }
  },
);
