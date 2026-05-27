# Lichttechnik und Vertrieb — Business Boost Website Redesign

**Date:** 2026-05-27
**Goal:** Boost lead generation and trust signals to drive more business for a one-man lighting consultancy with 38 years of experience.
**Approach:** Combined Trust & Credibility Offensive + Lead Generation (Ansatz C)

---

## Context

Rainer Ludwig runs a one-man lighting business (Lichttechnik und Vertrieb) from Heusenstamm, serving municipalities, commercial clients, and architects across Germany. Despite 38 years of experience and a DIN certification, the business is underperforming. The website currently functions as a digital business card but doesn't actively convert visitors into leads or aggressively communicate trustworthiness compared to competitors like Fluolite.

**Target audience:** Kommunale Auftraggeber, Gewerbe/Industrie, Architekten/Planer
**Constraints:** Static HTML/CSS/JS site (no build step), IONOS shared hosting, one-man operation (no blog/content-heavy strategy)

---

## 1. Trust-Badges & Certifications Section (Fluolite-Style)

### What changes
The existing `cert-strip` section (currently 4 items on light background) is redesigned into a visually stronger "Qualitatsversprechen" section.

### New design
- **6 badges** in a horizontal strip
- **Dark background** (`--primary-dark`) instead of current `--bg-alt`
- **White text**, gold accent icons
- Larger icons (48px), stronger visual weight
- Responsive: 3x2 grid on tablet, 2x3 on mobile

### Badge content

| # | Icon | Title | Subtitle |
|---|------|-------|----------|
| 1 | DIN certificate image | DIN Geprüft | PZ-LTAI-059 |
| 2 | Shield-check SVG | CE-Konformität | Alle Produkte geprüft |
| 3 | Lightning bolt SVG | Energieeffizient | LED-Technologie |
| 4 | Map-pin/flag SVG | Deutsche Qualität | Hersteller aus DE |
| 5 | Leaf/recycle SVG | Nachhaltig | Langlebig & recycelbar |
| 6 | Document-check SVG | Normgerecht | DIN EN 12464-1 |

### Placement
- **index.html:** Same position (before CTA banner), replaces current `cert-strip`
- **uber-uns.html:** Added after the "Meine Leistungen" section

### CSS changes
- Restyle `.cert-strip` with dark background, white text
- `.cert-item` gets larger icon sizing, adjusted colors
- `.cert-item img` filter for DIN certificate to work on dark bg (brightness/invert if needed)
- New responsive breakpoints for 6-item layout

---

## 2. Customer Testimonials Section

### What's new
New section on index.html between "Realisierte Projekte" and "Häufige Fragen".

### Layout
- Section label: "Kundenstimmen"
- Headline: "Das sagen unsere Kunden"
- 3 testimonial cards in a CSS grid (1fr 1fr 1fr, stacking to 1 column on mobile)

### Card design
- White card on `section-alt` background
- Left border: 3px solid `--accent` (gold)
- Large opening quotation mark icon (decorative, gold, top-left)
- Quote text (2-3 sentences, `--text-light` color)
- Divider line
- Name (bold) + role/company (light)
- 5 gold stars (SVG)

### Placeholder testimonials
These are realistic placeholders — uncle replaces with real ones:

1. **Thomas M., Sportverein Heusenstamm**
   "Herr Ludwig hat unsere Sporthalle perfekt ausgeleuchtet. Die dimmbaren Szenen sind genau das, was wir für Wettkämpfe und Veranstaltungen brauchten."

2. **Petra K., Architektin**
   "Herstellerunabhängige Beratung, die wirklich den besten Preis-Leistungs-Mix findet. Nach 3 Angeboten von anderen war seins das überzeugendste."

3. **Michael R., Geschäftsführer Autohaus**
   "Von der 3D-Planung bis zur Lieferung alles aus einer Hand. So stelle ich mir Zusammenarbeit vor."

### CSS
- New `.testimonials-grid` (3-column grid)
- New `.testimonial-card` with left accent border, padding, quote styling
- New `.testimonial-quote`, `.testimonial-author`, `.testimonial-stars`
- Responsive: single column on mobile

---

## 3. Lead Conversion Elements

### 3a: Sticky Mobile CTA

**What:** Fixed button at bottom of screen on mobile devices only.

