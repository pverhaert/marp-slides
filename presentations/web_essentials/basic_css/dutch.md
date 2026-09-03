---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - CSS3'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->

# CSS3 Essentials

<p class="subtitle">&lt;Styling, Layout & Animations /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Essentials | <strong>Thema:</strong> CSS3 Complete Samenvatting
</div>

---

## Inhoudsopgave

1. **Inleiding, Syntaxis & Selectoren** - Cascade, specificiteit & inheritance
2. **Typografie & Kleuren** - Web fonts, kleurmodellen & interactieve pseudo-classes
3. **Het Box Model & Borders** - Content, padding, border, margin & `box-sizing`
4. **Display, Lijsten & Tabellen** - Block vs inline, navigatiestyling & zebra tables
5. **Achtergronden & Afbeeldingen** - Gradients, covers, `object-fit` & filters
6. **Layout: Float, Positionering & Media Queries** - RWD, fixed/sticky & z-index
7. **Moderne Layout: Flexbox & Grid** - 1D flex containers & 12-kolommen grids
8. **Transformaties, Transitions & Animaties** - 2D/3D effecten & keyframes

---

## 1. Inleiding tot CSS3

### Wat is CSS?

- **Cascading Style Sheets**: de standaard stijltaal voor het web
- Scheidt **inhoud en structuur (HTML)** van de **visuele vormgeving (CSS)**
- Zorgt voor een **uniforme huisstijl** over de gehele website

### Waar schrijven we CSS?

1. **Extern CSS-bestand** (`<link rel="stylesheet" href="style.css">`) - *Best practice!*
2. **Embedded CSS** (binnen `<style>` tags in de `<head>`)
3. **Inline CSS** (via het `style="..."` attribuut) - *Vermijd dit!*

> ️ **W3C Validatie:** Controleer je stylesheets altijd via de officiële [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).

---

## 1. CSS Syntaxis: De Style Rule

Een CSS-regel bestaat uit een **selector** en een **declaratieblok**:

```css
/* Selector { Eigenschap: Waarde; } */
h2 {
  color: #e84e10;
  background-color: #181f2a;
  margin-left: 20px;
  font-family: 'Outfit', sans-serif;
}
```

<div class="grid-2">
<div class="card">

#### Onderdelen van een Regel

- **Selector:** Bepaalt welk HTML-element gestyled wordt
- **Declaration:** Eigenschap + waarde paar afgesloten met `;`

</div>
<div class="card">

#### Notatieregels

- Waarden met spaties tussen dubbele aanhalingstekens: `"Times New Roman"`
- Meerdere selectors groeperen met een komma: `h1, h2, h3`

</div>
</div>

---

## 1. De 5 Basis Selectoren

| Type Selector | HTML Voorbeeld | CSS Notatie | Beschrijving |
| :--- | :--- | :--- | :--- |
| **Tag selector** | `<p>Tekst</p>` | `p { color: white; }` | Selecteert alle tags van dit type |
| **Class selector** | `<p class="intro">` | `.intro { font-weight: bold; }` | Herbruikbare styling op meerdere elementen |
| **ID selector** | `<header id="main">` | `#main { background: #000; }` | Uniek element op de pagina |
| **Pseudo-class** | `<a href="...">` | `a:hover { color: #ff753a; }` | Reageert op gebruikersinteractie of status |
| **Attribute selector** | `<a target="_blank">` | `a[target="_blank"] { ... }` | Selecteert op basis van HTML-attributen |

```css
/* Combinaties */
article.highlight { ... } /* Enkel article met class highlight */
article .highlight { ... } /* Elementen met class highlight BINNEN article (afstammeling) */
```

---

## 1. Cascade, Prioriteit & Specificiteit

Wanneer meerdere regels hetzelfde element stylen, bepaalt de **cascade** welke regel wint:

### Prioriteitsvolgorde (Hoog naar Laag)

1. **Webdesigner Inline CSS** (`style="..."`)
2. **Webdesigner Embedded CSS** (`<style>`)
3. **Webdesigner Extern CSS** (`style.css`)
4. **Gebruikersinstellingen browser**
5. **Standaard browser stylesheet**

