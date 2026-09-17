---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Alpine.js'
footer: 'Web Development - Thomas More Hogeschool'
---

<!-- _class: lead -->

# Alpine.js Fundamentals

<p class="subtitle">&lt;Lightweight, Declarative JavaScript for Modern Web Apps /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Development | <strong>Thema:</strong> Alpine.js Reactiviteit, Directives & Stores
</div>

---

## Inhoudsopgave

1. **Wat is Alpine.js?** - Filosofie, vergelijking met React/Vue en voordelen
2. **Installatie & Starten** - CDN import en bundler integratie (Vite)
3. **Interactief Oefenen** - Alpine.js live testen in de browser
4. **Core Directives: Basis Reactiviteit** - `x-data`, `x-text`, `x-html`, `x-show` en `x-if`
5. **Attributen & Events** - `x-bind` (`:`), `x-on` (`@`) en krachtige event modifiers
6. **Formulieren & Loops** - `x-model` two-way data binding en `x-for`
7. **Geavanceerde Directives** - `x-transition`, `x-cloak`, `x-ref` en `x-init`
8. **De Magische Eigenschappen** <span class="badge badge-cyan">Optioneel</span> - `$el`, `$refs`, `$dispatch`, `$watch` en `$nextTick`
9. **Global State & Herbruikbaarheid** <span class="badge badge-cyan">Optioneel</span> - `Alpine.data()` en `Alpine.store()`
10. **Praktijkvoorbeelden met Tailwind** - Toegankelijke modal en live filterbaar overzicht

---

## 1. Wat is Alpine.js?

Alpine.js is een **robuust, minimaal JavaScript framework** voor het toevoegen van reactief gedrag aan server-rendered HTML:

> *"Alpine is like Tailwind for JavaScript: you write your reactive behavior directly in your markup without leaving your HTML."*

```html
<!-- Een complete, werkende teller in 4 regels HTML -->
<div x-data="{ count: 0 }" class="p-4 bg-slate-800 rounded text-white">
  <button @click="count++" class="px-3 py-1 bg-orange-600 rounded">Verhoog</button>
  <span x-text="count" class="font-bold ml-2"></span>
</div>
```

<div class="grid-2">
<div class="card">

#### Belangrijkste Kenmerken

- **Minimaal footprint:** ~15 KB (gzipped), 0 afhankelijkheden
- **Geen Virtual DOM:** Muteert direct de echte DOM
- **Geen Build Step Verplicht:** Werkt direct via een `<script>` tag

</div>
<div class="card">

#### Ideale Gebruikssituaties

- Dropdowns, modals, tabs en accordions
- Dynamische formulieren en live zoekfilters
- Perfecte partner voor Tailwind CSS en Laravel/Node/PHP

</div>
</div>

---

## 1. Waarom Alpine.js naast React of Vue?

Traditionele SPA frameworks (React, Angular) vereisen vaak een zware build pipeline en nemen de volledige paginacontrole over.

| Eigenschap | Vanilla JavaScript | Alpine.js | React / Vue (SPA) |
| :--- | :--- | :--- | :--- |
| **Pakketgrootte** | 0 KB | **~15 KB** | 40 KB - 150+ KB |
| **Architectuur** | Imperatief (DOM queries) | **Declaratief in HTML** | Declaratief via Virtual DOM / JSX |
| **Build Step** | Optioneel | **Niet nodig (kan via CDN)** | Verplicht (Node, Vite, Webpack) |
| **Geschikt voor** | Eenvoudige scripts | **Componenten op bestaande HTML** | Volledige Single Page Apps |
| **Leercyclus** | Gemiddeld | **Zeer snel (15 directives)** | Hoog (state managers, JSX, hooks) |

---

## 2. Installatie & Starten

Je kunt Alpine.js op twee manieren toevoegen aan je project:

### Optie A: Via CDN (Snelst en direct in browser)

Plaats het script in de `<head>` van je HTML bestand met het `defer` attribuut:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Mijn Alpine App</title>
  <!-- Alpine.js CDN (altijd defer gebruiken!) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <div x-data="{ message: 'Hallo Thomas More!' }">
    <h1 x-text="message"></h1>
  </div>
