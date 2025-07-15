import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientBody from './ClientBody'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GOODVEEN - Premium Floral Artistry',
  description: 'Create beautiful floral arrangements with our premium design services. From weddings to special occasions, we bring nature\'s beauty to your doorstep.',
}

type RootLayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientBody>
          {children}
        </ClientBody>
      </body>
    </html>
  )
}