### Gelijke prioriteit?

- De **laatst gedefinieerde regel** in de CSS overschrijft eerdere regels.
- Meer specifieke selectors (zoals `#id`) winnen van algemene tags (`p`).
- **`!important`:** Forceert absolute prioriteit (gebruik enkel als uiterste noodoplossing!).

---

## 1. CSS Inheritance (Overerving)

Elementen erven stijlen over van hun **ouder-elementen** via de DOM-boom:

```css
body {
  font-family: 'Outfit', sans-serif;
  color: #e6edf3;
  line-height: 1.6;
}
/* Alle p, h1, li, span erven automatisch deze font-family en tekstkleur! */
```

<div class="grid-2">
<div class="card">

#### Wel overgeërfd (Inherited)

- Typografie: `font-family`, `font-size`, `font-weight`, `line-height`
- Tekstkleur: `color`, `letter-spacing`, `text-align`
- Lijsten: `list-style-type`

</div>
<div class="card">

#### Niet overgeërfd (Non-inherited)

- Box model: `margin`, `padding`, `border`, `width`, `height`
- Achtergrond: `background-color`, `background-image`
- Positionering: `position`, `display`, `top`, `left`

</div>
</div>

---

## 2. Typografie & Web Safe Fonts

Standaard beschikken browsers over een beperkt aantal **Web Safe Fonts**:

```css
/* Altijd fallbacks opgeven eindigend met een generieke familie */
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
p {
  font-family: Georgia, 'Times New Roman', serif;
}
code {
  font-family: 'Fira Code', Consolas, Monaco, monospace;
}
```

### Generieke Font Families

- `sans-serif`: Moderne, schreefloze letters (Arial, Roboto, Outfit)
- `serif`: Traditionele letters met schreven/dwarsstreepjes (Times, Georgia)
- `monospace`: Vaste tekenbreedte voor code (Fira Code, Courier)
- `cursive` & `fantasy`: Decoratieve lettertypes

---

## 2. Externe Fonts: Google Fonts & `@font-face`

### Methode 1: Google Fonts (`@import` of `<link>`)

```css
/* Bovenaan in je externe CSS-bestand */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

body {
  font-family: 'Outfit', sans-serif;
}
```

### Methode 2: Zelf gehoste lettertypes via `@font-face`

```css
@font-face {
  font-family: 'ThomasMoreCustom';
  src: url('fonts/custom-font.woff2') format('woff2'),
       url('fonts/custom-font.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}
```

---

## 2. Belangrijke Teksteigenschappen

```css
.artikel-tekst {
  font-size: 1.125rem;          /* 18px via relatieve eenheden */
  font-weight: 600;             /* Dikte: 100 t/m 900 of normal/bold */
  font-style: italic;           /* normal | italic | oblique */
  line-height: 1.6;             /* Regelafstand (relatief zonder eenheid!) */
  text-align: justify;          /* left | right | center | justify */
  text-decoration: none;        /* none | underline | line-through */
  text-transform: uppercase;    /* uppercase | lowercase | capitalize */
  letter-spacing: 0.05em;       /* Spatiëring tussen letters */
}
```

> **Tip voor toegankelijkheid:** Gebruik bij voorkeur relatieve eenheden (`rem` of `em`) voor `font-size`, zodat de tekst meeschaalt met de browserinstellingen van de gebruiker!

---

## 2. Eenheden: PX vs EM vs REM <span class="badge">Aanbevolen</span>

| Eenheid | Type | Basisreferentie | Gedrag bij geneste elementen |
| :--- | :--- | :--- | :--- |
| **`px` (Pixel)** | Absoluut | Vaste schermpixels | Schaalt **niet** mee met browser lettergrootte |
| **`em`** | Relatief | `font-size` van **directe ouder** | **Compounding:** lettergrootte vermenigvuldigt per niveau |
| **`rem` (Root EM)** | Relatief | `font-size` van het **root (`<html>`) element** | **Consistent & voorspelbaar** overal in de DOM |

