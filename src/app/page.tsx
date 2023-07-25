'use client'

import Image from 'next/image'

import { SignInButton } from '@/components/Page-Signin/SignIn-Button'
import { RocketLaunch } from 'phosphor-react'

import { GithubIcon, GoogleIcon, Logo } from '@/assets'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 overflow-hidden">
      <div className="w-full h-full min-h-[calc(100vh-40px)] md:min-h-0 max-w-7xl p-5 md:p-0 flex flex-col md:flex-row items-center justify-start bg-gray-700 md:bg-gray-800 rounded-lg">
        <div className="w-full md:max-w-[45%] md:min-h-[calc(100vh-40px)] p-4 flex items-center justify-center md:bg-gray-700 rounded-xl">
          <Image src={Logo} alt="BookWise Logo" />
        </div>

        <div className="w-full mt-10 md:mt-0 flex flex-col items-center gap-10 ">
          <header className="w-full sm:w-[372px] flex flex-col gap-1 ">
            <h1 className="font-bold text-2xl">Boas vindas!</h1>
            <h2 className="text-md leading-tall">
              Faça seu login ou acesse como visitante.
            </h2>
          </header>

          <div className="flex flex-col gap-4 w-full sm:w-[372px]">
            <SignInButton
              icon={<Image src={GoogleIcon} alt="Google Icon" />}
              text="Entrar com Google"
            />

            <SignInButton
              icon={<Image src={GithubIcon} alt="Github Icon" />}
              text="Entrar com Github"
            />

            <SignInButton
              icon={
                <RocketLaunch
                  size={32}
                  weight="regular"
                  color="var(--purple-100)"
                />
              }
              text="Entrar como visitante"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
