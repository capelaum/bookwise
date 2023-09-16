import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { createRatingRequestBodySchema } from '@/modules/ratings/schemas'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const ratings = (
      await db.rating.findMany({
        include: {
          user: true,
          book: true
        },
        orderBy: {
          created_at: 'desc'
        }
      })
    ).map(({ id, description, rate, user, book }) => ({
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

export async function POST(req: Request) {
  const session = await getAuthSession()

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: 'Unauthorized'
      },
      {
        status: 401
      }
    )
  }

  const body = await req.json()

  const { rate, description, bookId } = createRatingRequestBodySchema.parse({
    bookId: body.bookId,
    rate: body.rate,
    description: body.description
  })

  const ratingExists = await db.rating.findFirst({
    where: {
      user_id: session.user.id,
      book_id: bookId
    }
  })

  if (ratingExists) {
    return NextResponse.json(
      {
        message: 'Rating of this book was already made by this user '
      },
      {
        status: 400
      }
    )
  }

  const createdRating = await db.rating.create({
    data: {
      user_id: session.user.id,
      book_id: bookId,
      rate,
      description
    }
  })

  return NextResponse.json(
    { createdRating },
    {
      status: 201
    }
  )
}
