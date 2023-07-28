import { Metadata } from 'next'
import { Suspense } from 'react'

import { BooksList } from '@/components/BooksList'
import { Binoculars } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { BookCardSkeleton } from '@/components/Skeletons/BookCardSkeleton'

export const metadata: Metadata = {
  title: 'Explorar | BookWise'
}

export type Book = {
  id: string
  name: string
  author: string
  coverUrl: string
  rating: number
  numberOfRatings: number
}

export default async function Explore() {
  return (
    <section className="ml-0 mt-16 w-full border border-red-500 md:ml-[250px] 2xl:ml-[348px]">
      <PageHeading
        title="Explorar"
        icon={<Binoculars size={32} className="text-green-100" />}
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<BookCardSkeleton />}>
          <BooksList />
        </Suspense>
      </div>
    </section>
  )
}
