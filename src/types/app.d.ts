export type Book = {
  id: string
  name: string
  author: string
  coverUrl: string
  rating: number
  numberOfRatings: number
  totalPages?: number
  categoriesNames?: string
  ratings?: Rating[]
}

export type BookFilters = {
  categoryId: string
  search: string
}

export type Rating = {
  id: string
  description: string
  rate: number
  user: {
    id: string
    name: string
    avatarUrl: string | null
  }
  book?: {
    id: string
    name: string
    author: string
    coverUrl: string
  }
}

export type SimpleRating = Omit<Rating, user, book>

export type Category = {
  id: string
  name: string
}
