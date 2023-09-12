import { Category } from '@/types/app'

export async function getCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:3000/api/categories')

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  const categories = await res.json()

  return categories
}
