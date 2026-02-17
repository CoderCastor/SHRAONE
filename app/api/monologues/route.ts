import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    return NextResponse.json({
        msg : "I am working"
    })
}