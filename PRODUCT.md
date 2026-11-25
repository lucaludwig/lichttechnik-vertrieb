# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people who decide or plan lighting for a building or public space: architects, facility managers, municipal planners, and business owners (retail, showrooms, offices, industry, practices, sports and leisure facilities). They come to find a competent, manufacturer-independent lighting partner and to send an inquiry.

Secondary: existing customers who receive the monthly offer newsletter and visit to view the current offers ("Angebot des Monats").

## Product Purpose

Website of Lichttechnik und Vertrieb, a one-person business run by Rainer Ludwig in Heusenstamm (Hessen). It sells consulting, lighting planning (including photo-realistic 3D visualisation), and the sale of luminaires, lamps and accessories throughout Germany. Success means inquiries by phone, email, WhatsApp, or the contact form from planners and decision makers.

## Positioning

- Rainer is a DIN-certified lighting technician (DIN CERTCO, PZ-LTAI-059, indoor DIN 67517 and outdoor DIN 67518).
- He is manufacturer-independent and chooses from the whole market.
- He has over 35 years of experience (founded 1988).
- He is the one person who does the consulting, the planning, and the delivery. Installation is done through a network of external specialists.

## Operating Context

- Static HTML/CSS/JS in the GitHub repo `lucaludwig/lichttechnik-vertrieb`. GitHub Pages deploys every push to `main` live.
- The Lichttechnik portal (lichttechnik.werkflow.de) writes the monthly offers into `index.html` and `angebote.html` between `<!-- PORTAL:ANGEBOTE START -->` and `<!-- PORTAL:ANGEBOTE END -->`. A redesign must keep these markers and the card markup the portal generates, or change the portal in the same step.
- Newsletter sign-up posts to the portal (double opt-in). The contact form posts to Web3Forms.
- Lichtwissen articles carry JSON-LD (Article, Breadcrumb, FAQPage). FAQ text must stay identical to its schema.

## Capabilities and Constraints

- Pages: Startseite, Unternehmen, Produkte, Angebote, 3D-Planung, Lichtwissen (4 articles), Umrüstung, Kontakt, Impressum/Datenschutz/AGB, newsletter archive pages.
- Content and structure stay largely the same in a redesign. Only the visual design changes.
- Changes go live only after a preview has been approved by Luca and Rainer.

## Brand Commitments

- The logo (yellow light rays, `images/logo.png`) is binding. Colours, typography, and layout are free and are derived from the logo.
- German (Germany) copy, formal "Sie", first person singular ("ich") for Rainer.

## Evidence on Hand

- Portrait of Rainer, DIN certificate image (`images/din-zertifikat.png`).
- Real project photos: Hallenbad Neu-Isenburg (before/after), Sporthalle Martinsee Heusenstamm, Mercedes showroom Eisenach.
- 3D planning renders (`images/3d-*.png`), product group images, monthly offer product photos.
- Figures used on the site: 385 projects, 237 customers, 35 years. The source of the first two is not documented.
- Testimonials: "Sascha Dietz, Privatkunde" reads as real. "Thomas M.", "Petra K.", "Michael R." are unverified. Do not add new testimonials, figures, or manufacturer claims.

## Product Principles

1. Expertise over sales: the site shows competence (certification, planning, projects) before products.
2. One person, one contact: Rainer is visible and reachable directly.
3. Prove with real projects and real renders, not with claims.
4. The monthly offers stay easy to maintain by the portal.

## Accessibility & Inclusion

Visitors include older decision makers and municipal staff: readable body sizes, strong contrast, phone and email directly clickable on mobile.
