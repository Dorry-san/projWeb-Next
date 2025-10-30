import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        ok: true,
        env: process.env.NODE_ENV
    })
}

export async function POST(request:NextRequest) {
    const formData = await request.formData();

    const data = {
        citation: formData.get("citation"),
        author: formData.get("author"),
    }

    return NextResponse.json({
        json: data,
    })
}