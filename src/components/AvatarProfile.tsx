import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { getUserNameInitials } from '@/lib/utils'

interface AvatarProfileProps {
  name: string
  avatar_url: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarProfile({
  name,
  avatar_url,
  size = 'md',
  className
}: AvatarProfileProps) {
  return (
    <Avatar size={size} className={className}>
      {avatar_url ? (
        <AvatarImage src={avatar_url} alt={name} />
      ) : (
        <AvatarFallback size={size}>{getUserNameInitials(name)}</AvatarFallback>
      )}
    </Avatar>
  )
}
