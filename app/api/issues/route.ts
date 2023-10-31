import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

const Issueschema = z.object({
    title: z.string().min(1).max(255),
    description: z.string()
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validated =  Issueschema.safeParse(body);
    if(!validated.success) return NextResponse.json(validated.error.errors, {status : 400});

    const newIssue = await prisma.issue.create({data: {title: body.title, description: body.description}});

    return NextResponse.json(newIssue, {status : 201});
}