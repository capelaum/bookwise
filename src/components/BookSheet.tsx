import { Book } from '@/types/app'

import { BookCard } from './BookCard'
import { RatingCard } from './RatingCard'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { RatingCardSkeleton } from './Skeletons/RatingCardSkeleton'
import { ScrollArea } from './ui/ScrollArea'
import { SheetContent } from './ui/Sheet'
import { Text } from './ui/Text'
import { TextLink } from './ui/TextLink'

interface BookSheetProps {
  book?: Book
  isFetchingBook: boolean
}

export function BookSheet({ book, isFetchingBook }: BookSheetProps) {
  return (
    <SheetContent className="w-full max-w-[660px] px-3 pb-0 pr-2 pt-16 xs:px-12 xs:pr-2">
      <ScrollArea className="h-full w-full">
        <section className="pr-10 ">
          {isFetchingBook || !book ? (
            <BookCardSkeleton quantity={1} variant="sheet" />
          ) : (
            <BookCard book={book} variant="sheet" />
          )}
          <div className="flex flex-col gap-4">
            <div className="mt-12 flex items-center justify-between">
              <Text size="sm" color="gray200">
                Avaliações
              </Text>

              <TextLink href="#" title="Avaliar">
                Avaliar
              </TextLink>
            </div>

            <div className="flex flex-col gap-3 pb-6">
              {isFetchingBook || !book?.ratings ? (
                <RatingCardSkeleton quantity={1} variant="sheet" />
              ) : (
                book.ratings.map((rating) => (
                  <RatingCard rating={rating} key={rating.id} variant="sheet" />
                ))
              )}
            </div>
          </div>
        </section>
      </ScrollArea>
    </SheetContent>
  )
}
