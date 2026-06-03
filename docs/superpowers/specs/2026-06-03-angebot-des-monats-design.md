# Angebot des Monats — Design Spec
**Datum:** 2026-06-03  
**Status:** Approved

---

## Übersicht

Monatlich wechselnde Sonderangebote auf der lichttechnik-vertrieb.de Website. Rainer Ludwig schickt ein PDF mit 3 Produkten, der Entwickler aktualisiert die Website manuell. Kein Archiv — das aktuelle Angebot überschreibt das vorherige.

---

## Struktur & Seiten

### Neue Seite: `angebote.html`
- Vollständige Darstellung aller 3 Produkte als Cards
- Gleiches Layout-System wie `produkte.html`
- Produktkarte-Aufbau:
  - Produktbild (aus PDF extrahiert, gespeichert in `images/angebot-[monat]-[produkt].jpg`)
  - Produktname als `<h3>`
  - Specs als kompakte Bullet-Liste
  - Preis fett, blau hervorgehoben (`.accent`-Farbe)
  - MwSt.-Hinweis: `* zzgl. 19% MwSt.`
- "Angebot des Monats"-Badge (orange/gelb, ähnlich `.hero-badge`) mit Monatsangabe (z.B. "Juni 2026")
- Hinweis am Seitenende: `* alle Preise zzgl. 19% MwSt.`

### Navigation (alle Seiten)
- Neuer Menüpunkt "Angebote" zwischen "Produkte" und "3D-Planung"
- Link auf `angebote.html`

### Neue Preview-Section in `index.html`
- Position: nach der Services-Section ("Alles aus einer Hand")
- Headline: "Angebot des Monats"
- 3 kompakte Cards nebeneinander (auf Mobile gestapelt)
- Card-Inhalt: nur Bild, Produktname, Preis — kein voller Spec-Text
- CTA-Button: "Alle Angebote ansehen →" → `angebote.html`

---

## Visuelles Design

- Karten-Styling folgt bestehendem `.service-card` / `.project-card-detailed` Muster
- Kein neues CSS-System — bestehende Klassen und Variablen verwenden
- Preis: große Schrift, `.accent`-Farbe (blau), fett
- Badge: kleines farbiges Label, orange/gelb, oben auf der Karte — visuell unterscheidbar von normalen Produktkarten
- MwSt.-Hinweis: dezent, kleine Schriftgröße

---

## Update-Workflow

Wenn Rainer ein neues PDF schickt (monatlich):

1. Bilder aus PDF extrahieren → `images/angebot-[monat]-[produkt].jpg`
2. `angebote.html` editieren — Produktname, Specs, Preis, Bildpfad (3 Produktkarten)
3. Preview-Section in `index.html` editieren — dieselben 3 Cards aktualisieren
4. Alte Produktbilder aus `images/` löschen

Geschätzter Aufwand: unter 5 Minuten pro Update.

---

## Was NICHT gebaut wird

- Kein CMS / Admin-Interface
- Kein JSON-Datenmodell
- Kein Archiv vergangener Angebote
- Kein automatisierter Import aus PDF
