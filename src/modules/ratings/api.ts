import { api } from '@/lib/api'
import { Rating } from '@/types/app'

export async function getRatings(): Promise<Rating[]> {
  const response = await api('/ratings')
  console.log('💥 ~ response:', response)

  if (response.status !== 200) {
    throw new Error('Failed to fetch popular books')
  }

  const ratings = response.data
  console.log('💥 ~ ratings:', ratings)

  return ratings
}
