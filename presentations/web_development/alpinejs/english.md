---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Alpine.js'
footer: 'Web Development - Thomas More University of Applied Sciences'
---

<!-- _class: lead -->

# Alpine.js Fundamentals

<p class="subtitle">&lt;Lightweight, Declarative JavaScript for Modern Web Apps /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Development | <strong>Topic:</strong> Alpine.js Reactivity, Directives & Stores
</div>

---

## Table of Contents

1. **What is Alpine.js?** - Philosophy, comparison with React/Vue, and key benefits
2. **Installation & Setup** - CDN import and modern bundler integration (Vite)
3. **Interactive Testing** - Testing Alpine.js live in the browser
4. **Core Directives: Basic Reactivity** - `x-data`, `x-text`, `x-html`, `x-show`, and `x-if`
5. **Attributes & Events** - `x-bind` (`:`), `x-on` (`@`), and powerful event modifiers
6. **Forms & Loops** - `x-model` two-way data binding and `x-for`
7. **Advanced Directives** - `x-transition`, `x-cloak`, `x-ref`, and `x-init`
8. **The Magic Properties** <span class="badge badge-cyan">Optional</span> - `$el`, `$refs`, `$dispatch`, `$watch`, and `$nextTick`
9. **Global State & Reusability** <span class="badge badge-cyan">Optional</span> - `Alpine.data()` and `Alpine.store()`
10. **Practical Examples with Tailwind** - Accessible modal and live filterable course catalog

---

## 1. What is Alpine.js?

Alpine.js is a **robust, minimal JavaScript framework** for adding reactive behavior to server-rendered HTML:

> *"Alpine is like Tailwind for JavaScript: you write your reactive behavior directly in your markup without leaving your HTML."*

```html
<!-- A complete, functional counter in 4 lines of HTML -->
<div x-data="{ count: 0 }" class="p-4 bg-slate-800 rounded text-white">
  <button @click="count++" class="px-3 py-1 bg-orange-600 rounded">Increment</button>
  <span x-text="count" class="font-bold ml-2"></span>
</div>
```

<div class="grid-2">
<div class="card">

#### Key Features

- **Minimal footprint:** ~15 KB (gzipped), 0 external dependencies
- **No Virtual DOM:** Mutates the real DOM directly
- **No Build Step Required:** Runs instantly via a standard `<script>` tag

</div>
<div class="card">

#### Ideal Use Cases

- Dropdowns, modals, tabs, and accordions
- Dynamic forms and live search filters
- Perfect companion for Tailwind CSS and Laravel/Node/PHP stacks

</div>
</div>

---

## 1. Why Alpine.js Next to React or Vue?

Traditional SPA frameworks (React, Angular) often require complex build pipelines and take full control of the entire page DOM.

| Feature | Vanilla JavaScript | Alpine.js | React / Vue (SPA) |
| :--- | :--- | :--- | :--- |
| **Package Size** | 0 KB | **~15 KB** | 40 KB - 150+ KB |
| **Architecture** | Imperative (DOM queries) | **Declarative in HTML** | Declarative via Virtual DOM / JSX |
| **Build Step** | Optional | **Not required (can use CDN)** | Mandatory (Node, Vite, Webpack) |
| **Best Suited For** | Simple helper scripts | **Components on existing HTML** | Full Single Page Applications |
| **Learning Curve** | Moderate | **Very fast (15 directives)** | High (state managers, JSX, hooks) |

---

## 2. Installation & Setup

You can include Alpine.js in your project in two primary ways:

### Option A: Via CDN (Fastest and directly in browser)

Add the script tag to the `<head>` of your HTML document with the `defer` attribute:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Alpine App</title>
  <!-- Alpine.js CDN (always use defer!) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <div x-data="{ message: 'Hello Thomas More!' }">
    <h1 x-text="message"></h1>
  </div>
