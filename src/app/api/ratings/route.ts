import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const ratings = await db.rating.findMany({
      include: {
        user: true,
        book: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(ratings)
  } catch (error) {
    return NextResponse.json({
      error,
      message: 'Could not fetch ratings',
      status: 500
    })
  }
}
