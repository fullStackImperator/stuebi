import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import { Baby, BookMarked, GraduationCap, School } from 'lucide-react'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder, PointList } from '@/components/sections/page-parts'
import { cn } from '@/lib/utils'
import { PhotoBand } from '@/components/photos/photo-band'
import { StagePhoto } from '@/components/photos/stage-photo'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Bildungswege | Stübi Hamburg',
  description: 'Vorschule, Grundschule, Mittelstufe, Oberstufe und Abschlüsse an der Stadtteilschule Stübenhofer Weg – von der Vorschule bis zum Abitur.',
}

const degrees = [
  { title: 'Erster allgemeinbildender Schulabschluss (ESA)', when: 'nach Klasse 9', accent: 'bg-golden' },
  { title: 'Mittlerer Schulabschluss (MSA)', when: 'nach Klasse 10', accent: 'bg-mint' },
  { title: 'Abitur', when: 'nach Klasse 12 im Gymnasialzweig oder nach Klasse 13 im Stadtteilschulzweig', accent: 'bg-primary' },
]

const profiles = [
  {
    title: 'Profil „Fair Play“',
    subtitle: 'Sport, Gesundheit & Management',
    text: 'Für sportbegeisterte Jugendliche: Sport, PGW (Politik, Gesellschaft, Wirtschaft) und Biologie greifen ineinander. Die Schülerinnen und Schüler planen echte Sportevents, beschäftigen sich mit Gesundheitsmanagement und setzen sportwissenschaftliche Theorie in die Praxis um.',
    accent: 'bg-accent',
  },
  {
    title: 'Profil „Mein Start-Up“',
    subtitle: 'Wirtschaft, Innovation & Management',
    text: 'Hier werden Jugendliche zu Gründerinnen und Gründern: Sie entwickeln eigene Produkte, schreiben Businesspläne und erforschen globale wirtschaftliche Zusammenhänge.',
    accent: 'bg-mint',
  },
]

