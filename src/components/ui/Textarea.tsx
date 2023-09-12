import { cn } from '@/lib/utils'
import * as React from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex max-h-[300px] min-h-[150px] w-full rounded-md border border-gray-500 bg-gray-800 px-5 py-[14px] text-sm text-gray-200 ring-offset-green-200 placeholder:text-gray-400 focus-visible:border-green-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
