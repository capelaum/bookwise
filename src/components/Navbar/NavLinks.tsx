'use client'

import { type Session } from 'next-auth'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { Binoculars, ChartLineUp, User } from 'phosphor-react'
import { VariantProps, tv } from 'tailwind-variants'

import { Text } from '../ui/Text'

const NAV_ITEMS = [
  {
    label: 'Início',
    href: '/home',
    icon: <ChartLineUp size={24} />
  },
  {
    label: 'Explorar',
    href: '/explore',
    icon: <Binoculars size={24} />
  }
]

interface NavLinksProps {
  session: Session | null
}

export function NavLinks({ session }: NavLinksProps) {
  const navItems = useMemo(() => {
    if (session && session.user) {
      return [
        ...NAV_ITEMS,
        {
          label: 'Perfil',
          href: `/profile/${session.user.id}`,
          icon: <User size={24} />
        }
      ]
    }

    return NAV_ITEMS
  }, [session])

  return (
    <div className="flex gap-8 md:mt-16 md:flex-col md:gap-4">
      {navItems.map(({ href, label, icon }) => (
        <NavLink key={label} href={href} label={label} icon={icon} />
      ))}
    </div>
  )
}

const navlink = tv({
  base: "relative flex items-center gap-3 py-2 hover:text-gray-100 transition-all duration-200 ease-in-out before:absolute before:-bottom-[6px] md:before:-left-5 before:content-[''] md:before:w-1 before:w-full before:h-1 md:before:h-6 before:rounded-full before:bg-gradient-to-b before:from-green-gradient before:to-purple-gradient",
  variants: {
    active: {
      true: 'text-gray-100 font-semibold before:opacity-1',
      false: 'text-gray-400 font-normal before:opacity-0'
    }
  }
})

interface NavLinkProps extends VariantProps<typeof navlink>, LinkProps {
  label: string
  icon: ReactNode
}

export function NavLink({ href, label, icon }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      key={label}
      href={href}
      title={label}
      className={navlink({ active: href === pathname })}
    >
      {icon}
      <Text className="hidden md:block">{label}</Text>
    </Link>
  )
}
