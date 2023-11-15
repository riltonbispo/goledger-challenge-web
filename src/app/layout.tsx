import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './partial/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GoLedger',
  description: 'GoLedger desafio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  )
}