</body>
</html>
```

---

## 2. Installatie via NPM (Vite Bundler)

<div class="grid-2">
<div class="card">

#### Optie B: Generieke Vite / NPM Setup

In een standaard frontend project installeer je Alpine via npm:

```bash
npm install alpinejs
```

Initialiseer Alpine in je entrypoint (`resources/js/app.js`):

```javascript
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();
```

</div>
<div class="card card-accent">

#### In ons Laravel Project <span class="badge">Automatisch</span>

Binnen onze **Thomas More Web Development** projecten is een handmatige installatie **overbodig**:

- **Standaard geïntegreerd:** Alpine.js en Vite zijn reeds kant-en-klaar geconfigureerd in onze Laravel stack
- **Geen npm install nodig:** Alle afhankelijkheden en scripts zitten reeds in het startproject
- **Vite bundler:** `@vite(['resources/css/app.css', 'resources/js/app.js'])` verzorgt automatisch Hot Module Replacement (HMR)
- **Livewire integratie:** Livewire v4 bundelt Alpine.js automatisch onder de motorkap

</div>
</div>

---

## 3. Interactief Oefenen: Alpine.js Testen <span class="badge">Online Playground</span>

Wil je tijdens deze les de voorbeelden direct live uittesten in je browser?

Surf naar de interactieve omgeving: **<a href="https://alpine-lab.netlify.app/" target="_blank">alpine-lab.netlify.app</a>**

<div class="grid-2">
<div class="card card-accent">

#### Waarom Alpine Lab?

- **Direct aan de slag:** Kopieer en plak codevoorbeelden rechtstreeks in de editor
- **Tailwind CSS geïntegreerd:** Alle utility classes werken onmiddellijk out-of-the-box
- **Rijke bibliotheek:** Bevat voorgedefinieerde componenten en complete toepassingen

</div>
<div class="card">

#### Tip voor studenten

- Kopieer codefragmenten uit de slides en experimenteer met reactieve toestand
- Pas directives aan (`x-show`, `x-model`, `@click`) en zie meteen het resultaat
- Open de browser console (F12) om interacties en events te analyseren

</div>
</div>

---

## 4. Core Directives: `x-data` (Basis Scope)

`x-data` definieert een **reactief component bereik** (scope) en initialiseert de toestand:

```html
<!-- Eenvoudige reactieve component -->
<div x-data="{ title: 'Hallo Alpine.js!' }" class="p-4 bg-slate-100 rounded border">
  <h3 x-text="title" class="font-bold text-orange-600"></h3>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### Belangrijke Regels

- **Zelfstandige component:** Elk element met `x-data` vormt een afgebakende reactieve scope
- **Data nesting:** Geneste elementen hebben direct toegang tot data van hun parent
- **Typen:** Ondersteunt strings, booleans, getallen, arrays en objecten

</div>
<div class="card">

#### Wat gebeurt hier?

- `x-data`: Maakt van de `<div>` een Alpine component met de variabele `title`
- `x-text`: Plaatst de waarde van `title` automatisch als tekst binnen de `<h3>`
- **Reactiviteit:** Wijzigt de toestand in JavaScript, dan past de HTML zich direct aan

</div>
</div>

---

## 4. Core Directives: Toestand Wijzigen met `@click`

Met `@click` pas je variabelen aan en met `x-text` toon je dynamische tekst:

```html
<div x-data="{ open: false, title: 'Web Development' }" class="p-4 bg-slate-100 rounded border">
  <h3 x-text="title" class="font-bold text-orange-600"></h3>
  <p class="mt-2">
    Status: <span x-text="open ? 'Geopend' : 'Gesloten'" class="font-semibold"></span>
  </p>
  <button @click="open = !open" class="mt-3 px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Wissel Status
  </button>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### `@click` Event Handler

- `@click="open = !open"` keert de boolean toestand telkens om
- Alpine detecteert toestandswijzigingen en herberekent afhankelijke data

</div>
<div class="card">

#### `x-text` met Expressies

- `x-text` evalueert volledige JavaScript expressies
- **Ternary operator:** `open ? 'Geopend' : 'Gesloten'` toont direct de juiste tekst
- Werkt reactief zonder dat je handmatig de DOM moet bijwerken

</div>
</div>

---

## 4. Core Directives: Dynamische Styling met `:class`

Koppel CSS-klassen dynamisch aan JavaScript data:

```html
<div x-data="{ open: false }" class="p-4 bg-slate-100 rounded border">
  <p>
    Status: <span x-text="open ? 'Geopend' : 'Gesloten'"
                  :class="open ? 'text-green-600' : 'text-red-600'"
                  class="font-semibold"></span>
  </p>
  <button @click="open = !open" class="mt-3 px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Wissel Kleur & Status
  </button>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### Waarom de dubbele punt (`:`) in `:class`?

