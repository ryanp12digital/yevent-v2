
import { SPACES } from '@/data/spaces'
import SpaceDetailView from '@/components/views/SpaceDetailView'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const space = SPACES.find(s => s.id === params.id)
  if (!space) return {}

  return {
    title: `${space.name} - Yevent`,
    description: `Reserve o espaço ${space.name} em ${space.city}. Capacidade para ${space.capacity} pessoas.`,
  }
}

export default function SpacePage({ params }: { params: { id: string } }) {
  return <SpaceDetailView id={params.id} />
}