</body>
</html>
```

---

## 2. Installation via NPM (Vite Bundler)

<div class="grid-2">
<div class="card">

#### Option B: Generic Vite / NPM Setup

In a standard frontend project, install Alpine via npm:

```bash
npm install alpinejs
```

Initialize Alpine in your application entrypoint (`resources/js/app.js`):

```javascript
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();
```

</div>
<div class="card card-accent">

#### In Our Laravel Project <span class="badge">Automatic</span>

In our **Thomas More Web Development** projects, manual installation is **unnecessary**:

- **Pre-integrated by default:** Alpine.js and Vite come pre-configured in our Laravel starter stack
- **No npm install needed:** All dependencies and scripts are already included
- **Vite bundler:** `@vite(['resources/css/app.css', 'resources/js/app.js'])` handles Hot Module Replacement (HMR) automatically
- **Livewire integration:** Livewire v4 bundles Alpine.js automatically under the hood

</div>
</div>

---

## 3. Interactive Testing: Testing Alpine.js <span class="badge">Online Playground</span>

Want to experiment with the code examples live in your browser during class?

Visit the interactive sandbox: **<a href="https://alpine-lab.netlify.app/" target="_blank">alpine-lab.netlify.app</a>**

<div class="grid-2">
<div class="card card-accent">

#### Why Alpine Lab?

- **Instant start:** Copy and paste code snippets directly into the interactive editor
- **Tailwind CSS integrated:** All modern utility classes work out-of-the-box
- **Rich component library:** Includes pre-built components and full demo mini-apps

</div>
<div class="card">

#### Student Tip

- Copy code examples from the slides and experiment with reactive state
- Modify directives (`x-show`, `x-model`, `@click`) and observe immediate changes
- Open your browser Developer Tools (F12) to inspect DOM mutations and events

</div>
</div>

---

## 4. Core Directives: `x-data` (Basic Scope)

`x-data` declares a **reactive component scope** and initializes its state:

```html
<!-- Simple reactive component -->
<div x-data="{ title: 'Hello Alpine.js!' }" class="p-4 bg-slate-100 rounded border">
  <h3 x-text="title" class="font-bold text-orange-600"></h3>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### Essential Rules

- **Independent scope:** Every element with `x-data` forms a self-contained reactive component
- **Data nesting:** Nested child elements have direct access to parent scope properties
- **Supported types:** Works with strings, booleans, numbers, arrays, and objects

</div>
<div class="card">

#### What Happens Here?

- `x-data`: Turns the `<div>` into an Alpine component with a reactive `title` property
- `x-text`: Binds the value of `title` as text content inside `<h3>`
- **Reactivity:** Updating the state in JavaScript automatically updates the HTML DOM

</div>
</div>

---

## 4. Core Directives: Mutating State with `@click`

Use `@click` to update state variables and `x-text` to render dynamic text:

```html
<div x-data="{ open: false, title: 'Web Development' }" class="p-4 bg-slate-100 rounded border">
  <h3 x-text="title" class="font-bold text-orange-600"></h3>
  <p class="mt-2">
    Status: <span x-text="open ? 'Open' : 'Closed'" class="font-semibold"></span>
  </p>
  <button @click="open = !open" class="mt-3 px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Toggle Status
  </button>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### `@click` Event Handler

- `@click="open = !open"` toggles the boolean variable between `true` and `false`
- Alpine tracks state modifications and immediately updates all dependent bindings

</div>
<div class="card">

#### `x-text` with Expressions

- `x-text` evaluates standard JavaScript expressions
- **Ternary operator:** `open ? 'Open' : 'Closed'` dynamically outputs the proper string
- Operates reactively without manual DOM manipulation

</div>
</div>

---

## 4. Core Directives: Dynamic Styling with `:class`

Bind CSS classes dynamically to JavaScript state:

```html
<div x-data="{ open: false }" class="p-4 bg-slate-100 rounded border">
  <p>
    Status: <span x-text="open ? 'Open' : 'Closed'"
                  :class="open ? 'text-green-600' : 'text-red-600'"
                  class="font-semibold"></span>
  </p>
  <button @click="open = !open" class="mt-3 px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Toggle Color & Status
  </button>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### Why the colon (`:`) in `:class`?

