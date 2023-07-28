import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const popularBooks = (
      await db.book.findMany({
        include: {
          ratings: true
        }
      })
    )
      .splice(0, 5)
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

    const booksWithRatings = await db.book.findMany({
      include: {
        ratings: true
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
