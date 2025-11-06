import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.NODE_ENV,
  });
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  await new Promise((r) => setTimeout(r, 1000));

  const newCitation = await prisma.citation.create({
    data: {
      author: json.author,
      text: json.citation,
    },
  });

  return NextResponse.json({
    citation: newCitation,
  });
}
