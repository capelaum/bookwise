import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany()

    const categoryFilters = [
      {
        id: '1',
        name: 'Tudo'
      },
      ...categories
    ]

    return NextResponse.json(categoryFilters)
  } catch (error) {
    return NextResponse.json({
      error,
      message: 'Could not fetch categories',
      status: 500
    })
  }
}
