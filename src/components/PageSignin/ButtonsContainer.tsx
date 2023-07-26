'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import { RocketLaunch } from 'phosphor-react'

import { GithubIcon, GoogleIcon } from '@/assets'

export function ButtonsContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { toast } = useToast()

  const handleLoginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google', {
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
        description: 'Ocorreu um erro ao fazer login com o Google',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github', {
        callbackUrl: '/home'
      })

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Seja bem-vindo ao BookWise'
      })
    } catch (error) {
      console.log('💥 ~ error:', error)
      toast({
        title: 'Erro 😕',
        description: 'Ocorreu um erro ao fazer login com o Github',
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
        onClick={handleLoginWithGoogle}
        disabled={isLoading}
      >
        <Image src={GoogleIcon} alt="Google Icon" />
        Entrar com Google
      </button>

      <button
        className="sign-in-button"
        title="Entrar com Github"
        onClick={handleLoginWithGithub}
        disabled={isLoading}
      >
        <Image src={GithubIcon} alt="Github Icon" />
        Entrar com Github
      </button>

      <Link href="/home" className="sign-in-button">
        <RocketLaunch size={32} weight="regular" color="var(--purple-100)" />
        <span>Entrar como visitante</span>
      </Link>
    </div>
  )
}