### Waarom heeft `rem` de absolute voorkeur?

1. **Toegankelijkheid:** Als een slechtziende gebruiker de standaard lettergrootte in de browser vergroot (bv. naar `24px`), schaalt de hele site automatisch perfect mee.
2. **Geen compounding bug:** Met `em` wordt `1.2em` in een geneste lijst steeds groter (`16px -> 19.2px -> 23px`). Met `rem` blijft `1.2rem` overal exact `1.2 * root`.

```css
html { font-size: 16px; }      /* Standaard root: 1rem = 16px */
h1   { font-size: 2.25rem; }   /* 2.25 * 16px = 36px (voorspelbaar & responsive) */
p    { font-size: 1rem; }      /* 1 * 16px = 16px */
```

---

## 2. Kleurennotaties in CSS3

| Model | Voorbeeld | Beschrijving |
| :--- | :--- | :--- |
| **Kleur Naam** | `color: orange;` | 140 standaard benoemde kleuren |
| **HEX (Hexadecimaal)** | `color: #e84e10;` | 6 tekens (RRGGBB) van `00` tot `FF` |
| **RGB** | `color: rgb(232, 78, 16);` | Rood, Groen, Blauw waarden van `0` tot `255` |
| **RGBA (met Alpha)** | `color: rgba(232, 78, 16, 0.8);` | Met transparantiekanaal (`0.0` tot `1.0`) |
| **HSL / HSLA** | `color: hsl(17, 88%, 49%);` | Tint (0-360°), Verzadiging (%), Helderheid (%) |

### `opacity` vs `rgba()`

- `opacity: 0.5;` maakt het **volledige element én alle inhoud/tekst** semi-transparant.
- `background-color: rgba(...);` maakt **enkel de achtergrond** transparant, terwijl tekst 100% leesbaar blijft!

---

## 2. Interactieve Pseudo-classes voor Links

Voor hyperlinks hanteren we de **LVHA-volgorde** (Lord Vader Handles All):

```css
/* 1. Ongelinkte status */
a:link {
  color: #009cab;
  text-decoration: none;
}
/* 2. Reeds bezochte link */
a:visited {
  color: #8b949e;
}
/* 3. Muis eroverheen bewegen */
a:hover {
  color: #ff753a;
  text-decoration: underline;
}
/* 4. Actief aangeklikt op het moment zelf */
a:active {
  color: #e84e10;
}
```

---

## 3. Het CSS Box Model

Elk element op een webpagina wordt voorgesteld als een rechthoekige doos met **4 lagen**:

<div class="card" style="text-align: center; padding: 18px; border: 2px dashed var(--color-accent);">
  <div style="background: rgba(232, 78, 16, 0.2); padding: 14px; border: 1px solid var(--color-accent); border-radius: 4px;">
    <strong>MARGIN</strong> (Buitenste marge - transparant)
    <div style="background: rgba(0, 156, 171, 0.25); padding: 12px; margin: 10px; border: 2px solid var(--color-secondary); border-radius: 4px;">
      <strong>BORDER</strong> (Rand rondom de padding)
      <div style="background: rgba(24, 31, 42, 0.9); padding: 12px; margin: 10px; border: 1px solid var(--color-border); border-radius: 4px;">
        <strong>PADDING</strong> (Binnenruimte tussen content en border)
        <div style="background: #e84e10; color: #fff; padding: 10px; margin: 10px; font-weight: bold; border-radius: 4px;">
          CONTENT (Tekst, afbeeldingen, video)
        </div>
      </div>
    </div>
  </div>
</div>

---

## 3. `box-sizing: border-box`

Standaard berekent CSS de breedte via `content-box` (breedte = content + padding + border).
Dit zorgt voor onverwachte layout-verspringingen!

```css
/* De Universele Best-Practice Reset */
*, *::before, *::after {
  box-sizing: border-box;
}
```

<div class="grid-2">
<div class="card">

#### `content-box` (Standaard)

- `width: 300px` + `padding: 20px` + `border: 5px`
- Totale breedte op scherm = **350px**!

