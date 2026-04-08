import type { Metadata } from 'next'
import { Montserrat, Nunito } from 'next/font/google'
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
      </body>
    </html>
  )
}
