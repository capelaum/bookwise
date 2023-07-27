import Image from 'next/image'

import { api } from '@/lib/api'

import { AvatarProfile } from './AvatarProfile'
import { Heading } from './ui/Heading'
import { ScrollArea } from './ui/ScrollArea'
import { Text } from './ui/Text'

export type Rating = {
  id: string
  description: string
  rating: number
  user: {
    id: string
    name: string
    avatar_url: string | null
  }
  book: {
    id: string
    name: string
    author: string
    cover_url: string
  }
}

export async function CardRatings() {
  const { data: ratings }: { data: Rating[] } = await api('/api/ratings')

  return (
    <ScrollArea className="rounded-lg pr-3">
      <div className="flex flex-col gap-3">
        {ratings.map((rating) => (
          <div
            className="h-72 w-full rounded-lg bg-gray-700 p-6"
            key={rating.id}
          >
            <div className="mb-8 flex gap-4">
              <AvatarProfile
                name={rating.user.name}
                avatar_url={rating.user.avatar_url}
              />

              <div className="flex flex-col">
                <Text>{rating.user.name}</Text>
                <Text size="sm" color="gray400" asChild>
                  <span>Hoje</span>
                </Text>
              </div>
            </div>

            <div className="flex gap-5">
              <Image
                width={108}
                height={152}
                src={rating.book.cover_url}
                alt={rating.book.name}
                className="h-[152px] w-[108px] rounded-md object-cover"
              />

              <div className="">
                <Heading size="sm" asChild>
                  <h2>{rating.book.name}</h2>
                </Heading>

                <Text size="sm" color="gray400" asChild>
                  <span>{rating.book.author}</span>
                </Text>

                <Text size="sm" className="mt-5" color="gray300">
                  {rating.description}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
