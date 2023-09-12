import { Book } from '@/types/app'
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
