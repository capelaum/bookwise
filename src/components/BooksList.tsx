'use client'

import { useState } from 'react'

import { Book } from '@/app/(main)/explore/page'
import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { BookCard } from './BookCard'
import { CategoriesFilters } from './CategoriesFilters'
import { PageHeading } from './PageHeading'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { Input } from './ui/Input'
import { SheetContent } from './ui/Sheet'
import { Text } from './ui/Text'

export function BooksList() {
  const [categoryId, setCategoryId] = useState<string>('all')

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const [isFetchingBook, setIsFetchingBook] = useState(false)
  const [book, setBook] = useState<Book | null>(null)

  const { isLoading, data: books } = useQuery(
    ['books', categoryId, debouncedSearch],
    async () => {
      const { data: books } = await api(
        `/api/books?categoryId=${categoryId}&search=${debouncedSearch}`
      )

      return books as Book[]
    }
  )

  async function fetchBook(id: string) {
    setIsFetchingBook(true)
    try {
      const { data: book }: { data: Book } = await api(`/api/books/${id}`)

      setBook(book)
    } catch (e) {
      console.error('Error:', e)
    } finally {
      setIsFetchingBook(false)
    }
  }

  return (
    <>
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

      <div className="mb-12 mt-10 flex flex-wrap gap-3">
        <CategoriesFilters
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      </div>

      {!isLoading && books?.length === 0 && (
        <Text size="sm" weight="bold" color="gray300">
          Não foram encontrados livros para essa busca 💤
        </Text>
      )}

      <SheetContent className="w-full max-w-[660px] px-3 py-16 xs:px-12">
        {isFetchingBook ? (
          <BookCardSkeleton quantity={1} variant="sheet" />
        ) : (
          <BookCard book={book!} variant="sheet" />
        )}
      </SheetContent>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <BookCardSkeleton />
        ) : (
          books?.map((book) => (
            <BookCard onClick={fetchBook} book={book} key={book.id} />
          ))
        )}
      </div>
    </>
  )
}
