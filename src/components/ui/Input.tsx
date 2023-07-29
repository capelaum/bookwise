import { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode
}

export function Input({
  icon,
  type = 'text',
  className,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-[4px] border border-gray-500 text-gray-500 focus-within:border-green-200 focus-within:text-green-200',
        className
      )}
    >
      <input
        type={type}
        className="w-full rounded-md bg-gray-800 py-[14px] pl-5 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
        {...props}
      />
      <button className="flex h-full items-center justify-center pl-3 pr-5 transition-all duration-200 ease-in-out hover:text-green-200">
        {icon}
      </button>
    </div>
  )
}
