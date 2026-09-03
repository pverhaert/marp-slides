---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Flux UI'
footer: 'Web Development - Thomas More Hogeschool'
---

<!-- _class: lead -->

# Flux UI Componenten

<p class="subtitle">&lt;Modern, Accessible UI Components for Laravel & Livewire /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Development | <strong>Thema:</strong> Flux UI Bibliotheek & Formulieren in Laravel 13
</div>

---

## Inhoudsopgave

1. **Wat is Flux UI?** - Officiële componentenbibliotheek voor Livewire en Tailwind
2. **Installatie & Setup in Laravel 13** - Composer package, scripts en assets
3. **Interactief Oefenen** - Officiële documentatie en component playground
4. **Waarom Flux? Voordelen tov "Vanilla" Tailwind** - Toegankelijkheid, consistentie en productiviteit
5. **Code Vergelijking: Flux Input vs Handmatige HTML** - 18 regels boilerplate vs 1 regel Flux
6. **Formulier Componenten (Free Tier)** - `flux:input`, `flux:textarea`, `flux:select`, `flux:checkbox`, `flux:radio`
7. **Knoppen & Acties** - `flux:button`, varianten, formaten en Livewire loading integratie
8. **Modals & Overlays** - `flux:modal` met focus trap en backdrop effecten
9. **Data Weergave & Structuur** - `flux:badge`, `flux:card` en `flux:table`
10. **Aanpassen & Customizen** - Varianten, Tailwind overrides, accentkleuren en slots
11. **Praktijkvoorbeeld in Laravel** - Compleet invoerformulier met validatie en modal
12. **Samenvatting & Best Practices** - Richtlijnen voor professionele Laravel UIs

---

## Interactief Oefenen: Flux UI Docs <span class="badge">Online Documentatie</span>

Raadpleeg tijdens de lessen en projecten de officiële documentatie van de gratis Flux componenten:

