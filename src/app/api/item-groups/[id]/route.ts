// app/api/item-groups/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import z from 'zod';

const itemGroupSchema = z.object({
  group_name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid or missing JSON body' }, { status: 400 });
  }

  const validate = itemGroupSchema.safeParse(body);
  if (!validate.success) {
    const errorMessages = validate.error.errors.map(err => ({
      field: err.path[0],
      message: err.message,
    }));
    return NextResponse.json({ error: errorMessages }, { status: 400 });
  }

  const { group_name, description } = validate.data;

  try {
    const updated = await prisma.itemGroups.update({
      where: { id: params.id },
      data: {
        group_name,
        description: description || '',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: 'Item group updated', itemGroup: updated });
  } catch (err) {
    console.error('Update error:', err);
    return NextResponse.json({ error: 'Failed to update item group' }, { status: 500 });
  }
}
