import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany()

    return NextResponse.json([{ id: 'all', name: 'Tudo' }, ...categories])
  } catch (error) {
    return NextResponse.json({
      error,
      message: 'Could not fetch categories',
      status: 500
    })
  }
}
