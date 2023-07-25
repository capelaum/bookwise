import { ReactNode } from 'react'

interface LoginButtonProps {
  text: string
  icon: ReactNode
}

export function SignInButton({ text, icon }: LoginButtonProps) {
  return (
    <button className="px-6 py-5 rounded-lg bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold text-left text-sm sm:text-lg flex items-center gap-5 transition-all ease-in-out duration-300 leading-tall">
      {icon}
      {text}
    </button>
  )
}
