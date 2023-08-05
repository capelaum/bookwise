import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getAverageRating } from '@/lib/utils'
import { z } from 'zod'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  try {
    const { categoryId, search } = z
      .object({
        categoryId: z.string(),
        search: z.string().optional()
      })
      .parse({
        categoryId: searchParams.get('categoryId'),
        search: searchParams.get('search')
      })

    let whereClause = {}

    if (categoryId !== 'all') {
      whereClause = {
        categories: {
          some: {
            category_id: categoryId
          }
        }
      }
    }

    const books = (
      await db.book.findMany({
        include: {
          ratings: true,
          categories: true
        },
        orderBy: [
          {
            ratings: {
              _count: 'desc'
            }
          },
          {
            name: 'asc'
          }
        ],
        where: {
          OR: [
            {
              name: {
                contains: search
              }
            },
            {
              author: {
                contains: search
              }
            }
          ],
          ...whereClause
        }
      })
    ).map(({ id, name, author, cover_url, ratings }) => ({
      id: id,
      name: name,
      author: author,
      coverUrl: cover_url,
      rating: getAverageRating(ratings),
      numberOfRatings: ratings.length
    }))

    return NextResponse.json(books)
  } catch (error) {
    console.log('💥 ~ error:', error)
    return NextResponse.json({
      error,
      message: 'Could not fetch books',
      status: 500
    })
  }
}
