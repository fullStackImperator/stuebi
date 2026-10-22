import { Header } from '@/components/landingpage/header'
import { Hero } from '@/components/landingpage/hero'
import { NewsSection } from '@/components/landingpage/news-section'
import { VisionSection } from '@/components/landingpage/vision-section'
import { ParentsSection } from '@/components/landingpage/parents-section'
import { SponsorsSection } from '@/components/landingpage/sponsors-section'
import { SchoolLifeSection } from '@/components/landingpage/school-life-section'
import { ContactSection } from '@/components/landingpage/contact-section'
import { Footer } from '@/components/landingpage/footer'

// Neue News erscheinen spätestens nach einer Minute auf der Startseite.
export const revalidate = 60

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <NewsSection />
      <VisionSection />
      <ParentsSection />
      <SchoolLifeSection />
      <ContactSection />
      <SponsorsSection />
      <Footer />
    </main>
  )
}
