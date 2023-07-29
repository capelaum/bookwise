import { createArrayFrom1ToN } from '@/lib/utils'

import { Skeleton } from '../ui/Skeleton'

export function CategoryTagSkeleton() {
  return createArrayFrom1ToN(8).map((_, i) => (
    <Skeleton key={i} className="h-[34px] w-24 rounded-full bg-gray-700" />
  ))
}
