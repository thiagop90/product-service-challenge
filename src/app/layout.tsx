import './globals.css'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Products API',
}

const geist = Geist({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
