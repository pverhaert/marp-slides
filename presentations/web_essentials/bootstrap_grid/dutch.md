---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Bootstrap 5.3.8 Grid'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bootstrap 5.3.8 Grid Systeem

<p class="subtitle">&lt;Responsive layouts bouwen met 12 kolommen /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Essentials | <strong>Module:</strong> Bootstrap Layout
</div>

---

## Inhoudsopgave

1. **Wat is Bootstrap 5.3.8?** - Introductie en modulaire setup
2. **Waarom Reboot?** - CSS normalisatie en box-sizing
3. **Verschil .css vs .min.css** - Development versus productie
4. **De drie bouwstenen** - Container, Row, Kolommen
5. **Breakpoints** - Responsive breekpunten
6. **Containers** - Soorten containers
7. **Het 12-kolommenmodel** - Hoe verdeel je de pagina?
8. **Responsive klassen** - `col-sm-`, `col-md-`, `col-lg-`
9. **Auto-layout** - Automatische kolombreedte
10. **Kolommen nestelen** - Nesting
11. **Gutters** - Ruimte tussen kolommen
12. **Offset en Order** - Positionering en volgorde
13. **Praktisch voorbeeld & valkuilen** - Portfolio layout en best practices

---

## Wat is Bootstrap 5.3.8?

Bootstrap is een populair **open-source CSS-framework** voor het bouwen van responsieve, mobile-first webpagina's.

<div class="grid-2">
<div class="card card-accent">

#### Waarom Bootstrap in Web Essentials?

- Geen complex grid of media queries van nul af aan opbouwen
- Volledig **responsive** en betrouwbaar op elk schermformaat
- Industriestandaard voor snelle en gestructureerde layouts
- **Semester 1:** We focussen **alleen** op layout en het 12-kolommen grid
- **Semester 2:** UI-componenten (modals, navbar, alerts, buttons) volgen pas later

</div>
<div class="card card-cyan">

#### Modulaire CDN installatie (v5.3.8)

Laad **alleen** reboot en grid in je `<head>`:

```html
<!-- 1. Reset en normalisatie basis -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-reboot.min.css">

<!-- 2. Het 12-kolommen flexbox gridsysteem -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-grid.min.css">
```

> **Belangrijk:** Laad in Semester 1 **niet** de volledige `bootstrap.min.css`. Deelbestanden houden je code licht en didactisch zuiver!

</div>
</div>

---

## Waarom `bootstrap-reboot` toevoegen?

Elke browser (Chrome, Firefox, Safari, Edge) hanteert eigen standaardwaarden voor marges, lettergroottes en afmetingen. **Reboot** trekt één universele startlijn.

<div class="grid-2">
<div class="card card-accent">

#### Wat is en doet Reboot?

- Geëvolueerde **CSS reset** (bovenop Normalize.css)
- Verwijdert inconsistente browser-afwijkingen (*user-agent styles*)
- Biedt een stabiel, voorspelbaar fundament voor het grid
- **Typografie baseline:** `line-height: 1.5` en moderne systeemfonts
- **Element resets:** `table` (`border-collapse`), formulieren en links genormaliseerd

</div>
<div class="card card-cyan">

#### Cruciaal voor het Grid

- **`box-sizing: border-box`** op álle elementen:
  - Padding en border tellen mee **binnen** de berekende breedte
  - Essentieel zodat grid kolommen niet verspringen of overvloeien!
- **Consistente marges:**
  - `margin-top: 0` op `h1`-`h6`, `p` en lijsten voorkomt onverwachte *margin-collapsing*
  - Voorspelbare `margin-bottom` opgebouwd met `rem` eenheden

</div>
</div>

---

## Verschil: `xxx.css` versus `xxx.min.css`

Bootstrap levert twee varianten van elk stylesheet. Beide bevatten **exact dezelfde CSS-regels**, maar verschillen in formaat en bestandsgrootte:

<div class="grid-2">
<div class="card">

#### `xxx.css` (Development versie)

- **Leesbaar geformatteerd:** met spaties, tabs, regeleinden en commentaar
- **Doel:** Bestuderen hoe Bootstrap stijlen opbouwt en lokaal debuggen
- **Nadeel:** Veel groter bestand (extra netwerk overhead)

```css
/* Voorbeeld in bootstrap-grid.css */
.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}
```

</div>
<div class="card card-accent">

#### `xxx.min.css` (Productie versie)

