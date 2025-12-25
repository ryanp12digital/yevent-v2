
import { SPACES } from '@/data/spaces'
import SpaceDetail from '@/components/features/SpaceDetail'
import { notFound } from 'next/navigation'

interface SpaceDetailViewProps {
  id: string
}

export default function SpaceDetailView({ id }: SpaceDetailViewProps) {
  const space = SPACES.find(s => s.id === id)

  if (!space) {
    notFound()
  }

  return (
    <div className="animate-in fade-in duration-500">
      <SpaceDetail space={space} />
    </div>
  )
}
