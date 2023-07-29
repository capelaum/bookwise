import { Metadata } from 'next'

import { BooksList } from '@/components/BooksList'
import { Binoculars } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'

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
      <PageHeading
        title="Explorar"
        icon={<Binoculars size={32} className="text-green-100" />}
      />

      <BooksList />
    </section>
  )
}
