# Angebot des Monats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a monthly "Angebot des Monats" section to the website with a dedicated page (`angebote.html`) and a preview section on the homepage.

**Architecture:** Static HTML/CSS/JS, no build system. New page follows existing patterns (`produkte.html`, `projekt-card-detailed`). CSS additions go into the existing `css/style.css`. Nav link added to all HTML files manually.

**Tech Stack:** Plain HTML5, CSS custom properties, vanilla JS (existing `js/main.js` handles fade-in animations — no new JS needed)

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `images/angebot-juni-gu10.jpg` | Create | Extracted from PDF (OSRAM GU10 spot) |
| `images/angebot-juni-schienenstrahler.jpg` | Create | Extracted from PDF (LED track light) |
| `images/angebot-juni-ventilator.jpg` | Create | Extracted from PDF (ceiling fan) |
| `css/style.css` | Modify | Add `.angebot-card`, `.angebot-badge`, `.angebot-price`, `.angebote-grid` |
| `angebote.html` | Create | Full product page with 3 cards |
| `index.html` | Modify | Add nav link + preview section after Services |
| `produkte.html` | Modify | Add nav link |
| `uber-uns.html` | Modify | Add nav link |
| `beleuchtungsplanung.html` | Modify | Add nav link |
| `kontakt.html` | Modify | Add nav link |
| `impressum.html` | Modify | Add nav link |
| `datenschutz.html` | Modify | Add nav link |
| `agb.html` | Modify | Add nav link |
| `404.html` | Modify | Add nav link |
| `sitemap.xml` | Modify | Add `angebote.html` entry |

---

## Task 1: Extract product images from PDF

**Files:**
- Create: `images/angebot-juni-gu10.jpg`
- Create: `images/angebot-juni-schienenstrahler.jpg`
- Create: `images/angebot-juni-ventilator.jpg`

- [ ] **Step 1: Check if pdfimages is available**

```bash
which pdfimages || brew install poppler
```

- [ ] **Step 2: Extract all images from the PDF**

```bash
cd /Users/l.ludwig/Documents/repositories/lichttechnik-vertrieb
pdfimages -j "/Users/l.ludwig/Documents/Angebot der Woche KW23.pdf" /tmp/angebot-imgs
ls /tmp/angebot-imgs*
```

Expected: Several image files like `angebot-imgs-000.jpg`, `angebot-imgs-001.jpg`, etc.

- [ ] **Step 3: Preview the extracted images to identify which is which**

```bash
open /tmp/angebot-imgs-000.jpg
open /tmp/angebot-imgs-001.jpg
open /tmp/angebot-imgs-002.jpg
# open more if needed
```

- [ ] **Step 4: Copy the 3 product images to the images folder**

After identifying which file is which:
```bash
cp /tmp/angebot-imgs-XXX.jpg images/angebot-juni-gu10.jpg
cp /tmp/angebot-imgs-XXX.jpg images/angebot-juni-schienenstrahler.jpg
cp /tmp/angebot-imgs-XXX.jpg images/angebot-juni-ventilator.jpg
```

- [ ] **Step 5: Verify images exist**

```bash
ls -lh images/angebot-juni-*.jpg
```

Expected: 3 files, each a few hundred KB.

- [ ] **Step 6: Commit**

```bash
git add images/angebot-juni-gu10.jpg images/angebot-juni-schienenstrahler.jpg images/angebot-juni-ventilator.jpg
git commit -m "feat: add Juni 2026 product images for Angebot des Monats"
```

---

## Task 2: Add CSS for angebot cards

**Files:**
- Modify: `css/style.css` (append at end of file)

- [ ] **Step 1: Open `css/style.css` and append the following CSS at the very end**

```css
/* ===========================
   Angebot des Monats
   =========================== */

.angebote-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 900px) {
  .angebote-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .angebote-grid {
    grid-template-columns: 1fr;
  }
}

.angebot-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
}

.angebot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  border-color: var(--accent);
}

.angebot-card-image {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--bg);
}

.angebot-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.angebot-card:hover .angebot-card-image img {
  transform: scale(1.04);
}

.angebot-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--accent);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}

.angebot-card-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.angebot-card-body h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text);
  line-height: 1.4;
}

.angebot-specs {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.angebot-specs li {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;
}

.angebot-specs li::before {
  content: "·";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}

.angebot-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
}

.angebot-price-unit {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.angebot-vat-note {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

/* Preview cards on homepage (compact, no specs list) */
.angebot-preview-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  text-decoration: none;
  display: block;
  color: inherit;
}

.angebot-preview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  border-color: var(--accent);
}

.angebot-preview-card .angebot-card-image {
  aspect-ratio: 4/3;
}

.angebot-preview-body {
  padding: 1rem 1.25rem 1.25rem;
}

.angebot-preview-body h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
  line-height: 1.4;
}

.angebot-preview-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
}
```

