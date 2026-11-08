import type { Metadata } from 'next'
import { Crimson_Pro, Plus_Jakarta_Sans, Raleway } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { DEFAULT_PREVIEW_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'
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

// Quotes in a serif italic, close to the brochure's Minion Pro.
const crimson = Crimson_Pro({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-crimson',
})


const homeTitle = 'Stübi Hamburg – Die andere Schule | Von der Vorschule bis zum Abitur'
const homeDescription = 'Stadtteilschule Stübenhofer Weg in Hamburg-Wilhelmsburg: ein persönliches Bildungsangebot für jedes Kind, von der Vorschule bis zum Abitur.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Pages set only their name; the start page keeps the long title.
  title: { default: homeTitle, template: `%s | ${SITE_NAME}` },
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: { title: homeTitle, description: homeDescription, url: '/', siteName: SITE_NAME, locale: 'de_DE', type: 'website', images: [DEFAULT_PREVIEW_IMAGE] },
  twitter: { card: 'summary_large_image' },
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
      <body className={`${jakarta.variable} ${raleway.variable} ${crimson.variable} font-sans antialiased`}>
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
