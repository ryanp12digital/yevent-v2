
import SpacesList from '@/components/sections/SpacesList'
import { getSpaces } from '@/actions/spaces'
import { Space } from '@/data/spaces'

export default async function SpacesListingView() {
  const spaces = await getSpaces() as any as Space[]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="pt-32 pb-10 px-6 bg-slate-950 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Nossos Espaços</h1>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium">
          Explore nossa lista completa de ambientes corporativos projetados para o seu sucesso.
        </p>
      </div>
      <SpacesList spaces={spaces} />
    </div>
  )
}
