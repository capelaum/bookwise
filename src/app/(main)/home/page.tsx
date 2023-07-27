import Image from 'next/image'
import { Suspense } from 'react'

import { CardRatings } from '@/components/CardRatings'
import CardRatingsSkeleton from '@/components/CardRatingsSkeleton'
import { CaretRight, ChartLineUp } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { Heading } from '@/components/ui/Heading'
import { Stars } from '@/components/ui/Stars'
import { Text } from '@/components/ui/Text'
import { TextLink } from '@/components/ui/TextLinks'

export default async function Home() {
  return (
    <div className="ml-0 mt-16 w-full md:ml-[250px] 2xl:ml-[348px]">
      <PageHeading
        title="Início"
        icon={<ChartLineUp size={32} color="hsl(var(--green-100))" />}
      />

      <div className="mt-10 flex w-full items-start gap-5 2xl:gap-16">
        <section className="w-full">
          <Text className="mb-4" size="sm">
            Avaliações mais recentes
          </Text>

          <Suspense fallback={<CardRatingsSkeleton />}>
            <CardRatings />
          </Suspense>
        </section>

        <section className="hidden min-w-[324px] xl:block">
          <div className="mb-4 flex items-center justify-between ">
            <Text size="sm">Livros populares</Text>

            <TextLink size="sm" href="/explore" title="Ver todos">
              Ver todos
              <CaretRight size={16} weight="bold" />
            </TextLink>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-5 rounded-lg border-2 border-gray-700 bg-gray-700 px-5 py-4 hover:border-gray-600">
              <Image
                width={64}
                height={94}
                src="https://res.cloudinary.com/capelaum/image/upload/v1680597630/BookWise/books/Book_heekbj.png"
                alt=""
                className="h-[94px] w-[64px] rounded-sm object-cover"
              />

              <div className="flex flex-col">
                <Heading size="xs">A revolução dos bichos</Heading>

                <Text size="sm" color="gray400">
                  George Orwell
                </Text>

                <Stars rating={4} size="sm" className="mt-auto" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
