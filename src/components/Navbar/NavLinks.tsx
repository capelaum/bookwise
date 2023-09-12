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
  base: "group relative flex items-center gap-3 py-2 transition-all duration-200 ease-in-out before:absolute before:-bottom-[6px] before:h-1 before:w-full before:rounded-full before:bg-gradient-to-b before:from-green-gradient before:to-purple-gradient before:content-[''] hover:text-gray-100 md:before:-left-5 md:before:bottom-auto md:before:h-6 md:before:w-1",
  variants: {
    active: {
      true: 'before:opacity-1 font-semibold text-gray-100',
      false: 'font-normal text-gray-400 before:opacity-0'
    }
  }
})

interface NavLinkProps extends VariantProps<typeof navlink>, LinkProps {
  label: string
  icon: ReactNode
}

export function NavLink({ href, label, icon }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = href === pathname

  return (
    <Link
      key={label}
      href={href}
      title={label}
      className={navlink({ active: isActive })}
    >
      {icon}
      <Text
        className="hidden transition-all duration-200 ease-in-out group-hover:text-gray-100 md:block"
        color={isActive ? 'gray100' : 'gray400'}
        weight={isActive ? 'bold' : 'normal'}
      >
        {label}
      </Text>
    </Link>
  )
}
