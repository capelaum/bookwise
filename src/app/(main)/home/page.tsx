'use client'

import { PageHeading } from '@/components/PageHeading'
import { ChartLineUp } from 'phosphor-react'

export default function Home() {
  return (
    <div className="mt-16 flex w-full items-start border border-red-500">
      <PageHeading
        title="Início"
        icon={<ChartLineUp size={32} color="var(--green-100)" />}
      />
    </div>
  )
}
