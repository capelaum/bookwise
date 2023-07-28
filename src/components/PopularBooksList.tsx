import Image from 'next/image'

import { api } from '@/lib/api'

import { Heading } from './ui/Heading'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'

type PopularBook = {
  id: string
  name: string
  author: string
  coverUrl: string
  rating: number
  numberOfRatings: number
}

export async function PopularBooksList() {
  const { data: popularBooks }: { data: PopularBook[] } = await api(
    '/api/books/popular'
  )

  return (
    <div className="flex flex-col gap-3">
      {popularBooks.map((book) => (
        <div
          key={book.id}
          className="flex gap-5 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4 hover:border-gray-600"
        >
          <Image
            width={64}
            height={94}
            src={book.coverUrl}
            alt={book.name}
            className="h-[94px] w-[64px] rounded-sm object-cover"
          />

          <div className="flex flex-col">
            <Heading size="xs">{book.name}</Heading>

            <Text size="sm" color="gray400">
              {book.author}
            </Text>

            {/* <Text size="sm" color="gray400">
                    {book.numberOfRatings}{' '}
                    {book.numberOfRatings > 1 ? 'Avaliações' : 'Avaliação'}
                  </Text> */}

            <Stars rating={book.rating} size="sm" className="mt-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}
