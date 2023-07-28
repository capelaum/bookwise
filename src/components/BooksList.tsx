import { Book } from '@/app/(main)/explore/page'
import { api } from '@/lib/api'

import { BookCard } from './BookCard'

export async function BooksList() {
  const { data: books }: { data: Book[] } = await api('/api/books')

  return books.map((book) => <BookCard book={book} key={book.id} />)
}
