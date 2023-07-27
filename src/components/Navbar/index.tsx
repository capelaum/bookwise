import Image from 'next/image'

import { getAuthSession } from '@/lib/auth'

import { Logo } from '@/assets'

import { NavLinks } from './NavLinks'
import { NavProfile } from './NavProfile'

export async function Navbar() {
  const session = await getAuthSession()

  return (
    <nav className="fixed z-10 flex h-[calc(100vh-40px)] w-[232px] min-w-[232px] flex-col items-center rounded-xl bg-gray-700 px-12 pb-6 pt-10">
      <Image src={Logo} alt="BookWise Logo" />

      <NavLinks session={session} />

      <NavProfile session={session} />
    </nav>
  )
}
