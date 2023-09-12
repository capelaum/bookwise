import Image from 'next/image'

import { Rating } from '@/types/app'
import { VariantProps, tv } from 'tailwind-variants'

import { AvatarProfile } from './AvatarProfile'
import { Heading } from './ui/Heading'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'

const ratingCard = tv({
  slots: {
    base: 'h-full w-full rounded-lg bg-gray-700 p-6',
    profile:
      'mb-5 flex flex-col justify-between gap-5 xs:mb-8 xs:flex-row xs:items-start',
    profileUser: 'flex items-center gap-4',
    profileUserDetails: 'flex flex-col items-start',
    description: 'text-sm text-gray-300'
  },
  variants: {
    variant: {
      home: {
        base: 'border-2 border-gray-700 hover:border-gray-600 md:h-72',
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

interface RatingCardProps extends VariantProps<typeof ratingCard> {
  rating: Rating
}

export function RatingCard({ rating, variant }: RatingCardProps) {
  return (
    <div className={ratingCard({ variant }).base()}>
      <div className={ratingCard({ variant }).profile()}>
        <div className={ratingCard({ variant }).profileUser()}>
          <AvatarProfile
            name={rating.user.name}
            avatarUrl={rating.user.avatarUrl}
          />

          <div className={ratingCard({ variant }).profileUserDetails()}>
            <Text>{rating.user.name}</Text>
            <Text size="sm" color="gray400" asChild>
              <span>Hoje</span>
            </Text>
          </div>
        </div>

        <Stars rating={rating.rate} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-5 xs:flex-row xs:items-start">
        {rating.book && (
          <Image
            width={108}
            height={152}
            src={rating.book.coverUrl}
            alt={rating.book.name}
            className="h-[152px] w-[108px] rounded-md object-cover"
          />
        )}

        <div className="flex w-full flex-col items-center overflow-hidden xs:items-start">
          {rating.book && (
            <>
              <Heading
                size="xs"
                asChild
                className="overflow-hidden text-center xs:text-ellipsis xs:whitespace-nowrap xs:text-left"
              >
                <h2>{rating.book.name}</h2>
              </Heading>

              <Text size="sm" color="gray400" asChild>
                <span className="mb-5 mt-2 xs:mt-0">{rating.book.author}</span>
              </Text>
            </>
          )}

          <Text className={ratingCard({ variant }).description()}>
            {rating.description}
          </Text>
        </div>
      </div>
    </div>
  )
}
