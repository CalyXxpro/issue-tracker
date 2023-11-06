import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "@/app/Validationschemas";

export async function PATCH(request: NextRequest, {params} : {params: {id : string}}) {
    const body = await request.json();
    const validated =  IssueSchema.safeParse(body);
    if(!validated.success) return NextResponse.json(validated.error.format(), {status : 400});

    const issue = await prisma.issue.findUnique({where: {id : parseInt(params.id)}});

    if(!issue) return NextResponse.json("Invalid Issue", {status: 400});

    const updatedIssue = await prisma.issue.update({where: {id : issue.id}, data: {title: body.title, description: body.description}});

    return NextResponse.json(updatedIssue);
    
}

export async function DELETE(request: NextRequest, {params} : {params: {id : string}}) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});
    if(!issue) return NextResponse.json("Invalid Issue", {status: 404});

    await prisma.issue.delete({where: {id: issue.id}});

    return NextResponse.json({});
}