
import { getSpace } from '@/actions/spaces'
import SpaceDetailView from '@/components/views/SpaceDetailView'
import { Space } from '@/data/spaces'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const space = await getSpace(params.id) as Space
  if (!space) return {}

  return {
    title: `${space.name} - Yevent`,
    description: `Reserve o espaço ${space.name} em ${space.city}. Capacidade para ${space.capacity} pessoas.`,
  }
}

export default async function SpacePage({ params }: { params: { id: string } }) {
  const space = await getSpace(params.id) as Space
  return <SpaceDetailView space={space} />
}