</div>
<div class="card">

#### `border-box` (Aanbevolen)

- `width: 300px` inclusief padding en border
- Totale breedte op scherm blijft **exact 300px**!

</div>
</div>

---

## 3. Margin & Padding Shorthands

De klokgewijze volgorde: **Top - Right - Bottom - Left (TRBL)**

```css
/* 4 waarden: Top, Right, Bottom, Left */
margin: 10px 20px 15px 5px;

/* 2 waarden: [Top & Bottom] [Left & Right] */
padding: 15px 30px;

/* 1 waarde: rondom aan alle 4 zijden */
margin: 20px;

/* Horizontaal centreren van een block-element met vaste breedte */
.container {
  width: 960px;
  margin: 0 auto; /* Top/Bottom: 0, Links/Rechts: automatisch gecentreerd */
}
```

> ️ **Margin Collapsing:** Verticale marges tussen opeenvolgende blokken tellen niet bij elkaar op, maar smelten samen tot de hoogste van de twee marges.

---

## 3. Borders, Radius & Box Shadow

```css
.card-box {
  /* Border shorthand: breedte, stijl, kleur */
  border: 2px solid #2c3647;
  border-left: 6px solid #e84e10; /* Specifieke zijde overschrijven */

  /* Afgeronde hoeken */
  border-radius: 8px;           /* Alle hoeken */
  /* border-radius: 50%; -> Maakt van een vierkante foto een perfecte cirkel! */

  /* Schaduweffect: [X-offset] [Y-offset] [Blur] [Spread] [Kleur] */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
```

### Outline vs Border

- `border` neemt fysieke ruimte in binnen het box model.
- `outline` zweeft rondom het element zonder de layout te verschuiven (onmisbaar voor `:focus` toetsenbordnavigatie).

---

## 4. De `display` Eigenschap

Bepaalt hoe een element zich gedraagt in de documentstroom:

```css
.block-el   { display: block; }        /* <div>, <p>, <h1> */
.inline-el  { display: inline; }       /* <span>, <a>, <strong> */
.hybrid-el  { display: inline-block; }  /* Knoppen, badges */
.hidden-el  { display: none; }          /* Volledig onzichtbaar */
```

| Eigenschap | `block` | `inline` | `inline-block` |
| :--- | :---: | :---: | :---: |
| **Begint op nieuwe regel?** | Ja | Nee | Nee |
| **Breedte & Hoogte instelbaar?** | Ja | Nee | Ja |
| **Neemt standaard breedte in:** | 100% van ouder | Enkel inhoud | Enkel inhoud |
| **Margin & Padding rondom:** | Volledig actief | Enkel links/rechts | Volledig actief |

---

## 4. `display: none` vs `visibility: hidden`

<div class="grid-2">
<div class="card">

#### `display: none;`

- Verwijdert het element **volledig** uit de documentstroom
- Andere elementen schuiven op en nemen de vrijgekomen plaats in
- Niet zichtbaar en neemt **0 pixels** ruimte in

```css
.verberg-volledig {
  display: none;
}
```

</div>
<div class="card">

#### `visibility: hidden;`

- Maakt het element **onzichtbaar**
- Het element **behoudt zijn oorspronkelijke afmetingen en witruimte**
- Werkt als een lege onzichtbare plekhouder

```css
.onzichtbare-plaats {
  visibility: hidden;
}
```

</div>
</div>

---

## 4. Lijsten Stylen & Navigatiebalken

Lijsten (`<ul>`, `<ol>`) worden in webontwikkeling vaak omgevormd tot menu's:

```css
/* Horizontale navigatiebalk op basis van een <ul> */
nav ul {
  list-style: none;             /* Verwijdert de standaard bullets/stipjes */
  margin: 0;
  padding: 0;
  display: flex;                /* Plaatst menu-items netjes naast elkaar */
  gap: 24px;
}

nav li a {
  display: block;
  padding: 10px 16px;
  color: #ffffff;
  background-color: #181f2a;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

nav li a:hover {
  background-color: #e84e10;
}
```

