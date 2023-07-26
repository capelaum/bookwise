'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { VariantProps, tv } from 'tailwind-variants'

const avatar = tv({
  base: 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-green-gradient to-purple-gradient',
  variants: {
    size: {
      sm: 'h-8 w-8 p-[1px]',
      md: 'h-10 w-10 p-[1px]',
      lg: 'h-[72px] w-[72px] p-[2px]'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

interface AvatarProps
  extends VariantProps<typeof avatar>,
    ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string
}

export const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ size, className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={avatar({ size, className })}
    {...props}
  />
))

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full rounded-full', className)}
    {...props}
  />
))

const avatarFallback = tv({
  base: 'flex h-full w-full items-center justify-center rounded-full bg-gray-700 font-semibold text-white',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-md',
      lg: 'text-2xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

interface AvatarFallbackProps
  extends VariantProps<typeof avatarFallback>,
    ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string
}

export const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={avatarFallback({ size, className })}
    {...props}
  />
))

Avatar.displayName = AvatarPrimitive.Root.displayName
AvatarImage.displayName = AvatarPrimitive.Image.displayName
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
