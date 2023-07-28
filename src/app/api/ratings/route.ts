import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const ratingsData = await db.rating.findMany({
      include: {
        user: true,
        book: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    const ratings = ratingsData.map((rating) => ({
      id: rating.id,
      description: rating.description,
      rate: rating.rate,
      user: {
        id: rating.user.id,
        name: rating.user.name,
        avatarUrl: rating.user.avatar_url
      },
      book: {
        id: rating.book.id,
        name: rating.book.name,
        author: rating.book.author,
        coverUrl: rating.book.cover_url
      }
    }))

    // await new Promise((resolve) => setTimeout(resolve, 3000))

    return NextResponse.json(ratings)
  } catch (error) {
    return NextResponse.json({
      error,
      message: 'Could not fetch ratings',
      status: 500
    })
  }
}
