# Cheatsheet: Marp & Thomas More Thema

Dit document biedt een compleet overzicht van alle beschikbare CSS classes uit [thomasmore.css](file:///d:/Sites_Marp/presentations/css/thomasmore.css), alsook alle Marp Markdown syntax om presentaties handmatig op te stellen of aan te passen.

---

## 1. Beschikbare CSS Classes in `thomasmore.css`

Het Thomas More thema bevat kant en klare utility classes en componenten voor een professionele presentatie.

### 1.1 Slide Layouts & Covers

| Klasse | Beschrijving | Voorbeeld |
|---|---|---|
| `section.lead` | Hero slide layout met oranje/cyaan radiale gradiënt achtergrond. Headers en footers worden hierop automatisch verborgen. | `<!-- _class: lead -->` |
| `p.subtitle` | Subtitel onder de hoofdtitel op een cover slide (Fira Code lettertype in lichter oranje). | `<p class="subtitle">Web Essentials - Academiejaar 2024-2025</p>` |
| `.meta-box` | Frosted glass infoblok met oranje linkeraccent voor vak en docentinformatie. | `<div class="meta-box">ITF Web Development</div>` |

```html
<!-- _class: lead -->

# Vue.js Fundamentals
<p class="subtitle">Single Page Applications bouwen met Vue 3</p>

<div class="meta-box">
  Thomas More Hogeschool - Toegepaste Informatica (ITF)<br>
  Vak: Front-end Development | Docent: ITF Team
</div>
```

---

### 1.2 Kaarten Systeem (`.card`)

Kaarten groeperen gerelateerde informatie in donkere containers met subtiele randen en schaduwen:

| Klasse | Beschrijving |
|---|---|
| `.card` | Standaard donkere kaart met rand en schaduw. |
| `.card.card-accent` | Kaart met 3px Thomas More oranje top-border en oranje achtergrondgloed. |
| `.card.card-cyan` | Kaart met 3px ITF cyaan top-border en cyaan achtergrondgloed. |
| `.card.card-glass` | Frosted glass kaart met `-webkit-backdrop-filter` / `backdrop-filter: blur(12px)` en oranje getinte rand. |

```html
<div class="grid-2">
  <div class="card card-accent">
    <h4>Oranje Accent</h4>
    <p>Belangrijkste kernconcept of definitie.</p>
  </div>
  <div class="card card-cyan">
    <h4>Cyaan Accent</h4>
    <p>Aanvullende technische toelichting of tip.</p>
  </div>
</div>
```

---

### 1.3 Kolommen & Grid Layouts

Verdeel de slide overzichtelijk in kolommen:

| Klasse | Indeling | Toepassing |
|---|---|---|
| `.grid-2` of `.split-2` | 50% / 50% | Twee gelijke kolommen |
| `.grid-3` of `.split-3` | 33% / 33% / 33% | Drie gelijke kolommen |
| `.split-1-2` | 33% links / 67% rechts | Smalle zijbalk of afbeelding links, brede uitleg rechts |
| `.split-2-1` | 67% links / 33% rechts | Brede code links, toelichting rechts |
| `.split-1-3` | 25% links / 75% rechts | Compacte visual links, uitgebreide content rechts |
| `.split-3-1` | 75% links / 25% rechts | Uitgebreide content links, compacte visual rechts |
| `.split-left` | Flexbox links | Horizontale uitlijning van elementen |
| `.split-right` | Flexbox omgekeerd | Horizontale uitlijning in omgekeerde volgorde |

```html
<div class="split-1-2">
  <div class="img-box">
    <img src="./images/architectuur.png" class="img-glow" alt="Architectuur">
    <p class="caption">Figuur 1: MVC Architectuur</p>
  </div>
  <div class="card card-glass">
    <h4>Belangrijke Eigenschappen</h4>
    <ul>
      <li>Duidelijke scheiding van logica en weergave.</li>
      <li>Herbruikbaarheid van controllers en models.</li>
    </ul>
  </div>
</div>
```

---

### 1.4 Media Cards & Afbeelding Helpers

Voor het stijlvol presenteren van screenshots, schema's en diagrammen:

| Klasse | Beschrijving |
|---|---|
| `.media-card` | Raster met afbeelding links en tekst rechts binnen een donkere kaart. |
| `.media-card.media-card-right` | Raster met tekst links en afbeelding rechts binnen een donkere kaart. |
| `.img-glow` | Voegt een Thomas More oranje gloed toe rond een afbeelding. |
| `.img-glow-cyan` | Voegt een ITF cyaan gloed toe rond een afbeelding. |
| `.img-frame` | Plaatst een donkere kader met padding rond een screenshot of icoon. |
| `.img-center` | Centreert een afbeelding horizontaal op de slide. |
| `.img-box` of `.figure-box` | Flex container voor afbeelding en bijschrift gecentreerd onder elkaar. |
| `.caption` | Monospaced gedimd onderschrift voor een afbeelding. |

```html
<div class="media-card">
  <img src="./images/terminal.png" class="img-frame" alt="Terminal Output">
  <div>
    <h4>CLI Installatie</h4>
    <p>Voer het installatiecommando uit in je terminal om het project te initialiseren.</p>
  </div>
</div>
```

---

### 1.5 Badges (`.badge`)

Compacte tags om status, labels of versies aan te duiden:

| Klasse | Uitstraling | Code |
|---|---|---|
| `.badge` | Vol oranje achtergrond, witte tekst | `<span class="badge">Belangrijk</span>` |
| `.badge.badge-cyan` | Vol cyaan achtergrond, witte tekst | `<span class="badge badge-cyan">Vue 3</span>` |
| `.badge.badge-outline` | Transparant met oranje rand en lichte tekst | `<span class="badge badge-outline">Optioneel</span>` |
| `.badge.badge-outline-cyan` | Transparant met cyaan rand en cyaan tekst | `<span class="badge badge-outline-cyan">TypeScript</span>` |

```html
<h3>Component Lifecycle <span class="badge badge-cyan">v4.0</span> <span class="badge">Nieuw</span></h3>
```

---

## 2. Marp Markdown Syntax & Directives

Marp breidt standaard Markdown uit met presentatie specifieke directives en features.

### 2.1 Frontmatter (Globale Documentinstellingen)

Bovenaan elk `.md` bestand plaats je de frontmatter met YAML configuratie:

```markdown
---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - CSS Layouts'
footer: 'Web Essentials - Thomas More Hogeschool'
---
```

| Directive | Type | Beschrijving |
|---|---|---|
| `marp: true` | Boolean | Verplicht. Activeert Marp rendering. |
| `theme: thomasmore` | String | Selecteert het Thomas More CSS thema. |
| `paginate: true` | Boolean | Toont paginanummers rechtsonder. |
| `header: 'Tekst'` | String | Vaste header bovenaan elke slide. |
| `footer: 'Tekst'` | String | Vaste footer onderaan elke slide. |
| `size: 16:9` | String | Formaat van de slides (`16:9`, `4:3`, `A4`). Standaard is `16:9`. |

---

### 2.2 Slide Splits (`---`)

Nieuwe slides worden gemaakt met drie koppeltekens op een aparte regel:

```markdown
# Slide 1

Inhoud van slide 1...

---

# Slide 2

Inhoud van slide 2...
```

---

### 2.3 Slide-Specifieke Directives (Scoped Directives)

Gebruik HTML commentaar met een underscore (`_`) om een instelling **enkel voor de huidige slide** aan te passen:

```markdown
<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _backgroundColor: #0f141c -->
<!-- _color: #ffffff -->

# Titel Slide Zonder Header/Footer
```

> **Belangrijke regel:** 
> - Met underscore (`<!-- _class: lead -->`): geldt **alleen** voor de huidige slide.
> - Zonder underscore (`<!-- class: invert -->`): geldt voor de huidige en **alle volgende slides**.

---

### 2.4 Paginanummering Beheren

Paginanummering tijdelijk uitschakelen of herstarten:

```markdown
<!-- _paginate: false -->
Deze slide heeft geen paginanummer.

---

<!-- paginate: true -->
Paginanummering weer inschakelen vanaf hier.
```

---

### 2.5 Marp Image Syntax & Achtergronden

Marpit biedt geavanceerde opties om afbeeldingen direct via Markdown te positioneren:

#### A. Afmetingen opgeven
```markdown
![w:400px](afbeelding.png)
![h:250px](afbeelding.png)
![w:500px h:300px](afbeelding.png)
```

#### B. Split Backgrounds (Afbeelding Naast Tekst)
Plaats een afbeelding links of rechts van de tekst met automatische kolomverdeling:

```markdown
## Flexbox Model

![bg right:40%](images/flexbox.png)

- `display: flex` maakt van het element een flex container.
- `justify-content` regelt de uitlijning op de hoofd-as.
- `align-items` regelt de uitlijning op de kruis-as.
```

```markdown
## Grid Systeem

![bg left:35%](images/grid.png)

- Tekst staat nu aan de rechterkant (65% breedte).
- Afbeelding vult de linkerkant (35% breedte).
```

#### C. Volledige Achtergrondafbeelding & Filters
```markdown
<!-- Achtergrondafbeelding over de hele slide met donkere overlay filter -->
![bg cover brightness:0.4 blur:2px](images/wallpaper.jpg)

# Duidelijk Leesbare Tekst op Achtergrond
```

Beschikbare filters:
- `brightness:0.5` (donkerder) of `brightness:1.5` (helderder)
- `contrast:1.2`
- `blur:4px`
- `grayscale:1`
- `sepia:0.8`
- `invert`
- `opacity:0.6`

---

### 2.6 Fragmented Lists (Stapsgewijze Animatie)

Om lijstitems een voor een te laten verschijnen tijdens een presentatie:

```markdown
## Stapsgewijs verschijnen

* Eerste punt (direct zichtbaar)
* Tweede punt (verschijnt bij volgende klik)
* Derde punt (verschijnt bij nog een klik)
```

Gebruik sterretjes (`*`) in plaats van mintekens (`-`) voor stapsgewijze fragment animaties.

---

### 2.7 Wiskundige Formules (MathJax / KaTeX)

Marp ondersteunt KaTeX formules out of the box:

```markdown
Inline formule: $E = mc^2$

Blokformule:
$$
\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}
$$
```

---

### 2.8 Sprekersnotities (Presenter Notes)

Notities toevoegen die enkel zichtbaar zijn in de Marp Presenter Mode (toets `P` in de browser):

```markdown
## Slide Onderwerp

Inhoud voor de studenten op het scherm...

<!--
Dit is een sprekersnotitie.
- Vertel hier het praktijkvoorbeeld over database indexen.
- Vraag naar eerdere ervaring met SQL joins.
-->
```

---

### 2.9 Lokale Stijlen Overschrijven (`<style scoped>`)

Wil je op een specifieke slide uitzonderlijk de layout of kleuren aanpassen:

```markdown
<style scoped>
section {
  background: #151b23;
  justify-content: flex-start;
}
h2 {
  color: #009cab;
}
</style>

## Aangepaste Slide Stijl
Tekst met specifieke stijlen enkel voor deze slide.
```

---

## 3. Code Highlighting Richtlijnen

Het thema ondersteunt syntax highlighting via Highlight.js:

- Gebruik erkende talen zoals `html`, `css`, `javascript`, `typescript`, `php`, `bash`, `json`, `sql`, `python`.
- **Belangrijk:** Gebruik **nooit `blade`**, omdat Highlight.js geen Blade definitie heeft. Gebruik voor Blade views altijd `html` of `php`.

````markdown
```html
<div class="card card-accent">
  <h4>Livewire Teller</h4>
  <button wire:click="increment">+</button>
</div>
```
````

---

## 4. Handige Marp CLI Export Commando's

Om presentaties te compileren via de terminal:

```bash
# Automatisch herladen bij wijzigingen (Watch Mode)
npm run watch

# Exporteren naar HTML
npx -y @marp-team/marp-cli@latest --no-stdin presentations/mijn_presentatie.md --html -o presentations/mijn_presentatie.html

# Exporteren naar PDF
npx -y @marp-team/marp-cli@latest --no-stdin presentations/mijn_presentatie.md --pdf -o presentations/mijn_presentatie.pdf
```

---

## 5. Beschikbare Thema's

In de frontmatter (`theme: <naam>`) kun je kiezen uit de volgende geactiveerde thema's:

| Thema | Bestand | Stijl & Doelgroep |
|---|---|---|
| `thomasmore` | [thomasmore.css](file:///d:/Sites_Marp/presentations/css/thomasmore.css) | Standaard Thomas More ITF huisstijl (oranje/cyaan, dark slate achtergrond met ambient gradient). |
| `tech` | [tech.css](file:///d:/Sites_Marp/presentations/css/tech.css) | Donkere developerstijl met syntax highlight styling, monospaced details en terminal accenten. |
| `business` | [business.css](file:///d:/Sites_Marp/presentations/css/business.css) | Professionele lichte zakelijke stijl met blauwe accenten en strakke typografie. |
| `dark` | [dark.css](file:///d:/Sites_Marp/presentations/css/dark.css) | Strak modern donker thema met cyaan/paarse accenten. |
| `gradient` | [gradient.css](file:///d:/Sites_Marp/presentations/css/gradient.css) | Kleurrijke paars-roze gradient achtergrond voor creatieve presentaties. |
| `colorful` | [colorful.css](file:///d:/Sites_Marp/presentations/css/colorful.css) | Speels, licht en kleurrijk thema met vrolijke pastelaccenten. |
| `minimal` | [minimal.css](file:///d:/Sites_Marp/presentations/css/minimal.css) | Rustige, afleidingsvrije typografische stijl in zwart-wit. |
| `default` / `gaia` / `uncover` | *(ingebouwd in Marp)* | De officiële standaardthema's van de Marp engine. |

