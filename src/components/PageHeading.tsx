import { ReactNode } from 'react'

import { Heading } from './ui/Heading'

interface PageHeadingProps {
  title: string
  icon: ReactNode
}

export function PageHeading({ title, icon }: PageHeadingProps) {
  return (
    <Heading size="lg" className="flex items-center gap-3">
      {icon}
      {title}
    </Heading>
  )
}
