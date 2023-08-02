import { Skeleton } from '@/components/ui/Skeleton'
import { createArrayFrom1ToN } from '@/lib/utils'
import { VariantProps, tv } from 'tailwind-variants'

import { Stars } from '../ui/Stars'

const ratingCardSkeleton = tv({
  slots: {
    base: 'h-full w-full rounded-lg p-6',
    profile:
      'mb-5 flex flex-col justify-between gap-5 xs:mb-8 xs:flex-row xs:items-start',
    profileUser: 'flex gap-4',
    profileUserDetails: 'flex flex-col gap-2 items-start',
    description: 'text-sm text-gray-300'
  },
  variants: {
    variant: {
      home: {
        base: 'md:h-72',
        profile: 'mb-3 items-center gap-6 xs:gap-3',
        profileUser: 'flex-col items-center gap-2 xs:flex-row xs:gap-4',
        profileUserDetails: 'items-center xs:items-start',
        description: 'line-clamp-4'
      },
      sheet: {}
    }
  },
  defaultVariants: {
    variant: 'home'
  }
})

interface RatingCardSkeletonProps
  extends VariantProps<typeof ratingCardSkeleton> {
  quantity?: number
}

export function RatingCardSkeleton({
  variant = 'home',
  quantity = 5
}: RatingCardSkeletonProps) {
  return createArrayFrom1ToN(quantity).map((_, i) => (
    <Skeleton key={i} className={ratingCardSkeleton({ variant }).base()}>
      <div className={ratingCardSkeleton({ variant }).profile()}>
        <div className={ratingCardSkeleton({ variant }).profileUser()}>
          <Skeleton className="aspect-square h-10 w-10 rounded-full bg-gray-500" />

          <div className={ratingCardSkeleton({ variant }).profileUserDetails()}>
            <Skeleton className="h-4 w-40 bg-gray-500" />
            <Skeleton className="h-3 w-20 bg-gray-600" />
          </div>
        </div>

        <Stars rating={5} size="sm" variant="skeleton" />
      </div>

      <div className="flex flex-col items-center gap-5 xs:flex-row xs:items-start">
        {variant === 'home' && (
          <Skeleton className="min-h-[152px] min-w-[108px] rounded-md bg-gray-500" />
        )}

        <div className="flex w-full flex-col items-center xs:items-start">
          {variant === 'home' && (
            <>
              <Skeleton className="h-4 w-40 bg-gray-500" />
              <Skeleton className="mb-6 mt-3 h-3 w-20 bg-gray-600" />
            </>
          )}

          <div className="w-full space-y-3">
            <Skeleton className="h-3 w-full bg-gray-600" />
            <Skeleton className="h-3 w-full bg-gray-600" />
            <Skeleton className="h-3 w-full bg-gray-600" />
            <Skeleton className="h-3 w-full bg-gray-600" />
          </div>
        </div>
      </div>
    </Skeleton>
  ))
}
