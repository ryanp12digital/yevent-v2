
import ContactPage from '@/components/features/ContactPage'

export const metadata = {
  title: 'Contato - Yevent',
  description: 'Fale com nossa equipe e agende seu evento corporativo.',
}

export default function ContactRoute() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ContactPage />
    </div>
  )
}