- The colon `:` is the official shorthand for `x-bind:class`
- **Without `:`**, the browser interprets the attribute as a static CSS string
- **With `:`**, you instruct Alpine: *"evaluate this attribute value as JavaScript!"*

</div>
<div class="card">

#### How the ternary works in `:class`

- `open ? 'text-green-600' : 'text-red-600'`
- Applies `text-green-600` when `open: true` and `text-red-600` when `open: false`
- The text color updates synchronously upon every click event

</div>
</div>

---

## 4. Core Directives: `x-data` (Methods & Interaction)

Define custom methods inside `x-data` to organize business logic cleanly:

```html
<!-- Counter with custom methods -->
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

#### Why Use Methods?

- **Clean markup:** Avoids writing long, complex JavaScript logic inside HTML attributes
- **Reusable:** Call the same method from multiple buttons, forms, or keyboard triggers
- **Execution context:** Inside methods, `this` reliably refers to the current `x-data` scope

</div>
<div class="card">

#### How the Counter Operates

- **Reactivity:** The `<span>` reads `count` via `x-text` and recalculates automatically
- **Boundary guard:** `decrement()` checks `this.count > 0` so the count never drops below 0
- **Events:** `@click="increment()"` triggers the method directly upon user interaction

</div>
</div>

---

## 4. Core Directives: `x-text` and `x-html`

Use `x-text` and `x-html` to inject dynamic values into an HTML element:

```html
<div x-data="{ snippet: 'This is <strong>bold</strong> text' }"
     class="p-4 bg-slate-100 rounded border space-y-2">
  <!-- x-text: renders raw HTML tags as plain escaped text -->
  <p x-text="snippet" class="p-2 bg-white rounded border text-sm"></p>

  <!-- x-html: parses and renders the actual HTML elements -->
  <p x-html="snippet" class="p-2 bg-white rounded border text-sm"></p>
</div>
```

<div class="grid-2">
<div class="card card-accent">

#### `x-text` (Safe & Recommended)

- Sets `innerText` and automatically escapes HTML characters
- **Output:** Displays tags literally as plain text
- Reliably guards against Cross-Site Scripting (XSS) attacks

</div>
<div class="card">

#### `x-html` (Use with Caution)

- Sets `innerHTML` and dynamically creates real DOM elements
- **Output:** Renders actual bold typography and markup
- **Never** use with untrusted end-user input

</div>
</div>

---

## 4. Core Directives: `x-show` (CSS Display)

`x-show` toggles element visibility using inline CSS (`display: none`):

```html
<div x-data="{ isVisible: false }" class="p-4 bg-slate-100 rounded border space-y-2">
  <button @click="isVisible = !isVisible" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Toggle Visibility
  </button>

  <div x-show="isVisible" class="p-2 bg-white rounded border text-sm">
    <strong>x-show:</strong> Visible! This element remains inside the DOM tree at all times.
  </div>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>CSS-Based Toggling</h4>
  <p>Toggles <code>display: none</code> on and off. The HTML node stays in the DOM and preserves internal element state.</p>
</div>
<div class="card">
  <h4>Benefits & Best Uses</h4>
  <p>Blazing fast with zero DOM creation overhead, preserves form input values, and supports smooth transitions via <code>x-transition</code>.</p>
</div>
</div>

---

## 4. Core Directives: `x-if` (DOM Manipulation)

`x-if` physically adds or removes elements from the DOM tree:

