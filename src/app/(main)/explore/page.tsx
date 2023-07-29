import { Metadata } from 'next'

import { BooksList } from '@/components/BooksList'

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

export default function Explore() {
  return (
    <section className="ml-0 mt-16 w-full border border-red-500 md:ml-[250px] 2xl:ml-[348px]">
      <BooksList />
    </section>
  )
}