- **Geminificeerd:** Alle spaties, enters en commentaren zijn gestript
- **Doel:** Productie en live websites (zoals via CDN)
- **Voordeel:** **60% tot 80% kleiner** in bestandsgrootte

```css
/* Zelfde code in bootstrap-grid.min.css */
.row-cols-auto>*{flex:0 0 auto;width:auto;}
```

> **Conclusie:** Gebruik in HTML projecten altijd de `.min.css` variant voor snellere laadtijden en optimale performance!

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

Bootstrap 5.3.8 heeft **6 breakpoints** gebaseerd op minimale schermbreedtes:

<div class="grid-2">
<div>

| Naam | Prefix | Min. breedte | Typisch apparaat |
| :--- | :---: | :---: | :--- |
| Extra small | *(geen)* | < 576px | Kleine telefoons (portret) |
| **Small** | `sm` | 576px | Telefoons (landschap) |
| **Medium** | `md` | 768px | Tablets |
| **Large** | `lg` | 992px | Laptops / kleine desktops |
| **Extra large** | `xl` | 1200px | Desktops |
| **XXL** | `xxl` | 1400px | Grote breedbeeld monitors |

</div>
<div>

> **Mobile-first:**
>
> - Bootstrap stijlen werken van klein naar groot.
> - Een klasse zonder breakpoint geldt voor alle schermen.
> - Een klasse met prefix geldt vanaf dat breakpoint **en groter**.

</div>
</div>

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

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- 4 van 12 = 33% breed -->
    <div class="col-4">Zijbalk</div>

    <!-- 8 van 12 = 67% breed -->
    <div class="col-8">Hoofdinhoud</div>

  </div>
  <div class="row">

    <!-- 3 gelijke kolommen: 4+4+4 -->
    <div class="col-4">Projectkaart 1</div>
    <div class="col-4">Projectkaart 2</div>
    <div class="col-4">Projectkaart 3</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
<span class="badge" style="font-size: 0.72rem; padding: 2px 8px;">.container</span>
<span style="font-size: 0.72rem; color: #8b949e;">gecentreerd met padding</span>
</div>
<!-- Rij 1: 4 + 8 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; margin-bottom: 10px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(totaal: 12 kolommen)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">Zijbalk (33%)</div>
</div>
<div style="flex: 8; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.8rem;">.col-8</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">Hoofdinhoud (67%)</div>
</div>
</div>
</div>
<!-- Rij 2: 4 + 4 + 4 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Kaart 1</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Kaart 2</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Kaart 3</div>
</div>
</div>
</div>
</div>

</div>
</div>

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

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(232, 78, 16, 0.4); display: flex; flex-direction: column; gap: 4px;">
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">Kaart 1 (100%)</div>
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">Kaart 2 (100%)</div>
</div>

</div>
<div class="card card-cyan">

#### Tablet (`>= 768px`)

`col-md-6`

- Neemt **50%** breedte in
- 2 kaarten naast elkaar per rij

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(0, 156, 171, 0.4); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">K1 (50%)</div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">K2 (50%)</div>
</div>

</div>
<div class="card">

#### Laptop (`>= 992px`)

`col-lg-4`

- Neemt **33.3%** breedte in
- 3 kaarten naast elkaar per rij

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(230, 237, 243, 0.25); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">K1 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">K2 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">K3 (33%)</div>
</div>

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

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
</div>

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

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
  <div style="flex: 2; background: rgba(232, 78, 16, 0.25); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col-6</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">50%</div>
  </div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
</div>

</div>
</div>

> `col-auto` maakt de kolom zo breed als de **eigen inhoud** (`fit-content`). Zie de volgende slide voor een vergelijking!

---

## Verschil: `.col` versus `.col-auto`

Hoe bepalen automatische kolommen hun breedte binnen een `.row`?

<div class="grid-2">
<div>

<div class="card card-accent" style="margin-bottom: 12px; padding: 12px;">

#### `.col` &rarr; Ruimteverdeler

- Neemt alle **beschikbare restruimte** in (`flex-grow: 1`)
- Meerdere `.col` elementen verdelen de overgebleven ruimte **gelijk**, ongeacht de tekstlengte

</div>

<div class="card card-cyan" style="padding: 12px;">

#### `.col-auto` &rarr; Inhoudsvolger

- Wordt exact zo breed als de **eigen inhoud** (`fit-content`, `flex: 0 0 auto`)
- Ideaal voor compacte elementen zoals badges, knoppen, avatars of icoontjes

