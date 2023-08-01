import Image from 'next/image'

import { Book } from '@/app/(main)/explore/page'
import { BookOpen, BookmarkSimple } from '@/components/Icons'
import { VariantProps, tv } from 'tailwind-variants'

import { Heading } from './ui/Heading'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'

const bookCard = tv({
  slots: {
    base: 'flex flex-col gap-5 sm:gap-10 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4 hover:border-gray-600 transition-all duration-200 ease-in-out',
    book: 'flex gap-5',
    image: 'rounded-[4px] object-cover',
    heading: 'text-base line-clamp-2',
    author: 'text-sm text-gray-400'
  },
  variants: {
    variant: {
      explore: {
        image: 'h-[152px] w-[108px]'
      },
      popular: {
        image: 'h-[94px] w-[64px]'
      },
      sheet: {
        base: 'rounded-xl px-5 py-4 sm:px-8 sm:py-6',
        book: 'gap-5 sm:gap-8',
        image: 'h-[152px] w-[108px] sm:h-[242px] sm:w-[172px] rounded-xl',
        heading: 'text-lg',
        author: 'text-base text-gray-300 mt-2'
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
    <div className={bookCard({ variant }).base()}>
      <div className={bookCard({ variant }).book()}>
        <Image
          width={108}
          height={152}
          src={book.coverUrl}
          alt={book.name}
          className={bookCard({ variant }).image()}
        />

        <div className="flex flex-col overflow-hidden">
          <Heading className={bookCard({ variant }).heading()}>
            {book.name}
          </Heading>

          <Text className={bookCard({ variant }).author()}>{book.author}</Text>

          <Stars
            rating={book.rating}
            size={variant === 'sheet' ? 'md' : 'sm'}
            className="mt-auto"
          />

          {variant === 'sheet' && (
            <Text size="sm" color="gray400" className="mt-2">
              {book.numberOfRatings}{' '}
              {book.numberOfRatings > 1 ? 'Avaliações' : 'Avaliação'}
            </Text>
          )}
        </div>
      </div>

      {variant === 'sheet' && (
        <div className="flex flex-col gap-8 border-t border-gray-600 pt-6 sm:flex-row sm:gap-14">
          <div className="flex items-center gap-4">
            <BookmarkSimple size={24} className="text-green-100" />
            <div>
              <Text size="sm" color="gray300">
                Categoria
              </Text>
              <Heading size="xs" className="text-gray-200" asChild>
                <h2>Computação, educação</h2>
              </Heading>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <BookOpen size={24} className="text-green-100" />
            <div>
              <Text size="sm" color="gray300">
                Páginas
              </Text>
              <Heading size="xs" className="text-gray-200" asChild>
                <h2>160</h2>
              </Heading>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
