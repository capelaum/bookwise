import Image from 'next/image'

import { AvatarProfile } from '@/components/AvatarProfile'
import { ChartLineUp } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { Heading } from '@/components/ui/Heading'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Text } from '@/components/ui/Text'
import { api } from '@/lib/api'
import { getAuthSession } from '@/lib/auth'

type Rating = {
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

export default async function Home() {
  const session = await getAuthSession()

  const { data: ratings }: { data: Rating[] } = await api('/api/ratings')

  return (
    <section className="mt-16 flex w-full flex-col items-start">
      <PageHeading
        title="Início"
        icon={<ChartLineUp size={32} color="var(--green-100)" />}
      />

      <Text className="mb-4 mt-10" size="sm">
        Avaliações mais recentes
      </Text>

      <ScrollArea className="verflow-hidden flex flex-col gap-3 rounded-lg pr-3">
        <div className="flex flex-col gap-3">
          {ratings.map((rating) => (
            <div className="w-full rounded-lg bg-gray-700 p-6" key={rating.id}>
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
    </section>
  )
}