- [ ] **Step 2: Save the file and verify no syntax errors by opening the site in a browser**

```bash
open /Users/l.ludwig/Documents/repositories/lichttechnik-vertrieb/index.html
```

Expected: existing site renders identically, no broken styles.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS for Angebot des Monats cards and grid"
```

---

## Task 3: Create `angebote.html`

**Files:**
- Create: `angebote.html`

- [ ] **Step 1: Create `angebote.html` with the following content**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Angebot des Monats - Aktuelle Sonderangebote bei Lichttechnik und Vertrieb. LED-Spots, Schienenstrahler, Deckenventilator.">
  <title>Angebot des Monats | Lichttechnik und Vertrieb</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="canonical" href="https://www.lichttechnik-vertrieb.de/angebote.html">
  <meta property="og:title" content="Angebot des Monats | Lichttechnik und Vertrieb">
  <meta property="og:description" content="Aktuelle Sonderangebote - LED-Spots, Schienenstrahler, Deckenventilator mit attraktiven Preisen.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.lichttechnik-vertrieb.de/angebote.html">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="Lichttechnik und Vertrieb">
</head>
<body>

  <!-- Navigation -->
  <nav class="navbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">
        <img src="images/logo.png" alt="Lichttechnik und Vertrieb Logo" width="757" height="534">
        <span>Lichttechnik &amp; Vertrieb</span>
      </a>
      <button class="hamburger" aria-label="Menü öffnen">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links">
        <li><a href="index.html">Startseite</a></li>
        <li><a href="uber-uns.html">Unternehmen</a></li>
        <li><a href="produkte.html">Produkte</a></li>
        <li><a href="angebote.html" class="active">Angebote</a></li>
        <li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
        <li><a href="kontakt.html" class="nav-cta">Kontakt</a></li>
      </ul>
    </div>
  </nav>

  <main>

  <!-- Page Header -->
  <section class="page-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="index.html">Startseite</a>
        <span>/</span>
        <span style="color: rgba(255,255,255,0.9);">Angebot des Monats</span>
      </div>
      <h1>Angebot des Monats</h1>
      <p>Ausgewählte Produkte zu attraktiven Preisen — monatlich neu</p>
    </div>
  </section>

  <!-- Angebote -->
  <section class="section-spacious">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-label">Juni 2026</span>
        <h2>Aktuelle Angebote</h2>
        <p>Alle Preise zzgl. 19% MwSt. · Solange Vorrat reicht</p>
      </div>

      <div class="angebote-grid">

        <!-- Produkt 1: OSRAM GU10 -->
        <div class="angebot-card fade-in">
          <div class="angebot-badge">Angebot des Monats</div>
          <div class="angebot-card-image">
            <img src="images/angebot-juni-gu10.jpg" alt="OSRAM MR16 LED-Spot-Lampe GU10" loading="lazy">
          </div>
          <div class="angebot-card-body">
            <h3>OSRAM MR16 LED-Spot-Lampe GU10 — 10er-Pack</h3>
            <ul class="angebot-specs">
              <li>6W, 230V, Sockel GU10</li>
              <li>720 Lumen, flickerfrei</li>
              <li>Abstrahlwinkel 38°</li>
              <li>10 Stück im Pack</li>
            </ul>
            <div class="angebot-price">14,15 €</div>
            <div class="angebot-price-unit">pro 10er-Pack*</div>
          </div>
        </div>

        <!-- Produkt 2: LED Schienenstrahler -->
        <div class="angebot-card fade-in">
          <div class="angebot-badge">Angebot des Monats</div>
          <div class="angebot-card-image">
            <img src="images/angebot-juni-schienenstrahler.jpg" alt="LED-3-Phasen-Schienenstrahler 40W schwarz" loading="lazy">
          </div>
          <div class="angebot-card-body">
            <h3>LED-3-Phasen-Schienenstrahler 40W</h3>
            <ul class="angebot-specs">
              <li>Alu-Gehäuse, schwarz, Universaladapter</li>
              <li>Lichtfarbe umschaltbar: 3.000K / 4.000K / 6.000K</li>
              <li>CRI &gt; 92, 4.400 lm</li>
              <li>Abstrahlwinkel 40°, IP20</li>
            </ul>
            <div class="angebot-price">48,50 €</div>
            <div class="angebot-price-unit">pro Stück*</div>
          </div>
        </div>

        <!-- Produkt 3: Deckenventilator -->
        <div class="angebot-card fade-in">
          <div class="angebot-badge">Angebot des Monats</div>
          <div class="angebot-card-image">
            <img src="images/angebot-juni-ventilator.jpg" alt="Deckenventilator mit Deckenleuchte 20W DC Motor" loading="lazy">
          </div>
          <div class="angebot-card-body">
            <h3>Deckenventilator mit Deckenleuchte — Ø 50cm</h3>
            <ul class="angebot-specs">
              <li>20W DC Motor, max. 50 dB bei 850 RPM</li>
              <li>6-stufige Geschwindigkeitseinstellung</li>
              <li>Deckenleuchte 30W, zuschaltbar</li>
              <li>Lichtfarbe umschaltbar: 3.000K / 4.000K / 6.000K</li>
              <li>Flügel transparent ABS, Gehäuse weiß</li>
              <li>230V, max. Dachneigung 25°, Höhe 145mm</li>
            </ul>
            <div class="angebot-price">58,40 €</div>
            <div class="angebot-price-unit">pro Stück*</div>
          </div>
        </div>

      </div>

      <p class="angebot-vat-note fade-in">* alle Preise zzgl. 19% MwSt.</p>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-banner">
    <div class="container fade-in">
      <h2>Interesse an einem Angebot?</h2>
      <p>Kontaktieren Sie mich direkt — ich berate Sie gerne und kläre Verfügbarkeit und Lieferzeit.</p>
      <a href="kontakt.html" class="btn btn-primary">
        Jetzt anfragen
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </section>

  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <img src="images/logo.png" alt="Logo" width="757" height="534">
            <span>Lichttechnik &amp; Vertrieb</span>
          </div>
          <p>Ihr Partner für professionelle Beleuchtungslösungen. Beratung, Planung und Vertrieb seit 38 Jahren.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a href="index.html">Startseite</a></li>
            <li><a href="uber-uns.html">Unternehmen</a></li>
            <li><a href="produkte.html">Produkte</a></li>
            <li><a href="angebote.html">Angebote</a></li>
            <li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4>Rechtliches</h4>
          <ul class="footer-links">
            <li><a href="impressum.html">Impressum</a></li>
            <li><a href="datenschutz.html">Datenschutz</a></li>
            <li><a href="agb.html">AGB</a></li>
          </ul>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul class="footer-links">
            <li><a href="tel:+4961046683115">+49 6104-6683115</a></li>
            <li><a href="mailto:info@lichttechnik-vertrieb.de">info@lichttechnik-vertrieb.de</a></li>
            <li>Friedenstr. 3 b</li>
            <li>63150 Heusenstamm</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2025 Rainer Ludwig. Alle Rechte vorbehalten.
      </div>
    </div>
  </footer>

  <!-- WhatsApp Float -->
  <a href="https://wa.me/4961046683115?text=Hallo,%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Beratung." class="whatsapp-float has-sticky-cta" target="_blank" rel="noopener" aria-label="WhatsApp Kontakt">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>

  <!-- Sticky Mobile CTA -->
  <a href="kontakt.html" class="sticky-cta">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    Jetzt beraten lassen
  </a>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser to verify it renders**

```bash
open /Users/l.ludwig/Documents/repositories/lichttechnik-vertrieb/angebote.html
```

Expected: Page renders with nav, header, 3 product cards, CTA section, footer. Cards show placeholder images (or broken image icons until Task 1 is done — that's fine).

- [ ] **Step 3: Commit**

```bash
git add angebote.html
git commit -m "feat: add angebote.html with Juni 2026 Angebot des Monats"
```

---

## Task 4: Add "Angebote" nav link to all existing HTML pages

**Files:**
- Modify: `index.html`, `produkte.html`, `uber-uns.html`, `beleuchtungsplanung.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`, `agb.html`, `404.html`

In each file, find the `<ul class="nav-links">` block and add `<li><a href="angebote.html">Angebote</a></li>` between the Produkte and 3D-Planung items.

The current nav pattern in every file looks like:
```html
<li><a href="produkte.html">Produkte</a></li>
<li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```

It should become:
```html
<li><a href="produkte.html">Produkte</a></li>
<li><a href="angebote.html">Angebote</a></li>
<li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```

Also add "Angebote" to each footer's navigation `<ul class="footer-links">`, between Produkte and 3D-Planung:
```html
<li><a href="produkte.html">Produkte</a></li>
<li><a href="angebote.html">Angebote</a></li>
<li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```

- [ ] **Step 1: Edit `index.html` — add nav link**

Find in nav:
```html
        <li><a href="produkte.html">Produkte</a></li>
        <li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```
Replace with:
```html
        <li><a href="produkte.html">Produkte</a></li>
        <li><a href="angebote.html">Angebote</a></li>
        <li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```

- [ ] **Step 2: Edit `index.html` — add footer link**

Find in footer:
```html
            <li><a href="produkte.html">Produkte</a></li>
            <li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```
Replace with:
```html
            <li><a href="produkte.html">Produkte</a></li>
            <li><a href="angebote.html">Angebote</a></li>
            <li><a href="beleuchtungsplanung.html">3D-Planung</a></li>