```html
<div x-data="{ isVisible: false }" class="p-4 bg-slate-100 rounded border space-y-2">
  <button @click="isVisible = !isVisible" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Toggle Visibility
  </button>

  <!-- Required: x-if must always be placed on a <template> tag -->
  <template x-if="isVisible">
    <div class="p-2 bg-white rounded border text-sm">
      <strong>x-if:</strong> Completely created or destroyed inside the DOM.
    </div>
  </template>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Physical DOM Mutation</h4>
  <p>When <code>false</code>, the node is removed from the DOM. When <code>true</code>, the element is regenerated from scratch.</p>
</div>
<div class="card">
  <h4>Mandatory &lt;template&gt; Wrapper</h4>
  <p>Alpine requires a <code>&lt;template&gt;</code> element as a blueprint. Inside the template, exactly <strong>one</strong> root element is permitted.</p>
</div>
</div>

---

## 4. Core Directives: Why `<template>` with `x-if`?

Unlike `x-show`, `x-if` involves special syntax requirements and a distinct lifecycle:

<div class="grid-2">
<div class="card card-accent">

#### How DOM Injection Works

- **Physical mutation:** Alpine inserts nodes into the page using native DOM APIs
- **Memory efficiency:** Unrendered elements consume 0 active DOM node resources
- **Deferred execution:** Child expressions evaluate only after the element exists
- **State reset:** Internal component state resets clean whenever re-rendered

</div>
<div class="card card-cyan">

#### Why the `<template>` Tag?

- **HTML5 standard:** Browsers do not render the contents of `<template>` by default
- **Blueprint role:** Alpine uses the template as a cloneable prototype for nodes
- **No display: none:** Prevents images or child assets from loading prematurely
- **Single root rule:** Always requires one wrapper tag (e.g. an enclosing `<div>`)

</div>
</div>

---

## 4. Core Directives: `x-show` vs `x-if` (Comparison)

Key technical differences and implementation guidelines:

| Feature | `x-show` | `x-if` |
| :--- | :--- | :--- |
| **DOM Manipulation** | Keeps element in DOM (CSS `display`) | Physically adds / removes element from DOM |
| **Transitions** | **Yes**, supports `x-transition` | No (transitions are not supported) |
| **HTML Syntax** | Directly on any HTML element | **Mandatory** on a `<template>` tag |
| **Render Cost** | Renders initial DOM immediately | Renders DOM only when condition is `true` |

<div class="grid-2">
<div class="card card-accent">

#### When to choose `x-show`?

- **Standard choice for most UI:** Dropdowns, tabs, accordions, modals
- Whenever you want smooth fade or slide transition effects
- Elements that toggle frequently during user interaction

</div>
<div class="card">

#### When to choose `x-if`?

- Heavy components that should not consume memory when inactive
- When child elements must not initialize until required data arrives
- Complex interface sections that users rarely open

</div>
</div>

---

## 5. Attribute Binding: `x-bind` (Shorthand `:`)

Use `x-bind` to bind arbitrary HTML attributes dynamically to JavaScript state:

```html
<div x-data="{ isDisabled: true, placeholderText: 'Type your search query...' }" 
     class="p-4 bg-slate-100 rounded border space-y-3">
  <input type="text" :placeholder="placeholderText" class="p-2 border rounded text-sm bg-white w-full">

  <div class="flex gap-2 items-center">
    <button :disabled="isDisabled" class="px-3 py-1 bg-orange-600 text-white rounded text-sm disabled:opacity-50">
      Submit
    </button>
    <button @click="isDisabled = !isDisabled" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded text-sm">
      Toggle Status
    </button>
  </div>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Why Use x-bind?</h4>
  <p>Bind any HTML attribute (such as <code>:disabled</code>, <code>:placeholder</code>, <code>:href</code>, <code>:src</code>) dynamically to reactive state.</p>
</div>
<div class="card">
  <h4>Shorthand Syntax</h4>
  <p>Simply prefix the attribute with a colon (<code>:</code>) instead of <code>x-bind:</code>. For example, <code>x-bind:disabled</code> becomes <code>:disabled</code>.</p>
</div>
</div>

---

## 5. Dynamic Classes: Useful `:class` Patterns

