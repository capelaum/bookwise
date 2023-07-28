import { VariantProps, tv } from 'tailwind-variants'

import { Skeleton } from '../ui/Skeleton'
import { Stars } from '../ui/Stars'

const bookCardSkeleton = tv({
  slots: {
    base: 'flex gap-5 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4',
    image: 'rounded-sm object-cover bg-gray-500'
  },
  variants: {
    variant: {
      explore: {
        image: 'h-[152px] w-[108px]'
      },
      popular: {
        image: 'h-[94px] w-[64px]'
      }
    }
  },
  defaultVariants: {
    variant: 'explore'
  }
})

interface BookCardSkeleton extends VariantProps<typeof bookCardSkeleton> {}

export function BookCardSkeleton({ variant }: BookCardSkeleton) {
  return Array.from({ length: 15 }, (_, index) => index + 1).map((_, i) => (
    <Skeleton key={i} className={bookCardSkeleton().base()}>
      <Skeleton className={bookCardSkeleton({ variant }).image()} />

      <div className="flex flex-col">
        <Skeleton className="h-4 w-40 bg-gray-500" />
        <Skeleton className="mt-3 h-3 w-20 bg-gray-600" />

        <Stars rating={5} size="sm" variant="skeleton" className="mt-auto" />
      </div>
    </Skeleton>
  ))
}
