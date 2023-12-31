'use client'

import { GithubIcon, GoogleIcon } from '@/assets'
import { RocketLaunch } from '@/components/Icons'
import { toast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface SignInButtonsProps {
  isDialog?: boolean
}

export function SignInButtons({ isDialog = false }: SignInButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (type: 'github' | 'google') => {
    setIsLoading(true)

    try {
      await signIn(type, {
        callbackUrl: '/home'
      })

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Seja bem-vindo ao BookWise'
      })
    } catch (error) {
      console.log('💥 ~ error:', error)
      toast({
        title: 'Error',
        description: `Ocorreu um erro ao fazer login com o ${type}`,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 sm:w-[372px]">
      <button
        className="sign-in-button"
        title="Entrar com Google"
        onClick={() => handleLogin('google')}
        disabled={isLoading}
      >
        <Image src={GoogleIcon} alt="Google Icon" />
        Entrar com Google
      </button>

      <button
        className="sign-in-button"
        title="Entrar com Github"
        onClick={() => handleLogin('github')}
        disabled={isLoading}
      >
        <Image src={GithubIcon} alt="Github Icon" />
        Entrar com Github
      </button>

      {!isDialog && (
        <Link href="/home" className="sign-in-button">
          <RocketLaunch
            size={32}
            weight="regular"
            className="text-purple-100"
          />
          <span>Entrar como visitante</span>
        </Link>
      )}
    </div>
  )
}
