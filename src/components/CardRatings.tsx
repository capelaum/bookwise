import Image from 'next/image'

import { api } from '@/lib/api'

import { AvatarProfile } from './AvatarProfile'
import { Heading } from './ui/Heading'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'

export type Rating = {
  id: string
  description: string
  rate: number
  user: {
    id: string
    name: string
    avatarUrl: string | null
  }
  book: {
    id: string
    name: string
    author: string
    coverUrl: string
  }
}

export async function CardRatings() {
  const { data: ratings }: { data: Rating[] } = await api('/api/ratings')

  return (
    <div className="flex flex-col gap-3">
      {ratings.map((rating) => (
        <div
          className="h-full w-full rounded-lg border-2 border-gray-700 bg-gray-700 p-6 hover:border-gray-600 md:h-72"
          key={rating.id}
        >
          <div className="mb-3 flex flex-col items-center justify-between gap-6 xs:mb-8 xs:flex-row xs:gap-2">
            <div className="flex flex-col items-center gap-2 xs:flex-row xs:gap-4">
              <AvatarProfile
                name={rating.user.name}
                avatar_url={rating.user.avatarUrl}
              />

              <div className="flex flex-col items-center xs:items-start">
                <Text>{rating.user.name}</Text>
                <Text size="sm" color="gray400" asChild>
                  <span>Hoje</span>
                </Text>
              </div>
            </div>

            <Stars rating={rating.rate} size="sm" />
          </div>

          <div className="flex flex-col items-center gap-5 xs:flex-row xs:items-start">
            <Image
              width={108}
              height={152}
              src={rating.book.coverUrl}
              alt={rating.book.name}
              className="h-[152px] w-[108px] rounded-md object-cover"
            />

            <div className="flex w-full flex-col items-center overflow-hidden xs:items-start">
              <Heading
                size="xs"
                asChild
                className="overflow-hidden text-center xs:text-ellipsis xs:whitespace-nowrap xs:text-left"
              >
                <h2>{rating.book.name}</h2>
              </Heading>

              <Text size="sm" color="gray400" asChild>
                <span className="mt-2 xs:mt-0">{rating.book.author}</span>
              </Text>

              <Text size="sm" className="mt-5 line-clamp-4" color="gray300">
                {rating.description}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
