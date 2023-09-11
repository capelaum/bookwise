import { BookOpen, BookmarkSimple } from '@/components/Icons'
import { createArrayFrom1ToN } from '@/lib/utils'
import { VariantProps, tv } from 'tailwind-variants'

import { Skeleton } from '../ui/Skeleton'
import { Stars } from '../ui/Stars'

const bookCardSkeleton = tv({
  slots: {
    base: 'flex flex-col gap-5 xs:gap-10 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4',
    book: 'flex gap-5',
    image: 'rounded-[4px] bg-gray-500'
  },
  variants: {
    variant: {
      explore: {
        image: 'h-[152px] w-[108px]'
      },
      popular: {
        image: 'h-[94px] w-[64px]'
      },
      sheet: {
        base: 'rounded-xl px-5 py-4 xs:px-8 xs:py-6 hover:border-gray-700',
        book: 'gap-5 xs:gap-8',
        image: 'h-[152px] w-[108px] xs:h-[242px] xs:w-[172px] rounded-xl'
      }
    }
  },
  defaultVariants: {
    variant: 'explore'
  }
})

interface BookCardSkeleton extends VariantProps<typeof bookCardSkeleton> {
  quantity?: number
}

export function BookCardSkeleton({ variant, quantity = 9 }: BookCardSkeleton) {
  return createArrayFrom1ToN(quantity).map((_, i) => (
    <Skeleton key={i} className={bookCardSkeleton({ variant }).base()}>
      <Skeleton className={bookCardSkeleton({ variant }).book()}>
        <Skeleton className={bookCardSkeleton({ variant }).image()} />

        <div className="flex flex-col">
          <Skeleton className="h-4 w-40 bg-gray-500" />
          <Skeleton className="mt-3 h-3 w-20 bg-gray-600" />

          <Stars
            rating={5}
            size={variant === 'sheet' ? 'md' : 'sm'}
            variant="skeleton"
            className="mt-auto"
          />

          {variant === 'sheet' && (
            <Skeleton className="mt-3 h-3 w-24 bg-gray-600" />
          )}
        </div>
      </Skeleton>

      {variant === 'sheet' && (
        <div className="flex flex-col gap-8 border-t border-gray-600 pt-6 sm:flex-row sm:gap-14">
          <div className="flex items-center gap-4">
            <BookmarkSimple size={24} className="text-green-100" />
            <div>
              <Skeleton className="h-3 w-40 bg-gray-600" />
              <Skeleton className="mt-3 h-4 w-20 bg-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <BookOpen size={24} className="text-green-100" />
            <div>
              <Skeleton className="h-3 w-40 bg-gray-600" />
              <Skeleton className="mt-3 h-4 w-20 bg-gray-500" />
            </div>
          </div>
        </div>
      )}
    </Skeleton>
  ))
}
