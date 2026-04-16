import { Header } from '@/components/landingpage/header'
import { Hero } from '@/components/landingpage/hero'
import { VisionSection } from '@/components/landingpage/vision-section'
import { ParentsSection } from '@/components/landingpage/parents-section'
import { SponsorsSection } from '@/components/landingpage/sponsors-section'
import { SchoolLifeSection } from '@/components/landingpage/school-life-section'
import { ContactSection } from '@/components/landingpage/contact-section'
import { Footer } from '@/components/landingpage/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <VisionSection />
      <ParentsSection />
      <SponsorsSection />
      <SchoolLifeSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
