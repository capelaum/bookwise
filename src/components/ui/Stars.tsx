import { Star } from '@/components/Icons'
import { VariantProps, tv } from 'tailwind-variants'

const stars = tv({
  base: 'flex gap-1',
  variants: {
    variant: {
      default: 'text-purple-100',
      skeleton: 'animate-pulse text-gray-500',
      button: 'gap-0 text-purple-100'
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
  setRating?: (rating: number) => void
  hover?: number
  setHover?: (rating: number) => void
}

export function Stars({
  rating,
  size = 'md',
  variant,
  className,
  setRating,
  hover,
  setHover,
  ...props
}: StarsProps) {
  function renderStar(starIndex: number) {
    if (variant === 'button' && setRating && setHover) {
      return (
        <button
          type="button"
          className="px-px hover:cursor-pointer"
          key={starIndex}
          onClick={() => setRating(starIndex)}
          onMouseEnter={() => setHover(starIndex)}
          onMouseLeave={() => setHover(rating)}
        >
          <Star
            size={sizes[size]}
            weight={
              starIndex <= (hover || Math.round(rating)) ? 'fill' : 'regular'
            }
          />
        </button>
      )
    }

    return (
      <Star
        key={starIndex}
        size={sizes[size]}
        weight={starIndex <= Math.round(rating) ? 'fill' : 'regular'}
      />
    )
  }

  return (
    <div className={stars({ variant, className })} {...props}>
      {[1, 2, 3, 4, 5].map((starIndex) => renderStar(starIndex))}
    </div>
  )
}
