import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/app/Validationschemas";
import { AuthOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";

export async function PATCH(request: NextRequest, {params} : {params: {id : string}}) {
    const session = getServerSession(AuthOptions);
    if(!session) return NextResponse.json({}, {status: 401});
    const body = await request.json();
    const validated =  patchIssueSchema.safeParse(body);
    if(!validated.success) return NextResponse.json(validated.error.format(), {status : 400});

    const {title, description, assignedToUserId} = body;
    if(assignedToUserId) {
        const userId = await prisma.user.findUnique({where: {id: assignedToUserId}});
        if(!userId) return NextResponse.json("Invalid User Id", {status : 400});
    }

    const issue = await prisma.issue.findUnique({where: {id : parseInt(params.id)}});

    if(!issue) return NextResponse.json("Invalid Issue", {status: 400});

    const updatedIssue = await prisma.issue.update({where: {id : issue.id}, data: {title, description, assignedToUserId}});

    return NextResponse.json(updatedIssue);
    
}

export async function DELETE(request: NextRequest, {params} : {params: {id : string}}) {
    const session = getServerSession(AuthOptions);
    if(!session) return NextResponse.json({}, {status: 401});
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});
    if(!issue) return NextResponse.json("Invalid Issue", {status: 404});

    await prisma.issue.delete({where: {id: issue.id}});

    return NextResponse.json({});
}