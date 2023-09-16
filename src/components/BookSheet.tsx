import type { Book } from '@/types/app'
import { useSession } from 'next-auth/react'
import { BookCard } from './BookCard'
import { RatingCard } from './RatingCard'
import { RatingCreateForm } from './RatingCreateForm'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { RatingCardSkeleton } from './Skeletons/RatingCardSkeleton'
import { ButtonLink } from './ui/ButtonLink'
import { ScrollArea } from './ui/ScrollArea'
import { SheetContent } from './ui/Sheet'
import { Text } from './ui/Text'

interface BookSheetProps {
  book?: Book
  isFetchingBook: boolean
  isCreateRatingFormOpen: boolean
  setIsCreateRatingFormOpen: (isCreateRatingFormOpen: boolean) => void
}

export function BookSheet({
  book,
  isFetchingBook,
  isCreateRatingFormOpen,
  setIsCreateRatingFormOpen
}: BookSheetProps) {
  const session = useSession()

  function handleOpenCreateRatingForm() {
    if (session.status === 'authenticated') {
      setIsCreateRatingFormOpen(true)
    }
  }

  const authUserHasRatingOnThisBook = book?.ratings?.find(
    (rating) => rating.user.id === session.data?.user.id
  )

  return (
    <SheetContent className="w-full max-w-[660px] px-3 pb-0 pr-2 pt-16 xs:px-12 xs:pr-2">
      <ScrollArea className="h-full w-full">
        <section className="pr-4 lg:pr-10 ">
          {isFetchingBook || !book ? (
            <BookCardSkeleton quantity={1} variant="sheet" />
          ) : (
            <BookCard book={book} variant="sheet" />
          )}
          <div className="flex flex-col gap-4">
            <div className="mt-10 flex items-center justify-between">
              <Text size="sm" color="gray200">
                Avaliações
              </Text>

              {!isCreateRatingFormOpen && !authUserHasRatingOnThisBook && (
                <ButtonLink
                  title="Avaliar"
                  onClick={handleOpenCreateRatingForm}
                >
                  Avaliar
                </ButtonLink>
              )}
            </div>

            <div className="flex flex-col gap-3 pb-4">
              {isCreateRatingFormOpen && session?.data?.user && book && (
                <RatingCreateForm
                  bookId={book.id}
                  user={session?.data?.user}
                  setIsCreateRatingFormOpen={setIsCreateRatingFormOpen}
                />
              )}

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
