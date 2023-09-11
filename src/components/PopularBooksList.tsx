import { getPopularBooks } from '@/modules/books/api'

import { BookCard } from './BookCard'

export async function PopularBooksList() {
  const { popularBooks } = await getPopularBooks()

  return popularBooks.map((book) => (
    <BookCard variant="popular" book={book} key={book.id} />
  ))
}
