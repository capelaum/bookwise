'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/lib/api'
import { getBook } from '@/modules/books/api'
import { Book } from '@/types/app'
import { useQuery } from '@tanstack/react-query'

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
  const router = useRouter()

  const [categoryId, setCategoryId] = useState<string>('all')

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // const [isFetchingBook, setIsFetchingBook] = useState(false)
  // const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    if (bookId) {
      setIsSheetOpen(true)
    }
  }, [bookId])

  const { isLoading: isFetchingBooks, data: books } = useQuery(
    ['books', categoryId, debouncedSearch],
    async () => {
      const { data: books } = await api(
        `/api/books?categoryId=${categoryId}&search=${debouncedSearch}`
      )

      return books as Book[]
    }
  )

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

      <BookSheet book={book} isFetchingBook={isFetchingBook} />

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