</div>

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<!-- Voorbeeld 1: .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-accent-light); margin-bottom: 6px; font-family: var(--font-code);">Met .col (verdelen altijd gelijk):</div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">Kort (50%)</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">Lange tekst (50%)</div>
    </div>
  </div>
</div>

<!-- Voorbeeld 2: .col-auto gecombineerd met .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Praktijk: .col-auto + .col + .col-auto:</div>
  <div style="display: flex; gap: 6px; align-items: center;">
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">[ Badge ]</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col (restruimte)</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">Artikel beschrijving...</div>
    </div>
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">&lt;Knop&gt;</div>
    </div>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <strong>Gouden combinatie:</strong> Gebruik <code>.col-auto</code> voor elementen met een vaste inhoudsbreedte en <code>.col</code> om de rest van de rij flexibel op te vullen.
</div>

</div>
</div>

---

## Kolommen nestelen (Nesting)

Je kunt een **nieuw grid starten binnen een kolom** door opnieuw een `.row` te plaatsen:

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- Hoofdkolom: 8 van 12 -->
    <div class="col-8">
      <h2>Hoofdsectie</h2>

      <!-- Binnenste rij: opnieuw 12! -->
      <div class="row">
        <div class="col-6">Links (50%)</div>
        <div class="col-6">Rechts (50%)</div>
      </div>
    </div>

    <!-- Zijbalk: 4 van 12 -->
    <div class="col-4">Zijbalk</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(0, 156, 171, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">Buitenste .row &nbsp;<span style="color: #8b949e;">(totaal 12 kolommen)</span></div>
<div style="display: flex; gap: 8px;">
<!-- Hoofdkolom col-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.9); border: 2px solid var(--color-accent); border-radius: 6px; padding: 8px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
<span style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-8 (Hoofdsectie)</span>
<span style="font-size: 0.65rem; color: #8b949e;">67% buitenste rij</span>
</div>
<!-- Binnenste row -->
<div style="border: 1px dashed rgba(0, 156, 171, 0.6); border-radius: 4px; padding: 6px; background: rgba(15, 20, 28, 0.7);">
<div style="font-size: 0.68rem; color: var(--color-secondary); margin-bottom: 4px; font-family: var(--font-code);">Binnenste .row &nbsp;<span style="color: #8b949e;">(opnieuw 12 eenheden!)</span></div>
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% van col-8</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% van col-8</div>
</div>
</div>
</div>
</div>
<!-- Zijbalk col-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 4px;">Zijbalk</div>
<div style="font-size: 0.65rem; color: #8b949e; margin-top: 2px;">33% buitenste rij</div>
</div>
</div>
</div>
</div>

<div style="font-size: 0.7rem; color: #8b949e; margin-top: 4px; line-height: 1.4;">
<strong>Kerninzicht:</strong> Een geneste <code>.row</code> herdefinieert de 12 kolommen binnen zijn directe ouder (<code>.col-8</code>).
</div>

</div>
</div>

---

## Gutters - Ruimte tussen kolommen

Gutters regelen de **tussenruimte** (padding) tussen kolommen:

<div class="grid-2">
<div>

| Klasse | Toepassing |
| :--- | :--- |
| `g-0` t.e.m. `g-5` | Horizontale én verticale tussenruimte |
| `gx-0` t.e.m. `gx-5` | Alleen horizontaal (X-as) |
| `gy-0` t.e.m. `gy-5` | Alleen verticaal (Y-as) |

```html
<!-- gx-4: brede X-ruimte | gy-2: compacte Y-ruimte -->
<div class="row gx-4 gy-2">
  <div class="col-6">Kaart A</div>
  <div class="col-6">Kaart B</div>
  <div class="col-6">Kaart C</div>
  <div class="col-6">Kaart D</div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px;">

<div style="border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">Visueel: .row.gx-4.gy-2</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; row-gap: 8px;">
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Kaart A</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Kaart B</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Kaart C</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Kaart D</span>
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.66rem;">
    <span style="color: var(--color-secondary); font-family: var(--font-code);">&harr; gx-4 (kolomafstand)</span>
    <span style="color: var(--color-accent-light); font-family: var(--font-code);">&varr; gy-2 (rij-afstand)</span>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <code>g-0</code> verwijdert alle gutters (ideaal voor naadloze fotogrid layouts).
</div>

</div>
</div>

---

## Offset - Kolommen verschuiven

Met `offset-{bp}-{n}` verschuif je een kolom naar rechts met behulp van lege kolomruimtes:

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- Gecentreerd: 4 leeg + 4 + 4 leeg = 12 -->
  <div class="col-4 offset-4">
    Gecentreerd blok
  </div>
</div>

<div class="row">
  <div class="col-md-4">Linkerblok</div>
  <!-- Slaat 4 kolommen over -->
  <div class="col-md-4 offset-md-4">Rechterblok</div>
</div>
```

