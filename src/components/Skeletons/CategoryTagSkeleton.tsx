import { createArrayFrom1ToN } from '@/lib/utils'

import { Skeleton } from '../ui/Skeleton'

interface CategoryTagSkeletonProps {
  quantity?: number
}

export function CategoryTagSkeleton({
  quantity = 12
}: CategoryTagSkeletonProps) {
  return createArrayFrom1ToN(quantity).map((_, i) => (
    <Skeleton key={i} className="h-[34px] w-24 rounded-full bg-gray-700" />
  ))
}
