'use client'

import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useDebounce } from '@/hooks/use-debounce'
import { getBook, getBooks } from '@/modules/books/api'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BookCard } from './BookCard'
import { BookSheet } from './BookSheet'
import { CategoriesFilters } from './CategoriesFilters'
import { PageHeading } from './PageHeading'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { Input } from './ui/Input'
import { Sheet } from './ui/Sheet'
import { Text } from './ui/Text'

interface BooksListProps {
  bookId?: string
}

export function BooksList({ bookId }: BooksListProps) {
  const [isCreateRatingFormOpen, setIsCreateRatingFormOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [categoryId, setCategoryId] = useState<string>('all')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const router = useRouter()

  useEffect(() => {
    if (bookId) {
      setIsSheetOpen(true)
    }
  }, [bookId])

  const { isLoading: isFetchingBooks, data: books } = useQuery({
    queryKey: ['books', categoryId, debouncedSearch],
    queryFn: () =>
      getBooks({
        categoryId,
        search: debouncedSearch
      })
  })

  const { isLoading: isFetchingBook, data: book } = useQuery({
    queryKey: [bookId],
    queryFn: () => getBook(bookId!),
    enabled: !!bookId
  })

  function toggleSheetOpen() {
    setIsSheetOpen((isSheetOpen) => !isSheetOpen)
  }

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        toggleSheetOpen()
        setIsCreateRatingFormOpen(false)
        router.replace('/explore', {
          scroll: false
        })
      }}
    >
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <PageHeading
          title="Explorar"
          icon={<Binoculars size={32} className="text-green-100" />}
        />

        <Input
          icon={<MagnifyingGlass size={20} />}
          placeholder="Buscar livro ou autor"
          className="w-full lg:w-[60%] xl:w-[40%]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CategoriesFilters
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      {!isFetchingBooks && books?.length === 0 && (
        <Text size="sm" weight="bold" color="gray300">
          Não foram encontrados livros para essa busca 💤
        </Text>
      )}

      <BookSheet
        book={book}
        isFetchingBook={isFetchingBook}
        setIsCreateRatingFormOpen={setIsCreateRatingFormOpen}
        isCreateRatingFormOpen={isCreateRatingFormOpen}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isFetchingBooks ? (
          <BookCardSkeleton />
        ) : (
          books?.map((book) => <BookCard book={book} key={book.id} />)
        )}
      </div>
    </Sheet>
  )
}
