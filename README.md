# Thomas More - ITF Cursus Presentaties

Interactieve Marp-presentaties voor de IT-opleidingen aan de Thomas More Hogeschool (Toegepaste Informatica).

---

## 1. Beschikbare Presentaties per Vak (NL & EN)

### Vak: Web Essentials

#### HTML5 Essentials
- **Nederlands (NL):** `presentations/basic_html.md` -> `basic_html.html`
- **English (EN):** `presentations/basic_html_en.md` -> `basic_html_en.html`
- **Onderwerpen:**
  - Inleiding & W3C standaarden
  - Document outline & metadata
  - Semantische structuurtags
  - Afbeeldingen (met nadruk op **WebP** & `<picture>` fallback)
  - Hyperlinks & speciale tekens (entities)
  - Lijsten & semantische tabellen
  - Op weg naar CSS

#### CSS3 Essentials
- **Nederlands (NL):** `presentations/basic_css.md` -> `basic_css.html`
- **English (EN):** `presentations/basic_css_en.md` -> `basic_css_en.html`
- **Onderwerpen:**
  - Syntaxis, selectoren, cascade & specificiteit
  - Typografie, Web Fonts & Eenheden (PX vs EM vs REM)
  - Kleurenmodellen & interactieve pseudo-classes (LVHA)
  - Het CSS Box Model & `box-sizing: border-box`
  - Display eigenschappen, gestylde navigatielijsten & zebra tabellen
  - Achtergronden, gradients, `object-fit` & filters
  - Float, positionering (`sticky`/`fixed`), z-index & Media Queries
  - Moderne 1D Flexbox & 2D CSS Grid (12-kolommen layouts)
  - 2D/3D transformaties, transitions & `@keyframes` animaties

---

### Vak: Web Development

#### Tailwind CSS v4
- **Nederlands (NL):** `presentations/tailwindcss_v4.md` -> `tailwindcss_v4.html`
- **English (EN):** `presentations/tailwindcss_v4_en.md` -> `tailwindcss_v4_en.html`
- **Onderwerpen:**
  - Utility-First CSS filosofie vs traditioneel CSS
  - Starten met Tailwind v4 (`@import "tailwindcss";`)
  - Interactief oefenen via **Tailwind Play** (`play.tailwindcss.com`)
  - Basis utilities: Spacing (4px schaal), Sizing, Typografie & Kleurenpalet
  - Box Model, Borders, Shadows & Rings
  - Flexbox & CSS Grid layouts
  - State modifiers (`hover:`, `focus:`, `active:`, `group-hover:`, `peer:`)
  - Mobile-First responsive design (`sm:`, `md:`, `lg:`) & Dark Mode (`dark:`)
  - Arbitrary values (`w-[350px]`) & de `!` Important modifier
  - **Customisatie in v4:** Merkkleuren toevoegen via `@theme`, breakpoints wijzigen/toevoegen & eigen klassen via `@apply` en `@utility`
  - Praktijkvoorbeeld (Thomas More Course Card)
  - **Nieuw in Tailwind v4:** Rust Oxide engine, CSS-first configuratie (`@theme`), automatische content detectie, native P3 / Container Queries & migratie via upgrade tool

#### Alpine.js Fundamentals
- **Nederlands (NL):** `presentations/alpinejs.md` -> `alpinejs.html`
- **English (EN):** `presentations/alpinejs_en.md` -> `alpinejs_en.html`
- **Onderwerpen:**
  - Declaratieve JavaScript filosofie ("Tailwind for JS")
  - Installatie via CDN (`defer`) en modern bundelen met NPM/Vite
  - Core Directives: `x-data`, `x-text`, `x-html`, `x-show` vs `x-if`
  - Attributen (`x-bind` / `:`) en events (`x-on` / `@`) met modifiers (`.prevent`, `.stop`, `.outside`, `.debounce`, `.window`)
  - Two-way data binding (`x-model`) en iteraties (`x-for` met `<template>` en `:key`)
  - Vloeiende CSS overgangen via `x-transition`
  - FOUC voorkomen met `x-cloak` en DOM referenties via `x-ref` / `$refs`
  - Magische eigenschappen: `$el`, `$event`, `$dispatch`, `$watch`, `$nextTick`, `$store`
  - Herbruikbare componenten (`Alpine.data()`) en globale stores (`Alpine.store()`)
  - Praktijkvoorbeelden: Toegankelijke Modal Dialog, Live Cursus Zoekfilter & Winkelmand badge
  - Architectuur: Alpine.js vs React vs Vue vs Vanilla JS