Alpine provides three expressive ways to apply CSS classes conditionally:

<div class="grid-3">
<div class="card card-accent">

#### 1. Object Syntax

`:class="{ 'bg-red-100 text-red-700': error }"`

- Key = CSS class name
- Value = boolean condition
- Ideal for form validation states

</div>
<div class="card card-cyan">

#### 2. Ternary Syntax

`:class="open ? 'rotate-180' : 'rotate-0'"`

- Standard `if-else` notation
- Toggles between two distinct styles
- Perfect for rotating icons and toggles

</div>
<div class="card">

#### 3. Array Syntax

`:class="[base, active && 'font-bold']"`

- Combines multiple classes
- Blends static and dynamic styles
- Convenient for complex navigation tabs

</div>
</div>

---

## 5. Event Handling: `x-on` (Shorthand `@`)

Use `x-on` (or the concise `@` shorthand) to listen for native browser and custom DOM events:

```html
<div x-data="{ searchQuery: '', submitted: '' }" class="p-4 bg-slate-100 rounded border space-y-2">
  <div class="flex gap-2">
    <input type="text" 
           @input="searchQuery = $event.target.value" 
           @keydown.enter="submitted = searchQuery"
           placeholder="Type and press Enter..."
           class="p-2 border rounded text-sm bg-white">
    <button @click="submitted = searchQuery" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
      Search
    </button>
  </div>
  <p x-show="submitted" class="text-sm">
    Searched for: <strong x-text="submitted" class="text-orange-600"></strong>
  </p>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Event Handlers (@)</h4>
  <p>Listen for any standard DOM event such as <code>@click</code>, <code>@input</code>, <code>@submit</code>, or <code>@keydown</code>.</p>
</div>
<div class="card">
  <h4>The $event Object</h4>
  <p>Provides direct access to the native browser event object, for example to read <code>$event.target.value</code>.</p>
</div>
</div>

---

## 5. Events: Popular Event Modifiers

Event modifiers streamline common JavaScript event handling tasks without boilerplate code:

<div class="grid-2">
<div class="card card-accent">

#### UI & Interaction Modifiers

- `@click.outside` - Triggers when the user clicks **outside** the element (crucial for modals and dropdowns)
- `@submit.prevent` - Prevents the default browser page reload (`e.preventDefault()`)
- `@click.stop` - Stops the event from bubbling up to parent elements (`e.stopPropagation()`)

</div>
<div class="card card-cyan">

#### Keyboard & Timing Modifiers

- `@keydown.escape.window` - Listens globally on the `window` object for the Escape key
- `@keydown.enter` - Specifically responds to the Enter key
- `@input.debounce.500ms` - Waits 500ms after the last keystroke before firing (ideal for search inputs)

</div>
</div>

---

## 6. Forms & Two-Way Data Binding: `x-model`

`x-model` synchronizes the value of an input field bidirectionally with component data:

```html
<div x-data="{ name: 'Sam', role: 'student', newsletter: true, age: 20 }"
     class="p-4 bg-slate-100 rounded border space-y-2">
  <!-- Text input and select dropdown -->
  <div class="flex gap-2">
    <input type="text" x-model="name" placeholder="Name" class="p-2 bg-white border rounded text-sm">
    <select x-model="role" class="p-2 bg-white border rounded text-sm">
      <option value="student">ITF Student</option>
      <option value="lecturer">Lecturer</option>
    </select>
  </div>

  <!-- Checkbox boolean and numeric input -->
  <div class="flex items-center gap-4 text-sm">
    <label class="flex items-center gap-1">
      <input type="checkbox" x-model="newsletter"> Newsletter
    </label>
    <input type="number" x-model.number="age" class="w-16 p-1 bg-white border rounded text-center">
  </div>

  <p class="p-2 bg-white rounded border text-sm">
    Entered: <strong x-text="name"></strong> (<span x-text="role"></span>, age: <span x-text="age"></span>)
  </p>
