import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'

const contacts = [
  {
    title: 'Vorschule & 1. Klassen',
    name: 'Sebastian Otto',
    role: 'Ansprechpartner',
    image: '/images/contact-sebastian.jpg',
  },
  {
    title: 'Neue 5. Klassen',
    name: 'Ljubica Sabadija',
    role: 'Ansprechpartnerin',
    image: '/images/contact-ljubica.jpg',
  },
  {
    title: 'Schulleitung',
    name: 'Matthias Herpe',
    role: 'Schulleiter',
    image: '/images/contact-matthias.jpg',
  },
]

export function ContactSection() {
  return (
    <section id="kontakt" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Wir freuen uns auf Sie!
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Haben Sie Fragen zur Anmeldung oder möchten Sie unsere Schule
              kennenlernen? Wir sind gerne für Sie da.
            </p>

            <div className="mb-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Adresse</p>
                  <p className="text-muted-foreground">
                    Stübenhofer Weg 20a
                    <br />
                    21109 Hamburg
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">E-Mail</p>
                  <a
                    href="mailto:schule-stuebenhofer-weg@bsfb.hamburg.de"
                    className="text-primary hover:underline"
                  >
                    schule-stuebenhofer-weg@bsfb.hamburg.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Telefon</p>
                  <a
                    href="tel:+4940428761910"
                    className="text-primary hover:underline"
                  >
                    040 / 428 76 19 – 10
                  </a>
                </div>
              </div>
            </div>

            <Button asChild size="lg" id="anmeldung">
              <a href="mailto:schule-stuebenhofer-weg@bsfb.hamburg.de?subject=Anmeldung%20Anfrage">
                Kontakt aufnehmen
              </a>
            </Button>
          </div>

          <div className="space-y-4">
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Ihre Ansprechpartner
            </p>
            {contacts.map((contact) => (
              <Card
                key={contact.title}
                className="overflow-hidden border-border/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-stretch">
                  <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-36 md:w-44">
                    <Image
                      src={contact.image}
                      alt={`${contact.name}, ${contact.role}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardHeader className="pb-2">
                      <CardDescription>{contact.role}</CardDescription>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {contact.title}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
