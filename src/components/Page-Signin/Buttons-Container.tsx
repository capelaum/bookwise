'use client'

import Image from 'next/image'

import { RocketLaunch } from 'phosphor-react'

import { GithubIcon, GoogleIcon } from '@/assets'

import { Button } from './Button'

export function ButtonsContainer() {
  return (
    <div className="w-full mt-10 md:mt-0 flex flex-col items-center gap-10 ">
      <header className="w-full sm:w-[372px] flex flex-col gap-1">
        <h1 className="font-bold text-2xl">Boas vindas!</h1>
        <h2 className="text-md leading-tall">
          Faça seu login ou acesse como visitante.
        </h2>
      </header>

      <div className="flex flex-col gap-4 w-full sm:w-[372px]">
        <Button
          icon={<Image src={GoogleIcon} alt="Google Icon" />}
          text="Entrar com Google"
        />

        <Button
          icon={<Image src={GithubIcon} alt="Github Icon" />}
          text="Entrar com Github"
        />

        <Button
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
  )
}
