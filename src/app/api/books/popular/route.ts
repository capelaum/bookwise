import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getAverageRating } from '@/lib/utils'

export async function GET(req: Request) {
  try {
    const popularBooks = (
      await db.book.findMany({
        include: {
          ratings: true
        },
        take: 5,
        orderBy: [
          {
            ratings: {
              _count: 'desc'
            }
          },
          {
            name: 'asc'
          }
        ]
      })
    ).map(({ id, name, author, cover_url, ratings }) => ({
      id: id,
      name: name,
      author: author,
      coverUrl: cover_url,
      rating: getAverageRating(ratings),
      numberOfRatings: ratings.length
    }))

    // await new Promise((resolve) => setTimeout(resolve, 3000))

    return NextResponse.json(popularBooks)
  } catch (error) {
    return NextResponse.json({
      error,
      message: 'Could not fetch popular books',
      status: 500
    })
  }
}
