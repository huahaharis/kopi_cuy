import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";


const registerSchema = z.object({
        'type_name': z.string().min(1, 'Type name is required'),
    });


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page: number = Number(searchParams.get('page')) || 1;
    const limit: number = Number(searchParams.get('limit')) || 10;

    const skip: number = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma.itemType.findMany({
            skip: skip,
            take: limit
        }),
        prisma.itemType.count()
    ]);

    const lastPage = Math.ceil(total / limit);
    
    try {
        return NextResponse.json({success: true, data, meta:{total,page,lastPage}}, {status: 200});
    } catch {
        return NextResponse.json({error: 'Failed to fetch item types'}, {status: 500});
    }
    
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

    const { type_name } = validate.data;
    
    try {
        const type = await prisma.itemType.create({
            data: {
                type_name: type_name
            }
        });

        return NextResponse.json({success: true, message: 'Item type created successfully', type}, {status: 201});
    } catch {
        return NextResponse.json({error: 'Failed to create item type'}, {status: 500});
    }
}