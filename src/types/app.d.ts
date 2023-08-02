export type Book = {
  id: string
  name: string
  author: string
  coverUrl: string
  rating: number
  numberOfRatings: number
  totalPages?: number
  categoriesNames?: string
  ratings?: Rating
}

export type Rating = {
  id: string
  description: string
  rate: number
  user?: {
    id: string
    name: string | null
    avatarUrl: string | null
  }
  book?: {
    id: string
    name: string
    author: string
    coverUrl: string
  }
}

export type Category = {
  id: string
  name: string
}