- De dubbele punt `:` is de afkorting (shorthand) voor `x-bind:class`
- **Zonder `:`** ziet de browser een gewone statische string
- **Mét `:`** vertel je Alpine: *"evalueer deze waarde als JavaScript!"*

</div>
<div class="card">

#### Hoe werkt de ternary in `:class`?

- `open ? 'text-green-600' : 'text-red-600'`
- Geeft `text-green-600` bij `open: true` en `text-red-600` bij `open: false`
- De tekstkleur wisselt direct synchroon mee bij elke klik

</div>
</div>

---

## 4. Core Directives: `x-data` (Methoden & Interactie)

Je kunt binnen `x-data` ook eigen methoden definiëren om logica netjes te bundelen:

```html
<!-- Teller met methoden -->
<div x-data="{
  count: 0,
  increment() { this.count++; },
  decrement() { if (this.count > 0) this.count--; }
}" class="inline-flex items-center gap-2 p-4 bg-slate-100 rounded border">
  <button @click="decrement()" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded font-bold">-</button>
  <span x-text="count" class="font-bold text-xl px-2"></span>
  <button @click="increment()" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded font-bold">+</button>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### Waarom methoden gebruiken?

- **Schone markup:** Voorkomt lange, onleesbare JavaScript expressies in HTML attributen
- **Herbruikbaar:** Roep dezelfde methode aan vanaf meerdere knoppen of events
- **Context:** Binnen methoden verwijst `this` automatisch naar de gegevens van `x-data`

</div>
<div class="card">

#### Hoe werkt de teller?

- **Reactiviteit:** De `<span>` leest `count` uit via `x-text` en herberekent live bij elke klik
- **Grenscontrole:** `decrement()` controleert `this.count > 0` zodat de teller niet onder 0 zakt
- **Events:** `@click="increment()"` roept direct de bijbehorende methode aan

</div>
</div>

---

## 4. Core Directives: `x-text` en `x-html`

Gebruik `x-text` en `x-html` om dynamische data in te voegen in een HTML element:

```html
<div x-data="{ snippet: 'Dit is <strong>vetgedrukte</strong> tekst' }"
     class="p-4 bg-slate-100 rounded border space-y-2">
  <!-- x-text: toont de ruwe HTML-tags als platte tekst -->
  <p x-text="snippet" class="p-2 bg-white rounded border text-sm"></p>

  <!-- x-html: interpreteert en rendert de HTML-tags effectief -->
  <p x-html="snippet" class="p-2 bg-white rounded border text-sm"></p>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### `x-text` (Veilig & Aanbevolen)

- Overschrijft `innerText` en ontsnapt HTML automatisch
- **Output:** Toont tags letterlijk als platte tekst
- Beschermt betrouwbaar tegen XSS-kwetsbaarheden

</div>
<div class="card">

#### `x-html` (Voorzichtig)

- Overschrijft `innerHTML` en rendert echte DOM-elementen
- **Output:** Toont daadwerkelijk vetgedrukte opmaak
- Gebruik **nooit** met invoer van eindgebruikers

</div>
</div>

---

## 4. Core Directives: `x-show` (CSS Display)

`x-show` wisselt de zichtbaarheid van een element via inline CSS (`display: none`):

```html
<div x-data="{ isVisible: false }" class="p-4 bg-slate-100 rounded border space-y-2">
  <button @click="isVisible = !isVisible" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Schakel Weergave
  </button>

  <div x-show="isVisible" class="p-2 bg-white rounded border text-sm">
    <strong>x-show:</strong> Zichtbaar! Dit element blijft altijd in de DOM aanwezig.
  </div>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Werking via CSS</h4>
  <p>Schakelt enkel <code>display: none</code> in of uit. Het HTML-element blijft continu in de DOM bestaan en behoudt interne state.</p>
</div>
<div class="card">
  <h4>Voordelen & Toepassing</h4>
  <p>Razendsnel zonder DOM-overhead, behoudt formulierwaarden en ondersteunt vloeiende animaties via <code>x-transition</code>.</p>
</div>
</div>

---

## 4. Core Directives: `x-if` (DOM Manipulatie)

`x-if` voegt elementen fysiek toe aan de DOM of verwijdert ze volledig:

```html
<div x-data="{ isVisible: false }" class="p-4 bg-slate-100 rounded border space-y-2">
  <button @click="isVisible = !isVisible" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Schakel Weergave
  </button>

  <!-- Verplicht: x-if moet altijd op een <template> tag staan -->
  <template x-if="isVisible">
    <div class="p-2 bg-white rounded border text-sm">
      <strong>x-if:</strong> Volledig gecreëerd of vernietigd in de DOM.
    </div>
  </template>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Fysieke DOM Manipulatie</h4>
  <p>Bij <code>false</code> wordt de node compleet uit de DOM verwijderd. Bij <code>true</code> wordt deze opnieuw aangemaakt.</p>
