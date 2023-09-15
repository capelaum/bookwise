import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function ButtonIcon({ children, ...props }: ButtonIconProps) {
  return (
    <button
      className="flex items-center justify-center rounded-[4px] bg-gray-600 p-2 transition-all duration-200 hover:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
      {...props}
    >
      {children}
    </button>
  )
}
