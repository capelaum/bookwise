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

    const ratings = ratingsData.map(
      ({ id, description, rate, user, book }) => ({
        id: id,
        description: description,
        rate: rate,
        user: {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatar_url
        },
        book: {
          id: book.id,
          name: book.name,
          author: book.author,
          coverUrl: book.cover_url
        }
      })
    )

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
