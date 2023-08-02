import { Metadata } from 'next'
import { Suspense } from 'react'

import { CaretRight, ChartLineUp } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { PopularBooksList } from '@/components/PopularBooksList'
import { RatingList } from '@/components/RatingList'
import { BookCardSkeleton } from '@/components/Skeletons/BookCardSkeleton'
import { RatingCardSkeleton } from '@/components/Skeletons/RatingCardSkeleton'
import { Text } from '@/components/ui/Text'
import { TextLink } from '@/components/ui/TextLink'

export const metadata: Metadata = {
  title: 'BookWise | Início'
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

          <div className="flex flex-col gap-3">
            <Suspense fallback={<RatingCardSkeleton />}>
              <RatingList />
            </Suspense>
          </div>
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
            <Suspense
              fallback={<BookCardSkeleton quantity={5} variant="popular" />}
            >
              <PopularBooksList />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
