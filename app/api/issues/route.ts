import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const err = IssueSchema.safeParse(body);
  if (!err.success) {
    return NextResponse.json(err.error?.errors, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
