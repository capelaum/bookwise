import { api } from '@/lib/api'
import { Rating } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getRatings } from './api'

export function useRatings() {
  return useQuery({
    queryKey: ['ratings'],
    queryFn: getRatings
  })
}

type CreateRatingRequest = {
  bookId: string
  rate: number
  description: string
}

type CreateRatingResponse = {
  createdRating: Rating
}

export function useRatingMutations() {
  const [isRatingMutationLoading, setIsRatingMutationLoading] = useState(false)

  const queryClient = useQueryClient()

  const createRatingMutation = useMutation({
    mutationFn: async ({ bookId, rate, description }: CreateRatingRequest) => {
      setIsRatingMutationLoading(true)

      const response = await api.post('/ratings', {
        bookId,
        rate,
        description
      })

      if (response.status !== 201) {
        throw new Error('Error creating task')
      }

      const { createdRating }: CreateRatingResponse = response.data

      return createdRating
    },
    onSuccess: (rating) => {
      queryClient.invalidateQueries([rating.book_id])
    },
    onError: (error) => {
      console.error('💥 ~ error:', error)
    },
    onSettled: () => {
      setIsRatingMutationLoading(false)
    }
  })

  return {
    createRatingMutation,
    isRatingMutationLoading,
    setIsRatingMutationLoading
  }
}