- Visible on: index.html, uber-uns.html, produkte.html, beleuchtungsplanung.html
- Hidden on: kontakt.html, legal pages (impressum, datenschutz, agb), 404
- Text: "Jetzt beraten lassen" with phone icon
- Links to: kontakt.html
- Styling: Gold background, dark text, full-width bar with padding, subtle top shadow
- Behavior: Hides when footer is visible (IntersectionObserver)
- Desktop: Hidden (users can use nav CTA)

**CSS:** New `.sticky-cta` class, `position: fixed; bottom: 0;`, media query `max-width: 768px`
**JS:** IntersectionObserver on footer to toggle visibility

### 3b: Enhanced CTA Banner — "Kostenloser Licht-Check"

**What:** Replace the current generic CTA banner with a more compelling offer.

Current:
> "Bereit für die optimale Beleuchtung?"

New:
> **"Kostenloser Licht-Check für Ihr Projekt"**
> "Ich analysiere Ihre aktuelle Beleuchtungssituation und zeige Einsparpotenziale auf — unverbindlich und kostenlos."

- Add 3 checkmark bullet points:
  - "Analyse Ihrer aktuellen Beleuchtung"
  - "Einsparpotenzial durch LED-Umrüstung"
  - "Unverbindliche Produktempfehlung"
- Button: "Licht-Check anfragen" → `kontakt.html?produkt=Kostenloser%20Licht-Check`
- Same visual style (gradient background), but with added check-list for specificity

### 3c: WhatsApp Floating Button

**What:** Floating green WhatsApp button, bottom-right corner.

- Icon: WhatsApp SVG (white on green circle)
- Size: 56px circle
- Position: `fixed`, `bottom: 24px`, `right: 24px` (desktop), adjusted on mobile to not overlap sticky CTA
- Link: `https://wa.me/4961046683115?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Beratung.`
- Hover: slight scale-up + shadow
- Mobile: `bottom: 80px` (above sticky CTA bar) on pages that have the sticky CTA
- Mobile: `bottom: 24px` on pages without sticky CTA (kontakt, legal pages)
- Visible on all pages
- Z-index: below navbar (999), above content

**CSS:** New `.whatsapp-float` class
**JS:** None needed (pure CSS)

---

## 4. Manufacturer Partner Logos

### What's new
New section on index.html, placed after the "Warum Lichttechnik und Vertrieb?" section (before Services).

### Layout
- Section label: "Herstellerpartner"
- Headline: "Herstellerunabhängig — Ihre Vorteile"
- Subline: "Ich arbeite mit führenden Leuchtenherstellern und wähle die beste Lösung für Ihr Projekt."
- Logo row: 6 placeholder logo slots

### Placeholder logos
Since we don't have actual partner logos, we use text-based placeholders styled as grayscale boxes that the uncle can replace with real SVG/PNG logos later:
- Philips, OSRAM, Trilux, Zumtobel, Regent, Siteco (representative of the industry)
- Displayed as text in styled containers (no actual trademarked logos shipped)

### Styling
- Grayscale by default, color on hover (CSS `filter: grayscale(100%)` → `grayscale(0%)`)
- Flex row, centered, wrapping
- Clean, understated — supports the "herstellerunabhängig" message

### CSS
- New `.partner-logos` flex container
- New `.partner-logo` items with grayscale filter transition

---

## 5. Files Changed

### Modified files
- `index.html` — Testimonials section, enhanced cert-strip, Licht-Check CTA, WhatsApp button, sticky CTA, partner logos
- `uber-uns.html` — Cert-strip badges added after Leistungen
- `css/style.css` — New styles for all new components
- `js/main.js` — Sticky CTA hide-on-footer logic

### New files
- None (all changes are additions to existing files)

### No changes to
- `produkte.html`, `beleuchtungsplanung.html`, `kontakt.html` — only get sticky CTA + WhatsApp (added via shared HTML)
- Legal pages — no changes
- `404.html` — no changes

---

## 6. Implementation Order

1. CSS: Add all new component styles
2. index.html: Cert-strip redesign (dark theme, 6 badges)
3. index.html: Testimonials section
4. index.html: Partner logos section
5. index.html: Enhanced CTA banner (Licht-Check)
6. index.html: WhatsApp floating button
7. All pages (except kontakt + legal): Sticky mobile CTA
8. uber-uns.html: Cert-strip badges
9. js/main.js: Sticky CTA footer-hide logic
10. Test responsive behavior across all breakpoints
