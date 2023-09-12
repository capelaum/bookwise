import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

import { VariantProps, tv } from 'tailwind-variants'

const textLink = tv({
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

interface TextLinkProps extends LinkProps, VariantProps<typeof textLink> {
  children: ReactNode
  title: string
  className?: string
}

export function TextLink({
  children,
  title,
  variant,
  size,
  className,
  ...props
}: TextLinkProps) {
  return (
    <Link
      title={title}
      className={textLink({ variant, size, className })}
      {...props}
    >
      {children}
    </Link>
  )
}
