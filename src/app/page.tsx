
import HomePageView from '@/components/views/HomePageView'
import { getSpaces } from '@/actions/spaces'
import { Space } from '@/data/spaces'

export default async function Home() {
  const spaces = await getSpaces() as Space[]
  return <HomePageView initialSpaces={spaces} />
}