---

## 4. Tabellen Stylen met CSS

```css
table {
  width: 100%;
  border-collapse: collapse;    /* Verwijdert dubbele randen tussen cellen! */
  margin: 16px 0;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #2c3647;
  text-align: left;
}

th {
  background-color: #1c2331;
  color: #ff753a;
}

/* Zebra striping voor optimale scanbaarheid */
tbody tr:nth-child(even) {
  background-color: #18202d;
}

tbody tr:hover {
  background-color: rgba(232, 78, 16, 0.15); /* Subtiele highlight bij hover */
}
```

---

## 5. Achtergrondafbeeldingen (`background-image`)

```css
.hero-banner {
  /* Bron van de afbeelding */
  background-image: url('images/campus.webp');
  
  /* Voorkom herhaling */
  background-repeat: no-repeat;
  
  /* Positie en uitvulling */
  background-position: center center;
  background-size: cover;          /* cover: vult volledig | contain: toont alles */
  
  /* Parallax effect: blijft vaststaan tijdens scrollen */
  background-attachment: fixed;
  
  height: 400px;
}
```

```css
/* Korte Shorthand Notatie */
.hero-banner {
  background: #0f141c url('images/campus.webp') no-repeat center / cover fixed;
}
```

---

## 5. CSS Gradients (Kleurverlopen)

Gradients worden door de browser berekend als dynamische vector-achtergronden:

<div class="grid-2">
<div class="card">

#### Linear Gradient (Lineair)

Verloop in een specifieke richting:

```css
.linear-box {
  background: linear-gradient(
    135deg, 
    #e84e10 0%, 
    #0f141c 100%
  );
}
```

</div>
<div class="card">

#### Radial Gradient (Radiaal)

Cirkelvormig verloop vanuit het midden:

```css
.radial-box {
  background: radial-gradient(
    circle at center, 
    #ff753a 0%, 
    #0f141c 70%
  );
}
```

</div>
</div>

```css
/* Subtiele donkere overlay over een foto voor betere tekstleesbaarheid */
.hero-overlay {
  background: linear-gradient(rgba(15, 20, 28, 0.8), rgba(15, 20, 28, 0.8)), url('foto.webp');
}
```

---

## 5. Afbeeldingen: `object-fit` & Filters

### Responsive Afbeeldingen & `object-fit`

Voorkomt dat afbeeldingen vervormen wanneer ze in een vaste container worden geplaatst:

```css
img.responsive-cover {
  width: 100%;
  height: 250px;
  object-fit: cover;            /* Vult container zonder vervorming (behoudt ratio) */
  object-position: center top;   /* Focust op de bovenkant van de afbeelding */
  display: block;
}
```

### CSS Visuele Filters

```css
img.filter-demo {
  filter: grayscale(100%);      /* Zwart-wit */
  transition: filter 0.3s ease;
}
img.filter-demo:hover {
  filter: grayscale(0%) brightness(110%); /* Kleur + extra helderheid bij hover */
}
```

---

## 6. Floats & The Clearfix Hack

Vroeger gebruikt voor complete layouts, vandaag **enkel bedoeld om tekst rond een beeld te laten vloeien**:

```css
img.float-left {
  float: left;                  /* Vloeit links in de tekst */
  margin: 0 18px 12px 0;
}

/* Probleem: ouder-element verliest zijn hoogte (collapsing parent) */
/* Oplossing: De moderne Clearfix */
.clearfix::after {
  content: "";
  display: block;
  clear: both;                  /* Heft de float op */
}
```

> **Moderne standaard:** Gebruik voor kolommen en pagina-indelingen altijd **Flexbox** of **CSS Grid**, nooit `float`!

---

## 6. CSS Positionering (`position`)

