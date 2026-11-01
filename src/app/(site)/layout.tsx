import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Raleway } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import '../globals.css'


const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

// Headings in Raleway, like the brochure.
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})


export const metadata: Metadata = {
  title: 'Stübi Hamburg – Die andere Schule | Von der Vorschule bis zum Abitur',
  description:
    'Stadtteilschule Stübenhofer Weg in Hamburg-Wilhelmsburg. Wir schaffen ein personalisiertes und zukunftsorientiertes Bildungsangebot für jedes Kind – von der Vorschule bis zum Abitur.',
  // generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${raleway.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
