import { getRatings } from '@/modules/ratings/api'
import { RatingCard } from './RatingCard'

export async function RatingList() {
  const ratings = await getRatings()

  return ratings.map((rating) => <RatingCard key={rating.id} rating={rating} />)
}
