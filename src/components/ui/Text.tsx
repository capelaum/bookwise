import { ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { VariantProps, tv } from 'tailwind-variants'

const text = tv({
  base: 'font-normal leading-tall text-gray-100',
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
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold'
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'gray100',
    weight: 'normal'
  }
})

interface TextProps extends VariantProps<typeof text> {
  asChild?: boolean
  children: string | ReactNode
  className?: string
}

export function Text({
  asChild = false,
  size,
  color,
  weight,
  className,
  children
}: TextProps) {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={text({ size, color, weight, className })}>{children}</Comp>
  )
}
