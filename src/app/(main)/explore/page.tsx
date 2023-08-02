import { Metadata } from 'next'

import { BooksList } from '@/components/BooksList'
import { Rating } from '@/components/CardRatings'

export const metadata: Metadata = {
  title: 'BookWise | Explorar'
}

export type Book = {
  id: string
  name: string
  author: string
  coverUrl: string
  rating: number
  numberOfRatings: number
  totalPages?: number
  categoriesNames?: string
  ratings?: Rating
}

export default function Explore() {
  return (
    <section className="ml-0 mt-16 w-full md:ml-[250px] 2xl:ml-[348px]">
      <BooksList />
    </section>
  )
}
