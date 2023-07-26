'use client'

import { Session } from 'next-auth'
import Link from 'next/link'

import { getUserNameInitials } from '@/lib/utils'
import { SignIn, SignOut } from 'phosphor-react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { Text } from '../ui/Text'

interface NavProfileProps {
  session: Session | null
}

export function NavProfile({ session }: NavProfileProps) {
  if (session && session.user) {
    return (
      <button className="navbar-profile">
        <Avatar size="sm">
          {session.user.avatar_url ? (
            <AvatarImage
              src={session.user.avatar_url}
              alt={session.user.name ?? ''}
            />
          ) : (
            <AvatarFallback size="sm">
              {getUserNameInitials(session.user.name ?? '')}
            </AvatarFallback>
          )}
        </Avatar>

        <Text weight="bold">Nome</Text>

        <SignOut size={24} color="#F75A68" />
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
