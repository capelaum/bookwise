import { Binoculars } from '@/components/Icons'
import { PageHeading } from '@/components/PageHeading'

export default function Explore() {
  return (
    <div className="ml-[348px] mt-16 flex w-full items-start border border-red-500">
      <PageHeading
        title="Explorar"
        icon={<Binoculars size={32} color="hsl(var(--green-100))" />}
      />
    </div>
  )
}
