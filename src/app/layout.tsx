import type { Metadata } from 'next'
import Header from '@src/components/layout/Header'
import Footer from '@src/components/layout/Footer'
import './globals.css'
import I18nProvider from '@src/components/providers/I18nProvider'

export const metadata: Metadata = {
  title: 'Some very cool new app ',
  description: 'made by Spieler'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false

  return (
    <html lang='en' className='dark'>
      <body
        className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'
        suppressHydrationWarning
      >
        <I18nProvider>
          <Header isAuthenticated={isAuthenticated} />
          <main className='flex-1 container mx-auto px-4 py-6'>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout
