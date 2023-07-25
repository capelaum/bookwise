import { Metadata } from 'next'
import Image from 'next/image'

import { ButtonsContainer } from '@/components/Page-Signin/Buttons-Container'

import { Logo } from '@/assets'

export const metadata: Metadata = {
  title: 'Sign in | BookWise'
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 overflow-hidden">
      <div className="w-full h-full min-h-[calc(100vh-40px)] md:min-h-0 max-w-7xl p-5 md:p-0 flex flex-col md:flex-row items-center justify-start bg-gray-700 md:bg-gray-800 rounded-lg">
        <div className="w-full md:max-w-[45%] md:min-h-[calc(100vh-40px)] p-4 flex items-center justify-center md:bg-gray-700 rounded-xl">
          <Image src={Logo} alt="BookWise Logo" />
        </div>

        <ButtonsContainer />
      </div>
    </main>
  )
}
