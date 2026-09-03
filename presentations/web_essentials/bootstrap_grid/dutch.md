---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Bootstrap 5.3 Grid'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bootstrap 5.3 Grid Systeem

<p class="subtitle">&lt;Responsive layouts bouwen met 12 kolommen /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Essentials | <strong>Module:</strong> Bootstrap Layout
</div>

---

## Inhoudsopgave

1. **Wat is Bootstrap?** - Introductie en doel
2. **De drie bouwstenen** - Container, Row, Kolommen
3. **Breakpoints** - Responsive breekpunten
4. **Containers** - Soorten containers
5. **Het 12-kolommenmodel** - Hoe verdeel je de pagina?
6. **Responsive klassen** - `col-sm-`, `col-md-`, `col-lg-`
7. **Auto-layout** - Automatische kolombreedte
8. **Kolommen nestelen** - Nesting
9. **Gutters** - Ruimte tussen kolommen
10. **Offset en Order** - Positionering en volgorde
11. **Praktisch voorbeeld** - Portfolio layout
12. **Veelgemaakte fouten** - Valkuilen vermijden

---

## Wat is Bootstrap 5.3?

Bootstrap is een **open-source CSS-framework** dat kant-en-klare stijlen en componenten aanbiedt voor responsieve webpagina's.

<div class="grid-2">
<div class="card card-accent">

#### Waarom Bootstrap?

- Geen CSS van nul schrijven
- Automatisch **responsive** (werkt op elke schermgrootte)
- Consistent en goed gedocumenteerd
- Enorm populair in de industrie

</div>
<div class="card card-cyan">

#### Hoe installeren via CDN?

```html
<!-- In je <head> -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```

Of via npm:
```bash
npm install bootstrap@5.3
```

</div>
</div>

---

## De drie bouwstenen

Het Bootstrap grid werkt altijd met **drie geneste elementen** in deze vaste volgorde:

<div class="card card-glass">

#### Hiërarchie van het Grid

- **`.container`** - Biedt marges en centreert de inhoud op de pagina
- **`.row`** - Wrapper voor kolommen; zorgt voor een negatieve margin om gutters te neutraliseren
- **`.col` of `.col-*`** - De eigenlijke kolommen die de inhoud bevatten (directe kinderen van `.row`)

</div>

```html
<div class="container">
  <div class="row">
    <div class="col">Kolom 1</div>
    <div class="col">Kolom 2</div>
    <div class="col">Kolom 3</div>
  </div>
</div>
```

> **Belangrijke regel:** Plaats nooit een `.col` rechtstreeks in een `.container`. Kolommen moeten altijd in een `.row` zitten!

---

## Breakpoints - Responsive breekpunten

Bootstrap 5.3 heeft **6 breakpoints** gebaseerd op minimale schermbreedtes:

| Naam | Prefix | Min. breedte | Typisch apparaat |
| :--- | :---: | :---: | :--- |
| Extra small | *(geen)* | < 576px | Kleine telefoons (portret) |
| **Small** | `sm` | 576px | Telefoons (landschap) |
| **Medium** | `md` | 768px | Tablets |
| **Large** | `lg` | 992px | Laptops / kleine desktops |
| **Extra large** | `xl` | 1200px | Desktops |
| **XXL** | `xxl` | 1400px | Grote breedbeeld monitors |

> **Mobile-first:** Bootstrap stijlen werken van klein naar groot. Een klasse zonder breakpoint geldt voor alle schermen; een klasse met prefix geldt vanaf dat breakpoint **en groter**.

---

## Containers

Containers zijn de buitenste wrapper van elke layout:

<div class="grid-3">
<div class="card card-accent">

#### `.container`

Vaste maximale breedte per breakpoint. Automatisch gecentreerd met zijmarges.

```html
<div class="container">
  ...
</div>
```

</div>
<div class="card card-cyan">

#### `.container-fluid`

Altijd 100% breed over de volledige breedte van de viewport.

```html
<div class="container-fluid">
  ...
</div>
```

</div>
<div class="card">

#### `.container-{bp}`

100% breed tot het opgegeven breakpoint, daarna een vaste breedte.

```html
<div class="container-md">
  ...
</div>
```

</div>
</div>

---

## Het 12-kolommenmodel

