import { Metadata } from 'next'

import { BooksList } from '@/components/BooksList'

export const metadata: Metadata = {
  title: 'BookWise | Explorar'
}

export default async function Explore({
  searchParams
}: {
  searchParams: { bookId?: string }
}) {
  const bookId = searchParams?.bookId

  return (
    <section className="ml-0 mt-16 w-full md:ml-[250px] 2xl:ml-[348px]">
      <BooksList bookId={bookId} />
    </section>
  )
}
