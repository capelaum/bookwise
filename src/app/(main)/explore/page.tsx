import { Metadata } from 'next'

import { BooksList } from '@/components/BooksList'

export const metadata: Metadata = {
  title: 'BookWise | Explorar'
}

export default function Explore() {
  return (
    <section className="ml-0 mt-16 w-full md:ml-[250px] 2xl:ml-[348px]">
      <BooksList />
    </section>
  )
}
