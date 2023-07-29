import { Skeleton } from '@/components/ui/Skeleton'
import { createArrayFrom1ToN } from '@/lib/utils'

import { Stars } from '../ui/Stars'

export function RatingCardsListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      {createArrayFrom1ToN(5).map((_, i) => (
        <Skeleton key={i} className="h-72 w-full rounded-lg p-6">
          <div className="mb-8 flex justify-between">
            <div className="flex gap-4">
              <Skeleton className="aspect-square h-10 w-10 rounded-full bg-gray-500" />

              <div className="space-y-3">
                <Skeleton className="h-4 w-40 bg-gray-500" />
                <Skeleton className="h-3 w-20 bg-gray-600" />
              </div>
            </div>

            <Stars rating={5} size="sm" variant="skeleton" />
          </div>

          <div className="flex gap-5">
            <Skeleton className="min-h-[152px] min-w-[108px] rounded-md bg-gray-500 object-cover" />

            <div className="w-full ">
              <Skeleton className="h-4 w-40 bg-gray-500" />
              <Skeleton className="mt-3 h-3 w-20 bg-gray-600" />

              <div className="mt-8 space-y-3">
                <Skeleton className="h-3 w-full bg-gray-600" />
                <Skeleton className="h-3 w-full bg-gray-600" />
                <Skeleton className="h-3 w-full bg-gray-600" />
                <Skeleton className="h-3 w-full bg-gray-600" />
              </div>
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  )
}
