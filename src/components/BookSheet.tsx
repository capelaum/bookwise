import { Check, X } from '@/components/Icons'
import type { Book } from '@/types/app'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { AvatarProfile } from './AvatarProfile'
import { BookCard } from './BookCard'
import { RatingCard } from './RatingCard'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { RatingCardSkeleton } from './Skeletons/RatingCardSkeleton'
import { ButtonIcon } from './ui/ButtonIcon'
import { ButtonLink } from './ui/ButtonLink'
import { ScrollArea } from './ui/ScrollArea'
import { SheetContent } from './ui/Sheet'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'
import { Textarea } from './ui/Textarea'

interface BookSheetProps {
  book?: Book
  isFetchingBook: boolean
}

export function BookSheet({ book, isFetchingBook }: BookSheetProps) {
  const [isCreateRatingFormOpen, setIsCreateRatingFormOpen] = useState(false)
  const [rate, setRate] = useState(0)
  const [hover, setHover] = useState(0)

  const session = useSession()

  function handleOpenCreateRatingForm() {
    if (session.status === 'authenticated') {
      setIsCreateRatingFormOpen(true)
    }
  }

  function handleCloseCreateRatingForm() {
    setRate(0)
    setIsCreateRatingFormOpen(false)
  }

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

              {!isCreateRatingFormOpen && (
                <ButtonLink
                  title="Avaliar"
                  onClick={handleOpenCreateRatingForm}
                >
                  Avaliar
                </ButtonLink>
              )}
            </div>

            <div className="flex flex-col gap-3 pb-4">
              {isCreateRatingFormOpen && session?.data?.user && (
                <div className="rounded-lg bg-gray-700 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <AvatarProfile
                        name={session.data.user.name ?? ''}
                        avatarUrl={session.data.user.avatar_url ?? null}
                      />

                      <Text>{session.data.user.name}</Text>
                    </div>

                    <Stars
                      rating={rate}
                      size="lg"
                      variant="button"
                      hover={hover}
                      setHover={setHover}
                      setRating={setRate}
                    />
                  </div>

                  <Textarea
                    placeholder="Escreva sua avaliação"
                    className="mb-3 mt-6"
                  />

                  <div className="flex justify-end gap-2">
                    <ButtonIcon
                      title="Cancelar"
                      onClick={handleCloseCreateRatingForm}
                    >
                      <X
                        size={24}
                        weight="regular"
                        className="text-purple-100"
                      />
                    </ButtonIcon>

                    <ButtonIcon title="Avaliar">
                      <Check
                        size={24}
                        weight="regular"
                        className="text-green-100"
                      />
                    </ButtonIcon>
                  </div>
                </div>
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
