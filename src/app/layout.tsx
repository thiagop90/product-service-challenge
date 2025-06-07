import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { QueryWrapper } from '@/components/react-query'

export const metadata: Metadata = {
  title: 'Product Service',
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
      <body className={geist.className} suppressHydrationWarning>
        <QueryWrapper>{children}</QueryWrapper>
        <Toaster />
      </body>
    </html>
  )
}