| Waarde | Gedrag in Documentstroom | Referentiepunt voor `top/left/bottom/right` |
| :--- | :--- | :--- |
| **`static`** | Normale stroom *(standaard)* | Geen (coördinaten werken niet) |
| **`relative`** | Behoudt eigen plaats in stroom | Verschoven t.o.v. zijn **oorspronkelijke positie** |
| **`absolute`** | **Verwijderd** uit normale stroom | T.o.v. dichtstbijzijnde **niet-statische ouder** |
| **`fixed`** | **Verwijderd** uit normale stroom | T.o.v. het **browserviewport** (blijft staan bij scroll) |
| **`sticky`** | Hybride (`relative` + `fixed`) | Scrollt mee tot aan een bepaalde drempel |

```css
/* Dé klassieke combinatie: Ouder relative, Kind absolute */
.card-container { position: relative; }
.card-badge     { position: absolute; top: 12px; right: 12px; }
```

---

## 6. Sticky Headers & `z-index`

```css
/* Sticky navigatiebalk die bovenaan vastklikt tijdens het scrollen */
header.main-nav {
  position: sticky;
  top: 0;
  z-index: 1000;                /* Bepaalt de stapelvolgorde (laaghoogte) */
  background-color: #0f141c;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
```

<div class="grid-2">
<div class="card">

#### Hoe werkt `z-index`?

- Bepaalt welke elementen bovenop andere elementen liggen
- Werkt **enkel op gepositioneerde elementen** (`relative`, `absolute`, `fixed`, `sticky`)

</div>
<div class="card">

#### Stacking Context

- Hogere getallen liggen bovenop lagere getallen: `z-index: 999;`
- Negatieve waarden mogelijk: `z-index: -1;`

</div>
</div>

---

## 6. Responsive Design & Media Queries

**Responsive Web Design (RWD)** past de lay-out dynamisch aan de schermgrootte aan:

```html
<!-- Verplichte meta-tag in HTML head -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
/* Mobile-First Basis CSS (voor smartphones < 768px) */
.col {
  width: 100%;
}

/* Tablet & Desktop Breakpoint (vanaf 768px breedte) */
@media screen and (min-width: 768px) {
  .col {
    width: 50%;
    float: left;
  }
}

/* Grote Schermen (vanaf 1200px breedte) */
@media screen and (min-width: 1200px) {
  .col {
    width: 25%;
  }
}
```

---

## 7. Flexbox: 1D Flexibele Containers

Flexbox is ontworpen voor eendimensionale layouts (rij OF kolom):

```css
.flex-container {
  display: flex;                /* Activeert flexbox context */
  flex-direction: row;          /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;              /* nowrap | wrap (items springen naar volgende regel) */
  gap: 20px;                    /* Ruimte tussen flex-items (zonder margins!) */
  
  /* Hoofdas uitlijning (Main Axis - X bij row) */
  justify-content: space-between; /* flex-start | center | flex-end | space-between | space-evenly */
  
  /* Kruisas uitlijning (Cross Axis - Y bij row) */
  align-items: center;          /* stretch | flex-start | center | flex-end | baseline */
}
```

> **Ultieme CSS Truc:** Een element perfect horizontaal én verticaal centreren:
> `display: flex; justify-content: center; align-items: center;`

---

## 7. Flexbox: Item Eigenschappen

Eigenschappen die rechtstreeks op de **kinderen** van een flex-container worden geplaatst:

```css
.flex-item {
  /* flex shorthand: [flex-grow] [flex-shrink] [flex-basis] */
  flex: 1 1 200px;
}
```

<div class="grid-2">
<div class="card">

#### `flex-grow` & `flex-shrink`

- **`flex-grow: 1`**: Neemt beschikbare restruimte op
- **`flex-grow: 2`**: Groeit dubbel zo snel als `flex-grow: 1`
- **`flex-shrink: 1`**: Krimpt indien nodig bij plaatsgebrek

</div>
<div class="card">

#### `flex-basis` & `align-self`

- **`flex-basis: 250px`**: Ideale startbreedte vóór verdeling van restruimte
- **`align-self: flex-end`**: Overschrijft `align-items` voor dit specifieke item

</div>
</div>

---

## 7. CSS Grid & 12-Kolommen Layouts

CSS Grid is ontworpen voor tweedimensionale layouts (rijen EN kolommen tegelijk):

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12 gelijke fracties (1fr) */
  gap: 20px;
}

