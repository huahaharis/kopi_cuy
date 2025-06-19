import prisma from "@/lib/prisma";
import { NextRequest ,NextResponse } from "next/server";
import { verifyPassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";


export async function POST(req: NextRequest) {
    const {email, password} = await req.json();

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const isValid = await verifyPassword(password, user.password);

    if(!isValid) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }


    const token = generateToken({id: user.id});

    return NextResponse.json({success: true, message: "Login successful", token}, {status: 200});
    
}