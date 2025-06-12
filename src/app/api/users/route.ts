import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


// Get /api/users
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        },
    });
    
    return NextResponse.json(user);
}