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
8. **De Magische Eigenschappen** - `$el`, `$refs`, `$dispatch`, `$watch` en `$nextTick`
9. **Global State & Herbruikbaarheid** - `Alpine.data()` en `Alpine.store()`
10. **Praktijkvoorbeelden met Tailwind** - Modals, live filtering en shopping cart

---

## Interactief Oefenen: Alpine.js Testen <span class="badge">Online Sandbox</span>

Wil je tijdens deze les de Alpine.js voorbeelden direct live uittesten in je browser?

Gebruik een van de interactieve playgrounds:
- **CodePen Template:** [codepen.io/pen](https://codepen.io/pen) *(voeg Alpine CDN toe)*
- **JSFiddle:** [jsfiddle.net](https://jsfiddle.net)
- **Documentatie & Sandbox:** [alpinejs.dev](https://alpinejs.dev)

<div class="grid-2">
<div class="card">

#### Waarom een online sandbox?
- **Direct resultaat:** Schrijf HTML met `x-data` en zie de reactieve UI onmiddellijk werken
- **Geen build tools nodig:** Werkt out-of-the-box met een eenvoudige script tag
- **Perfecte combo:** Combineer met Tailwind CSS CDN voor complete componenten

</div>
<div class="card">

#### Tip voor studenten
- Kopieer voorbeeldcode rechtstreeks uit deze slides
- Experimenteer met `x-model`, event modifiers en state updates
- Open de browser console om events en variabelen te inspecteren

</div>
</div>

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

### Optie B: Via NPM in moderne frontend projecten

```bash
# Installeer Alpine via npm
npm install alpinejs
```

Initialiseer Alpine in je JavaScript entrypoint (`main.js` of `app.js`):

```javascript
// src/main.js
import Alpine from 'alpinejs';

// Maak Alpine globaal beschikbaar voor devtools inspectie
window.Alpine = Alpine;

// Start het reactieve Alpine systeem
Alpine.start();
```

> **Belangrijk:** Roep altijd `Alpine.start()` aan nadat je eventuele custom stores of data-functies hebt geregistreerd!

---

## 4. Core Directives: `x-data`

`x-data` definieert een **reactief component bereik** (scope) en initialiseert de bijbehorende JavaScript data:

```html
<!-- Component met lokale toestand -->
<div x-data="{ open: false, title: 'Web Development', count: 1 }">
  <h3 x-text="title"></h3>
  <p>Status: <span x-text="open ? 'Geopend' : 'Gesloten'"></span></p>
</div>
```

<div class="grid-2">
<div class="card">

#### Belangrijke Regels
- Elk element met `x-data` is een zelfstandige reactieve component
- Alle geneste HTML elementen hebben toegang tot de data van hun parent
- Data kan strings, booleans, getallen, arrays, objecten en methoden bevatten

</div>
<div class="card">

#### Methoden binnen `x-data`
```html
<div x-data="{
  count: 0,
  increment() { this.count++; },
  decrement() { if(this.count > 0) this.count--; }
}">
  <button @click="decrement()">-</button>
  <span x-text="count"></span>
  <button @click="increment()">+</button>
</div>
```

</div>
</div>

---

## 4. Core Directives: `x-text` en `x-html`

Gebruik `x-text` en `x-html` om dynamische data in te voegen in een HTML element:

```html
<div x-data="{ name: 'Patrick', bio: 'Docent <strong>ITF</strong>' }">
  <!-- x-text: Veilige tekst (voorkomt XSS aanvallen) -->
  <p>Welkom, <span x-text="name"></span>!</p>

  <!-- x-html: Rendert daadwerkelijke HTML tags -->
  <div x-html="bio"></div>
</div>
```

<div class="grid-2">
<div class="card">

#### `x-text` (Aanbevolen)
- Overschrijft de `innerText` van het element
- Converteert speciale tekens automatisch naar veilige tekst (beschermt tegen XSS)
- Ondersteunt JavaScript expressies: `x-text="score * 2"`

</div>
<div class="card">

#### `x-html` (Voorzichtig)
- Overschrijft de `innerHTML` van het element
- Gebruik **nooit** `x-html` met niet-vertrouwde gebruikersinvoer (gevaar voor Cross-Site Scripting)

</div>
</div>

---

## 4. `x-show` vs `x-if`: Zichtbaarheid Beheren

Alpine biedt twee manieren om elementen conditioneel te tonen:

```html
<div x-data="{ isVisible: false }">
  <button @click="isVisible = !isVisible" class="btn">Schakel Weergave</button>

  <!-- 1. x-show: Verandert enkel CSS display: none -->
  <div x-show="isVisible" class="card">
    Dit element blijft in de DOM aanwezig maar krijgt style="display: none;".
  </div>

  <!-- 2. x-if: Verwijdert/voegt het element fysiek toe aan de DOM (vereist <template>) -->
  <template x-if="isVisible">
    <div class="card">
      Dit element wordt volledig gecreëerd of vernietigd in de DOM.
    </div>
  </template>
</div>
```

| Kenmerk | `x-show` | `x-if` |
| :--- | :--- | :--- |
| **DOM Manipulatie** | Behoudt element (CSS `display`) | Voegt toe / verwijdert fysiek |
| **Ondersteunt `x-transition`** | Ja (vloeiende CSS animaties) | Nee |
| **Vereist `<template>` wrapper** | Nee, direct op elk HTML element | **Ja, verplicht op `<template>`** |

---

## 5. Attributen Koppelen: `x-bind` (Shorthand `:`)

Met `x-bind` (of de kortere syntax `:`) koppel je HTML attributen dynamisch aan JavaScript data:

```html
<div x-data="{ isUrgent: true, isDisabled: false, imgUrl: 'img/logo.webp' }">
  <!-- Dynamische class koppeling via object syntax -->
  <div :class="{ 'border-red-500 bg-red-950': isUrgent, 'border-slate-700': !isUrgent }" class="border p-4 rounded">
    Notificatiepaneel
  </div>

  <!-- Dynamische HTML attributen -->
  <button :disabled="isDisabled" class="btn">Verzenden</button>
  <img :src="imgUrl" alt="Dynamisch logo" class="w-16">
</div>
```

### Handige `:class` patronen:
- **Object Syntax:** `:class="{ 'actief': isActief, 'fout': heeftFout }"`
- **Ternary Syntax:** `:class="isOpen ? 'rotate-180' : 'rotate-0'"`
- **Array Syntax:** `:class="[basisKlasse, dynamicKlasse]"`

---

## 5. Events Afhandelen: `x-on` (Shorthand `@`)

Met `x-on` (of de kortere `@` notatie) luister je naar browser en custom DOM events:

```html
<div x-data="{ searchQuery: '' }">
  <!-- Luisteren naar klik en toetsaanslagen -->
  <button @click="alert('Geklikt!')" class="btn">Klik Hier</button>

  <input type="text" 
         @input="searchQuery = $event.target.value" 
         @keydown.enter="console.log('Zoeken naar:', searchQuery)"
         placeholder="Typ en druk op Enter...">
</div>
```

### Populaire Event Modifiers:
- `@submit.prevent` - Voorkomt standaard pagina herladen (`e.preventDefault()`)
- `@click.stop` - Stopt bubbling naar parent elementen (`e.stopPropagation()`)
- `@click.outside` - Vuurt als de gebruiker **buiten** het element klikt (ideaal voor modals en dropdowns!)
- `@keydown.escape.window` - Luistert globaal op het `window` naar de Escape toets
- `@input.debounce.500ms` - Wacht 500ms na de laatste toetsaanslag alvorens te vuren (voor zoekvelden)

---

## 6. Formulieren & Two-Way Binding: `x-model`

`x-model` synchroniseert de waarde van een formulierveld automatisch tweezijdig met je data:

```html
<div x-data="{ name: '', role: 'student', newsletter: true, age: 20 }">
  <!-- Tekstinvoer -->
  <input type="text" x-model="name" placeholder="Naam" class="input">

  <!-- Select dropdown -->
  <select x-model="role" class="select">
    <option value="student">Student ITF</option>
    <option value="docent">Docent</option>
  </select>

  <!-- Checkbox boolean -->
  <label><input type="checkbox" x-model="newsletter"> Nieuwsbrief ontvangen</label>

  <!-- Number modifier (converteert automatisch naar getal ipv string) -->
  <input type="number" x-model.number="age" class="input">

  <p class="mt-4">Ingevoerd: <strong x-text="name"></strong> (<span x-text="role"></span>, leeftijd: <span x-text="age"></span>)</p>
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
}">
  <ul class="space-y-2">
    <!-- x-for MOET altijd op een <template> element staan! -->
    <template x-for="(course, index) in courses" :key="course.id">
      <li class="p-3 bg-slate-800 border border-slate-700 rounded flex justify-between">
        <span x-text="`${index + 1}. ${course.name}`" class="font-semibold text-white"></span>
        <span class="text-xs text-orange-400 font-mono" x-text="`Semester ${course.semester}`"></span>
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
<div x-data="{ open: false }" class="relative">
  <button @click="open = !open" class="px-4 py-2 bg-orange-600 text-white rounded font-bold">
    Dropdown Menu
  </button>

  <!-- Vloeiende fade en scale overgang -->
  <div x-show="open" 
       @click.outside="open = false"
       x-transition:enter="transition ease-out duration-200"
       x-transition:enter-start="opacity-0 scale-95"
       x-transition:enter-end="opacity-100 scale-100"
       x-transition:leave="transition ease-in duration-150"
       x-transition:leave-start="opacity-100 scale-100"
       x-transition:leave-end="opacity-0 scale-95"
       class="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-2xl">
    <a href="#" class="block py-1.5 text-slate-300 hover:text-white">Mijn Profiel</a>
    <a href="#" class="block py-1.5 text-slate-300 hover:text-white">Instellingen</a>
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
<style>
  [x-cloak] { display: none !important; }
</style>

<div x-data="{ open: false }" x-cloak>
  <p x-show="open">Geen flikkering bij laden!</p>
</div>
```

</div>
<div class="card">

#### 2. `x-ref` & `$refs` (DOM Elementen)
Directe toegang tot DOM nodes:

```html
<div x-data>
  <input type="text" x-ref="zoekVeld" placeholder="Zoeken...">
  <button @click="$refs.zoekVeld.focus()">
    Focus Input
  </button>
</div>
```

</div>
</div>

### 3. `x-init` (Component Lifecycle)
Voert JavaScript code uit zodra het component geïnitialiseerd wordt:
```html
<div x-data="{ items: [] }" x-init="items = await (await fetch('/api/courses')).json()">
  <span x-text="`Aantal cursussen: ${items.length}`"></span>
</div>
```

---

## 8. De Magische Eigenschappen (The `$` Magics)

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

## 9. Herbruikbare Componenten: `Alpine.data()`

Als componentlogica te groot wordt voor inline HTML attributen, definieer je herbruikbare functies:

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

```html
<!-- Gebruik het component overal in je HTML -->
<div x-data="dropdown(false)">
  <button @click="toggle()">Menu</button>
  <div x-show="open" @click.outside="close()">Inhoud...</div>
</div>

<div x-data="dropdown(true)">
  <button @click="toggle()">Ander Menu</button>
  <div x-show="open" @click.outside="close()">Inhoud...</div>
</div>
```

---

## 9. Global State Management: `Alpine.store()`

Wil je data delen tussen verschillende componenten die niet in dezelfde DOM hiërarchie zitten?

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

```html
<!-- Component A: Header Notificatie Badge -->
<nav x-data class="p-4 bg-slate-900 text-white flex justify-between">
  <span>ITF Web Shop</span>
  <span>Winkelmand: <strong class="text-orange-400" x-text="$store.cart.count"></strong> items</span>
</nav>

<!-- Component B: Product Kaart elders op de pagina -->
<div x-data class="p-4 bg-slate-800 rounded">
  <h4>Cursusboek Web Development</h4>
  <button @click="$store.cart.add({ id: 101, title: 'Web Dev' })" class="btn">
    Voeg toe aan winkelmand
  </button>
</div>
```

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
       class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
       x-transition:enter="transition ease-out duration-300"
       x-transition:enter-start="opacity-0"
       x-transition:enter-end="opacity-100"
       x-transition:leave="transition ease-in duration-200"
       x-transition:leave-start="opacity-100"
       x-transition:leave-end="opacity-0">

    <!-- Modal Box met click.outside -->
    <div @click.outside="modalOpen = false"
         class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
      <h3 class="text-2xl font-bold text-orange-400">Belangrijke Mededeling</h3>
      <p class="mt-2 text-slate-300 text-sm">
        Dit venster sluit met de Escape-toets of door buiten het kader te klikken.
      </p>
      <div class="mt-6 flex justify-end gap-3">
        <button @click="modalOpen = false" class="px-4 py-2 bg-slate-800 rounded">Annuleren</button>
        <button @click="modalOpen = false" class="px-4 py-2 bg-orange-600 rounded font-bold">Akkoord</button>
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
}" class="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white">

  <div class="flex gap-4 mb-4">
    <input type="text" x-model="search" placeholder="Zoek op cursusnaam..." class="p-2 bg-slate-800 border border-slate-700 rounded w-full">
    <select x-model="selectedSemester" class="p-2 bg-slate-800 border border-slate-700 rounded">
      <option value="all">Alle Semesters</option>
      <option value="1">Semester 1</option>
      <option value="2">Semester 2</option>
    </select>
  </div>

  <template x-for="course in filteredCourses" :key="course.id">
    <div class="p-3 mb-2 bg-slate-800 border border-slate-700 rounded flex justify-between items-center">
      <span x-text="course.name" class="font-bold"></span>
      <span class="px-2 py-0.5 text-xs rounded bg-orange-500/20 text-orange-400 border border-orange-500/30" x-text="course.level"></span>
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
