import { ReactNode } from 'react'

interface LoginButtonProps {
  text: string
  icon: ReactNode
}

export function Button({ text, icon }: LoginButtonProps) {
  return (
    <button className="sign-in-button">
      {icon}
      <span>{text}</span>
    </button>
  )
}
