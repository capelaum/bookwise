import { ButtonHTMLAttributes, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const buttonLink = tv({
  base: 'flex items-center justify-center gap-2 rounded-md px-2 py-1 font-semibold',
  variants: {
    variant: {
      purple: 'text-purple-100 hover:bg-purple-100/5',
      white: 'text-gray-200 hover:bg-gray-200/5'
    },
    size: {
      sm: 'text-sm',
      md: 'text-md'
    }
  },
  defaultVariants: {
    variant: 'purple',
    size: 'md'
  }
})

interface ButtonLinkProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonLink> {
  children: ReactNode
  className?: string
}

export function ButtonLink({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <button className={buttonLink({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}