</div>
```

---

## 6. Iterating Over Lists: `x-for`

Use `x-for` to render lists of items dynamically from an array:

```html
<div x-data="{
  courses: [
    { id: 1, name: 'Web Essentials', semester: 1 },
    { id: 2, name: 'Web Development', semester: 2 },
    { id: 3, name: 'Cloud Engineering', semester: 3 }
  ]
}" class="p-4 bg-slate-100 rounded border max-w-md">
  <ul class="space-y-1">
    <!-- x-for MUST always be placed on a <template> element! -->
    <template x-for="(course, index) in courses" :key="course.id">
      <li class="p-2 bg-white border rounded flex justify-between text-sm">
        <span x-text="`${index + 1}. ${course.name}`"></span>
        <span class="font-bold text-orange-600" x-text="`Semester ${course.semester}`"></span>
      </li>
    </template>
  </ul>
</div>
```

> **Mandatory Best Practice:** Always specify a unique `:key` attribute (e.g. `:key="course.id"`) to ensure proper DOM node tracking and optimal rendering performance.

---

## 7. Advanced: Smooth Transitions with `x-transition`

Use `x-transition` to animate elements toggled by `x-show` without writing custom CSS keyframes:

```html
<div x-data="{ open: false }" class="relative inline-block">
  <button @click="open = !open" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">
    Dropdown Menu
  </button>

  <!-- Smooth animated transition -->
  <div x-show="open" 
       @click.outside="open = false"
       x-transition
       class="absolute left-0 mt-1 w-44 bg-white border rounded p-2 text-sm">
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">My Profile</a>
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">Settings</a>
  </div>
</div>
```

---

## 7. Advanced: `x-cloak`, `x-ref`, and `x-init`

<div class="grid-2">
<div class="card">

#### 1. `x-cloak` (Prevent FOUC)

Hides elements until Alpine has completely initialized:

```html
<div x-data="{ open: false }" x-cloak
     class="p-3 bg-slate-100 rounded border text-sm">
  <p x-show="open" class="text-green-600">No flicker on page load!</p>
</div>
```

</div>
<div class="card">

#### 2. `x-ref` & `$refs` (DOM Elements)

Direct access to specific DOM nodes:

```html
<div x-data class="flex gap-2">
  <input type="text" x-ref="searchField" placeholder="Search..."
         class="p-1 border rounded text-xs bg-white">
  <button @click="$refs.searchField.focus()"
          class="px-2 py-1 bg-orange-600 text-white rounded text-xs">
    Focus
  </button>
</div>
```

</div>
</div>

### 3. `x-init` (Component Lifecycle)

Executes JavaScript code as soon as the component is initialized:

```html
<div x-data="{ items: ['HTML5', 'CSS3', 'Alpine.js'] }" class="p-2 bg-slate-100 rounded border text-sm max-w-md">
  <span x-text="`Total courses loaded: ${items.length}`" class="text-orange-600 font-medium"></span>
