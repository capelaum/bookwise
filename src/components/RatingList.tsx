import { api } from '@/lib/api'
import { Rating } from '@/types/app'

import { RatingCard } from './RatingCard'

export async function RatingList() {
  const { data: ratings }: { data: Rating[] } = await api('/api/ratings')

  return ratings.map((rating) => <RatingCard key={rating.id} rating={rating} />)
}
