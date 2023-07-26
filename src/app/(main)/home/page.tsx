import { AvatarProfile } from '@/components/AvatarProfile'
import { ChartLineUp } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'
import { Text } from '@/components/ui/Text'
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <div className="mt-16 flex w-full flex-col items-start border border-red-500">
      <PageHeading
        title="Início"
        icon={<ChartLineUp size={32} color="var(--green-100)" />}
      />

      <Text className="mt-10" size="sm">
        Avaliações mais recentes
      </Text>

      <div className="w-full rounded-lg bg-gray-700 p-6">
        <AvatarProfile
          name={session?.user.name ?? ''}
          avatar_url={session?.user.avatar_url ?? null}
        />
      </div>
    </div>
  )
}
