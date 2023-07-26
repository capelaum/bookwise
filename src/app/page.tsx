import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { ButtonsContainer } from '@/components/PageSignin/ButtonsContainer'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { getAuthSession } from '@/lib/auth'

import { Logo } from '@/assets'

export const metadata: Metadata = {
  title: 'Sign in | BookWise'
}

export default async function SignIn() {
  const session = await getAuthSession()

  if (session && session.user) {
    redirect('/home')
  }

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden p-5">
      <div className="flex h-full min-h-[calc(100vh-40px)] w-full max-w-7xl flex-col items-center justify-start rounded-lg bg-gray-700 p-5 md:min-h-0 md:flex-row md:bg-gray-800 md:p-0">
        <div className="flex w-full items-center justify-center rounded-xl p-4 md:min-h-[calc(100vh-40px)] md:max-w-[45%] md:bg-gray-700">
          <Image src={Logo} alt="BookWise Logo" priority />
        </div>

        <section className="mt-10 flex w-full flex-col items-center gap-10 md:mt-0 ">
          <header className="flex w-full flex-col gap-1 sm:w-[372px]">
            <Heading size="lg">Boas vindas!</Heading>
            <Text color="gray200">
              Faça seu login ou acesse como visitante.
            </Text>
          </header>

          <ButtonsContainer />
        </section>
      </div>
    </main>
  )
}