// One section per Stufe; without a photo the coloured icon tile stands in.
function StageSection({
  id,
  name,
  years,
  icon: Icon,
  color,
  iconColor,
  registerHref,
  registerLabel,
  tone,
  photo,
  children,
}: {
  id: string
  name: string
  years: string
  icon: LucideIcon
  color: string
  iconColor: string
  registerHref: string
  registerLabel: string
  tone: 'light' | 'sand'
  photo?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn('scroll-mt-20 md:scroll-mt-24 py-14 sm:py-20', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 lg:items-center">
        {photo ?? (
          <div className="rounded-3xl bg-surface-ink p-8 flex items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
              <Icon className={`h-7 w-7 ${iconColor}`} />
            </div>
            <div>
              <p className="text-white text-2xl font-bold">{name}</p>
              <p className="text-white/60 mt-1">{years}</p>
            </div>
          </div>
        )}
        <div>
          <p className="text-accent font-semibold mb-2">{years}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">{name}</h2>
          <div className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty space-y-4 mb-8">{children}</div>
          <NextLink href={registerHref}>{registerLabel}</NextLink>
        </div>
      </div>
    </section>
  )
}

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default async function BildungswegePage() {
  const { bildungswege: img } = await getPageImages()
  const stagePhoto = (media: Parameters<typeof toPhoto>[0]) => {
    const photo = toPhoto(media)
    return photo ? <StagePhoto photo={photo} /> : undefined
  }

  return (
    <>
      <PageIntro
        eyebrow="Bildungswege"
        title="Gemeinsam von der Vorschule bis zum Abitur."
        lead="An der Stübi können Kinder ihre ganze Schulzeit an einem Ort verbringen: von der Vorschule über Grund- und Mittelstufe bis zur Oberstufe. Mit unserem Konzept eine Klasse bleiben sie dabei weitestgehend im selben Klassenverband – das gibt Sicherheit und Zugehörigkeit."
      />

      <StageSection
        id="vorschule"
        photo={stagePhoto(img?.vorschule)}
        name="Vorschule"
        years="ab 5 Jahren"
        icon={Baby}
        color="bg-golden"
        iconColor="text-on-bright"
        registerHref="/anmeldung#primarstufe"
        registerLabel="Primarstufe anmelden"
        tone="light"
      >
        <p>
          In der Vorschule steht die ganzheitliche Entwicklung der Jüngsten im Mittelpunkt. Wir legen behutsam den
          Grundstein für erfolgreiches Lernen – in einem vertrauten Umfeld, in dem sich Ihr Kind vom ersten Tag an sicher
          fühlt.
        </p>
        <PointList
          items={[
            {
              title: 'Gemeinsam stark durch Regeln und Struktur',
              text: 'Mit klaren Ritualen und spielerischen Übungen lernen die Kinder ein respektvolles Miteinander. Gleichzeitig fördern wir gezielt die Sprache und das Sprechen miteinander.',
            },
            {
              title: 'Bewegung und Kreativität',
              text: 'Viel Raum zum Toben, Klettern und Spielen – und für Malen, Perlenfädeln, Schneiden, Backen und Fingerspiele, die die Feinmotorik stärken.',
            },
            {
              title: 'Entdecken und Natur',
              text: 'Jede Woche besuchen wir den Kinderbauernhof. Dort pflegen und füttern die Kinder Tiere und übernehmen früh Verantwortung.',
            },
          ]}
        />
      </StageSection>

      <StageSection
        id="grundschule"
        photo={stagePhoto(img?.grundschule)}
        name="Grundschule"
        years="Klasse 1–4"
        icon={School}
        color="bg-mint"
        iconColor="text-on-bright"
        registerHref="/anmeldung#primarstufe"
        registerLabel="Primarstufe anmelden"
        tone="sand"
      >
        <p>
          In den Klassen 1 bis 4 legen wir eine starke Basis: Lesen, Schreiben und Rechnen – und eine Klasse, die zu einer
          echten Gemeinschaft zusammenwächst. Als Ganztagsschule geben wir Ihrem Kind vor allem eines: mehr Zeit.
        </p>
        <PointList
          items={[
            {
              title: 'Lernzeiten statt Hausaufgaben',
              text: 'Geübt wird in der Schule, begleitet von unserem Team. So bleibt am Nachmittag Zeit für Spiel, Erholung und Familie.',
            },
            {
              title: 'Lernen in Bewegung',
              text: 'Das „bewegte Klassenzimmer“ und aktive Pausen bringen Schwung in den Tag. Als sportbetonte Schule arbeiten wir dafür auch mit den Hamburg Towers zusammen.',
            },
            {
              title: 'Passgenaue Förderung',
              text: 'Tägliche Lesezeiten („Lesen macht schlau“) wecken die Lust auf Bücher. Besonders wissbegierige Kinder fördern wir in Talentgruppen wie „Weichenstellung“ der ZEIT-Stiftung und der „Digitalen Drehtür“.',
            },
            {
              title: 'Jeden Tag wählen',
              text: 'Nach dem Unterricht sucht sich Ihr Kind aus Theater, Kunst, Musik oder Sport täglich das Angebot aus, das ihm Spaß macht.',
            },
            {
              title: 'Ein Team, das sich kümmert',
              text: 'Lehrkräfte, Sozialpädagoginnen und -pädagogen sowie Erzieherinnen und Erzieher sorgen gemeinsam dafür, dass sich jedes Kind geborgen fühlt.',
            },
          ]}
        />
      </StageSection>

      <StageSection
        id="mittelstufe"
        photo={stagePhoto(img?.mittelstufe)}
        name="Mittelstufe"
        years="Klasse 5–10"
        icon={BookMarked}
        color="bg-accent"
        iconColor="text-white"
        registerHref="/anmeldung#mittelstufe"
        registerLabel="Mittelstufe anmelden"
        tone="light"
      >
        <p>
          Die Mittelstufe ist die Brücke zwischen Kindheit und Jugend: mit klarer Orientierung, hohem fachlichem Anspruch
          und der Sicherheit, dass alle Bildungswege offenstehen.
        </p>
        <h3 className="text-lg font-bold text-foreground">Beobachtungsstufe (Klasse 5 und 6)</h3>
        <p>Nach der Grundschule müssen Sie sich noch nicht festlegen.</p>
        <PointList
          items={[
            {
              title: 'Mehr Zeit für Entscheidungen',
              text: 'Wir beobachten gemeinsam in Ruhe, welcher Bildungsweg ab Klasse 7 am besten passt.',
            },
            {
              title: 'Förderung von Anfang an',
              text: 'In Mathematik und Deutsch unterrichten wir ab Klasse 5 in Grund- und Erweiterungskursen.',
            },
            {
              title: 'Neigungen entdecken',
              text: 'Schwerpunkte in Natur- oder Gesellschaftswissenschaften und ein Ganztag mit Kunst, Kultur, Sport, Informatik und Technik.',
            },
          ]}
        />
        <h3 className="text-lg font-bold text-foreground">Zwei Bildungswege ab Klasse 7</h3>
        <PointList
          items={[
            {
              title: 'Gymnasialzweig (Abitur nach 12 Jahren)',
              text: 'In zügigem Tempo zur Allgemeinen Hochschulreife – mit wissenschaftlichem Arbeiten und „Campus-Tagen“ zur Vorbereitung auf das Studium.',
            },
            {
              title: 'Stadtteilschulzweig (ESA, MSA oder Abitur nach 13 Jahren)',
              text: 'Ein Jahr mehr Zeit zum Üben und Festigen. Binnendifferenzierter Unterricht und Berufsorientierung bereiten auf eine Ausbildung oder unsere Oberstufe vor.',
            },
          ]}
        />
        <p className="font-semibold text-foreground">
          Ein Wechsel zwischen den Bildungswegen ist möglich, ohne die Schule zu verlassen. Freundschaften und vertraute
          Bezugspersonen bleiben erhalten.
        </p>
      </StageSection>

      <StageSection
        id="oberstufe"
        photo={stagePhoto(img?.oberstufe)}
        name="Oberstufe"
        years="Klasse 11–13"
        icon={GraduationCap}
        color="bg-primary"
        iconColor="text-white"
        registerHref="/anmeldung#oberstufe"
        registerLabel="Oberstufe anmelden"
        tone="sand"
      >
        <p>
          Die gymnasiale Oberstufe führt sicher zum Abitur. Beide Bildungswege der Mittelstufe kommen hier unter einem Dach
          zusammen: Der Gymnasialzweig macht Abitur nach 12 Jahren (Studienstufe in Klasse 11 und 12), der
          Stadtteilschulzweig nach 13 Jahren (Vorstufe in Klasse 11, Studienstufe in Klasse 12 und 13).
        </p>
        <PointList
          items={[
            {
              title: 'Vorstufe (Klasse 11)',
              text: 'Die Brücke in die Studienstufe für Jugendliche mit Mittlerem Schulabschluss. Neben Deutsch und Mathematik festigen wir Natur- und Gesellschaftswissenschaften sowie die Künste.',
            },
            {
              title: 'Sprachen',
              text: 'Als zweite Fremdsprache bieten wir Spanisch, Französisch und Türkisch an. Auch Unterricht in Herkunftssprachen ist möglich.',
            },
            {
              title: 'Studienstufe mit zwei Profilen',
              text: '„Fair Play“ (Sport, Gesundheit & Management) und „Mein Start-Up“ (Wirtschaft, Innovation & Management) – mehr dazu unten bei den Abschlüssen.',
            },
            {
              title: 'Wissenschaftlich arbeiten',
              text: 'Im Seminarfach üben die Jugendlichen wissenschaftliche Methoden. Hochschul-Schnuppertage und Betriebsbesichtigungen bereiten auf Studium und Ausbildung vor.',
            },
          ]}
        />
      </StageSection>

      <PhotoBand photo={toPhoto(img?.band?.image)} caption={img?.band?.caption} />

      <PageSection id="abschluesse" eyebrow="Abschlüsse" title="Alle Abschlüsse an einer Schule.">
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {degrees.map((d) => (
            <InfoCard key={d.title} title={d.title} accent={d.accent}>
              <p>{d.when}</p>
            </InfoCard>
          ))}
        </div>
        <h3 id="profile" className="scroll-mt-24 text-2xl font-extrabold text-foreground mb-5">Die Profile der Studienstufe</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {profiles.map((p) => (
            <InfoCard key={p.title} title={p.title} accent={p.accent}>
              <p className="font-semibold text-foreground">{p.subtitle}</p>
              <p>{p.text}</p>
            </InfoCard>
          ))}
        </div>
        <Placeholder>Voraussetzungen für den Übergang in die Oberstufe.</Placeholder>
        <div className="mt-10">
          <NextLink href="/schwerpunkt">Weiter zu unseren Schwerpunkten</NextLink>
        </div>
      </PageSection>
    </>
  )
}
