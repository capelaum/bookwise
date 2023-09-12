import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { getUserNameInitials } from '@/lib/utils'

interface AvatarProfileProps {
  name: string
  avatarUrl: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarProfile({
  name,
  avatarUrl,
  size = 'md',
  className
}: AvatarProfileProps) {
  return (
    <Avatar size={size} className={className}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={name} />
      ) : (
        <AvatarFallback size={size}>{getUserNameInitials(name)}</AvatarFallback>
      )}
    </Avatar>
  )
}
