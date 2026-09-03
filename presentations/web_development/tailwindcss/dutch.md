---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Tailwind CSS v4'
footer: 'Web Development - Thomas More Hogeschool'
---

<!-- _class: lead -->

# Tailwind CSS v4

<p class="subtitle">&lt;Utility-First Modern CSS Framework /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Development | <strong>Thema:</strong> Tailwind CSS v4 Fundamentals & Nieuwe Features
</div>

---

## Inhoudsopgave

1. **Wat is Utility-First CSS?** - Filosofie, voordelen en vergelijking met traditioneel CSS
2. **Installatie & Starten in v4** - De nieuwe `@import "tailwindcss";` standaard
3. **Basis Utilities** - Spacing, Sizing, Typografie en Kleuren
4. **Layout & Box Model** - Flexbox, CSS Grid, Borders en Shadows
5. **Modifiers & Responsive Design** - `hover:`, `focus:`, `dark:` en Mobile-First breakpoints
6. **Arbitrary Values & de '!' Modifier** - Dynamische waarden (`w-[350px]`) en `!important`
7. **Customisatie in v4: `@theme` & Eigen Klassen** - Kleuren, breakpoints, `@utility` en `@apply`
8. **Praktijkvoorbeeld** - Stap voor stap een modern component bouwen
9. **Wat is er Nieuw in Tailwind CSS v4?** - Oxide engine, CSS-first config en migratie van v3

---

## Interactief Oefenen: Tailwind Play <span class="badge">Online Sandbox</span>

Wil je de voorbeeldcode uit deze presentatie direct live uittesten zonder lokale installatie?