```

- [ ] **Step 3: Repeat Steps 1 & 2 for `produkte.html`, `uber-uns.html`, `beleuchtungsplanung.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`, `agb.html`, `404.html`**

Each file: same find/replace in nav AND footer.

- [ ] **Step 4: Verify nav shows "Angebote" on all pages**

```bash
open /Users/l.ludwig/Documents/repositories/lichttechnik-vertrieb/index.html
```

Click through each page and confirm "Angebote" appears in the nav between "Produkte" and "3D-Planung".

- [ ] **Step 5: Commit**

```bash
git add index.html produkte.html uber-uns.html beleuchtungsplanung.html kontakt.html impressum.html datenschutz.html agb.html 404.html
git commit -m "feat: add Angebote nav link to all pages"
```

---

## Task 5: Add preview section to `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Find the closing tag of the Services section in `index.html`**

Look for the end of the "Alles aus einer Hand" services section — it ends with:
```html
    </div>
  </section>

  <!-- So arbeite ich - Process -->
```

- [ ] **Step 2: Insert the preview section between Services and "So arbeite ich"**

Add this block between the two sections:

```html
  <!-- Angebot des Monats Preview -->
  <section class="section-spacious section-alt">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-label">Juni 2026</span>
        <h2>Angebot des Monats</h2>
        <p>Ausgewählte Produkte zu attraktiven Preisen — monatlich neu.</p>
      </div>
      <div class="angebote-grid">
        <a href="angebote.html" class="angebot-preview-card fade-in">
          <div class="angebot-badge">Angebot</div>
          <div class="angebot-card-image">
            <img src="images/angebot-juni-gu10.jpg" alt="OSRAM MR16 LED-Spot GU10 10er-Pack" loading="lazy">
          </div>
          <div class="angebot-preview-body">
            <h3>OSRAM MR16 LED-Spot GU10 — 10er-Pack</h3>
            <div class="angebot-preview-price">14,15 €*</div>
          </div>
        </a>
        <a href="angebote.html" class="angebot-preview-card fade-in">
          <div class="angebot-badge">Angebot</div>
          <div class="angebot-card-image">
            <img src="images/angebot-juni-schienenstrahler.jpg" alt="LED-3-Phasen-Schienenstrahler 40W" loading="lazy">
          </div>
          <div class="angebot-preview-body">
            <h3>LED-3-Phasen-Schienenstrahler 40W</h3>
            <div class="angebot-preview-price">48,50 €*</div>
          </div>
        </a>
        <a href="angebote.html" class="angebot-preview-card fade-in">
          <div class="angebot-badge">Angebot</div>
          <div class="angebot-card-image">
            <img src="images/angebot-juni-ventilator.jpg" alt="Deckenventilator mit Deckenleuchte" loading="lazy">
          </div>
          <div class="angebot-preview-body">
            <h3>Deckenventilator mit Deckenleuchte — Ø 50cm</h3>
            <div class="angebot-preview-price">58,40 €*</div>
          </div>
        </a>
      </div>
      <div style="text-align:center; margin-top: 2.5rem;" class="fade-in">
        <a href="angebote.html" class="btn btn-dark">
          Alle Angebote ansehen
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Open in browser to verify**

```bash
open /Users/l.ludwig/Documents/repositories/lichttechnik-vertrieb/index.html
```

Expected: New section appears between "Alles aus einer Hand" and "So arbeite ich", with 3 preview cards and "Alle Angebote ansehen" button.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Angebot des Monats preview section to homepage"
```

---

## Task 6: Update sitemap.xml

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: Open `sitemap.xml` and add an entry for `angebote.html`**

Find the existing `<url>` block for `produkte.html`:
```xml
  <url>
    <loc>https://www.lichttechnik-vertrieb.de/produkte.html</loc>
```

Add a new `<url>` block directly after the closing `</url>` of the produkte entry:
```xml
  <url>
    <loc>https://www.lichttechnik-vertrieb.de/angebote.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

- [ ] **Step 2: Commit**

```bash
git add sitemap.xml
git commit -m "feat: add angebote.html to sitemap"
```

---

## Update Workflow (for future months)

When Rainer sends a new PDF:

1. Extract images: `pdfimages -j "<path-to-pdf>" /tmp/angebot-imgs`
2. Copy to `images/`: rename to `angebot-[monat]-[produkt].jpg`
3. Edit `angebote.html`: update month label, product names, specs, prices, image paths (3 cards)
4. Edit `index.html`: update month label + 3 preview card image paths, names, prices
5. Delete old `images/angebot-*.jpg` files
6. Commit: `git commit -m "feat: update Angebot des Monats [Monat Jahr]"`