Een Bootstrap-rij is opgedeeld in **12 gelijke kolommen**. Je kiest zelf hoeveel kolommen elk element inneemt:

<div class="card card-glass">

#### Verdeling van 12 eenheden

- `col-12` = 12/12 = **100%** van de breedte (volledige rij)
- `col-6` + `col-6` = 6/12 + 6/12 = twee kolommen van **50%**
- `col-4` + `col-4` + `col-4` = drie kolommen van **33.3%**
- `col-8` + `col-4` = hoofdinhoud van **66.7%** + zijbalk van **33.3%**

</div>

> **Vuistregel:** De kolomnummers binnen een `.row` moeten optellen tot **12**. Als het totaal meer is dan 12, springen de volgende kolommen automatisch naar een nieuwe regel.

---

## Basis Grid Syntax

```html
<div class="container">
  <div class="row">

    <!-- 4 van de 12 kolommen = 33% breed -->
    <div class="col-4">Zijbalk</div>

    <!-- 8 van de 12 kolommen = 67% breed -->
    <div class="col-8">Hoofdinhoud</div>

  </div>
  <div class="row">

    <!-- Drie gelijke kolommen: 4 + 4 + 4 = 12 -->
    <div class="col-4">Projectkaart 1</div>
    <div class="col-4">Projectkaart 2</div>
    <div class="col-4">Projectkaart 3</div>

  </div>
</div>
```

---

## Responsive klassen

Combineer meerdere breakpoint-klassen om **verschillende layouts per schermgrootte** te definiëren:

```html
<!-- Telefoon: 100% breed | Tablet: 50% breed | Laptop: 33.3% breed -->
<div class="col-12 col-md-6 col-lg-4">
  Projectkaart
</div>
```

<div class="grid-3">
<div class="card card-accent">

#### Telefoon (`< 768px`)
`col-12`
- Neemt **100%** breedte in
- Kaarten stapelen onder elkaar

</div>
<div class="card card-cyan">

#### Tablet (`>= 768px`)
`col-md-6`
- Neemt **50%** breedte in
- 2 kaarten naast elkaar per rij

</div>
<div class="card">

#### Laptop (`>= 992px`)
`col-lg-4`
- Neemt **33.3%** breedte in
- 3 kaarten naast elkaar per rij

</div>
</div>

---

## Auto-layout kolommen

Gebruik `col` **zonder nummer** om kolommen automatisch gelijk te verdelen:

<div class="grid-2">
<div class="card card-accent">

#### Gelijke verdeling

```html
<div class="row">
  <div class="col">Kolom 1</div>
  <div class="col">Kolom 2</div>
  <div class="col">Kolom 3</div>
</div>
```

Elke `.col` krijgt automatisch exact **1/3** van de beschikbare breedte.

</div>
<div class="card card-cyan">

#### Vaste breedte + Auto

```html
<div class="row">
  <div class="col">Auto rest</div>
  <div class="col-6">Vast 50%</div>
  <div class="col">Auto rest</div>
</div>
```

De twee `.col` elementen verdelen de resterende 50% elk gelijk (25% elk).

</div>
</div>

> `col-auto` maakt de kolom zo breed als de **eigen inhoud** (`fit-content`).

---

## Kolommen nestelen (Nesting)

Je kunt een **nieuw grid starten binnen een kolom** door opnieuw een `.row` te plaatsen:

```html
<div class="container">
  <div class="row">

    <!-- Hoofdkolom: 8 van de 12 kolommen -->
    <div class="col-8">
      <h2>Hoofdsectie</h2>

      <!-- Binnenste rij: biedt opnieuw 12 kolommen binnen col-8 -->
      <div class="row">
        <div class="col-6">Binnenste linkerblok (50%)</div>
        <div class="col-6">Binnenste rechterblok (50%)</div>
      </div>
    </div>

    <!-- Zijbalk: 4 van de 12 kolommen -->
    <div class="col-4">Zijbalk</div>

  </div>
</div>
```

---

## Gutters - Ruimte tussen kolommen

Gutters regelen de **tussenruimte** (padding) tussen kolommen:

| Klasse | Toepassing |
| :--- | :--- |
| `g-0` t.e.m. `g-5` | Horizontale én verticale tussenruimte |
| `gx-0` t.e.m. `gx-5` | Alleen horizontale tussenruimte (links/rechts) |
| `gy-0` t.e.m. `gy-5` | Alleen verticale tussenruimte (boven/onder) |

