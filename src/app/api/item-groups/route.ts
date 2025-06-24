import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import z from 'zod';

const itemGroupSchema = z.object({
    group_name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
});

export async function GET() {
  try {
    const itemGroups = await prisma.itemGroups.findMany({
      include: { items: true }, // opsional
    });
    return NextResponse.json(itemGroups);
  } catch (error) {
    console.error("Error fetching item groups:", error); // Tambahkan log
    return NextResponse.json(
      { error: "Failed to fetch item groups" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
    const body = await req.json();
    const validate = itemGroupSchema.safeParse(body);
    if(!validate.success) {
        const errorMessages = validate.error.errors.map(err => ({
            field: err.path[0],
            message: err.message
        }));
        return NextResponse.json({ error: errorMessages }, { status: 400 });

    }

    const { group_name, description } = validate.data;
    try {
        const itemGroup  = await prisma.itemGroups.create({
            data: {
                group_name: group_name,
                description: description || '',
            }
        })
        
        return NextResponse.json({ success:true, message: 'item group created successfully', itemGroup})
    } catch {
        return NextResponse.json({ error: 'Failed to create item group' }, { status: 500 });
    }
}