</div>
<div class="card">
  <h4>Verplichte &lt;template&gt; Wrapper</h4>
  <p>Alpine vereist een <code>&lt;template&gt;</code> tag als blauwdruk. Binnen de template mag exact <strong>één</strong> root element staan.</p>
</div>
</div>

---

## 4. Core Directives: Waarom `<template>` bij `x-if`?

In tegenstelling tot `x-show` heeft `x-if` een speciale syntax en levenscyclus:

<div class="grid-2">
<div class="card card-accent">

#### Hoe werkt de DOM injectie?

- **Fysieke mutatie:** Alpine voegt het element daadwerkelijk in via DOM API's
- **Geheugenbesparing:** Ongebruikte elementen nemen 0 DOM resources in beslag
- **Reactiviteit:** Geneste expressies worden pas geëvalueerd als het element bestaat
- **Reset:** Interne toestand wordt automatisch herstart bij opnieuw tonen

</div>
<div class="card card-cyan">

#### Waarom het `<template>` element?

- **Standaard HTML5:** Browsers renderen de inhoud van `<template>` standaard niet
- **Blauwdruk:** Alpine gebruikt de template als sjabloon om nodes te klonen
- **Geen display: none:** Voorkomt dat media of stijlen voortijdig geladen worden
- **Enkel root element:** Vereist altijd één overkoepelende tag (bv. een `<div>`)

</div>
</div>

---

## 4. Core Directives: `x-show` vs `x-if` (Vergelijking)

Overzicht van de belangrijkste technische verschillen en richtlijnen:

| Kenmerk | `x-show` | `x-if` |
| :--- | :--- | :--- |
| **DOM Manipulatie** | Behoudt element (CSS `display`) | Voegt toe / verwijdert fysiek uit de DOM |
| **Animaties** | **Ja**, ondersteunt `x-transition` | Nee (geen transities mogelijk) |
| **HTML Syntax** | Direct op elk HTML-element | **Verplicht** op een `<template>` tag |
| **Renderkost** | Rendert initiële DOM direct | Rendert DOM pas wanneer expressie `true` is |

<div class="grid-2">
<div class="card card-accent">

#### Wanneer kies je `x-show`?

- **Standaardkeuze voor de meeste UI:** Dropdowns, tabs, accordions
- Zodra je elementen soepel wilt in- en uitfaden met animaties
- Elementen die frequent getoond en verborgen worden

</div>
<div class="card">

#### Wanneer kies je `x-if`?

- Grote, zware componenten die niet onnodig geheugen mogen innemen
- Als kind-elementen niet mogen initialiseren zolang data nog ontbreekt
- Complexe onderdelen die slechts zelden getoond worden

</div>
</div>

---

## 5. Attributen Koppelen: `x-bind` (Shorthand `:`)

Met `x-bind` koppel je willekeurige HTML-attributen dynamisch aan JavaScript data:

