import { ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { VariantProps, tv } from 'tailwind-variants'

const textVariants = tv({
  base: 'text-gray-100 leading-tall font-normal',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl'
    },
    color: {
      gray100: 'text-gray-100',
      gray200: 'text-gray-200',
      gray300: 'text-gray-300',
      gray400: 'text-gray-400'
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'gray100'
  }
})

interface TextProps extends VariantProps<typeof textVariants> {
  asChild?: boolean
  children: string | ReactNode
  className?: string
}

export function Text({
  asChild = false,
  size,
  color,
  className,
  children
}: TextProps) {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={textVariants({ size, color, className })}>{children}</Comp>
  )
}
