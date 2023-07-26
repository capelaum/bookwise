'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import { getUserNameInitials } from '@/lib/utils'
import { SignIn, SignOut } from 'phosphor-react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { Text } from '../ui/Text'

interface NavProfileProps {
  session: Session | null
}

export function NavProfile({ session }: NavProfileProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      await signOut()

      toast({
        title: 'Logout realizado com sucesso!',
        description: 'Esperamos te ver em breve 👋'
      })
    } catch (error) {
      console.log('💥 ~ error:', error)
      toast({
        title: 'Error',
        description: 'Ocorreu um erro ao fazer login com o Github',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (session && session.user) {
    return (
      <button
        className="navbar-profile"
        title="Fazer logout"
        disabled={isLoading}
        onClick={handleLogout}
      >
        <Avatar size="sm">
          {session.user.avatar_url ? (
            <AvatarImage
              src={session.user.avatar_url}
              alt={session.user.name}
            />
          ) : (
            <AvatarFallback size="sm">
              {getUserNameInitials(session.user.name)}
            </AvatarFallback>
          )}
        </Avatar>

        <Text weight="bold" size="sm" asChild>
          <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {session.user.name}
          </span>
        </Text>

        <SignOut size={24} color="#F75A68" className="min-w-fit " />
      </button>
    )
  }

  return (
    <Link href="/" className="navbar-profile">
      <Text weight="bold">Fazer login</Text>
      <SignIn size={24} color="var(--green-100)" />
    </Link>
  )
}