</div>
```

---

## Intermezzo: Advanced Features <span class="badge badge-cyan">Optional</span>

A quick announcement regarding the remaining sections of this presentation:

<div class="card card-accent" style="margin-top: 18px; padding: 22px;">

### Everything needed for our Laravel project is already covered!

All the directives we use within our **Thomas More Web Development** projects (`x-data`, `x-show`, `x-if`, `x-bind`, `x-on`, `x-model`) have been thoroughly covered in the preceding slides.

<div style="margin-top: 16px; padding: 14px 18px; background: rgba(0, 156, 171, 0.1); border-left: 4px solid var(--color-secondary); border-radius: 6px;">
  <strong style="color: var(--color-secondary);">Strictly for the die-hards:</strong><br>
  The upcoming slides explore advanced concepts such as custom events (<code>$dispatch</code>), component factories (<code>Alpine.data()</code>), and global stores (<code>Alpine.store()</code>).<br><br>
  These techniques are <strong>not strictly required</strong> for our Laravel project, but serve as valuable deeper knowledge and a helpful reference for anyone looking to master Alpine.js!
</div>

</div>

---

## 8. The Magic Properties (The `$` Magics) <span class="badge badge-cyan">Optional</span>

Alpine provides built-in magic properties prefixed with the `$` symbol:

| Magic Property | Purpose & Functionality |
| :--- | :--- |
| **`$el`** | References the root DOM element of the current component |
| **`$refs`** | Provides access to all elements marked with an `x-ref` attribute |
| **`$event`** | The native browser Event object (e.g. `$event.target.value`) |
| **`$dispatch`** | Emits a custom DOM event to parent components (`$dispatch('item-added', { id: 1 })`) |
| **`$watch`** | Observes changes on a variable (`$watch('tab', val => console.log(val))`) |
| **`$nextTick`** | Waits until Alpine completes DOM updates before executing code |
| **`$store`** | Accesses global reactive stores registered via `Alpine.store()` |

---

## 9. Reusable Components: `Alpine.data()` (Definition) <span class="badge badge-cyan">Optional</span>

When component logic grows too extensive for inline HTML attributes, declare reusable component factories in JavaScript:

```javascript
// Register a reusable component blueprint in JavaScript
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
  <h4>What does Alpine.data() do?</h4>
  <p>Registers a reusable component blueprint under a named identifier, keeping your HTML markup concise and free of long functions.</p>
</div>
<div class="card">
  <h4>Parameters & alpine:init</h4>
  <p>Always listen for the <code>alpine:init</code> event before registration. Supports parameters with default values (such as <code>initialOpen = false</code>).</p>
</div>
</div>

---

## 9. Reusable Components: `Alpine.data()` (Usage in HTML) <span class="badge badge-cyan">Optional</span>

Bind the registered component directly to elements using `x-data="name(parameters)"`:

```html
<!-- Two independent dropdowns sharing the same reusable logic -->
<div x-data="dropdown(false)" class="relative inline-block mr-2">
  <button @click="toggle()" class="px-3 py-1 bg-orange-600 text-white rounded text-sm">Menu 1</button>
  <div x-show="open" @click.outside="close()" class="absolute left-0 mt-1 w-36 bg-white border rounded p-2 text-sm">
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">My Profile</a>
  </div>
</div>
<div x-data="dropdown(false)" class="relative inline-block">
  <button @click="toggle()" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded text-sm">Menu 2</button>
  <div x-show="open" @click.outside="close()" class="absolute left-0 mt-1 w-36 bg-white border rounded p-2 text-sm">
    <a href="#" class="block p-1 hover:bg-slate-100 rounded">Settings</a>
  </div>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>Isolated Component Instances</h4>
  <p>Every element declaring <code>x-data="dropdown(...)"</code> maintains its own isolated state. Menu 1 and Menu 2 function independently.</p>
</div>
<div class="card">
  <h4>Click.outside Dismissal</h4>
  <p>The modifier <code>@click.outside="close()"</code> automatically closes the dropdown whenever the user clicks outside the component boundaries.</p>
</div>
</div>

---

## 9. Global State: `Alpine.store()` (Definition) <span class="badge badge-cyan">Optional</span>

Use `Alpine.store()` to manage global reactive state shared seamlessly across multiple components:

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
  <h4>Why Use a Global Store?</h4>
  <p>Share variables and actions across arbitrary components without complicated parent-child component hierarchies or manual event piping.</p>
</div>
<div class="card">
  <h4>Getters & Reactivity</h4>
  <p>Getters such as <code>get count()</code> dynamically calculate derived values and automatically update all bound HTML elements in real time.</p>
</div>
</div>

---

## 9. Global State: `$store` (Usage in HTML) <span class="badge badge-cyan">Optional</span>

Access the global store from any HTML component using the magic `$store` property:

```html
<!-- Component A: Header Notification Badge -->
<nav x-data class="p-3 bg-slate-100 border rounded flex justify-between text-sm max-w-md">
  <span class="font-bold text-orange-600">ITF Web Shop</span>
  <span>Cart: <strong class="text-orange-600 font-mono" x-text="$store.cart.count"></strong> items</span>
