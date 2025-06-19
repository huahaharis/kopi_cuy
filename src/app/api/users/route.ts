import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/hash';
import z from 'zod';


const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Get /api/users
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();

    const validate = registerSchema.safeParse(body);

    if(!validate.success) {
        const errorMessages = validate.error.errors.map(err => ({
            field: err.path[0],
            message: err.message
        }));

        return NextResponse.json({error: errorMessages}, {status: 400});
    }

    const existingUser = await prisma.user.findUnique({where: {email: body.email}});
    
    if(existingUser) {
        return NextResponse.json({error: 'User already exists'}, {status: 400});
    }

    const {name, email, password} = validate.data;
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            isActive: true,
            password: await hashPassword(password),
        },
    });
    
    return NextResponse.json({success: true, message: 'Registered successfully', user});
}