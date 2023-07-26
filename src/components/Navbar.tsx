import { getServerSession } from 'next-auth'
import Image from 'next/image'

import { authOptions } from '@/lib/auth'

import { Logo } from '@/assets'

import { NavLinks } from './NavLinks'

export async function Navbar() {
  const session = await getServerSession(authOptions)
  console.log('💥 ~ session:', session)

  return (
    <nav className="mr-24 flex w-[232px] min-w-[232px] flex-col items-center rounded-xl bg-gray-700 px-12 py-10">
      <Image src={Logo} alt="BookWise Logo" />

      <NavLinks session={session} />
    </nav>
  )
}
