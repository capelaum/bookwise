import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const bookId = params.id

  const book = await db.book.findUniqueOrThrow({
    where: {
      id: bookId
    },
    include: {
      ratings: true,
      categories: {
        select: {
          category: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  const {
    id,
    name,
    author,
    cover_url: coverUrl,
    total_pages: totalPages,
    ratings,
    categories
  } = book

  const sumRatings = ratings.reduce((acc, rating) => acc + rating.rate, 0)
  const averageRating = Math.round(sumRatings / ratings.length)

  const categoriesNames = categories.map((cat) => cat.category.name).join(', ')

  return NextResponse.json({
    id,
    name,
    author,
    coverUrl,
    totalPages,
    rating: averageRating,
    numberOfRatings: ratings.length,
    categoriesNames
  })
}
