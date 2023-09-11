import { Rating } from '@/types/app'

export async function getRatings(): Promise<{ ratings: Rating[] }> {
  const res = await fetch('http://localhost:3000/api/ratings')

  if (!res.ok) {
    throw new Error('Failed to fetch popular books')
  }

  const ratings = await res.json()

  return { ratings }
}