Gebruik de officiële interactieve playground:
**[play.tailwindcss.com](https://play.tailwindcss.com)**

<div class="grid-2">
<div class="card">

#### Waarom Tailwind Play?

- **Direct resultaat:** Typ HTML utility classes en zie het resultaat realtime in je browser
- **Volledige functionaliteit:** Ondersteunt alle hover-, focus- en responsieve breakpoints
- **Geen setup:** Geen Node.js, Vite of configuratiebestanden nodig om te experimenteren

</div>
<div class="card">

#### Handig tijdens deze les

- Kopieer codevoorbeelden uit deze presentatie
- Plak ze rechtstreeks in de Tailwind Play editor
- Pas kleuren, spacing (`p-4` naar `p-8`) of layout direct aan om het effect te ontdekken

</div>
</div>

---

## 1. Wat is Utility-First CSS?

Bij traditioneel CSS bedenk je eerst een **klassennaam** en schrijf je daarna aparte CSS-regels:

```html
<!-- Traditioneel: Semantische klassen -->
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="img/logo.svg" alt="Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">Nieuw Bericht</h4>
    <p class="chat-notification-message">Je hebt 1 ongelezen bericht!</p>
  </div>
</div>
```

**Nadelen van traditioneel CSS:**

- Voortdurende *naming fatigue* (steeds nieuwe betekenisvolle namen verzinnen)
- Enorme stylesheets die blijven groeien naarmate het project groeit
- Angst voor regressiefouten bij het aanpassen van bestaande klassen

---

## 1. De Utility-First Aanpak van Tailwind

Met Tailwind CSS bouw je componenten door **kleine, enkelvoudige utility classes** rechtstreeks in je HTML te combineren:

```html
<!-- Tailwind CSS: Utility-first -->
<div class="p-6 max-w-sm mx-auto bg-slate-800 rounded-xl shadow-lg flex items-center gap-x-4 border border-slate-700">
  <div class="shrink-0">
    <img class="size-12 rounded-full" src="img/logo.svg" alt="Logo">
  </div>
  <div>
    <h4 class="text-xl font-medium text-white">Nieuw Bericht</h4>
    <p class="text-slate-400 text-sm">Je hebt 1 ongelezen bericht!</p>
  </div>
</div>
```

<div class="grid-2">
<div class="card">

#### Wat gebeurt hier?

- `p-6`: padding van 1.5rem (24px)
- `max-w-sm`: maximale breedte van 24rem
- `bg-slate-800`: donkere achtergrondkleur
- `rounded-xl`: grote afgeronde hoeken

</div>
<div class="card">

#### Layout & Typografie

- `flex items-center gap-x-4`: flex container met tussenruimte
- `text-white font-medium`: witte tekst met halfvette dikte
- `size-12`: breedte én hoogte van 3rem (48px)

</div>
</div>

---

## 1. Waarom Tailwind CSS?

<div class="grid-2">
<div class="card">

#### 1. Geen Naming Fatigue

Je hoeft geen abstracte namen zoals `.sidebar-inner-wrapper-v2` meer te verzinnen.

#### 2. Vaste Design Tokens

Geen willekeurige pixels (`17px`, `19px`), maar een consistent schaalsysteem voor spacing, typografie en kleuren.

</div>
<div class="card">

#### 3. Zero Dead CSS & Micro Bundle

Tailwind genereert tijdens de build **enkel de classes die je daadwerkelijk gebruikt**. De uiteindelijke CSS is vaak kleiner dan 15KB!

#### 4. Lokale Wijzigingen Zonder Angst

Een knop aanpassen verandert enkel die specifieke HTML tag, zonder ongewenste neveneffecten elders op de site.

</div>
</div>

---

## 2. Installatie & Starten in Tailwind CSS v4

Tailwind CSS v4 introduceert een **CSS-first** workflow. Je hebt geen JavaScript configuratiebestand meer nodig!

### Stap 1: Installeer via npm / Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

### Stap 2: Voeg plugin toe in `vite.config.ts`

```javascript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### Stap 3: Importeer in je hoofd CSS-bestand (`style.css`)

```css
@import "tailwindcss";
```

---

## 3. Spacing: Padding & Margin

Tailwind hanteert een logisch wiskundig schaalsysteem waarbij **1 unit = 0.25rem = 4px**:

| Class | CSS Eigenschap | Waarde (bij root 16px) |
| :--- | :--- | :--- |
| `p-1` / `m-1` | `padding` / `margin` | `0.25rem` (4px) |
| `p-2` / `m-2` | `padding` / `margin` | `0.5rem` (8px) |
| `p-4` / `m-4` | `padding` / `margin` | `1rem` (16px) |
| `p-6` / `m-6` | `padding` / `margin` | `1.5rem` (24px) |
| `p-8` / `m-8` | `padding` / `margin` | `2rem` (32px) |

```html
<!-- Directional Spacing -->
<div class="pt-4 pb-2 px-6 mx-auto">
  <!-- pt = padding-top, pb = padding-bottom, px = padding links + rechts -->
  <!-- mx-auto = margin: 0 auto (horizontaal centreren) -->
</div>
```

---

## 3. Sizing: Width & Height

```html
<!-- Vaste en relatieve breedtes -->
<div class="w-full max-w-lg h-64 min-h-screen">
  <!-- w-full: width 100% -->
  <!-- max-w-lg: max-width 32rem (512px) -->
  <!-- h-64: height 16rem (256px) -->
  <!-- min-h-screen: min-height 100vh -->
</div>

<!-- size-* shortcut voor gelijke breedte en hoogte -->
<img class="size-16 rounded-full" src="avatar.webp" alt="Avatar">
<!-- size-16 staat gelijk aan: w-16 h-16 (64px x 64px) -->
```

<div class="grid-2">
<div class="card">

#### Breukwaarden (Percentages)

- `w-1/2` = `50%`
- `w-1/3` = `33.33%`
- `w-3/4` = `75%`

</div>
<div class="card">

#### Viewport Eenheden

- `w-screen` = `100vw`
- `h-screen` = `100vh`
- `min-h-dvh` = `100dvh` (dynamische viewport voor mobiel)

</div>
</div>

---

## 3. Typografie & Tekststijlen

```html
<h1 class="text-3xl font-bold text-white tracking-tight leading-tight uppercase">
  Thomas More ITF
</h1>
<p class="text-base font-normal text-slate-400 leading-relaxed text-justify line-clamp-2">
  Een overzichtelijke samenvatting van Tailwind CSS v4 voor studenten Toegepaste Informatica.
</p>
```

| Categorie | Belangrijke Tailwind Classes |
| :--- | :--- |
| **Grootte** | `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-xl` (20px), `text-3xl` (30px) |
| **Gewicht** | `font-light` (300), `font-normal` (400), `font-semibold` (600), `font-bold` (700) |
| **Uitlijning** | `text-left`, `text-center`, `text-right`, `text-justify` |
| **Transformatie** | `uppercase`, `lowercase`, `capitalize`, `normal-case` |
| **Decoratie** | `underline`, `line-through`, `no-underline` |

---

## 3. Het Uitgebreide Kleurenpalet

Tailwind levert een samengesteld kleurenpalet van tint `50` (zeer licht) tot `950` (zeer donker):

```html
<!-- Achtergrond, Tekstkleur en Randkleur -->
<button class="bg-orange-600 text-white border border-orange-500 hover:bg-orange-700">
  Inschrijven
</button>
```

<div class="grid-2">
<div class="card">

#### Kleurfamilies in Tailwind

- **Neutrals:** `slate`, `gray`, `zinc`, `neutral`, `stone`
- **Accenten:** `orange`, `amber`, `yellow`, `emerald`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `rose`

</div>
<div class="card">

#### Transparantie met Opacity Slash

Voeg eenvoudig een transparantiegraad toe achter elke kleur:

- `bg-slate-900/80` = 80% opacity
- `text-white/50` = 50% opacity
- `border-orange-500/25` = 25% opacity

</div>
</div>

---

## 4. Box Model, Borders & Shadows

```html
<div class="border-2 border-slate-700 border-t-orange-500 rounded-2xl shadow-xl shadow-orange-500/10 ring-1 ring-white/10">
  <p class="p-4 text-slate-200">Prachtig gestyled component met borders en diepte.</p>
</div>
```

<div class="grid-2">
<div class="card">

#### Border Radius (`rounded-*`)

- `rounded-sm`: 2px
- `rounded-md`: 6px
- `rounded-lg`: 8px
- `rounded-2xl`: 16px
- `rounded-full`: 9999px (cirkels en pillen)

</div>
<div class="card">

#### Box Shadows & Rings

- `shadow-sm`, `shadow-md`, `shadow-xl`
- `ring-2 ring-orange-500`: tekent een strakke outline zonder het box model te verschuiven (ideaal voor focus states)

</div>
</div>

---

## 4. Flexbox Utilities in Tailwind

```html
<!-- Navigatiebalk met Flexbox -->
<nav class="flex flex-row justify-between items-center gap-6 p-4 bg-slate-900">
  <div class="font-bold text-orange-500">Thomas More</div>
  
  <ul class="flex items-center gap-4">
    <li><a href="#" class="text-slate-300 hover:text-white">Home</a></li>
    <li><a href="#" class="text-slate-300 hover:text-white">Cursussen</a></li>
  </ul>
  
  <button class="shrink-0 px-4 py-2 bg-orange-600 rounded-lg text-white font-medium">
    Login
  </button>
</nav>
```

- **Richting:** `flex-row`, `flex-col`, `flex-wrap`
- **Hoofdas (Justify):** `justify-start`, `justify-center`, `justify-between`, `justify-around`
- **Kruisas (Align):** `items-start`, `items-center`, `items-end`, `items-stretch`
- **Tussenruimte:** `gap-2`, `gap-4`, `gap-8` (vervangt handmatige margins!)

---

## 4. CSS Grid Utilities in Tailwind

Met Tailwind bouw je 12-kolommen of multi-kolommen grid layouts in een paar classes:

```html
<!-- Responsieve 12-kolommen layout -->
<div class="grid grid-cols-12 gap-6">
  <!-- Hoofdinhoud neemt 8 kolommen -->
  <main class="col-span-12 md:col-span-8 bg-slate-800 p-6 rounded-xl">
    <h2 class="text-2xl font-bold text-white">Hoofdinhoud</h2>
  </main>
  
  <!-- Zijbalk neemt 4 kolommen -->
  <aside class="col-span-12 md:col-span-4 bg-slate-800 p-6 rounded-xl">
    <h3 class="text-xl font-bold text-orange-400">Zijbalk</h3>
  </aside>
</div>
```

- `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-12`
- `col-span-4`, `col-span-6`, `col-span-full`
- `gap-6` (zowel rij- als kolom-tussenruimte)

---

## 5. Pseudo-class Modifiers (`hover:`, `focus:`)

In Tailwind style je interactieve statussen door de modifier vóór de utility class te plaatsen:

```html
<button class="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg
               border border-slate-700
               hover:bg-orange-600 hover:border-orange-500 hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
               active:bg-orange-800
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all duration-200">
  Klik Hier
</button>
```

- **`hover:`**: Muis beweegt over element
- **`focus:`**: Element geselecteerd met tab of klik
- **`active:`**: Muisknop ingedrukt
- **`disabled:`**: Knop of invoerveld staat op disabled
- **`transition-*` & `duration-*`**: Vloeiende overgang bij state changes

---

## 5. Geavanceerde Modifiers: `group-hover:` & `peer:`

### 1. `group-hover` (Styling op basis van hover op ouder-element)

```html
<div class="group p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
  <h3 class="text-white group-hover:text-orange-500 transition">Cursus HTML5</h3>
  <p class="text-slate-400 group-hover:text-slate-200">Beweeg over de kaart om de titel oranje te maken.</p>
</div>
```

### 2. `peer` (Styling op basis van sibling element)

```html
<!-- Input validatie styling via peer -->
<input type="email" class="peer border rounded p-2 bg-slate-900 text-white" placeholder="E-mailadres" required>
<p class="hidden peer-invalid:block text-red-500 text-xs mt-1">Ongeldig e-mailadres!</p>
```

---

## 5. Responsive Design (Mobile-First)

Tailwind werkt volgens het **Mobile-First** principe. Classes zonder voorvoegsel gelden voor mobiel; modifiers gelden **vanaf die breedte en groter (`min-width`)**:

| Prefix | Minimale Schermbreedte | Typisch Doelapparaat |
| :--- | :--- | :--- |
| *(standaard)* | `0px` en hoger | Smartphones (portret) |
| **`sm:`** | `640px` | Grote smartphones / kleine tablets |
| **`md:`** | `768px` | Tablets / iPad |
| **`lg:`** | `1024px` | Laptops / kleine desktops |
| **`xl:`** | `1280px` | Standaard desktop monitoren |
| **`2xl:`** | `1536px` | Grote breedbeeld monitoren |

```html
<!-- 1 kolom op smartphone, 2 op tablet, 4 op desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="p-4 bg-slate-800 rounded">Kaart 1</div>
  <div class="p-4 bg-slate-800 rounded">Kaart 2</div>
</div>
```

---

## 5. Dark Mode Ondersteuning

Ondersteun naadloos een donkere en lichte weergave met de `dark:` modifier:

```html
<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-white p-6 rounded-xl border border-slate-200 dark:border-slate-800">
  <h3 class="text-lg font-bold text-slate-900 dark:text-orange-400">Automatische Thema Aanpassing</h3>
  <p class="text-slate-600 dark:text-slate-300 mt-2">
    Past zich automatisch aan aan de voorkeur van het besturingssysteem van de bezoeker.
  </p>
</div>
```

### Hoe activeer je Dark Mode?

1. **Systeemvoorkeur (Standaard):** Reageert op de OS `@media (prefers-color-scheme: dark)`.
2. **Handmatige Schakelaar:** Voeg een klasse `dark` toe aan het `<html>` element via JavaScript.

---

## 6. Arbitrary Values & One-Offs

Moet je een keer afwijken van het standaard design systeem? Gebruik dan **vierkante haken `[...]`**:

```html
<!-- Exacte custom pixelwaarden of hex-kleuren -->
<div class="w-[320px] top-[17px] bg-[#e84e10] p-[13px] tracking-[0.25em]">
  Aangepaste layout met exacte eenheden.
</div>

<!-- Complexe CSS functies -->
<div class="grid grid-cols-[200px_1fr_100px] h-[calc(100vh-80px)]">
  Custom grid layout
</div>
```

> **Best Practice:** Gebruik arbitrary values enkel voor unieke uitzonderingen. Gebruik voor consistente herhaalde waarden de `@theme` configuratie in CSS!

---

## 6. De '!' (Important) Modifier

Moet je een hardnekkige stijlregel van een externe CSS-bibliotheek of legacy widget overschrijven?

In **Tailwind CSS v4** plaats je het uitroepteken `!` **aan het einde** van de class name:

```html
<!-- v4 Syntax: Uitroepteken achteraan de class name -->
<div class="bg-red-600! text-white! p-6! hidden! md:block!">
  Belangrijke alert die alle externe widget styles overschrijft.
</div>
```

<div class="grid-2">
<div class="card">

#### Syntax Wijziging in v4

- **v3 (oud):** `!bg-red-600`, `hover:!bg-orange-600`
- **v4 (nieuw):** `bg-red-600!`, `hover:bg-orange-600!`
- *Waarom?* Sluit aan bij CSS (`property: value !important;`)

</div>
<div class="card">

#### Hoe het werkt & Richtlijn

- `bg-red-600!` genereert: `background-color: #dc2626 !important;`
- `p-0!` genereert: `padding: 0px !important;`
- Gebruik `!` **uitsluitend als laatste redmiddel** bij conflicten met externe CSS

</div>
</div>

---

## 7. Customisatie: Nieuwe Kleuren via `@theme`

In Tailwind v4 definieer je eigen merkkleuren direct in CSS binnen het `@theme` blok:

```css
/* In je hoofd CSS-bestand (style.css) */
@import "tailwindcss";

@theme {
  /* Definieer Thomas More merkkleuren */
  --color-tmk-orange: #e84e10;
  --color-tmk-orange-light: #ff753a;
  --color-tmk-blue: #009cab;
  --color-tmk-dark: #0f141c;
}
```

<div class="grid-2">
<div class="card">

#### Automatisch gegenereerde classes

- `bg-tmk-orange` en `text-tmk-blue`
- `border-tmk-orange/50` (met opacity)
- `hover:bg-tmk-orange-light`

</div>
<div class="card">

#### Dubbel voordeel

- Direct bruikbaar als Tailwind utilities
- Tevens runtime beschikbaar als native CSS variabelen: `var(--color-tmk-orange)`

</div>
</div>

---

## 7. Customisatie: Breakpoints Aanpassen

Pas bestaande schermbreekpunten aan of voeg nieuwe toe via `@theme`:

```css
@theme {
  /* 1. Bestaand breekpunt overschrijven (md was 768px -> wordt 800px) */
  --breakpoint-md: 800px;

  /* 2. Nieuw extra klein breekpunt toevoegen (xs: 480px) */
  --breakpoint-xs: 480px;

  /* 3. Nieuw ultra-breed breekpunt toevoegen (3xl: 1920px) */
  --breakpoint-3xl: 1920px;
}
```

```html
<!-- Gebruik je nieuwe en gewijzigde breekpunten in HTML -->
<div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 3xl:grid-cols-6 gap-4">
  <div class="p-4 bg-slate-800 rounded">Responsief item</div>
</div>
```

> **Tip:** Wil je alle standaard breakpoints wissen en vanaf nul beginnen? Gebruik `--breakpoint-*: initial;`.

---

## 7. Eigen Klassen Aanmaken: `@apply` vs `@utility`

Herhaal je vaak dezelfde combinatie van utilities? Maak een eigen herbruikbare klasse aan:

<div class="grid-2">
<div class="card">

#### Methode 1: `@apply` (Componenten)

Groepeert utilities in een traditionele klasse:

```css
.card-tmk {
  @apply bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl;
}

.btn-tmk {
  @apply bg-tmk-orange text-white px-5 py-2.5 rounded-lg font-bold hover:opacity-90 transition;
}
```

</div>
<div class="card">

#### Methode 2: `@utility` (Nieuw in v4)

Maakt een echte atomic utility die automatisch werkt met `hover:`, `dark:` en `md:`:

```css
@utility tab-active {
  background-color: var(--color-tmk-orange);
  color: #ffffff;
  font-weight: 700;
}
```

Gebruik: `<button class="hover:tab-active dark:tab-active">Tab</button>`

</div>
</div>

---

## 8. Praktijkvoorbeeld: Een Modern Card Component

Laten we alle concepten samenbrengen in een modern, responsief Thomas More cursus-kaartje met custom `@theme` kleuren:

```html
<article class="group relative flex flex-col justify-between overflow-hidden rounded-2xl
                bg-slate-900 border border-slate-800 p-6 shadow-xl
                hover:border-tmk-orange/50 hover:shadow-tmk-orange/10
                transition-all duration-300">
  <div>
    <div class="flex items-center justify-between">
      <span class="rounded-full bg-tmk-orange/10 px-3 py-1 text-xs font-semibold text-tmk-orange-light border border-tmk-orange/20">
        ITF Module
      </span>
      <span class="text-xs text-slate-500 font-mono">Semester 1</span>
    </div>
    
    <h3 class="mt-4 text-xl font-bold text-white group-hover:text-tmk-orange-light transition-colors">
      Web Development
    </h3>
    <p class="mt-2 text-sm text-slate-400 leading-relaxed">
      Leer moderne frontend ontwikkeling met Tailwind CSS v4, component architectuur en responsive interfaces.
    </p>
  </div>

  <a href="#" class="mt-6 inline-flex items-center justify-center rounded-lg bg-tmk-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition active:scale-95">
    Start Cursus →
  </a>
</article>
```

---

## 9. Wat is er Nieuw in Tailwind CSS v4? <span class="badge">Nieuwe Generatie</span>

Tailwind CSS v4.0 is een **volledige herarchitectuur** van het framework:

<div class="grid-2">
<div class="card">

#### De Belangrijkste Vernieuwingen

1. **Oxide Engine (Rust):** Extreem snelle builds (tot 100x sneller!)
2. **CSS-First Configuratie:** Geen `tailwind.config.js` meer nodig
3. **`@theme` Directive:** Thema rechtstreeks configureren in CSS

</div>
<div class="card">

#### Moderne Webstandaarden

1. **Automatische Content Detectie:** Geen paden meer opgeven
2. **Enkele Import:** `@import "tailwindcss";`
3. **Native CSS Features:** P3 kleuren, `@starting-style`, Container Queries

</div>
</div>

---

## 9. V4: De Nieuwe Oxide Engine

In Tailwind v3 was de compiler geschreven in JavaScript en draaide bovenop PostCSS.
In **Tailwind v4** is de core volledig herschreven in **Rust** met **Lightning CSS**:

```
[Tailwind v3 (JavaScript / PostCSS)] ---> Buildtijd: 300ms - 2000ms
[Tailwind v4 (Rust Oxide Engine)]    ---> Buildtijd: 3ms - 30ms (100x sneller!)
```

### Waarom maakt dit een enorm verschil?

- **Full Builds:** Tot **5x sneller** bij het starten van je ontwikkelserver.
- **Incrementele HMR (Hot Module Replacement):** Updates in **microseconden** tijdens het typen.
- **Geen zware PostCSS pipeline meer nodig:** Werkt direct via snelle bundler plugins (Vite, Next.js).

---

## 9. V4: CSS-First Configuratie met `@theme`

In Tailwind v3 moest je een complex JavaScript bestand `tailwind.config.js` onderhouden.
In **Tailwind v4** configureer je je hele design system direct in je CSS-bestand:

```css
/* style.css */
@import "tailwindcss";

@theme {
  /* Custom Merkkleuren definiëren */
  --color-tmk-orange: #e84e10;
  --color-tmk-dark: #0f141c;
  --color-tmk-blue: #009cab;

  /* Custom Typografie */
  --font-display: 'Outfit', sans-serif;
  --font-code: 'Fira Code', monospace;

  /* Custom Breakpoints toevoegen */
  --breakpoint-3xl: 1920px;
}
```

> **Magie van v4:** Deze CSS variabelen worden **automatisch classes** (`bg-tmk-orange`, `font-display`) én blijven runtime beschikbaar als standaard CSS custom properties (`var(--color-tmk-orange)`)!

---

## 9. V4: Automatische Content Detectie

In Tailwind v3 moest je handmatig elk bestandspad opgeven in `content: [...]`:

```javascript
// OUD (v3 tailwind.config.js) - NIET MEER NODIG!
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: { ... }
}
```

```css
/* NIEUW (v4 style.css) - Volledig Automatisch! */
@import "tailwindcss";
```

### Hoe werkt het in v4?

- De Oxide compiler scant automatisch je projectdirectory op zoek naar bronbestanden (`.html`, `.tsx`, `.vue`, `.php`, etc.).
- Negeert automatisch `node_modules` en `.git`.
- Nooit meer vergeten een nieuw pad of map toe te voegen!

---

## 9. V4: Moderne Web Platform Integraties

Tailwind CSS v4 omarmt de nieuwste CSS standaarden van de browser:

### 1. OKLCH & Wide-Gamut P3 Kleuren

- Kleuren worden berekend in de moderne **OKLCH kleurruimte** voor helderdere, levendigere tinten op moderne schermen (iPhone, Mac, OLED).

### 2. Ingebouwde Container Queries

- Geen externe `@tailwindcss/container-queries` plugin meer nodig:

  ```html
  <div class="@container">
    <div class="grid grid-cols-1 @md:grid-cols-2">...</div>
  </div>
  ```

### 3. Native `@starting-style` voor Enter Animaties

- Elementen vloeiend animeren wanneer ze in de DOM worden ingevoegd (modals, dropdowns).

---

## 9. Vergelijkingstabel: Tailwind v3 vs Tailwind v4

| Eigenschap | Tailwind CSS v3 | Tailwind CSS v4 |
| :--- | :--- | :--- |
| **Compiler Engine** | JavaScript + PostCSS | **Rust Oxide Engine + Lightning CSS** |
| **Build Snelheid** | Milliseconden tot seconden | **Microseconden (tot 100x sneller)** |
| **Configuratie** | `tailwind.config.js` | **CSS-First via `@theme` in CSS** |
| **Import Syntax** | `@tailwind base; @tailwind components; ...` | **`@import "tailwindcss";`** |
| **Content Detectie** | Handmatig configureren in JS array | **Automatisch gescand door compiler** |
| **Kleurruimte** | sRGB (Hex / RGB) | **OKLCH & Display P3 ondersteuning** |
| **Container Queries** | Vereiste aparte plugin | **Standaard ingebouwd** |

---

## 9. Eenvoudige Migratie via Upgrade Tool

Heb je een bestaand Tailwind v3 project en wil je upgraden naar v4?
Tailwind levert een officiële geautomatiseerde upgrade tool:

```bash
npx @tailwindcss/upgrade@next
```

### Wat doet deze migratietool automatisch?

1. Analyseert je bestaande `tailwind.config.js`.
2. Vertaalt al je custom kleuren, fonts en spacing naar `@theme` regels in je CSS-bestand.
3. Vervangt oude `@tailwind` directives door `@import "tailwindcss";`.
4. Updatet je `package.json` afhankelijkheden en bundler configuratie (Vite / Next.js).
5. Verwijdert overbodige PostCSS configuratiebestanden.

---

<!-- _class: lead -->

# Meesterschap in Tailwind CSS v4

<p class="subtitle">&lt;Faster Builds, Modern CSS & Instant Productivity /&gt;</p>

### Belangrijkste Takeaways voor Studenten

1. **Utility-First denken:** Bouw interfaces direct in HTML met herbruikbare tokens
2. **Mobile-First ontwerpen:** Gebruik `sm:`, `md:`, `lg:` voor responsive breakpoints
3. **State Modifiers:** Beheers `hover:`, `focus:`, `group-hover:` en `dark:`
4. **V4 Kracht:** Geniet van razendsnelle builds en CSS-first configuratie via `@theme`

<div class="meta-box" style="margin-top: 24px;">
  <strong>Volgende stap:</strong> Zelf een responsive dashboard bouwen met Tailwind v4!
</div>
