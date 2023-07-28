import { Book } from '@/app/(main)/explore/page'
import { api } from '@/lib/api'

import { BookCard } from './BookCard'

export async function PopularBooksList() {
  const { data: popularBooks }: { data: Book[] } = await api(
    '/api/books/popular'
  )

  return popularBooks.map((book) => (
    <BookCard variant="popular" book={book} key={book.id} />
  ))
}
