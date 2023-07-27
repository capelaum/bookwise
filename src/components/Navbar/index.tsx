import Image from 'next/image'

import { getAuthSession } from '@/lib/auth'

import { Logo } from '@/assets'

import { NavLinks } from './NavLinks'
import { NavProfile } from './NavProfile'

export async function Navbar() {
  const session = await getAuthSession()

  return (
    <nav className="fixed left-5 right-5 top-2 z-10 flex items-center justify-center rounded-lg bg-gray-600 px-3 py-2 md:inset-auto md:h-[calc(100vh-40px)] md:w-[232px] md:min-w-[232px] md:translate-x-0 md:flex-col md:rounded-xl md:bg-gray-700 md:px-12 md:pb-6 md:pt-10">
      <Image src={Logo} alt="BookWise Logo" className="hidden md:block" />

      <NavLinks session={session} />

      <NavProfile session={session} />
    </nav>
  )
}
