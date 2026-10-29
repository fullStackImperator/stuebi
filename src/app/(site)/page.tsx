import { Header } from '@/components/landingpage/header'
import { Hero } from '@/components/landingpage/hero'
import { NewsSection } from '@/components/landingpage/news-section'
import { NextDates } from '@/components/landingpage/next-dates'
import { VisionSection } from '@/components/landingpage/vision-section'
import { ParentsSection } from '@/components/landingpage/parents-section'
import { SponsorsSection } from '@/components/landingpage/sponsors-section'
import { SchoolLifeSection } from '@/components/landingpage/school-life-section'
import { ContactSection } from '@/components/landingpage/contact-section'
import { PrincipalSection } from '@/components/landingpage/principal-section'
import { Footer } from '@/components/landingpage/footer'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { PhotoBand } from '@/components/photos/photo-band'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

// Neue News erscheinen spätestens nach einer Minute auf der Startseite.
export const revalidate = 60

export default async function HomePage() {
  const { startseite, schwerpunkt } = await getPageImages()

  return (
    <main className="min-h-screen">
      <Header />
      <Hero photo={toPhoto(startseite?.hero)} />
      <NewsSection />
      <NextDates />
      <VisionSection />
      <PhotoBand photo={toPhoto(startseite?.band1?.image)} caption={startseite?.band1?.caption} />
      <ParentsSection />
      <SchoolLifeSection
        photos={{
          sport: toPhoto(schwerpunkt?.sport),
          makerspace: toPhoto(schwerpunkt?.makerspace),
          abgekocht: toPhoto(schwerpunkt?.abgekocht),
        }}
      />
      <PhotoBand photo={toPhoto(startseite?.band2?.image)} caption={startseite?.band2?.caption} />
      <PrincipalSection />
      <ContactSection />
      <SponsorsSection />
      <Footer />
      <MobileActionBar />
    </main>
  )
}