</nav>

<!-- Component B: Product Card elsewhere on the page -->
<div x-data class="p-3 bg-slate-100 border rounded flex justify-between items-center max-w-md mt-2">
  <span class="text-sm font-medium">Web Development Textbook</span>
  <button @click="$store.cart.add({ id: 101, title: 'Web Dev' })"
          class="px-3 py-1 bg-orange-600 text-white rounded text-xs">
    + Add to Cart
  </button>
</div>
```

<div class="grid-2">
<div class="card card-accent">
  <h4>The $store Magic Property</h4>
  <p>Any element with <code>x-data</code> can read data and invoke actions directly via <code>$store.storeName.property</code>.</p>
</div>
<div class="card">
  <h4>Live DOM Synchronization</h4>
  <p>The moment Component B adds a product, Alpine immediately recalculates and updates the count badge in Component A.</p>
</div>
</div>

---

## 10. Practical Example 1: Accessible Modal Dialog

A complete, accessible modal dialog with background blur, Escape key dismissal, and focus management:

```html
<div x-data="{ modalOpen: false }" class="p-4">
  <button @click="modalOpen = true" class="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold">
    Open Modal Dialog
  </button>

  <!-- Modal Backdrop & Container -->
  <div x-show="modalOpen" 
       x-cloak
       @keydown.escape.window="modalOpen = false"
       class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
       x-transition>

    <!-- Modal Box with click.outside -->
    <div @click.outside="modalOpen = false"
         class="w-full max-w-md bg-white border rounded-xl p-6 text-slate-800">
      <h3 class="text-xl font-bold text-orange-600">Important Notice</h3>
      <p class="mt-2 text-sm text-slate-600">
        This dialog closes via the Escape key or by clicking outside the modal box.
      </p>
      <div class="mt-4 flex justify-end gap-2">
        <button @click="modalOpen = false" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded text-sm">Cancel</button>
        <button @click="modalOpen = false" class="px-3 py-1 bg-orange-600 text-white rounded text-sm font-bold">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

---

## 10. Practical Example 2: Live Search & Filterable Course Catalog

```html
<div x-data="{
  search: '',
  selectedSemester: 'all',
  courses: [
    { id: 1, name: 'HTML5 Essentials', semester: '1', level: 'Beginner' },
    { id: 2, name: 'CSS3 & Grid Layouts', semester: '1', level: 'Beginner' },
    { id: 3, name: 'Tailwind CSS v4', semester: '2', level: 'Advanced' },
    { id: 4, name: 'Alpine.js Reactivity', semester: '2', level: 'Advanced' }
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
    <input type="text" x-model="search" placeholder="Search by course name..." class="p-2 bg-white border rounded w-full text-sm">
    <select x-model="selectedSemester" class="p-2 bg-white border rounded text-sm">
      <option value="all">All Semesters</option>
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

# Mastery in Alpine.js

<p class="subtitle">&lt;Minimal Setup, Maximum Reactivity /&gt;</p>

### Key Takeaways for Students

1. **Declarative programming:** Author reactive behavior directly inside HTML attributes
2. **Master the core:** Focus on `x-data`, `x-show`, `x-bind` (`:`), and `x-on` (`@`)
3. **Event Modifiers:** Leverage `@click.outside` and `@keydown.escape.window` for robust interactions
4. **Scalability:** Employ `Alpine.data()` and `Alpine.store()` for larger codebases
5. **The Ultimate Frontend Stack:** Pair **Tailwind CSS v4** for styling with **Alpine.js** for reactivity!

<div class="meta-box" style="margin-top: 24px;">
  <strong>Next step:</strong> Build an interactive dashboard using Tailwind CSS v4 & Alpine.js!
</div>
