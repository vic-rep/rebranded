import type { Metadata } from 'next'
import { Montserrat, Nunito } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import 'trusti-ui/styles'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Trusti Prototypes',
  description: 'Trusti design system prototype environment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} ${nunito.variable}`}>
        {children}
        <Script src="https://kit.fontawesome.com/5414e64bc6.js" crossOrigin="anonymous" strategy="lazyOnload" />
      </body>
    </html>
  )
}
