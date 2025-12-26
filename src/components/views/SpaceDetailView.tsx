
import { Space } from '@/data/spaces'
import SpaceDetail from '@/components/features/SpaceDetail'
import { notFound } from 'next/navigation'

interface SpaceDetailViewProps {
  space: Space
}

export default function SpaceDetailView({ space }: SpaceDetailViewProps) {
  if (!space) {
    notFound()
  }

  return (
    <div className="animate-in fade-in duration-500">
      <SpaceDetail space={space} />
    </div>
  )
}
