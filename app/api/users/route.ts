import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  if (!users) return NextResponse.json("no users found", { status: 400 });
  return NextResponse.json(users, { status: 200 });
}
