'use client'

import Image from 'next/image'
import Link from 'next/link'

import { RocketLaunch } from 'phosphor-react'

import { GithubIcon, GoogleIcon } from '@/assets'

import { Button } from './Button'

export function ButtonsContainer() {
  return (
    <div className="flex w-full flex-col gap-4 sm:w-[372px]">
      <Button
        icon={<Image src={GoogleIcon} alt="Google Icon" />}
        text="Entrar com Google"
      />

      <Button
        icon={<Image src={GithubIcon} alt="Github Icon" />}
        text="Entrar com Github"
      />

      <Link href="/home" className="sign-in-button">
        <RocketLaunch size={32} weight="regular" color="var(--purple-100)" />
        <span>Entrar como visitante</span>
      </Link>
    </div>
  )
}