```html
<div x-data="{ isDisabled: true, placeholderText: 'Typ je zoekopdracht...' }" 
     class="p-4 bg-slate-100 rounded border space-y-3">
  <input type="text" :placeholder="placeholderText" class="p-2 border rounded text-sm bg-white w-full">

  <div class="flex gap-2 items-center">
    <button :disabled="isDisabled" class="px-3 py-1 bg-orange-600 text-white rounded text-sm disabled:opacity-50">
      Verzenden
    </button>
    <button @click="isDisabled = !isDisabled" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded text-sm">
      Wissel Status
    </button>
  </div>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Waarom x-bind?</h4>
  <p>Koppel elk HTML-attribuut (zoals <code>:disabled</code>, <code>:placeholder</code>, <code>:href</code>, <code>:src</code>) dynamisch aan JavaScript toestand.</p>
</div>
<div class="card">
  <h4>Shorthand Notatie</h4>
  <p>Schrijf simpelweg een dubbele punt (<code>:</code>) in plaats van <code>x-bind:</code>. Zo wordt <code>x-bind:disabled</code> beknopt <code>:disabled</code>.</p>
</div>
</div>

---

## 5. Dynamische Klassen: Handige `:class` Patronen

Alpine biedt drie expressieve manieren om CSS-klassen conditioneel te koppelen:

<div class="grid-3">
<div class="card card-accent">

#### 1. Object Syntax

`:class="{ 'bg-red-100 text-red-700': fout }"`

- Sleutel = CSS class
- Waarde = boolean conditie
- Ideaal voor validatiestatussen

</div>
<div class="card card-cyan">

#### 2. Ternary Syntax

`:class="open ? 'rotate-180' : 'rotate-0'"`

- Bekende `if-else` notatie
- Wisselt tussen twee stijlen
- Perfect voor iconen en toggles

</div>
<div class="card">

#### 3. Array Syntax

`:class="[basis, actief && 'font-bold']"`

- Combineert meerdere klassen
- Meng statische en dynamische klassen
- Handig voor complexe tabs

</div>
</div>

---

## 5. Events Afhandelen: `x-on` (Shorthand `@`)

Met `x-on` (of de kortere `@` notatie) luister je naar browser en custom DOM events:

```html
<div x-data="{ searchQuery: '', submitted: '' }" class="p-4 bg-slate-100 rounded border space-y-2">
  <div class="flex gap-2">
    <input type="text" 
           @input="searchQuery = $event.target.value" 
           @keydown.enter="submitted = searchQuery"
           placeholder="Typ en druk op Enter..."
           class="p-2 border rounded text-sm bg-white">
    <button @click="submitted = searchQuery" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
      Zoek
    </button>
  </div>
  <p x-show="submitted" class="text-sm">
    Gezocht naar: <strong x-text="submitted" class="text-orange-600"></strong>
  </p>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Event Handlers (@)</h4>
  <p>Luister naar elk standaard DOM event zoals <code>@click</code>, <code>@input</code>, <code>@submit</code> of <code>@keydown</code>.</p>
</div>
<div class="card">
  <h4>Het $event Object</h4>
  <p>Geeft directe toegang tot het oorspronkelijke browser event, bijvoorbeeld om <code>$event.target.value</code> uit te lezen.</p>
</div>
</div>

---

## 5. Events: Populaire Event Modifiers

Event modifiers vereenvoudigen veelvoorkomende JavaScript acties zonder extra functies:

<div class="grid-2">
<div class="card card-accent">

#### UI & Interactie Modifiers

- `@click.outside` - Vuurt zodra de gebruiker **buiten** het element klikt (onmisbaar voor modals en dropdowns)
- `@submit.prevent` - Voorkomt het herladen van de pagina (`e.preventDefault()`)
- `@click.stop` - Voorkomt event bubbling naar parent elementen (`e.stopPropagation()`)

</div>
<div class="card card-cyan">

#### Toetsenbord & Timing Modifiers

- `@keydown.escape.window` - Luistert globaal op het `window` naar de Escape-toets
- `@keydown.enter` - Reageert specifiek op de Enter-toets
- `@input.debounce.500ms` - Wacht 500ms na de laatste toetsaanslag alvorens te vuren (ideaal voor zoekvelden)

</div>
</div>

---

## 6. Formulieren & Two-Way Binding: `x-model`

`x-model` synchroniseert de waarde van een formulierveld automatisch tweezijdig met je data:

```html
<div x-data="{ name: 'Sam', role: 'student', newsletter: true, age: 20 }"
     class="p-4 bg-slate-100 rounded border space-y-2">
  <!-- Tekstinvoer en select dropdown -->
  <div class="flex gap-2">
    <input type="text" x-model="name" placeholder="Naam" class="p-2 bg-white border rounded text-sm">
    <select x-model="role" class="p-2 bg-white border rounded text-sm">
      <option value="student">Student ITF</option>
      <option value="docent">Docent</option>
    </select>
  </div>

  <!-- Checkbox boolean en getal input -->
  <div class="flex items-center gap-4 text-sm">
    <label class="flex items-center gap-1">
      <input type="checkbox" x-model="newsletter"> Nieuwsbrief
    </label>
    <input type="number" x-model.number="age" class="w-16 p-1 bg-white border rounded text-center">
  </div>

  <p class="p-2 bg-white rounded border text-sm">
    Ingevoerd: <strong x-text="name"></strong> (<span x-text="role"></span>, leeftijd: <span x-text="age"></span>)
  </p>
</div>
```

---

## 6. Herhalen over Lijsten: `x-for`

Gebruik `x-for` om dynamisch lijsten van data te renderen:

