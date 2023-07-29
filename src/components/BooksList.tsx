'use client'

import { useState } from 'react'

import { Book } from '@/app/(main)/explore/page'
import { Binoculars } from '@/components/Icons'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { BookCard } from './BookCard'
import { CategoriesFilters } from './CategoriesFilters'
import { PageHeading } from './PageHeading'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'

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
      <PageHeading
        title="Explorar"
        icon={<Binoculars size={32} className="text-green-100" />}
      />

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
