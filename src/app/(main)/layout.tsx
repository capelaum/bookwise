import { Metadata } from 'next'
import { ReactNode } from 'react'

import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Início | BookWise'
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex h-screen max-w-[1400px] justify-start border border-red-500 p-5">
      <Navbar />

      {children}
    </main>
  )
}
