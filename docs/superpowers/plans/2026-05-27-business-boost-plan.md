# Business Boost Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add trust badges, testimonials, partner logos, sticky mobile CTA, WhatsApp button, and enhanced CTA to boost lead generation for lichttechnik-vertrieb.de.

**Architecture:** Additive changes to an existing static HTML/CSS/JS site. No build step, no framework. All new components are pure CSS + minimal vanilla JS. Changes touch 4 files (style.css, index.html, uber-uns.html, main.js) plus WhatsApp/sticky CTA snippets added to 4 additional HTML pages.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JavaScript (IntersectionObserver)

**Spec:** `docs/superpowers/specs/2026-05-27-business-boost-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `css/style.css` | Modify | All new component styles (cert-strip dark, testimonials, partner logos, sticky CTA, WhatsApp float, CTA banner enhancements) |
| `index.html` | Modify | Cert-strip redesign, testimonials section, partner logos section, enhanced CTA banner, WhatsApp button, sticky CTA |
| `uber-uns.html` | Modify | Add cert-strip after Leistungen, WhatsApp button, sticky CTA |
| `produkte.html` | Modify | Add WhatsApp button, sticky CTA |
| `beleuchtungsplanung.html` | Modify | Add WhatsApp button, sticky CTA |
| `kontakt.html` | Modify | Add WhatsApp button only (no sticky CTA) |
| `js/main.js` | Modify | Sticky CTA footer-hide logic |

---

### Task 1: CSS — Add all new component styles

**Files:**
- Modify: `css/style.css` (append after line 1548, before closing)

- [ ] **Step 1: Add cert-strip dark theme styles**

Append to `css/style.css` — restyle the existing `.cert-strip` to dark theme with 6 badges:

```css
/* ========== Cert Strip — Dark Theme (Business Boost) ========== */
.cert-strip {
  background: var(--primary-dark);
  padding: 4rem 0;
  border-top: none;
  border-bottom: none;
}

.cert-items {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
}

.cert-item {
  color: white;
  flex-direction: column;
  text-align: center;
  gap: 0.75rem;
}

.cert-item svg {
  color: var(--accent);
  width: 48px;
  height: 48px;
}

.cert-item img {
  height: 52px;
  border-radius: 6px;
  filter: brightness(1.2);
}

.cert-item strong {
  color: white;
  font-size: 0.95rem;
}

.cert-item span {
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .cert-items {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .cert-items {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 2: Add testimonials styles**

Append to `css/style.css`:

```css
/* ========== Testimonials ========== */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.testimonial-card {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-left: 3px solid var(--accent);
  position: relative;
}

.testimonial-quote-icon {
  font-size: 3rem;
  color: var(--accent);
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 0.5rem;
  font-family: Georgia, serif;
}

.testimonial-text {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.testimonial-divider {
  height: 1px;
  background: #e5e7eb;
  margin-bottom: 1rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.testimonial-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
}

.testimonial-role {
  font-size: 0.8rem;
  color: var(--text-light);
}

.testimonial-stars {
  display: flex;
  gap: 2px;
  color: var(--accent);
}

@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Add partner logos styles**

Append to `css/style.css`:

```css
/* ========== Partner Logos ========== */
.partner-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.partner-logo {
  padding: 1rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-light);
  letter-spacing: 0.05em;
  transition: all 0.3s;
  opacity: 0.5;
}

.partner-logo:hover {
  opacity: 1;
  border-color: var(--accent);
  color: var(--text);
}
```

- [ ] **Step 4: Add sticky CTA styles**

Append to `css/style.css`:

```css
/* ========== Sticky Mobile CTA ========== */
.sticky-cta {
  display: none;
}

@media (max-width: 768px) {
  .sticky-cta {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 998;
    background: var(--accent);
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    color: var(--primary-dark);
    font-weight: 700;
    font-size: 1rem;
    transition: opacity 0.3s, transform 0.3s;
  }

  .sticky-cta.hidden {
    opacity: 0;
    transform: translateY(100%);
    pointer-events: none;
  }

  .sticky-cta svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
}
```

- [ ] **Step 5: Add WhatsApp float styles**

Append to `css/style.css`:

```css
/* ========== WhatsApp Float ========== */
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 997;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5);
}

.whatsapp-float svg {
  width: 28px;
  height: 28px;
  fill: white;
}

@media (max-width: 768px) {
  .whatsapp-float.has-sticky-cta {
    bottom: 72px;
  }
}
```

- [ ] **Step 6: Add CTA banner check-list styles**

Append to `css/style.css`:

```css
/* ========== CTA Banner Check List ========== */
.cta-checks {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.cta-checks li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}

