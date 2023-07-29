'use client'

import { useState } from 'react'

import { Book } from '@/app/(main)/explore/page'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { BookCard } from './BookCard'
import { CategoriesFilters } from './CategoriesFilters'
import { BookCardSkeleton } from './Skeletons/BookCardSkeleton'

export function BooksList() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('1')

  const { isLoading, data: books } = useQuery(
    ['books', selectedCategoryId],
    async () => {
      const { data: books } = await api(
        `/api/books?selectedCategoryId=${selectedCategoryId}`
      )

      return books as Book[]
    }
  )

  return (
    <>
      <div className="mb-12 mt-10 flex flex-wrap gap-3">
        <CategoriesFilters
          selectedCategory={selectedCategoryId}
          setSelectedCategory={setSelectedCategoryId}
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
