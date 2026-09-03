---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - HTML5'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->

# HTML5 Essentials

<p class="subtitle">&lt;Web Development Fundamentals /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Essentials | <strong>Thema:</strong> HTML5 Complete Samenvatting
</div>

---

## Inhoudsopgave

1. **Inleiding tot HTML5** - Geschiedenis, standaarden & W3C validatie
2. **Basisstructuur & Document Outline** - Tags, metadata & semantiek
3. **Afbeeldingen op het Web** - Formaten, **WebP**, SVG & best practices
4. **Hyperlinks** - Interne, externe & ankerlinks (`<a>`)
5. **Speciale Tekens** - HTML entities & non-breaking space
6. **Lijsten** - `<ul>`, `<ol>`, `<dl>` & Emmet
7. **Tabellen** - Semantische structuur, cellen samenvoegen
8. **Op weg naar CSS** - Koppelen, `div`/`span`, `id`/`class` & viewport

---

## 1. Inleiding tot HTML5

### Wat is HTML?

- **HyperText Markup Language**: de standaard opmaaktaal voor het web
- Bepaalt de **inhoud en structuur** van webpagina's
- Browsers (Chrome, Firefox, Safari, Edge) interpreteren HTML om pagina's te renderen

### Waarom HTML5?

- **Cross-browser & cross-device**: consistente weergave op desktop, tablet en mobiel
- **Toegankelijkheid & SEO**: zoekmachines en screenreaders begrijpen semantische opbouw
- **Nieuwe native features**: rijke media, structuurelementen en formulieren zonder plugins

---

## 1. W3C Standaarden & Validatie

### Het World Wide Web Consortium (W3C)

