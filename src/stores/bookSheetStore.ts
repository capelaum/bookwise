import { api } from '@/lib/api'
import { Book } from '@/types/app'
import { useQuery } from '@tanstack/react-query'
import { create } from 'zustand'

interface BookSheetStore {
  book: Book | null
  setBook: (book: Book) => void
  isBookSheetOpen: boolean
  setIsBookSheetOpen: (isBookSheetOpen: boolean) => void
  toggleIsBookSheetOpen: (isBookSheetOpen: boolean) => void
}

export const useBookSheetStore = create<BookSheetStore>((set) => ({
  book: null,
  setBook: (book) => set({ book }),
  isBookSheetOpen: false,
  setIsBookSheetOpen: (isBookSheetOpen) => set({ isBookSheetOpen }),
  toggleIsBookSheetOpen: (isBookSheetOpen) =>
    set({ isBookSheetOpen: !isBookSheetOpen })
}))

const getBook = async (id: string) => {
  const response = await api(`/api/books/${id}`)

  if (response.status !== 200) {
    throw new Error('Error fetching questions')
  }

  const { data } = response

  return data
}

export const useFetchBook = (id: string) => {
  const { setBook } = useBookSheetStore()

  return useQuery(['book-sheet', id], () => getBook(id), {
    onSuccess: (book) => {
      setBook(book)
    }
  })
}
