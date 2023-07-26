'use client'

import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { Binoculars, ChartLineUp, User } from 'phosphor-react'
import { tv } from 'tailwind-variants'

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
    <div className="mt-16 flex flex-col gap-4">
      {navItems.map(({ href, label, icon }) => (
        <NavLink key={label} href={href} label={label} icon={icon} />
      ))}
    </div>
  )
}

const navlink = tv({
  base: "relative flex items-center gap-3 py-2 font-bold text-gray-400 hover:text-gray-100 transition-all duration-200 ease-in-out before:absolute before:-left-5 before:content-[''] before:w-1 before:h-6 before:rounded-full before:bg-gradient-to-b before:from-green-gradient before:to-purple-gradient",
  variants: {
    active: {
      true: 'text-gray-100 font-bold before:opacity-1',
      false: 'text-gray-400 font-normal before:opacity-0'
    }
  }
})

interface NavLinkProps {
  href: string
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
      {label}
    </Link>
  )
}
