import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  try {
    const { categoryId } = z
      .object({
        categoryId: z.string()
      })
      .parse({
        categoryId: searchParams.get('categoryId')
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
        where: whereClause
      })
    )
      .map(({ id, name, author, cover_url, ratings }) => {
        const sumRatings = ratings.reduce((acc, rating) => acc + rating.rate, 0)

        const averageRating = Math.round(sumRatings / ratings.length)

        return {
          id: id,
          name: name,
          author: author,
          coverUrl: cover_url,
          rating: averageRating,
          numberOfRatings: ratings.length
        }
      })
      .sort((bookA, bookB) => bookB.numberOfRatings - bookA.numberOfRatings)

    console.log('💥 ~ books:', books)

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