```html
<div x-data="{
  courses: [
    { id: 1, name: 'Web Essentials', semester: 1 },
    { id: 2, name: 'Web Development', semester: 2 },
    { id: 3, name: 'Cloud Engineering', semester: 3 }
  ]
}" class="p-4 bg-slate-100 rounded border max-w-md">
  <ul class="space-y-1">
    <!-- x-for MOET altijd op een <template> element staan! -->
    <template x-for="(course, index) in courses" :key="course.id">
      <li class="p-2 bg-white border rounded flex justify-between text-sm">
        <span x-text="`${index + 1}. ${course.name}`"></span>
        <span class="font-bold text-orange-600" x-text="`Semester ${course.semester}`"></span>
      </li>
    </template>
  </ul>
</div>
```

> **Verplichte Best Practice:** Voorzie altijd een unieke `:key` attribuut (bv. `:key="course.id"`) voor optimale DOM updates en rendering prestaties.

---

## 7. Geavanceerd: Vloeiende Animaties met `x-transition`

Met `x-transition` animeer je elementen bij `x-show` zonder één regel complexe CSS te schrijven:

```html
<div x-data="{ open: false }" class="relative inline-block">
  <button @click="open = !open" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Dropdown Menu
  </button>

  <!-- Vloeiende overgang -->
  <div x-show="open" 
       @click.outside="open = false"
       x-transition
       class="absolute left-0 mt-1 w-44 bg-white border rounded p-2 text-sm">
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">Mijn Profiel</a>
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">Instellingen</a>
  </div>
</div>
```

---

## 7. Geavanceerd: `x-cloak`, `x-ref` en `x-init`

<div class="grid-2">
<div class="card">

#### 1. `x-cloak` (Voorkom FOUC)

Verbergt elementen totdat Alpine volledig geladen is:

```html
<div x-data="{ open: false }" x-cloak
     class="p-3 bg-slate-100 rounded border text-sm">
  <p x-show="open" class="text-green-600">Geen flikkering bij laden!</p>
</div>
```

</div>
<div class="card">

#### 2. `x-ref` & `$refs` (DOM Elementen)

Directe toegang tot DOM nodes:

```html
<div x-data class="flex gap-2">
  <input type="text" x-ref="zoekVeld" placeholder="Zoeken..."
         class="p-1 border rounded text-xs bg-white">
  <button @click="$refs.zoekVeld.focus()"
          class="px-2 py-1 bg-orange-600 text-white rounded text-xs">
    Focus
  </button>
</div>
```

</div>
</div>

### 3. `x-init` (Component Lifecycle)

Voert JavaScript code uit zodra het component geïnitialiseerd wordt:

```html
<div x-data="{ items: ['HTML5', 'CSS3', 'Alpine.js'] }" class="p-2 bg-slate-100 rounded border text-sm max-w-md">
  <span x-text="`Aantal geladen cursussen: ${items.length}`" class="text-orange-600 font-medium"></span>
</div>
```

---

## Intermezzo: Advanced Features <span class="badge badge-cyan">Optioneel</span>

Een korte mededeling over het vervolg van deze presentatie:

<div class="card card-accent" style="margin-top: 18px; padding: 22px;">

### Alles voor ons Laravel project is reeds behandeld!

Alle directives die we binnen onze **Thomas More Web Development** projecten gebruiken (`x-data`, `x-show`, `x-if`, `x-bind`, `x-on`, `x-model`), zijn in de voorgaande slides volledig behandeld.

<div style="margin-top: 16px; padding: 14px 18px; background: rgba(0, 156, 171, 0.1); border-left: 4px solid var(--color-secondary); border-radius: 6px;">
  <strong style="color: var(--color-secondary);">Enkel voor de die-hards:</strong><br>
  De komende slides behandelen geavanceerde onderwerpen zoals custom events (<code>$dispatch</code>), component factories (<code>Alpine.data()</code>) en globale stores (<code>Alpine.store()</code>).<br><br>
  Deze technieken hebben we in ons Laravel project <strong>niet echt nodig</strong>, maar zijn bedoeld als interessante verdieping en naslagwerk voor wie méér wil halen uit Alpine.js!
</div>

</div>

---

## 8. De Magische Eigenschappen (The `$` Magics) <span class="badge badge-cyan">Optioneel</span>

Alpine biedt ingebouwde magische eigenschappen met het `$` voorvoegsel:

