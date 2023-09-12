import { Book, BookFilters } from '@/types/app'

export async function getBooks(bookFilters: BookFilters): Promise<Book[]> {
  const urlSearchParams = new URLSearchParams(bookFilters)

  const res = await fetch(`http://localhost:3000/api/books?${urlSearchParams}`)

  if (!res.ok) {
    throw new Error('Failed to fetch books')
  }

  const books = await res.json()

  return books
}

export async function getPopularBooks(): Promise<{ popularBooks: Book[] }> {
  const res = await fetch('http://localhost:3000/api/books/popular')

  if (!res.ok) {
    throw new Error('Failed to fetch popular books')
  }

  const popularBooks = await res.json()

  return { popularBooks }
}

export async function getBook(bookId: string): Promise<Book> {
  const res = await fetch(`http://localhost:3000/api/books/${bookId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch book')
  }

  const book = await res.json()

  return book
}
