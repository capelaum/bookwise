import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { ReactNode } from 'react'

import { Favicon } from '@/components/Head/Favicon/Favicon'

import '@/styles/globals.css'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false
})

export const metadata: Metadata = {
  title: 'BookWise',
  description:
    'BookWise, o lugar ideal para você avaliar os melhores livros e compartilhar suas opiniões sobre eles.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <Favicon />
      </head>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
