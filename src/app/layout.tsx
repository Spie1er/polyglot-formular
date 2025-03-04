import type { Metadata } from 'next'
import Header from '@component/components/layout/Header'
import Footer from '@component/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Some very cool new app ',
  description: 'made by Spieler'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = false

  return (
    <html lang='en' className='dark'>
      <body
        className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'
        suppressHydrationWarning
      >
        <Header isAuthenticated={isAuthenticated} />
        <main className='flex-1 container mx-auto px-4 py-6'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
