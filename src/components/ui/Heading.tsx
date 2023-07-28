import { HTMLAttributes } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { VariantProps, tv } from 'tailwind-variants'

const heading = tv({
  base: 'leading-normal text-gray-100 font-bold',
  variants: {
    size: {
      xs: 'text-base',
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heading> {
  asChild?: boolean
}

export function Heading({
  asChild = false,
  size,
  className,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot : 'h1'

  return <Comp className={heading({ size, className })} {...props} />
}