- Bepaalt officiële webstandaarden voor webdesigners én browserbouwers
- Zorgt voor uniformiteit en compatibiliteit op het wereldwijde web
- Officiële specificaties te vinden op [w3.org](https://www.w3.org)

### W3C HTML5 Validator <span class="badge">Must-Do</span>

- Controleer **elke pagina** via [validator.w3.org/nu](https://validator.w3.org/nu/)
- Spoort syntaxisfouten, niet-gesloten tags en ontbrekende attributen op
- **Gouden regel:** *Foutloze HTML zorgt voor betere SEO-ranking en consistentie!*

---

## 1. Korte Geschiedenis van HTML

- **1991 - Tim Berners-Lee (CERN):** Eerste versie met 18 tags om onderzoeksdocumenten te koppelen
- **1993 - HTML 1.0:** Eerste officiële publicatie
- **1995 - HTML 2.0:** Introductie van formulieren en tabellen
- **1997 - HTML 3.2 & HTML 4.01:** Eerste officiële W3C-aanbevelingen
- **2014 - heden - HTML5:** De moderne industriestandaard
  - Blijft continu evolueren (*Living Standard* beheerd door WHATWG/W3C)
  - Focus op semantiek, responsive design en multimedia

---

## 2. Basisstructuur & Document Outline

Elke geldige HTML5-pagina bevat **4 verplichte basiselementen**:

```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8">
    <title>Titel van de pagina</title>
  </head>
  <body>
    <!-- Zichtbare inhoud komt hier -->
  </body>
</html>
```

> **Emmet Sneltoets:** Typ `!` en druk op `Tab` in VS Code om direct de volledige document outline te genereren!

---

## 2. De `<head>` & Metadata

De `<head>` bevat achtergrondinformatie **over** de pagina (niet direct zichtbaar in de body).

### Belangrijke Head-tags

- `<title>`: Bepaalt de titel in het browsertabblad (**exact 1 per pagina!**)
- `<meta charset="UTF-8">`: Correcte karakterset (accenten, symbolen)
- `<meta name="description" content="...">`: Samenvatting getoond in zoekresultaten
- `<meta name="keywords" content="HTML, Web, Thomas More">`: Zoektermen
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Mobiele schaling
- `<link rel="stylesheet" href="style.css">`: Koppeling naar extern CSS-bestand

---

## 2. Tekststructuur & Commentaar

### Headings `<h1>` t/m `<h6>`

- `<h1>`: Hoofdtitel van de pagina (belangrijkst voor SEO, bij voorkeur 1 per pagina)
- `<h2>` t/m `<h4>`: Subtitels voor secties en subsecties
- *Best practice:* Gebruik `<h5>` en `<h6>` liever niet wegens slechte leesbaarheid

### Paragrafen & Inline Opmaak

- `<p>`: Paragraaf / alinea (block-level element)
- `<strong>`: Geeft **groot belang/nadruk** aan (standaard vetgedrukt)
- `<em>`: Geeft *klemtoon* aan (standaard cursief)
- `<!-- Commentaar -->`: Wordt genegeerd door browser (`Ctrl + /` in VS Code)

---

## 2. Semantische HTML5 Structuurtags

Semantische tags geven **betekenis** aan secties op een pagina:

<div class="grid-2">
<div class="card">

#### Pagina Structuur

- `<header>`: Introductie of logo/titelbalk
- `<nav>`: Belangrijkste navigatielinks
- `<main>`: Unieke hoofdinhoud van de pagina
- `<footer>`: Voettekst, auteur, copyright

</div>
<div class="card">

#### Inhoudsindeling

- `<article>`: Zelfstandig leesbaar stuk content (nieuwsbericht, blogpost)
- `<section>`: Thematische groep van content
- `<aside>`: Zijbalk of gerelateerde info

</div>
</div>

---

## 2. Scheidingen: `<hr/>` en `<br/>`

### Horizontale Lijn `<hr/>`

- **Thematic break**: markeert een inhoudelijke overgang tussen paragrafen
- Is een **leeg element** (*empty tag* / *void element*)
- Neemt standaard de volledige breedte in als scheidingslijn

### Regeleinde `<br/>`

- Forceert een harde enter binnen een paragraaf of gedicht
- *Waarschuwing:* Gebruik `<br/>` **niet** om witruimte te maken tussen elementen! Gebruik daarvoor CSS margin/padding.

---

## 3. Afbeeldingen: Het `<img>` Element

Afbeeldingen worden ingevoegd met het lege element `<img/>`:

```html
<img src="images/campus-geel.jpg" alt="Campus Thomas More Geel" width="600" height="400">
```

### Belangrijke Attributen

- `src` *(verplicht)*: Pad naar het afbeeldingsbestand
- `alt` *(verplicht)*: Alternatieve beschrijving
  - Onmisbaar voor screenreaders (toegankelijkheid)
  - Getoond wanneer afbeelding niet laadt
  - Cruciaal voor Google Image Search indexering
- `width` en `height`: Afmetingen in pixels (voorkomt *layout shift* tijdens laden)

---

## 3. Semantisch Groeperen: `<figure>` & `<figcaption>`

Om een afbeelding formeel te koppelen aan een bijschrift:

```html
<figure>
  <img src="images/studenten.webp" alt="Studenten programmeren samen">
  <figcaption>Figuur 1: Studenten ITF in het lab van Thomas More.</figcaption>
</figure>
```

### Waarom `<figure>`?

- Zorgt voor een semantische relatie tussen afbeelding en tekst
- Screenreaders lezen het bijschrift direct gekoppeld aan de visuele context
- Eenvoudig als één geheel te stylen met CSS

---

## 3. Overzicht Afbeeldingsformaten

| Formaat | Kleuren | Type | Transparantie | Animatie | Beste toepassing |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **GIF** | 256 (8-bit) | Raster | Index | Ja | Korte geanimeerde memes / reacties |
| **JPG / JPEG** | 16M (24-bit) | Raster | Nee | Nee | Foto's & complexe beelden (lossy) |
| **PNG (8/32)** | 256 / 16M | Raster | Alpha (transparant) | Nee | Logo's, screenshots, iconen (lossless) |
| **SVG** | Onbeperkt | Vector | Alpha | Ja | Logo's, iconen, schaalbare illustraties |
| **WebP** | 16M (Lossy/Lossless) | Raster | Alpha (transparant) | Ja | Moderne standaard voor foto's & graphics |

---

## 3. WebP: Het Moderne Afbeeldingsformaat <span class="badge">Belangrijk</span>

### Wat is WebP?

- Modern afbeeldingsformaat ontwikkeld door **Google**
- Speciaal ontworpen voor een **sneller, lichter web**
- Biedt zowel **lossy** (fotocompressie) als **lossless** (transparantie/iconen)

### Belangrijkste Voordelen

- **25% tot 34% kleinere bestanden** dan vergelijkbare JPG's bij gelijke visuele kwaliteit
- **26% kleiner** dan vergelijkbare PNG's met behoud van alpha-transparantie
- Ondersteunt **animatie** (efficiëntere vervanger voor zware GIF-bestanden!)
- Universeel ondersteund in alle moderne browsers (Chrome, Edge, Firefox, Safari)

---

## 3. WebP Toepassen met `<picture>`

Voor optimale compatibiliteit met oudere browsers gebruikt men het `<picture>` element:

```html
<picture>
  <!-- Moderne browser laadt WebP -->
  <source srcset="images/banner.webp" type="image/webp">
  <!-- Fallback voor legacy browsers -->
  <img src="images/banner.jpg" alt="Welkom op Thomas More" width="800" height="400">
</picture>
```

> **Web Performance Tip:** Gebruik altijd WebP voor webprojecten om je laadtijd (LCP) drastisch te verbeteren!

---

## 3. SVG Vectorafbeeldingen

**Scalable Vector Graphics (SVG)** zijn XML-gebaseerde vectorbestanden.

### Voordelen van SVG

- Oneindig schaalbaar zonder enig kwaliteitsverlies of wazigheid
- Extreem kleine bestandsgrootte voor logo's en iconen
- Kan inline in HTML worden geplaatst en met CSS worden gestyled

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="#e84e10" stroke-width="4" fill="#181f2a" />
</svg>
```

*Beschikbare tags:* `<svg>`, `<line/>`, `<circle/>`, `<rect/>`, `<polygon/>`, `<ellipse/>`

---

## 3. Afbeeldingen: Best Practices & Paden

### Paden

- **Relatieve paden:** `images/logo.png` of `../assets/foto.webp` *(Aanbevolen)*
- **Absolute paden:** `https://example.com/foto.jpg`
- **Vermijd Hotlinking:** Link nooit rechtstreeks naar afbeeldingen op andermans servers (bandbreedtediefstal, onbetrouwbaar, copyrightschending!)

### Gouden Regels

1. **Juiste schaling:** Schaal afbeeldingen vooraf naar de getoonde resolutie
2. **Behoud beeldverhouding:** Vervorm afbeeldingen nooit in CSS
3. **Auteursrechten:** Gebruik eigen foto's of rechtenvrije platforms (Unsplash, Pexels)

---

## 4. Hyperlinks: Het `<a>` Element

Links vormen de ruggengraat van het wereldwijde web (*HyperText*):

```html
<a href="https://thomasmore.be/nl" target="_blank" rel="noopener noreferrer">
  Bezoek Thomas More
</a>
```

### Soorten Links

1. **Externe link:** Verwijst naar een ander domein (`href="https://..."`)
2. **Interne link:** Verwijst naar een andere pagina binnen dezelfde site (`href="over-ons.html"`)
3. **E-maillink:** Opent de e-mailclient (`href="mailto:info@thomasmore.be"`)
4. **Downloadlink:** Start bestanddownload (`href="documenten/lesrooster.pdf" download`)

---

## 4. Ankerlinks & Target Attribuut

### Ankerlinks (Bladwijzers binnen pagina)

Navigeren naar een specifiek element op de pagina via het `id`-attribuut:

```html
<!-- Link naar de sectie -->
<a href="#contact-sectie">Ga naar Contact</a>

<!-- Doel op dezelfde of andere pagina -->
<section id="contact-sectie">
  <h2>Contacteer Ons</h2>
</section>
```

### `target="_blank"` & Beveiliging

- Opent een link in een **nieuw tabblad**
- Voeg altijd `rel="noopener noreferrer"` toe om security leaks te voorkomen!

---

## 5. Speciale Tekens (Character Entities)

Tekens zoals `<`, `>`, en `&` zijn gereserveerd in HTML-syntax. Gebruik **entities** om ze letterlijk weer te geven:

| Symbool | Entiteit Code | Betekenis |
| :---: | :--- | :--- |
| `&` | `&amp;` | Ampersand (en-teken) |
| `<` | `&lt;` | Less than (kleiner dan) |
| `>` | `&gt;` | Greater than (groter dan) |
| `"` | `&quot;` | Dubbel aanhalingsteken |
| `©` | `&copy;` | Copyright symbool |
| *(spatie)* | `&nbsp;` | **Non-breaking space** |

---

## 5. De Non-Breaking Space (`&nbsp;`)

De entiteit `&nbsp;` voorkomt dat tekst of getallen op een ongewenst punt over twee regels worden gesplitst:

```html
<!-- Verkeerd: '€' en '50' kunnen gesplitst worden bij vensterverkleining -->
<p>De kostprijs bedraagt € 50 per student.</p>

<!-- Correct: blijft gegarandeerd op één regel staan -->
<p>De kostprijs bedraagt €&nbsp;50 per student.</p>
<p>Telefoonnummer: 014&nbsp;56&nbsp;23&nbsp;10</p>
```

> **Tip:** Gebruik `&nbsp;` bij eenheden (`100&nbsp;km/h`), valuta (`€&nbsp;25`), en telefoonnummers!

---

## 6. Lijsten in HTML

<div class="grid-2">
<div class="card">

#### Ongeordende Lijst `<ul>`

Opsomming met bullets:

```html
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
</ul>
```

</div>
<div class="card">

#### Geordende Lijst `<ol>`

Genummerde stappen:

```html
<ol start="1" type="1">
  <li>Analyseer probleem</li>
  <li>Schrijf HTML code</li>
  <li>Valideer via W3C</li>
</ol>
```

</div>
</div>

### Optionele Attributen bij `<ol>`

- `type="1|a|A|i|I"`: Bepaalt nummeringstype (Arabisch, letters, Romeins)
- `start="3"`: Start vanaf een specifiek getal
- `reversed`: Telt in omgekeerde volgorde af

---

## 6. Geneste Lijsten & Definitielijsten

### Geneste Lijsten

```html
<ul>
  <li>Frontend
    <ul>
      <li>HTML5 & CSS3</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>
```

### Definitielijsten `<dl>`

Ideaal voor woordenlijsten, FAQ's of metadata:

```html
<dl>
  <dt>HTML</dt>
  <dd>De standaard opmaaktaal voor webpagina's.</dd>
  <dt>CSS</dt>
  <dd>De stijltaal om de vormgeving te definiëren.</dd>
</dl>
```

---

## 7. Tabellen: Basisstructuur

Tabellen dienen **uitsluitend** om tweedimensionale gestructureerde data weer te geven.

```html
<table>
  <caption>Overzicht Cursussen Semester 1</caption>
  <tr>
    <th>Vakcode</th>
    <th>Vaknaam</th>
    <th>Studiepunten</th>
  </tr>
  <tr>
    <td>ITF101</td>
    <td>Web Essentials</td>
    <td>6</td>
  </tr>
</table>
```

> ️ **WAARSCHUWING:** Gebruik tabellen **NOOIT** voor pagina-layout! Gebruik daarvoor CSS (Flexbox / Grid).

---

## 7. Geavanceerde Tabelstructuur

Voor grote, semantisch correcte tabellen gebruiken we structurele groepen:

```html
<table>
  <caption>Examenplanning</caption>
  <thead>
    <tr> <th>Vak</th> <th>Datum</th> <th>Lokaal</th> </tr>
  </thead>
  <tbody>
    <tr> <td>Web Essentials</td> <td>15 Jan</td> <td>Z2.01</td> </tr>
    <tr> <td>Databases</td> <td>18 Jan</td> <td>Z1.14</td> </tr>
  </tbody>
  <tfoot>
    <tr> <td colspan="3">Totaal: 2 examens</td> </tr>
  </tfoot>
</table>
```

---

## 7. Cellen Samenvoegen: `colspan` & `rowspan`

- **`colspan="n"`**: Voegt *n* opeenvolgende kolommen horizontaal samen
- **`rowspan="n"`**: Voegt *n* opeenvolgende rijen verticaal samen

```html
<table border="1">
  <tr>
    <th colspan="2">Student Informatie</th>
  </tr>
  <tr>
    <td rowspan="2">Pasfoto</td>
    <td>Naam: Jan Peeters</td>
  </tr>
  <tr>
    <td>Richting: Toegepaste Informatica</td>
  </tr>
</table>
```

---

## 8. Op Weg naar CSS: `<div>` & `<span>`

HTML verzorgt de **inhoud**, CSS verzorgt de **opmaak**.
Om elementen te groeperen voor styling gebruiken we generieke containers:

<div class="grid-2">
<div class="card">

#### Block-level: `<div>`

- Begint standaard op een **nieuwe regel**
- Neemt de volledige beschikbare breedte in
- Gebruikt om grotere secties of kaartjes te groeperen

```html
<div class="course-card">
  <h3>Web Essentials</h3>
  <p>Inleiding tot HTML5 & CSS3.</p>
</div>
```

</div>
<div class="card">

#### Inline-level: `<span>`

- Begint **niet** op een nieuwe regel
- Neemt enkel de breedte van de tekst in
- Gebruikt om een specifiek stukje tekst te stylen

```html
<p>
  Welkom bij 
  <span class="highlight">Thomas More</span>!
</p>
```

</div>
</div>

---

## 8. Selectoren: `id` vs `class`

| Eigenschap | `id` | `class` |
| :--- | :--- | :--- |
| **Uniekheid** | **Uniek:** Mag slechts **1x per pagina** voorkomen | **Herbruikbaar:** Mag op **meerdere elementen** |
| **Doel** | Specifieke unieke secties, ankerlinks (`#id`), JS | Algemene herbruikbare styling componenten |
| **CSS Selector** | `#header-banner { ... }` | `.btn-primary { ... }` |
| **HTML Voorbeeld** | `<header id="main-header">` | `<p class="lead text-orange">` |

```html
<!-- Meerdere klassen combineren door spaties gescheiden -->
<button class="btn btn-large btn-orange">Schrijf je in</button>
```

---

## 8. Media Queries & Responsive Viewport

### 1. Viewport Meta-tag <span class="badge">Essentieel</span>

Zorgt dat mobiele browsers de pagina renderen volgens de werkelijke schermbreedte in plaats van uit te zoomen naar een virtuele desktopschermbreedte:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. Media Queries

Hiermee kan CSS inspelen op verschillende schermformaten en apparaten:

- Via HTML: `<link rel="stylesheet" media="screen and (max-width: 768px)" href="mobile.css">`
- Of binnen CSS: `@media (max-width: 768px) { ... }`

---

<!-- _class: lead -->

# Klaar voor CSS3

<p class="subtitle">&lt;Semantic HTML is the foundation of great design /&gt;</p>

### Belangrijkste Takeaways

1. Schrijf altijd **semantisch zuivere** HTML5
2. Gebruik moderne formaten zoals **WebP** en **SVG**
3. Valideer regelmatig via de **W3C Validator**
4. Structureer data met semantische tabellen en lijsten

<div class="meta-box" style="margin-top: 24px;">
  <strong>Volgende stap:</strong> Styling met CSS3 - Fonts, Kleuren, Flexbox & Grid
</div>