#### Livewire v4 Fundamentals
- **Nederlands (NL):** `presentations/livewire_v4.md` -> `livewire_v4.html`
- **English (EN):** `presentations/livewire_v4_en.md` -> `livewire_v4_en.html`
- **Onderwerpen:**
  - Full-stack reactiviteit in Laravel met pure PHP en Blade
  - Hoe Livewire werkt onder de motorkap (AJAX payloads en DOM morphing)
  - Single-File Components (`.blade.php`) vs traditionele componentklassen
  - Data binding via `wire:model`, `.live`, `.blur` en `.debounce`
  - Actions, parameters en event modifiers (`wire:click`, `wire:submit`)
  - Loading states & feedback (`wire:loading`, `wire:target`, `wire:loading.class`)
  - Realtime validatie met `#[Validate]` en enterprise Form Objects
  - Single Page Application (SPA) navigatie via `wire:navigate` en `wire:navigate.hover`
  - Hybride interacties met Alpine.js via het `$wire` object
  - Wat is nieuw in v4: Single-file standaard, snelle morphing engine & `#[Modelable]`
  - Praktijkvoorbeeld: Realtime Data Table met live filtering en paginering

#### Flux UI Componenten (Laravel 13)
- **Nederlands (NL):** `presentations/fluxui.md` -> `fluxui.html`
- **English (EN):** `presentations/fluxui_en.md` -> `fluxui_en.html`
- **Onderwerpen:**
  - Waarom Flux UI: Ingebouwde a11y, automatische foutafhandeling en 80-90% minder Blade code
  - Vergelijking: Flux component vs 18 regels handmatige Tailwind formuliercode
  - Gratis componentenset: `flux:input`, `flux:textarea`, `flux:select`, `flux:checkbox`, `flux:radio`, `flux:switch`
  - Knoppen & interacties: `flux:button` met automatische loading state bij `wire:click`
  - Overlays & dialogen: `flux:modal` met focus trapping en backdrop blur
  - Data weergave: `flux:badge`, `flux:card` en `flux:table`
  - Customizen: Varianten, Tailwind class overrides, accentkleuren en `<flux:field>` slots
  - Praktijkvoorbeeld: Compleet registratieformulier in Laravel 13

---

## 2. Huisstijl & Thema

De presentaties maken gebruik van het op maat gemaakte **Thomas More Tech** thema:
- **Achtergrond:** Dark Slate (`#0f141c`) en Card Surface (`#181f2a`)
- **Primaire Accentkleur:** Thomas More Oranje (`#e84e10` / `#ff753a`)
- **Secundair Accent:** ITF Cyaan (`#009cab`)
- **Typografie:** Google Fonts (`Outfit` voor headings/body, `Fira Code` voor code)
- **High-Contrast Code:** Geoptimaliseerde syntax highlighting voor donkere achtergronden
- **Donkere Tabellen:** Zebra striping en contrasterende koppen

---

## 3. Lokaal Ontwikkelen & Compileren

### Vereisten
- Node.js geïnstalleerd

### HTML Presentaties Genereren via Marp CLI
```bash
# Alle presentaties in één keer compileren
npx @marp-team/marp-cli --no-stdin presentations/*.md --html

# Of individueel per bestand
npx @marp-team/marp-cli --no-stdin presentations/tailwindcss_v4.md --html -o presentations/tailwindcss_v4.html
npx @marp-team/marp-cli --no-stdin presentations/tailwindcss_v4_en.md --html -o presentations/tailwindcss_v4_en.html
```

---

## 4. Hosting op Netlify

Deze repository is geconfigureerd voor automatische deployment via Netlify:
- Bij elke `git push` naar de `main` branch bouwt Netlify automatisch alle `.md` bestanden naar de `dist` publicatiemap.
- De ruwe `.md` bronbestanden en de `.agents` map worden **niet** openbaar gepubliceerd.
- De hoofdpagina `index.html` dient als centrale landingspagina met taalkeuzeknoppen (NL & EN).
