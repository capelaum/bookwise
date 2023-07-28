import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const booksWithRatings = await db.book.findMany({
      include: {
        ratings: true
      }
    })

    const popularBooks = booksWithRatings
      .sort((bookA, bookB) => bookB.ratings.length - bookA.ratings.length)
      .splice(0, 5)
      .map((book) => {
        const sumRatings = book.ratings.reduce(
          (acc, rating) => acc + rating.rate,
          0
        )

        const averageRating = Math.round(sumRatings / book.ratings.length)

        return {
          id: book.id,
          name: book.name,
          author: book.author,
          coverUrl: book.cover_url,
          rating: averageRating,
          numberOfRatings: book.ratings.length
        }
      })

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