/* Hoofdinhoud neemt 8 van de 12 kolommen in (66.6%) */
main.content {
  grid-column: span 8;
}

/* Zijbalk neemt de resterende 4 kolommen in (33.3%) */
aside.sidebar {
  grid-column: span 4;
}

@media (max-width: 768px) {
  main.content, aside.sidebar {
    grid-column: span 12; /* Op mobiel nemen beide de volle 100% breedte in */
  }
}
```

---

## 8. 2D Transformaties (`transform`)

Vervormt of verplaatst elementen zonder de omliggende documentstroom te verstoren:

```css
.box-transformatie {
  /* Verplaatsen */
  transform: translate(20px, -10px);
  
  /* Roteren */
  transform: rotate(15deg);
  
  /* Schalen (vergroten / verkleinen) */
  transform: scale(1.1);
  
  /* Schuinstaand / vervormen */
  transform: skew(5deg, 5deg);
  
  /* Meerdere transformaties tegelijk combineren */
  transform: translate(-50%, -50%) rotate(-5deg) scale(1.05);
  
  /* Draaipunt aanpassen */
  transform-origin: center center;
}
```

---

## 8. CSS Transitions (Vloeiende Overgangen)

Zorgt voor een soepele overgang tussen twee stijlen (bijvoorbeeld bij `:hover`):

```css
.interactieve-knop {
  background-color: #181f2a;
  color: #ffffff;
  transform: translateY(0);
  
  /* Transition shorthand: [eigenschap] [duur] [timing] [vertraging] */
  transition: all 0.3s ease;
  /* transition: transform 0.2s ease-out, background-color 0.3s linear; */
}

.interactieve-knop:hover {
  background-color: #e84e10;
  transform: translateY(-4px);   /* Knop zweeft subtiel omhoog */
  box-shadow: 0 6px 20px rgba(232, 78, 16, 0.4);
}
```

### Timing Functies

- `ease` (standaard: rustige start en stop) | `linear` (constante snelheid)
- `ease-in` (traag begin) | `ease-out` (trage landing) | `cubic-bezier(...)`

---

## 8. CSS Keyframe Animaties (`@keyframes`)

Complexe animaties in meerdere stappen zonder JavaScript:

```css
/* 1. Definieer de animatiestappen */
@keyframes pulseGlow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(232, 78, 16, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(232, 78, 16, 0.8);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(232, 78, 16, 0.4);
  }
}

/* 2. Koppel de animatie aan een element */
.call-to-action {
  animation: pulseGlow 2s infinite ease-in-out;
}
```

---

## 8. 3D Transformaties & Card Flip

Door een `perspective` in te stellen op de ouder krijgt de browser een virtuele diepte (Z-as):

```css
.flip-card-container {
  perspective: 1000px;          /* Diepteperceptie in pixels */
}

.flip-card-inner {
  position: relative;
  width: 300px;
  height: 200px;
  transform-style: preserve-3d; /* Behoudt 3D-ruimte voor kinderen */
  transition: transform 0.6s ease;
}

.flip-card-container:hover .flip-card-inner {
  transform: rotateY(180deg);    /* Draait 180 graden rond Y-as */
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;  /* Verbergt achterkant wanneer weggedraaid! */
}

.card-back {
  transform: rotateY(180deg);
}
```

---

<!-- _class: lead -->

# Meesterschap in CSS3

<p class="subtitle">&lt;From Clean Structure to Engaging Interactive UI /&gt;</p>

### Belangrijkste Takeaways

1. Werk altijd met een **CSS Reset** (`box-sizing: border-box`)
2. Bouw interfaces **Mobile-First** met Flexbox en CSS Grid
3. Gebruik relatieve eenheden (`rem`, `em`, `%`, `fr`) voor flexibiliteit
4. Verrijk de gebruikerservaring met subtiele **transitions & transforms**

<div class="meta-box" style="margin-top: 24px;">
  <strong>Volgende stap:</strong> JavaScript & Dynamische Web Applicaties
</div>