.cta-checks li svg {
  color: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .cta-checks {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
}
```

- [ ] **Step 7: Commit CSS changes**

```bash
git add css/style.css
git commit -m "feat: add CSS for trust badges, testimonials, partner logos, sticky CTA, WhatsApp float"
```

---

### Task 2: index.html — Redesign cert-strip with 6 badges

**Files:**
- Modify: `index.html:452-485` (current cert-strip section)

- [ ] **Step 1: Replace cert-strip content**

Replace the entire `<!-- Zertifizierung -->` section (lines 452-485) with the new 6-badge dark version:

```html
  <!-- Zertifizierung -->
  <section class="cert-strip">
    <div class="container">
      <div class="cert-items fade-in">
        <div class="cert-item">
          <img src="images/din-zertifikat.png" alt="DIN Geprüft Zertifikat" width="709" height="709">
          <div>
            <strong>DIN Geprüft</strong>
            <span>PZ-LTAI-059</span>
          </div>
        </div>
        <div class="cert-item">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          <div>
            <strong>CE-Konformität</strong>
            <span>Alle Produkte geprüft</span>
          </div>
        </div>
        <div class="cert-item">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <div>
            <strong>Energieeffizient</strong>
            <span>LED-Technologie</span>
          </div>
        </div>
        <div class="cert-item">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <div>
            <strong>Deutsche Qualität</strong>
            <span>Hersteller aus DE</span>
          </div>
        </div>
        <div class="cert-item">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          <div>
            <strong>Nachhaltig</strong>
            <span>Langlebig & recycelbar</span>
          </div>
        </div>
        <div class="cert-item">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
          <div>
            <strong>Normgerecht</strong>
            <span>DIN EN 12464-1</span>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: redesign cert-strip with 6 trust badges on dark background"
```

---

### Task 3: index.html — Add testimonials section

**Files:**
- Modify: `index.html` (insert after the Projects `</section>` closing tag, before the FAQ section)

- [ ] **Step 1: Add testimonials HTML**

Insert the following after the closing `</section>` of the "Realisierte Projekte" section (the projects-grid-detailed section) and before the `<!-- FAQ -->` comment:

```html
  <!-- Kundenstimmen -->
  <section class="section-spacious section-alt">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-label">Kundenstimmen</span>
        <h2>Das sagen unsere Kunden</h2>
        <p>Vertrauen durch Erfahrung und persönliche Betreuung.</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card fade-in">
          <div class="testimonial-quote-icon">&ldquo;</div>
          <p class="testimonial-text">Herr Ludwig hat unsere Sporthalle perfekt ausgeleuchtet. Die dimmbaren Szenen sind genau das, was wir für Wettkämpfe und Veranstaltungen brauchten.</p>
          <div class="testimonial-divider"></div>
          <div class="testimonial-author">
            <div>
              <div class="testimonial-name">Thomas M.</div>
              <div class="testimonial-role">Sportverein Heusenstamm</div>
            </div>
            <div class="testimonial-stars">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
        </div>
        <div class="testimonial-card fade-in">
          <div class="testimonial-quote-icon">&ldquo;</div>
          <p class="testimonial-text">Herstellerunabhängige Beratung, die wirklich den besten Preis-Leistungs-Mix findet. Nach 3 Angeboten von anderen war seins das überzeugendste.</p>
          <div class="testimonial-divider"></div>
          <div class="testimonial-author">
            <div>
              <div class="testimonial-name">Petra K.</div>
              <div class="testimonial-role">Architektin</div>
            </div>
            <div class="testimonial-stars">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
        </div>
        <div class="testimonial-card fade-in">
          <div class="testimonial-quote-icon">&ldquo;</div>
          <p class="testimonial-text">Von der 3D-Planung bis zur Lieferung alles aus einer Hand. So stelle ich mir Zusammenarbeit vor.</p>
          <div class="testimonial-divider"></div>
          <div class="testimonial-author">
            <div>
              <div class="testimonial-name">Michael R.</div>
              <div class="testimonial-role">Geschäftsführer Autohaus</div>
            </div>
            <div class="testimonial-stars">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add customer testimonials section with 3 placeholder reviews"
```

---

### Task 4: index.html — Add partner logos section

**Files:**
- Modify: `index.html` (insert after "Warum Lichttechnik und Vertrieb?" section, before "Services" section)

- [ ] **Step 1: Add partner logos HTML**

Insert after the closing `</section>` of the "Why Me - Split Reversed" section and before the `<!-- Services -->` comment:

```html
  <!-- Herstellerpartner -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-label">Herstellerpartner</span>
        <h2>Herstellerunabhängig — Ihre Vorteile</h2>
        <p>Ich arbeite mit führenden Leuchtenherstellern und wähle die beste Lösung für Ihr Projekt.</p>
      </div>
      <div class="partner-logos fade-in">
        <div class="partner-logo">Philips</div>
        <div class="partner-logo">OSRAM</div>
        <div class="partner-logo">Trilux</div>
        <div class="partner-logo">Zumtobel</div>
        <div class="partner-logo">Regent</div>
        <div class="partner-logo">Siteco</div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add manufacturer partner logos section"
```

---

### Task 5: index.html — Enhanced CTA banner (Licht-Check)

**Files:**
- Modify: `index.html:487-497` (current CTA banner section)

- [ ] **Step 1: Replace CTA banner content**

Replace the entire `<!-- CTA Banner -->` section with the enhanced Licht-Check version:

```html
  <!-- CTA Banner -->
  <section class="cta-banner">
    <div class="container fade-in">
      <h2>Kostenloser Licht-Check für Ihr Projekt</h2>
      <p>Ich analysiere Ihre aktuelle Beleuchtungssituation und zeige Einsparpotenziale auf — unverbindlich und kostenlos.</p>
      <ul class="cta-checks">
        <li>
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          Analyse Ihrer aktuellen Beleuchtung
        </li>
        <li>
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          Einsparpotenzial durch LED-Umrüstung
        </li>
        <li>
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          Unverbindliche Produktempfehlung
        </li>
      </ul>
      <a href="kontakt.html?produkt=Kostenloser%20Licht-Check" class="btn btn-primary">
        Licht-Check anfragen
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: replace CTA banner with Kostenloser Licht-Check offer"
```

---

### Task 6: Add WhatsApp button + sticky CTA to all relevant pages

**Files:**
- Modify: `index.html` (before `</body>`)
- Modify: `uber-uns.html` (before `</body>`)
- Modify: `produkte.html` (before `</body>`)
- Modify: `beleuchtungsplanung.html` (before `</body>`)
- Modify: `kontakt.html` (before `</body>`)

The WhatsApp button HTML is identical for all pages. The sticky CTA is added to all pages except kontakt.html and legal pages.

- [ ] **Step 1: Add WhatsApp + sticky CTA to index.html**

Insert before `<script src="js/main.js"></script>` in index.html:

```html
  <!-- WhatsApp Float -->
  <a href="https://wa.me/4961046683115?text=Hallo,%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Beratung." class="whatsapp-float has-sticky-cta" target="_blank" rel="noopener" aria-label="WhatsApp Kontakt">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>

  <!-- Sticky Mobile CTA -->
  <a href="kontakt.html" class="sticky-cta">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    Jetzt beraten lassen
  </a>
```

- [ ] **Step 2: Add same snippets to uber-uns.html, produkte.html, beleuchtungsplanung.html**

Same two HTML blocks (WhatsApp + sticky CTA) inserted before `<script src="js/main.js"></script>` in each file. All three get both `has-sticky-cta` class on WhatsApp and the sticky CTA element.

- [ ] **Step 3: Add WhatsApp only to kontakt.html**

Insert before `<script src="js/main.js"></script>` in kontakt.html — WhatsApp button WITHOUT `has-sticky-cta` class, NO sticky CTA:

```html
  <!-- WhatsApp Float -->
  <a href="https://wa.me/4961046683115?text=Hallo,%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Beratung." class="whatsapp-float" target="_blank" rel="noopener" aria-label="WhatsApp Kontakt">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
```

- [ ] **Step 4: Commit**

```bash
git add index.html uber-uns.html produkte.html beleuchtungsplanung.html kontakt.html
git commit -m "feat: add WhatsApp float button and sticky mobile CTA to all pages"
```

---

### Task 7: uber-uns.html — Add cert-strip after Leistungen

**Files:**
- Modify: `uber-uns.html` (insert after the Leistungen section, before Referenzprojekte)

- [ ] **Step 1: Add cert-strip HTML**

Insert after the closing `</section>` of the Leistungen section (`.section.section-alt` containing `.services-grid`) and before the `<!-- Referenzprojekte -->` comment. Use the exact same cert-strip HTML from Task 2.

- [ ] **Step 2: Commit**

```bash
git add uber-uns.html
git commit -m "feat: add trust badges cert-strip to uber-uns page"
```

---

### Task 8: js/main.js — Sticky CTA footer-hide logic

**Files:**
- Modify: `js/main.js` (append inside the DOMContentLoaded callback)

- [ ] **Step 1: Add sticky CTA visibility logic**

Append before the closing `});` of the DOMContentLoaded listener in `js/main.js`:

```javascript
  // Sticky CTA — hide when footer is visible
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    const footer = document.querySelector('.footer');
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyCta.classList.add('hidden');
        } else {
          stickyCta.classList.remove('hidden');
        }
      });
    }, { threshold: 0 });

    if (footer) {
      stickyObserver.observe(footer);
    }
  }
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add sticky CTA hide-on-footer logic"
```

---

### Task 9: Final review and responsive check

- [ ] **Step 1: Verify all cert-strip overrides work**

The new CSS for `.cert-strip` must override the old styles. Check that the old `background: var(--bg-alt)`, `border-top`, `border-bottom`, and `.cert-items` flex layout are properly overridden by the new grid layout and dark background. If the old styles have higher specificity, adjust accordingly.

- [ ] **Step 2: Visual check on mobile breakpoints**

Open index.html in browser and verify:
- Cert-strip: 6 badges → 3x2 on tablet → 2x3 on mobile
- Testimonials: 3 columns → 2 → 1
- Sticky CTA visible on mobile, hidden on desktop
- WhatsApp button above sticky CTA on mobile
- Partner logos wrap properly

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "fix: responsive adjustments for business boost features"
```
