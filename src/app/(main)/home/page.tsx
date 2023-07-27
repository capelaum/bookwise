import { Suspense } from 'react'

import { CardRatings } from '@/components/CardRatings'
import CardRatingsSkeleton from '@/components/CardRatingsSkeleton'
import { ChartLineUp } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { Text } from '@/components/ui/Text'

export default async function Home() {
  return (
    <section className="mt-16 flex w-full flex-col">
      <PageHeading
        title="Início"
        icon={<ChartLineUp size={32} color="var(--green-100)" />}
      />

      <Text className="mb-4 mt-10" size="sm">
        Avaliações mais recentes
      </Text>

      <Suspense fallback={<CardRatingsSkeleton />}>
        <CardRatings />
      </Suspense>
    </section>
  )
}