> Handig voor login formulieren of verspringende portfolio elementen.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Rij 1: col-4 offset-4 &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 leeg</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Gecentreerd</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">(rest: 4)</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 leeg</div>
    </div>
  </div>
</div>

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Rij 2: col-md-4 + offset-md-4</div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Links</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-md-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 overgeslagen</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Rechts</div>
    </div>
  </div>
</div>

</div>
</div>

---

## Order - Visuele volgorde aanpassen

Met `order-{bp}-{n}` pas je de **visuele volgorde** aan zonder de HTML structuur te wijzigen:

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- Mobiel: onderaan | Desktop: links -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>Over Mij</h2>
    <p>Tekst links van foto.</p>
  </div>

  <!-- Mobiel: bovenaan | Desktop: rechts -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="foto.webp" alt="Foto">
  </div>
</div>
```

> Ideaal voor **mobile-first**: toon op mobiel eerst de foto en daaronder de tekst, terwijl op desktop de tekst links staat.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 1px solid rgba(232, 78, 16, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">Mobiel (&lt; 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">Visueel gestapeld</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div style="background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-1: Foto (bovenaan)</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-2: Tekst 'Over Mij' (onderaan)</span>
    </div>
  </div>
</div>

<div style="border: 1px solid rgba(0, 156, 171, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge badge-cyan" style="font-size: 0.68rem; padding: 1px 6px;">Desktop (&gt;= 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">Naast elkaar</span>
  </div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 8; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-md-1: Tekst (8 kol.)</span>
    </div>
    <div style="flex: 4; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-md-2: Foto (4 kol.)</span>
    </div>
  </div>
</div>

</div>
</div>

---

## Praktijkvoorbeeld: Portfolio Layout

<div class="grid-2">
<div>

```html
<div class="container">
  <!-- Navigatie: 100% -->
  <div class="row">
    <div class="col-12"><nav>Portfolio</nav></div>
  </div>

  <!-- Hoofdsectie + Zijbalk -->
  <div class="row gy-4">
    <div class="col-12 col-lg-8">
      <h2>Projecten</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">P1</div>
        <div class="col-12 col-md-6 col-xl-4">P2</div>
        <div class="col-12 col-md-6 col-xl-4">P3</div>
      </div>
    </div>

    <div class="col-12 col-lg-4">
      <aside>Over mij & Contact</aside>
    </div>
  </div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
<span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">.container</span>
<span style="font-size: 0.65rem; color: #8b949e;">Desktop wireframe preview</span>
</div>
<!-- Navigatie -->
<div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 5px 8px; margin-bottom: 8px; font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">
.col-12: &lt;nav&gt; Portfolio
</div>
<!-- Body row -->
<div style="display: flex; gap: 8px;">
<!-- Projecten col-lg-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.8); border: 1px solid var(--color-secondary); border-radius: 6px; padding: 8px;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-secondary); font-family: var(--font-code); margin-bottom: 6px;">
.col-12.col-lg-8 (Projecten)
</div>
<!-- Nested project cards -->
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P1</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P2</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P3</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
</div>
</div>
<!-- Aside col-lg-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">.col-12.col-lg-4</div>
<div style="font-size: 0.68rem; color: var(--color-foreground); margin-top: 4px;">Over mij & Contact</div>
</div>
</div>
</div>

</div>
</div>

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

<p class="subtitle">&lt;Bootstrap 5.3.8 Grid - Kernpunten /&gt;</p>

<div class="meta-box">
  - <strong>Hiërarchie:</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 kolommen:</strong> verdeel altijd 12 eenheden per rij<br>
  - <strong>Mobile-first:</strong> ontwerp van klein (<code>col-12</code>) naar groot (<code>col-lg-4</code>)<br>
  - <strong>Utilities:</strong> <code>g-*</code> (gutters), <code>offset-*</code> (verschuiving), <code>order-*</code> (volgorde)
</div>
