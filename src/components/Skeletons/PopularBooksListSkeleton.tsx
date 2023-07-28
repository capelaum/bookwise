import { Skeleton } from '../ui/Skeleton'
import { Stars } from '../ui/Stars'

export function PopularBooksListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <Skeleton
          key={i}
          className="flex gap-5 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4"
        >
          <Skeleton className="h-[94px] w-[64px] rounded-sm bg-gray-500" />

          <div className="flex flex-col">
            <Skeleton className="h-4 w-40 bg-gray-500" />
            <Skeleton className="mt-3 h-3 w-20 bg-gray-600" />

            <Stars
              rating={5}
              size="sm"
              variant="skeleton"
              className="mt-auto"
            />
          </div>
        </Skeleton>
      ))}
    </div>
  )
}
