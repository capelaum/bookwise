import { api } from '@/lib/api'
import { Rating } from '@/types/app'

export async function getRatings(): Promise<Rating[]> {
  const response = await api('/ratings')

  if (response.status !== 200) {
    throw new Error('Failed to fetch popular books')
  }

  const ratings = response.data

  return ratings
}
