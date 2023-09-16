import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { formatDatetimeToBrazilianFormat, getAverageRating } from '@/lib/utils'

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
      categories: {
        select: {
          category: {
            select: {
              name: true
            }
          }
        }
      },
      ratings: {
        select: {
          id: true,
          description: true,
          rate: true,
          user: true,
          updated_at: true
        },
        orderBy: {
          updated_at: 'desc'
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

  const ratingsFormatted = ratings.map(
    ({ id, description, rate, user, updated_at }) => ({
      id,
      description,
      rate,
      updatedAt: formatDatetimeToBrazilianFormat(updated_at),
      user: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatar_url
      }
    })
  )

  const averageRating = getAverageRating(ratingsFormatted)
  const categoriesNames = categories.map((cat) => cat.category.name).join(', ')

  return NextResponse.json({
    id,
    name,
    author,
    coverUrl,
    totalPages,
    ratings: ratingsFormatted,
    rating: averageRating,
    numberOfRatings: ratings.length,
    categoriesNames
  })
}
