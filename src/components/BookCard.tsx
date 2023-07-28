import Image from 'next/image'

import { Book } from '@/app/(main)/explore/page'
import { VariantProps, tv } from 'tailwind-variants'

import { Heading } from './ui/Heading'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'

const bookCard = tv({
  slots: {
    base: 'flex gap-5 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4 hover:border-gray-600 transition-all duration-200 ease-in-out',
    image: 'rounded-sm object-cover'
  },
  variants: {
    variant: {
      explore: {
        image: 'h-[152px] w-[108px]'
      },
      popular: {
        image: 'h-[94px] w-[64px]'
      }
    }
  },
  defaultVariants: {
    variant: 'explore'
  }
})

interface BookCardProps extends VariantProps<typeof bookCard> {
  book: Book
}

export function BookCard({ book, variant }: BookCardProps) {
  return (
    <div className={bookCard().base()}>
      <Image
        width={64}
        height={94}
        src={book.coverUrl}
        alt={book.name}
        className={bookCard({ variant }).image()}
      />

      <div className="flex flex-col">
        <Heading size="xs" className="line-clamp-2">
          {book.name}
        </Heading>

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
  )
}
