import { Metadata } from 'next'
import { Suspense } from 'react'

import { CardRatings } from '@/components/CardRatings'
import { CaretRight, ChartLineUp } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { PopularBooksList } from '@/components/PopularBooksList'
import { PopularBooksListSkeleton } from '@/components/Skeletons/PopularBooksListSkeleton'
import { RatingCardsListSkeleton } from '@/components/Skeletons/RatingCardsListSkeleton'
import { Text } from '@/components/ui/Text'
import { TextLink } from '@/components/ui/TextLink'

export const metadata: Metadata = {
  title: 'Início | BookWise'
}

export default async function Home() {
  return (
    <div className="ml-0 mt-16 w-full md:ml-[250px] 2xl:ml-[348px]">
      <PageHeading
        title="Início"
        icon={<ChartLineUp size={32} className="text-green-100" />}
      />

      <div className="mt-10 flex w-full items-start gap-5 2xl:gap-16">
        <section className="w-full">
          <Text className="mb-4" size="sm">
            Avaliações mais recentes
          </Text>

          <Suspense fallback={<RatingCardsListSkeleton />}>
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

          <Suspense fallback={<PopularBooksListSkeleton />}>
            <PopularBooksList />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
