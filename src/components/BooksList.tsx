'use client'

import { useState } from 'react'

import { Book } from '@/app/(main)/explore/page'
import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { BookCard } from './BookCard'
import { CategoriesFilters } from './CategoriesFilters'
import { PageHeading } from './PageHeading'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'
import { Input } from './ui/Input'

export function BooksList() {
  const [categoryId, setCategoryId] = useState<string>('all')

  const { isLoading, data: books } = useQuery(
    ['books', categoryId],
    async () => {
      const { data: books } = await api(`/api/books?categoryId=${categoryId}`)

      return books as Book[]
    }
  )

  return (
    <>
      <div className="flex justify-between">
        <PageHeading
          title="Explorar"
          icon={<Binoculars size={32} className="text-green-100" />}
        />

        <Input
          icon={<MagnifyingGlass size={20} />}
          placeholder="Buscar livro ou autor"
          className="w-[40%]"
        />
      </div>

      <div className="mb-12 mt-10 flex flex-wrap gap-3">
        <CategoriesFilters
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <BookCardSkeleton />
        ) : (
          books?.map((book) => <BookCard book={book} key={book.id} />)
        )}
      </div>
    </>
  )
}