```html
<!-- Grote horizontale gutter, compacte verticale gutter -->
<div class="row gx-4 gy-2">
  <div class="col-6">Kaart A</div>
  <div class="col-6">Kaart B</div>
  <div class="col-6">Kaart C</div>
  <div class="col-6">Kaart D</div>
</div>
```

> `g-0` verwijdert alle gutters (handig voor naadloze grid layouts zoals fotogalerijen).

---

## Offset - Kolommen verschuiven

Met `offset-{bp}-{n}` verschuif je een kolom naar rechts met behulp van lege kolomruimtes:

```html
<div class="row">
  <!-- Neemt 4 kolommen in, gecentreerd (4 leeg + 4 inhoud + 4 leeg = 12) -->
  <div class="col-4 offset-4">
    Gecentreerd blok
  </div>
</div>

<div class="row">
  <div class="col-md-4">Linkerblok</div>
  <!-- Slaat 4 kolommen over op tablet en groter -->
  <div class="col-md-4 offset-md-4">Rechterblok</div>
</div>
```

> Handig voor gecentreerde login formulieren, modals of verspringende portfolio elementen.

---

## Order - Visuele volgorde aanpassen

Met `order-{bp}-{n}` pas je de **visuele volgorde** aan zonder de HTML structuur te wijzigen:

```html
<div class="row">
  <!-- Mobiel: order-2 (onderaan) | Desktop: order-md-1 (links) -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>Over Mij</h2>
    <p>Op desktop staat deze tekst links van de foto.</p>
  </div>

  <!-- Mobiel: order-1 (bovenaan) | Desktop: order-md-2 (rechts) -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="profielfoto.webp" alt="Profielfoto">
  </div>
</div>
```

> Ideaal voor **mobile-first design**: toon op mobiel eerst de foto en daaronder de tekst, terwijl op desktop de tekst links staat.

---

## Praktijkvoorbeeld: Portfolio Layout

```html
<div class="container">

  <!-- Navigatie: volledige breedte -->
  <div class="row">
    <div class="col-12"><nav>Portfolio van Jef</nav></div>
  </div>

  <!-- Hoofdsectie + Zijbalk -->
  <div class="row gy-4">
    <!-- Mobiel: 100% | Desktop: 8 kolommen -->
    <div class="col-12 col-lg-8">
      <h2>Mijn Projecten</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">Project 1</div>
        <div class="col-12 col-md-6 col-xl-4">Project 2</div>
        <div class="col-12 col-md-6 col-xl-4">Project 3</div>
      </div>
    </div>

    <!-- Mobiel: 100% | Desktop: 4 kolommen -->
    <div class="col-12 col-lg-4">
      <aside>Over mij & Contact</aside>
    </div>
  </div>

</div>
```

---

## Veelgemaakte fouten

<div class="grid-2">
<div class="card card-accent">

#### Valkuilen

- `.col` rechtstreeks in `.container` (zonder `.row`)
- Vergeten dat klassen **opwaarts** overerven (`col-md-6` geldt ook voor `lg`, `xl` en `xxl`)
- Kolommen binnen een rij die onbedoeld niet optellen tot 12
- Direct marges toevoegen aan `.row` waardoor uitlijning breekt

</div>
<div class="card card-cyan">

#### Correcte structuur

```html
<!-- JUIST: container -> row -> col -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">...</div>
    <div class="col-12 col-md-6">...</div>
  </div>
</div>
```

</div>
</div>

> **Tip:** Gebruik de **Browser DevTools** (F12) om het flexbox grid en de berekende kolombreedtes visueel te inspecteren.

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Samenvatting

<p class="subtitle">&lt;Bootstrap 5.3 Grid - Kernpunten /&gt;</p>

<div class="meta-box">
  - <strong>Hiërarchie:</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 kolommen:</strong> verdeel altijd 12 eenheden per rij<br>
  - <strong>Mobile-first:</strong> ontwerp van klein (<code>col-12</code>) naar groot (<code>col-lg-4</code>)<br>
  - <strong>Utilities:</strong> <code>g-*</code> (gutters), <code>offset-*</code> (verschuiving), <code>order-*</code> (volgorde)
</div>