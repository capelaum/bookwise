import { ReactNode } from 'react'

import { Navbar } from '@/components/Navbar'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] border border-blue-500 p-5">
      <Navbar />

      {children}
    </main>
  )
}
