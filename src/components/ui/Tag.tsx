import { ComponentProps } from 'react'

import { VariantProps, tv } from 'tailwind-variants'

const tag = tv({
  base: 'flex items-center justify-center rounded-full border border-purple-100 px-4 py-1 text-base text-purple-100 hover:bg-purple-200 hover:text-gray-100 transition-all duration-200 ease-in-out',
  variants: {
    active: {
      true: 'border-purple-200 bg-purple-200 text-gray-100'
    }
  }
})

interface TagProps extends VariantProps<typeof tag>, ComponentProps<'button'> {
  text: string
}

export function Tag({ text, active, ...props }: TagProps) {
  return (
    <button className={tag({ active })} {...props}>
      {text}
    </button>
  )
}
