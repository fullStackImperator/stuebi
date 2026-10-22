import { Header } from '@/components/landingpage/header'
import { Footer } from '@/components/landingpage/footer'

// Gemeinsamer Rahmen für alle Unterseiten: gleiche Navigation und Footer wie die Startseite.
export default function UnterseitenLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  )
}
