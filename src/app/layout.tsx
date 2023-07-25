import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login | Bookwise',
  description:
    'BookWise, o lugar ideal para você avaliar os melhores livros e compartilhar suas opiniões sobre eles.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const obj = {
    something: 'something',
    other: 'other'
  }

  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
