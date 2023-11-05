import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "@/app/Validationschemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validated =  IssueSchema.safeParse(body);
    if(!validated.success) return NextResponse.json(validated.error.format(), {status : 400});

    const newIssue = await prisma.issue.create({data: {title: body.title, description: body.description}});

    return NextResponse.json(newIssue, {status : 201});
}