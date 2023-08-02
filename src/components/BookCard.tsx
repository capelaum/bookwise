import Image from 'next/image'

import { BookOpen, BookmarkSimple } from '@/components/Icons'
import { Book } from '@/types/app'
import { VariantProps, tv } from 'tailwind-variants'

import { Heading } from './ui/Heading'
import { SheetTrigger } from './ui/Sheet'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'

const bookCard = tv({
  slots: {
    base: 'w-full flex flex-col gap-5 xs:gap-10 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4 hover:border-gray-600 transition-all duration-200 ease-in-out text-left aria-controls="radix-:R4racq:',
    book: 'flex gap-5 ',
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
        base: 'rounded-xl px-5 py-4 xs:px-8 xs:py-6 hover:border-gray-700',
        book: 'gap-5 xs:gap-8',
        image: 'h-[152px] w-[108px] xs:h-[242px] xs:w-[172px] rounded-xl',
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
  onClick?: (id: string) => Promise<void>
}

export function BookCard({ book, onClick, variant }: BookCardProps) {
  return (
    <SheetTrigger
      onClick={onClick ? () => onClick(book.id) : undefined}
      className={bookCard({ variant }).base()}
    >
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
        <div className="flex w-full flex-col gap-8 border-t border-gray-600 pt-6 sm:flex-row">
          <div className="flex items-center gap-4 sm:w-1/2">
            <BookmarkSimple size={24} className="text-green-100" />
            <div>
              <Text size="sm" color="gray300">
                Categoria
              </Text>
              <Heading size="xs" className="text-gray-200" asChild>
                <h2>{book.categoriesNames}</h2>
              </Heading>
            </div>
          </div>

          <div className="flex w-full items-center gap-4 sm:w-1/2">
            <BookOpen size={24} className="text-green-100" />
            <div>
              <Text size="sm" color="gray300">
                Páginas
              </Text>
              <Heading size="xs" className="text-gray-200" asChild>
                <h2>{book.totalPages}</h2>
              </Heading>
            </div>
          </div>
        </div>
      )}
    </SheetTrigger>
  )
}
