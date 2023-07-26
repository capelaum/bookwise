import { HTMLAttributes } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { VariantProps, tv } from 'tailwind-variants'

const headingVariants = tv({
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
    VariantProps<typeof headingVariants> {
  asChild?: boolean
}

export function Heading({
  asChild = false,
  size,
  className,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot : 'h1'

  return <Comp className={headingVariants({ size, className })} {...props} />
}
