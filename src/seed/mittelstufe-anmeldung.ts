/**
 * Anmeldung zur Mittelstufe (Mail von Ljubica Sabadija, Abteilungsleitung 5–7, vom 3.11.2026).
 * Used by the departments seed and by scripts/mittelstufe-anmeldung.ts.
 */
import type { Department } from "../payload-types";
import { day, h, p, richText, ul } from "./rich-text";

type DateItem = NonNullable<NonNullable<Department["dates"]>["items"]>[number];

export const registrationInfo = richText(
  h("Anmeldung für Klasse 5"),
  p("Die Anmeldewoche für die neuen 5. Klassen ist vom 01.02.2027 bis zum 05.02.2027, täglich von 8.00 bis 16.00 Uhr und nach Vereinbarung."),
  p("Eltern von Kindern der Schule Stübenhofer Weg können die gelben Anmeldeformulare nutzen und sie in der Anmeldewoche einfach bei den Klassenleitungen abgeben."),
  p("Für Kinder aller anderen Grundschulen erfolgt die Anmeldung direkt über unser Schulbüro: schriftlich auf dem Postweg oder über den Hausbriefkasten im Eingangsbereich des Hauptgebäudes. Den Anmeldebogen erhalten Sie mit dem Grundschulzeugnis."),
  p("Damit Freundschaften nicht getrennt werden, können Sie uns gern mitteilen, mit wem Ihr Kind unbedingt in eine Klasse möchte – eine kurze Notiz zum Anmeldebogen genügt. Gern nehmen wir mit Ihrer Anmeldung auch das Interesse Ihres Kindes am Sportklassentraining entgegen."),
  p("Bitte bringen Sie zur Anmeldung mit:"),
  ul(
    "Ihren Ausweis oder eine Meldebescheinigung",
    "den Ausweis oder die Geburtsurkunde Ihres Kindes",
    "den Anmeldebogen und eine Kopie des letzten Zeugnisses",
    "wenn vorhanden, ein Passfoto Ihres Kindes",
  ),
  p("Um Wartezeiten zu vermeiden, können Sie ab sofort einen Termin für die Anmeldewoche vereinbaren. Im Gespräch mit Ihnen und Ihrem Kind lernen wir uns kennen und schaffen gemeinsam eine erste Grundlage für einen guten Übergang."),
  p("Bei Fragen, Wünschen und Anliegen wenden Sie sich gern an Frau Sabadija, Abteilungsleitung 5–7: über das Schulbüro, telefonisch, persönlich oder per E-Mail."),
  h("Wechsel in Klasse 7"),
  p("Den Anmeldebogen erhalten Sie über die derzeitige Schule Ihres Kindes. Bitte geben Sie ihn auch dort wieder ab. Die Termine stehen noch nicht fest und folgen hier."),
  p("Bei Fragen wenden Sie sich gern über das Schulbüro an Frau Sabadija."),
);

export const OPEN_DAY = "Tag der offenen Tür – Winterfest";
export const openDayNote =
  "16:30 Uhr: Treffen für neue Schülerinnen und Schüler und ihre Eltern mit der Abteilungsleitung 5–7. Der Ort wird ausgeschildert.";

export const newDates: DateItem[] = [
  {
    title: "Schulführung",
    kind: "info",
    startDate: day("2027-01-22"),
    time: "16:00 – 18:00 Uhr",
    audience: "Interessierte Eltern und Schülerinnen und Schüler",
  },
  {
    title: "Anmeldewoche Klasse 5",
    kind: "registration",
    startDate: day("2027-02-01"),
    endDate: day("2027-02-05"),
    time: "8:00 – 16:00 Uhr",
    note: "Und nach Vereinbarung – einen Termin können Sie ab sofort über das Schulbüro vereinbaren.",
  },
];
