'use client'

import { useState } from 'react'

import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/lib/api'
import { Book } from '@/types/app'
import { useQuery } from '@tanstack/react-query'

import { BookCard } from './BookCard'
import { BookSheet } from './BookSheet'
import { CategoriesFilters } from './CategoriesFilters'
import { PageHeading } from './PageHeading'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { Input } from './ui/Input'
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

      <CategoriesFilters
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      {!isLoading && books?.length === 0 && (
        <Text size="sm" weight="bold" color="gray300">
          Não foram encontrados livros para essa busca 💤
        </Text>
      )}

      <BookSheet book={book} isFetchingBook={isFetchingBook} />

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