**[fluxui.dev/docs](https://fluxui.dev/docs)**

<div class="grid-2">
<div class="card">

#### Wat biedt de Gratis Tier van Flux?
- **Volledige formulierenset:** Inputs, textareas, selects, checkboxes, switches en radio groepen
- **Knoppen & Badges:** Alle primaire, outline, ghost en danger varianten
- **Modals & Dialogs:** Volledig toegankelijke popups met toetsenbordnavigatie
- **Icons & Cards:** Gestandaardiseerde Lucide iconen en container wrappers

</div>
<div class="card">

#### Integratie in ons Curriculum
- In het vak **Web Development** combineren we **Laravel 13**, **Tailwind CSS v4**, **Livewire v4** en **Flux UI**
- Dit vormt de snelste en meest robuuste stack voor moderne webapplicaties

</div>
</div>

---

## 1. Wat is Flux UI?

Flux is een **officiële UI componentenbibliotheek** speciaal ontworpen voor Livewire en Tailwind CSS:

<div class="grid-2">
<div class="card">

#### Ontworpen voor Livewire
- Gemaakt door Caleb Porzio (bedenker van Livewire en Alpine)
- Componenten begrijpen automatisch `wire:model`, Livewire foutmeldingen en loading states
- Geen ingewikkelde JavaScript bridges of externe React/Vue component wrappers

</div>
<div class="card">

#### Gebouwd op Tailwind CSS
- Gebruikt moderne Tailwind utility classes
- Volledige ondersteuning voor Dark Mode out-of-the-box
- 100% aanpasbaar via standaard Tailwind klassen en themavariabelen

</div>
</div>

---

## 2. Installatie & Setup in Laravel 13

Installeer Flux in je Laravel applicatie via Composer:

```bash
# 1. Installeer het Flux package
composer require livewire/flux

# 2. Publiceer de assets en configuratie (optioneel voor customizen)
php artisan flux:publish
```

Voeg de Flux directives toe aan je hoofdlayout (`resources/views/layouts/app.blade.php`):

```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <title>ITF Web Development</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @fluxAppearance
</head>
<body class="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
    {{ $slot }}

    @fluxScripts
</body>
</html>
```

---

## 4. Waarom Flux? Voordelen tov Zelf Gestylde Componenten

Waarom gebruiken we Flux in plaats van elk element zelf te stylen met Tailwind?

<div class="grid-2">
<div class="card">

#### 1. Ingebouwde Toegankelijkheid (A11y)
- Correcte ARIA attributen (`aria-invalid`, `aria-describedby`, `aria-expanded`)
- Automatische koppeling tussen `<label for="...">` en `<input id="...">`
- Volledige toetsenbordnavigatie (Tab, Escape, Pijltjestoetsen) en focus trapping in modals

</div>
<div class="card">

#### 2. Automatische Livewire Validatie
- Toont validatiefouten **zonder handmatige `@error` blokken**
- Kleurt veldranden automatisch rood bij ongeldige invoer
- Verwijdert foutmeldingen zodra de gebruiker het veld corrigeert

</div>
</div>

<div class="grid-2" style="margin-top: 16px;">
<div class="card">

#### 3. Enorme Tijdswinst
- 80-90% minder regels Blade code in je views
- Geen copy-paste van complexe formulier HTML structuren

</div>
<div class="card">

#### 4. Consistente Huisstijl
- Uniforme focus rings, spacing, typografie en dark mode doorheen de hele applicatie

</div>
</div>

---

## 5. Code Vergelijking: Handmatige Tailwind Formuliercode

Bekijk de enorme hoeveelheid boilerplate code voor **één enkel formulierveld** met foutafhandeling:

```html
<!-- Handmatige Tailwind & Blade Form Input: 18 regels boilerplate! -->
<div>
    <div class="flex justify-between items-center mb-1">
        <label for="email" class="block text-sm font-medium text-slate-200">
            E-mailadres <span class="text-red-500">*</span>
        </label>
        <span class="text-xs text-slate-400">Verplicht</span>
    </div>
    
    <div class="relative rounded-md shadow-sm">
        <input 
            type="email" 
            id="email" 
            wire:model.blur="email" 
            placeholder="student@thomasmore.be"
            class="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 @error('email') border-red-500 text-red-400 focus:border-red-500 @enderror"
            aria-invalid="@error('email') true @else false @enderror"
        >
    </div>
    <p class="mt-1 text-xs text-slate-400">Gebruik je Thomas More account.</p>

    @error('email')
        <p class="mt-1 text-xs text-red-500 font-medium">{{ $message }}</p>
    @enderror
</div>
```

---

## 5. Code Vergelijking: Dezelfde Functionaliteit in Flux UI

Hetzelfde invoerveld met label, toelichting, badge, icon én automatische validatie in Flux:

```html
<!-- Flux UI Component: Slechts 1 elegante, leesbare regel! -->
<flux:input 
    type="email"
    label="E-mailadres" 
    badge="Verplicht"
    description="Gebruik je Thomas More account."
    icon="envelope" 
    wire:model.blur="email" 
    placeholder="student@thomasmore.be" 
/>
```

<div class="grid-2" style="margin-top: 14px;">
<div class="card">

#### Wat gebeurt er automatisch?
1. Rendert een semantisch `<label>` met badge
2. Voegt het envelop-icoon links netjes gecentreerd in
3. Knoopt de beschrijving vast via `aria-describedby`

</div>
<div class="card">

#### Automatische Foutafhandeling
- Detecteert `$errors->has('email')` in Livewire
- Toont de foutmelding met fouticoon in het rood
- Kleurt de rand en focusring van het veld rood

</div>
</div>

---

## 6. Formulier Componenten: Input & Wachtwoorden

Flux biedt krachtige modifiers voor invoervelden:

```html
<!-- 1. Tekstveld met Zoekicoon en Wissen knop -->
<flux:input icon="magnifying-glass" wire:model.live="search" placeholder="Zoeken..." clearable />

<!-- 2. Wachtwoordveld met ingebouwde Toon/Verberg knop (viewable) -->
<flux:input type="password" label="Wachtwoord" wire:model="password" viewable />

<!-- 3. Numeriek veld met prefix en suffix -->
<flux:input type="number" label="Prijs" wire:model="price">
    <x-slot:prefix>EUR</x-slot:prefix>
    <x-slot:suffix>.00</x-slot:suffix>
</flux:input>

<!-- 4. Veld met Toetsenbord Shortcut badge -->
<flux:input label="Snel zoeken" placeholder="Druk op shortcut" kbd="Ctrl+K" />
```

---

## 6. Formulier Componenten: Textarea & Select

```html
<!-- Auto-resizing Textarea met karakterlimiet of beschrijving -->
<flux:textarea 
    label="Projectbeschrijving" 
    wire:model="description" 
    placeholder="Beschrijf je Web Development project..." 
    rows="4" 
/>

<!-- Gestandaardiseerde Dropdown Selectie -->
<flux:select label="Opleidingstraject" wire:model="track" placeholder="Kies een traject...">
    <flux:select.option value="app-dev">Application Development</flux:select.option>
    <flux:select.option value="ai">Artificial Intelligence</flux:select.option>
    <flux:select.option value="cloud">Cloud & Cyber Security</flux:select.option>
</flux:select>
```

> **Belangrijk:** Zowel `<flux:textarea>` als `<flux:select>` renderen automatisch labels, helpteksten en fouten net zoals `<flux:input>`.

---

## 6. Formulier Componenten: Checkbox, Radio & Switch

```html
<!-- 1. Enkele Checkbox met beschrijving -->
<flux:checkbox label="Accepteer de Algemene Voorwaarden" wire:model="terms" />

<!-- 2. Checkbox Groep -->
<flux:checkbox.group label="Interesses" wire:model="skills">
    <flux:checkbox value="laravel" label="Laravel & Livewire" />
    <flux:checkbox value="tailwind" label="Tailwind CSS v4" />
    <flux:checkbox value="alpine" label="Alpine.js" />
</flux:checkbox.group>

<!-- 3. Radio Groep -->
<flux:radio.group label="Campus Locatie" wire:model="campus">
    <flux:radio value="geel" label="Campus Geel" />
    <flux:radio value="lier" label="Campus Lier" />
</flux:radio.group>

<!-- 4. Toggle Switch -->
<flux:switch label="E-mailnotificaties ontvangen" wire:model="notifications" />
```

---

## 7. Knoppen & Acties (`flux:button`)

Flux knoppen hebben ingebouwde varianten, formaten en Livewire loading indicators:

```html
<div class="flex flex-wrap gap-3 items-center">
    <!-- Primaire Actie -->
    <flux:button variant="primary" wire:click="save">Opslaan</flux:button>

    <!-- Subtiele / Outline varianten -->
    <flux:button variant="filled">Filled Knop</flux:button>
    <flux:button variant="outline">Outline Knop</flux:button>
    <flux:button variant="ghost">Ghost Knop</flux:button>

    <!-- Gevaarlijke actie (rood) -->
    <flux:button variant="danger" wire:click="delete">Verwijderen</flux:button>

    <!-- Knop met Icoon en Formaten -->
    <flux:button icon="plus" size="sm" variant="primary">Toevoegen</flux:button>
    <flux:button icon-trailing="arrow-right">Volgende</flux:button>
</div>
```

> **Automatische Loading State:** Zodra je `wire:click="save"` toevoegt, toont `<flux:button>` automatisch een laadspinner en wordt de knop tijdelijk uitgeschakeld tijdens de serveraanvraag!

---

## 8. Modals & Dialogen (`flux:modal`)

Bouw toegankelijke popups en dialoogvensters in enkele regels Blade code:

```html
<!-- 1. Trigger Knop -->
<flux:modal.trigger name="edit-user">
    <flux:button variant="primary" icon="pencil">Gebruiker Bewerken</flux:button>
</flux:modal.trigger>

<!-- 2. Het Modal Component -->
<flux:modal name="edit-user" class="md:w-96 space-y-6">
    <div>
        <h3 class="text-lg font-bold">Profiel Bewerken</h3>
        <p class="text-sm text-slate-400">Pas je contactgegevens aan.</p>
    </div>

    <flux:input label="Volledige Naam" wire:model="name" />
    <flux:input label="E-mail" type="email" wire:model="email" />

    <div class="flex justify-end gap-2">
        <flux:modal.close>
            <flux:button variant="ghost">Annuleren</flux:button>
        </flux:modal.close>
        <flux:button variant="primary" wire:click="updateProfile">Opslaan</flux:button>
    </div>
</flux:modal>
```

---

## 9. Data Weergave: Badges, Cards & Tables

```html
<!-- 1. Badges in diverse kleuren en formaten -->
<flux:badge color="orange">Web Development</flux:badge>
<flux:badge color="cyan" size="sm">ITF</flux:badge>
<flux:badge color="emerald" icon="check">Actief</flux:badge>
<flux:badge color="rose" icon="x-mark">Inactief</flux:badge>

<!-- 2. Gestructureerde Card Container -->
<flux:card class="space-y-4">
    <div class="flex justify-between items-center">
        <h4 class="font-bold text-lg">Cursus Details</h4>
        <flux:badge color="orange">Semester 2</flux:badge>
    </div>
    <p class="text-sm text-slate-400">Leer moderne webinterfaces bouwen met de TALL stack.</p>
    <flux:button size="sm" variant="outline">Meer Info</flux:button>
</flux:card>
```

---

## 10. Aanpassen & Customizen (Theming)

Flux is ontworpen om moeiteloos aan te sluiten op je eigen ontwerpsysteem:

<div class="grid-2">
<div class="card">

#### 1. Directe Tailwind Overrides
Voeg extra Tailwind klassen toe aan elk Flux component via het `class` attribuut:

```html
<flux:input 
    label="Zoeken" 
    class="bg-slate-950 border-orange-500/50" 
/>
<flux:button 
    class="w-full shadow-lg hover:shadow-orange-500/20"
>
    Verzenden
</flux:button>
```

</div>
<div class="card">

#### 2. Accentkleuren Configureren
Stel de algemene accentkleur in op componenten of globaal in je layout:

```html
<!-- Accentkleur per component -->
<flux:button accent="orange">
    Thomas More Oranje
</flux:button>

<!-- Variant en formaat instellen -->
<flux:badge color="orange" size="lg">
    Premium
</flux:badge>
```

</div>
</div>

---

## 10. Geavanceerd: Uitgebreide Slots Gebruiken

Heb je extra maatwerk nodig? Splits het formulierveld op in afzonderlijke subcomponenten:

```html
<flux:field>
    <div class="flex justify-between items-center">
        <flux:label>Studentennummer</flux:label>
        <span class="text-xs text-orange-400 font-mono">r0123456</span>
    </div>

    <flux:input icon="identification" wire:model="studentNumber" placeholder="r-nummer" />

    <flux:description>Vul het r-nummer in dat op je studentenkaart staat.</flux:description>

    <!-- Handmatige error override indien gewenst -->
    <flux:error name="studentNumber" />
</flux:field>
```

> **Flexibiliteit:** Met `<flux:field>` behoud je alle voordelen van automatische ARIA koppelingen, maar heb je 100% controle over de HTML layout.

---

## 11. Praktijkvoorbeeld: Cursus Registratie Formulier

```html
<flux:card class="max-w-xl mx-auto space-y-6">
    <div>
        <h3 class="text-xl font-bold">Inschrijven voor Web Development</h3>
        <p class="text-sm text-slate-400">Vul onderstaand formulier in om je in te schrijven.</p>
    </div>

    <form wire:submit="register" class="space-y-4">
        <flux:input label="Naam van de Student" wire:model="name" icon="user" required />
        <flux:input type="email" label="E-mailadres" wire:model="email" icon="envelope" required />

        <flux:select label="Keuzevak" wire:model="course">
            <flux:select.option value="livewire">Livewire v4 & Flux UI</flux:select.option>
            <flux:select.option value="alpine">Alpine.js Essentials</flux:select.option>
            <flux:select.option value="tailwind">Tailwind CSS v4 Advanced</flux:select.option>
        </flux:select>

        <flux:checkbox label="Ik ga akkoord met de examenvoorwaarden" wire:model="agree" />

        <div class="flex justify-end gap-3 pt-2">
            <flux:button variant="ghost" type="reset">Wissen</flux:button>
            <flux:button variant="primary" type="submit">Inschrijving Bevestigen</flux:button>
        </div>
    </form>
</flux:card>
```

---

<!-- _class: lead -->

# Meesterschap in Flux UI

<p class="subtitle">&lt;Write Less Blade, Build Better Interfaces /&gt;</p>

### Belangrijkste Takeaways voor Studenten

1. **Stop met Boilerplate:** Gebruik `<flux:input>`, `<flux:select>` en `<flux:button>` voor schone code
2. **Automatische Validatie:** Geen handmatige `@error` blokken of rode border klassen meer nodig
3. **Toegankelijkheid Standaard:** Geniet van automatische ARIA koppelingen en toetsenbordnavigatie
4. **Loading States Ingebouwd:** Knoppen tonen automatisch feedback bij `wire:click` en formulieren
5. **De Ultieme Laravel 13 Stack:** **Tailwind CSS v4** + **Livewire v4** + **Flux UI**!

<div class="meta-box" style="margin-top: 24px;">
  <strong>Documentatie:</strong> Raadpleeg <a href="https://fluxui.dev/docs">fluxui.dev/docs</a> voor alle componenten!
</div>
