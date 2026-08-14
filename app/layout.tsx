import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const geist = localFont({
  src: '../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2',
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'P3 LLC — Public-Private Partnerships',
  description:
    'P3 LLC brings public-sector leadership and private-sector expertise together to structure, advance, and deliver complex projects.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/p3-official-logo.png', type: 'image/png' }],
    apple: '/p3-official-logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#0a3448',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} bg-background`}>
      <body>
        <ScrollProgress />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