| Magic Property | Doel & Functionaliteit |
| :--- | :--- |
| **`$el`** | Verwijst naar het huidige root DOM element van het component |
| **`$refs`** | Geeft toegang tot alle elementen met een `x-ref` attribuut binnen het component |
| **`$event`** | Het oorspronkelijke native browser Event object (bv. `$event.target.value`) |
| **`$dispatch`** | Stuurt een custom DOM event uit naar parent componenten (`$dispatch('item-added', { id: 1 })`) |
| **`$watch`** | Observeert veranderingen in een variabele (`$watch('tab', val => console.log(val))`) |
| **`$nextTick`** | Wacht tot Alpine de DOM updates heeft voltooid alvorens code uit te voeren |
| **`$store`** | Geeft toegang tot globale reactieve stores geregistreerd via `Alpine.store()` |

---

## 9. Herbruikbare Componenten: `Alpine.data()` (Definitie) <span class="badge badge-cyan">Optioneel</span>

Als componentlogica te groot wordt voor inline HTML attributen, definieer je herbruikbare functies in JavaScript:

```javascript
// Registreer een herbruikbaar component in JavaScript
document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', (initialOpen = false) => ({
    open: initialOpen,
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    }
  }));
});
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Wat doet Alpine.data()?</h4>
  <p>Registreert een herbruikbare component-blauwdruk gekoppeld aan een naam. Dit houdt je HTML-markup schoon en vrij van lange functies.</p>
</div>
<div class="card">
  <h4>Parameters & alpine:init</h4>
  <p>Luister altijd naar het <code>alpine:init</code> event vóór registratie. Ondersteunt parameters met standaardwaarden (zoals <code>initialOpen = false</code>).</p>
</div>
</div>

---

## 9. Herbruikbare Componenten: `Alpine.data()` (Gebruik in HTML) <span class="badge badge-cyan">Optioneel</span>

Koppel het geregistreerde component direct aan elementen via `x-data="naam(parameters)"`:

```html
<!-- Twee onafhankelijke dropdowns met dezelfde herbruikbare logica -->
<div x-data="dropdown(false)" class="relative inline-block mr-2">
  <button @click="toggle()" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">Menu 1</button>
  <div x-show="open" @click.outside="close()" class="absolute left-0 mt-1 w-36 bg-white border rounded p-2 text-sm">
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">Mijn Profiel</a>
  </div>
</div>
<div x-data="dropdown(false)" class="relative inline-block">
  <button @click="toggle()" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded text-sm">Menu 2</button>
  <div x-show="open" @click.outside="close()" class="absolute left-0 mt-1 w-36 bg-white border rounded p-2 text-sm">
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">Instellingen</a>
  </div>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Geïsoleerde Instanties</h4>
  <p>Elk element met <code>x-data="dropdown(...)"</code> heeft een eigen, afgeschermde toestand. Menu 1 en Menu 2 werken onafhankelijk.</p>
</div>
<div class="card">
  <h4>Click.outside Dismissal</h4>
  <p>De modifier <code>@click.outside="close()"</code> sluit het dropdownmenu automatisch zodra de gebruiker buiten de component klikt.</p>
</div>
</div>

---

## 9. Global State: `Alpine.store()` (Definitie) <span class="badge badge-cyan">Optioneel</span>

Met `Alpine.store()` beheer je globale reactieve data die gedeeld wordt over meerdere componenten:

```javascript
document.addEventListener('alpine:init', () => {
  Alpine.store('cart', {
    items: [],
    add(product) {
      this.items.push(product);
    },
    get count() {
      return this.items.length;
    }
  });
});
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Waarom een Globale Store?</h4>
  <p>Deel variabelen en acties over willekeurige componenten heen, zonder ingewikkelde parent-child hiërarchieën of event dispatching.</p>
</div>
<div class="card">
  <h4>Getters & Reactiviteit</h4>
  <p>Getters zoals <code>get count()</code> berekenen dynamisch afgeleide waarden en werken alle gekoppelde HTML-elementen automatisch live bij.</p>
</div>
</div>

---

## 9. Global State: `$store` (Gebruik in HTML) <span class="badge badge-cyan">Optioneel</span>

Benader de globale store vanuit elk HTML-component via de magic `$store`:

```html
<!-- Component A: Header Notificatie Badge -->
<nav x-data class="p-3 bg-slate-100 border rounded flex justify-between text-sm max-w-md">
  <span class="font-bold text-orange-600">ITF Web Shop</span>
  <span>Winkelmand: <strong class="text-orange-600 font-mono" x-text="$store.cart.count"></strong> items</span>
</nav>

<!-- Component B: Product Kaart elders op de pagina -->
<div x-data class="p-3 bg-slate-100 border rounded flex justify-between items-center max-w-md mt-2">
  <span class="text-sm font-medium">Cursusboek Web Development</span>
  <button @click="$store.cart.add({ id: 101, title: 'Web Dev' })"
          class="px-3 py-1 bg-orange-600 text-white rounded text-xs">
    + Winkelmand
  </button>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>De Magic Property $store</h4>
  <p>Elk component met <code>x-data</code> kan direct data en methoden aanroepen via <code>$store.storeNaam.eigenschap</code>.</p>
