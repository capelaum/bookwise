import { Star } from '@/components/Icons'
import { VariantProps, tv } from 'tailwind-variants'

const stars = tv({
  base: 'flex gap-1',
  variants: {
    variant: {
      default: 'text-purple-100',
      skeleton: 'animate-pulse text-gray-500'
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default'
  }
})

const sizes = {
  sm: 16,
  md: 20,
  lg: 28
}

interface StarsProps extends VariantProps<typeof stars> {
  rating: number
  size?: keyof typeof sizes
  className?: string
}

export function Stars({
  rating,
  size = 'md',
  variant,
  className,
  ...props
}: StarsProps) {
  return (
    <div className={stars({ variant, className })} {...props}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <Star
          key={starIndex}
          size={sizes[size]}
          weight={starIndex <= Math.round(rating) ? 'fill' : 'regular'}
        />
      ))}
    </div>
  )
}
