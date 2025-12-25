
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import MainNavbar from '@/components/layout/MainNavbar'
import MainFooter from '@/components/layout/MainFooter'
import { Toaster } from 'react-hot-toast'
import CookieConsent from '@/components/views/CookieConsent'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Yevent - Locais Exclusivos para Eventos Corporativos',
  description: 'Plataforma premium para reserva de salas de reunião, auditórios e espaços de alto padrão.',
  keywords: ['eventos corporativos', 'aluguel de salas', 'auditórios', 'reuniões', 'Yevent', 'luxo'],
}

import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KR3P2ZZV');`
        }}
      />
      <body className={`${poppins.variable} font-sans bg-white text-slate-900 selection:bg-blue-600 selection:text-white antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KR3P2ZZV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <MainNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <MainFooter />
        <Toaster position="bottom-right" />
        <CookieConsent />
      </body>
    </html>
  )
}