</div>
<div class="card">
  <h4>Live Synchronisatie</h4>
  <p>Zodra Component B een product toevoegt, herberekent Alpine direct de teller in Component A in de DOM.</p>
</div>
</div>

---

## 10. Praktijkvoorbeeld 1: Toegankelijke Modal Dialog

Een complete, toegankelijke pop-up dialoog met achtergrond blur, Escape sluiting en focus beheer:

```html
<div x-data="{ modalOpen: false }" class="p-4">
  <button @click="modalOpen = true" class="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold">
    Open Modal Dialoog
  </button>

  <!-- Modal Backdrop & Container -->
  <div x-show="modalOpen" 
       x-cloak
       @keydown.escape.window="modalOpen = false"
       class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
       x-transition>

    <!-- Modal Box met click.outside -->
    <div @click.outside="modalOpen = false"
         class="w-full max-w-md bg-white border rounded-xl p-6 text-slate-800">
      <h3 class="text-xl font-bold text-orange-600">Belangrijke Mededeling</h3>
      <p class="mt-2 text-sm text-slate-600">
        Dit venster sluit met de Escape-toets of door buiten het kader te klikken.
      </p>
      <div class="mt-4 flex justify-end gap-2">
        <button @click="modalOpen = false" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded text-sm">Annuleren</button>
        <button @click="modalOpen = false" class="px-3 py-1 bg-orange-600 text-white rounded text-sm font-bold">Akkoord</button>
      </div>
    </div>
  </div>
</div>
```

---

## 10. Praktijkvoorbeeld 2: Live Zoek- en Filterbaar Cursusoverzicht

```html
<div x-data="{
  search: '',
  selectedSemester: 'all',
  courses: [
    { id: 1, name: 'HTML5 Essentials', semester: '1', level: 'Beginner' },
    { id: 2, name: 'CSS3 & Grid Layouts', semester: '1', level: 'Beginner' },
    { id: 3, name: 'Tailwind CSS v4', semester: '2', level: 'Gevorderd' },
    { id: 4, name: 'Alpine.js Reactivity', semester: '2', level: 'Gevorderd' }
  ],
  get filteredCourses() {
    return this.courses.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(this.search.toLowerCase());
      const matchesSemester = this.selectedSemester === 'all' || c.semester === this.selectedSemester;
      return matchesSearch && matchesSemester;
    });
  }
}" class="p-4 bg-slate-100 rounded border max-w-lg">

  <div class="flex gap-2 mb-3">
    <input type="text" x-model="search" placeholder="Zoek op cursusnaam..." class="p-2 bg-white border rounded w-full text-sm">
    <select x-model="selectedSemester" class="p-2 bg-white border rounded text-sm">
      <option value="all">Alle Semesters</option>
      <option value="1">Semester 1</option>
      <option value="2">Semester 2</option>
    </select>
  </div>

  <template x-for="course in filteredCourses" :key="course.id">
    <div class="p-2 mb-2 bg-white border rounded flex justify-between items-center text-sm">
      <span x-text="course.name" class="font-medium"></span>
      <span class="px-2 py-0.5 text-xs rounded bg-orange-100 text-orange-700 font-medium" x-text="course.level"></span>
    </div>
  </template>
</div>
```

---

<!-- _class: lead -->

# Meesterschap in Alpine.js

<p class="subtitle">&lt;Minimal Setup, Maximum Reactivity /&gt;</p>

### Belangrijkste Takeaways voor Studenten

1. **Declaratief programmeren:** Schrijf gedrag rechtstreeks in HTML attributen
2. **De kern begrijpen:** Beheers `x-data`, `x-show`, `x-bind` (`:`) en `x-on` (`@`)
3. **Event Modifiers:** Maak slim gebruik van `@click.outside` en `@keydown.escape.window`
4. **Schaalbaarheid:** Gebruik `Alpine.data()` en `Alpine.store()` voor grotere applicaties
5. **De Ultieme Frontend Stack:** Combineer **Tailwind CSS v4** voor styling met **Alpine.js** voor reactiviteit!

<div class="meta-box" style="margin-top: 24px;">
  <strong>Volgende stap:</strong> Bouw een interactief dashboard met Tailwind CSS v4 & Alpine.js!
</div>
