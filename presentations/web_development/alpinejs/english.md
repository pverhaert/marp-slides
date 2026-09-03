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
2. **Installation & Setup** - CDN script tag and modern NPM bundler integration (Vite)
3. **Interactive Testing** - Testing Alpine.js live in online sandboxes
4. **Core Directives: Basic Reactivity** - `x-data`, `x-text`, `x-html`, `x-show`, and `x-if`
5. **Attributes & Events** - `x-bind` (`:`), `x-on` (`@`), and powerful event modifiers
6. **Forms & Loops** - `x-model` two-way data binding and `x-for`
7. **Advanced Directives** - `x-transition`, `x-cloak`, `x-ref`, and `x-init`
8. **The Magic Properties** - `$el`, `$refs`, `$dispatch`, `$watch`, and `$nextTick`
9. **Global State & Reusability** - `Alpine.data()` and `Alpine.store()`
10. **Practical Examples with Tailwind** - Modals, live search filtering, and shopping cart

---

## Interactive Playground: Testing Alpine.js <span class="badge">Online Sandbox</span>

Want to test the Alpine.js examples directly in your browser without local setup?

Use one of the interactive playgrounds:
- **CodePen Template:** [codepen.io/pen](https://codepen.io/pen) *(add Alpine CDN in settings)*
- **JSFiddle:** [jsfiddle.net](https://jsfiddle.net)
- **Documentation & Sandbox:** [alpinejs.dev](https://alpinejs.dev)

<div class="grid-2">
<div class="card">

#### Why use an online sandbox?
- **Instant feedback:** Write HTML with `x-data` and observe reactive updates immediately
- **Zero build tooling:** Works out-of-the-box with a standard script tag
- **The ideal stack:** Combine with Tailwind CSS CDN for full UI components

</div>
<div class="card">

#### Recommended during class
- Copy code examples directly from these presentation slides
- Experiment with `x-model`, event modifiers, and state mutations
- Open browser devtools console to inspect events and reactive variables

</div>
</div>

---

## 1. What is Alpine.js?

Alpine.js is a **rugged, minimal JavaScript framework** for adding reactive behavior to server-rendered HTML:

> *"Alpine is like Tailwind for JavaScript: you write your reactive behavior directly in your markup without leaving your HTML."*

```html
<!-- A complete, working reactive counter in 4 lines of HTML -->
<div x-data="{ count: 0 }" class="p-4 bg-slate-800 rounded text-white">
  <button @click="count++" class="px-3 py-1 bg-orange-600 rounded">Increment</button>
  <span x-text="count" class="font-bold ml-2"></span>
</div>
```

<div class="grid-2">
<div class="card">

#### Key Characteristics
- **Minimal footprint:** ~15 KB (gzipped), 0 external dependencies
- **No Virtual DOM:** Directly manipulates the real DOM
- **No build step required:** Works immediately via a simple `<script>` tag

</div>
<div class="card">

#### Ideal Use Cases
- Dropdowns, modals, tabs, and accordions
- Dynamic forms and live search filters
- Perfect companion for Tailwind CSS, Laravel, Node.js, and static sites

</div>
</div>

---

## 1. Why Alpine.js over React or Vue?

Traditional SPA frameworks (React, Angular) often require complex build pipelines and take over the entire page layout.

| Feature | Vanilla JavaScript | Alpine.js | React / Vue (SPA) |
| :--- | :--- | :--- | :--- |
| **Bundle Size** | 0 KB | **~15 KB** | 40 KB - 150+ KB |
| **Architecture** | Imperative (DOM queries) | **Declarative in HTML** | Declarative via Virtual DOM / JSX |
| **Build Step** | Optional | **Not needed (CDN ready)** | Required (Node, Vite, Webpack) |
| **Target Scope** | Simple scripts | **Components on server HTML** | Full Single Page Applications |
| **Learning Curve** | Moderate | **Very fast (15 directives)** | High (state managers, JSX, hooks) |

---

## 2. Installation & Setup

You can include Alpine.js in your project using two primary methods:

### Option A: Via CDN (Fastest, zero configuration)

Include the script in the `<head>` of your HTML document with the `defer` attribute:

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

### Option B: Via NPM in modern frontend projects

```bash
# Install Alpine via npm
npm install alpinejs
```

Initialize Alpine in your JavaScript entrypoint (`main.js` or `app.js`):

```javascript
// src/main.js
import Alpine from 'alpinejs';

// Expose Alpine globally for browser devtools debugging
window.Alpine = Alpine;

// Start the reactive engine
Alpine.start();
```

> **Important:** Always call `Alpine.start()` after registering any custom stores or reusable data components!

---

## 4. Core Directives: `x-data`

`x-data` defines a **reactive component scope** and initializes its state variables:

```html
<!-- Component with local state -->
<div x-data="{ open: false, title: 'Web Development', count: 1 }">
  <h3 x-text="title"></h3>
  <p>Status: <span x-text="open ? 'Open' : 'Closed'"></span></p>
</div>
```

<div class="grid-2">
<div class="card">

#### Fundamental Rules
- Every element with `x-data` is an independent reactive component
- All nested child elements inherit access to parent data
- State can hold strings, booleans, numbers, arrays, objects, and methods

</div>
<div class="card">

#### Methods inside `x-data`
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

## 4. Core Directives: `x-text` and `x-html`

Use `x-text` and `x-html` to inject dynamic data into an HTML element:

```html
<div x-data="{ name: 'Patrick', bio: 'Lecturer <strong>ITF</strong>' }">
  <!-- x-text: Safe text interpolation (prevents XSS attacks) -->
  <p>Welcome, <span x-text="name"></span>!</p>

  <!-- x-html: Renders raw HTML tags -->
  <div x-html="bio"></div>
</div>
```

<div class="grid-2">
<div class="card">

#### `x-text` (Recommended)
- Updates the element's `innerText`
- Automatically escapes special characters (safe from XSS vulnerabilities)
- Supports arbitrary JS expressions: `x-text="score * 2"`

</div>
<div class="card">

#### `x-html` (Use with caution)
- Updates the element's `innerHTML`
- **Never** use `x-html` with untrusted user-supplied input

</div>
</div>

---

## 4. `x-show` vs `x-if`: Visibility Control

Alpine offers two ways to conditionally render elements:

```html
<div x-data="{ isVisible: false }">
  <button @click="isVisible = !isVisible" class="btn">Toggle Visibility</button>

  <!-- 1. x-show: Toggles CSS display: none -->
  <div x-show="isVisible" class="card">
    This element remains in the DOM with style="display: none;".
  </div>

  <!-- 2. x-if: Physically creates or destroys the element in the DOM (requires <template>) -->
  <template x-if="isVisible">
    <div class="card">
      This element is completely mounted or unmounted in the DOM.
    </div>
  </template>
</div>
```

| Feature | `x-show` | `x-if` |
| :--- | :--- | :--- |
| **DOM Manipulation** | Retains element (CSS `display`) | Physically adds / removes element |
| **Supports `x-transition`** | Yes (smooth CSS transitions) | No |
| **Requires `<template>` tag** | No, works on any HTML element | **Yes, mandatory on `<template>`** |

---

## 5. Attribute Binding: `x-bind` (Shorthand `:`)

Use `x-bind` (or the `:` shorthand) to bind HTML attributes dynamically to JavaScript state:

```html
<div x-data="{ isUrgent: true, isDisabled: false, imgUrl: 'img/logo.webp' }">
  <!-- Dynamic class binding via object syntax -->
  <div :class="{ 'border-red-500 bg-red-950': isUrgent, 'border-slate-700': !isUrgent }" class="border p-4 rounded">
    Notification Box
  </div>

  <!-- Dynamic standard HTML attributes -->
  <button :disabled="isDisabled" class="btn">Submit</button>
  <img :src="imgUrl" alt="Dynamic Logo" class="w-16">
</div>
```

### Useful `:class` Patterns:
- **Object Syntax:** `:class="{ 'active': isActive, 'error': hasError }"`
- **Ternary Syntax:** `:class="isOpen ? 'rotate-180' : 'rotate-0'"`
- **Array Syntax:** `:class="[baseClass, dynamicClass]"`

---

## 5. Event Handling: `x-on` (Shorthand `@`)

Use `x-on` (or the `@` shorthand) to listen for native browser and custom DOM events:

```html
<div x-data="{ searchQuery: '' }">
  <!-- Listening to clicks and keypress events -->
  <button @click="alert('Clicked!')" class="btn">Click Me</button>

  <input type="text" 
         @input="searchQuery = $event.target.value" 
         @keydown.enter="console.log('Searching for:', searchQuery)"
         placeholder="Type and press Enter...">
</div>
```

### Essential Event Modifiers:
- `@submit.prevent` - Prevents default page refresh (`e.preventDefault()`)
- `@click.stop` - Stops event bubbling to parent containers (`e.stopPropagation()`)
- `@click.outside` - Fires when user clicks **outside** the element (crucial for modals & dropdowns!)
- `@keydown.escape.window` - Listens globally on the `window` for the Escape key
- `@input.debounce.500ms` - Delays execution by 500ms after the last keypress (great for search inputs)

---

## 6. Forms & Two-Way Binding: `x-model`

`x-model` synchronizes the value of an input element bi-directionally with component data:

```html
<div x-data="{ name: '', role: 'student', newsletter: true, age: 20 }">
  <!-- Text input -->
  <input type="text" x-model="name" placeholder="Name" class="input">

  <!-- Select dropdown -->
  <select x-model="role" class="select">
    <option value="student">ITF Student</option>
    <option value="lecturer">Lecturer</option>
  </select>

  <!-- Checkbox boolean -->
  <label><input type="checkbox" x-model="newsletter"> Subscribe to newsletter</label>

  <!-- Number modifier (automatically casts input to numeric type) -->
  <input type="number" x-model.number="age" class="input">

  <p class="mt-4">Current state: <strong x-text="name"></strong> (<span x-text="role"></span>, age: <span x-text="age"></span>)</p>
</div>
```

---

## 6. List Rendering: `x-for`

Use `x-for` to dynamically loop over arrays and render template items:

```html
<div x-data="{
  courses: [
    { id: 1, name: 'Web Essentials', semester: 1 },
    { id: 2, name: 'Web Development', semester: 2 },
    { id: 3, name: 'Cloud Engineering', semester: 3 }
  ]
}">
  <ul class="space-y-2">
    <!-- x-for MUST always be declared on a <template> tag! -->
    <template x-for="(course, index) in courses" :key="course.id">
      <li class="p-3 bg-slate-800 border border-slate-700 rounded flex justify-between">
        <span x-text="`${index + 1}. ${course.name}`" class="font-semibold text-white"></span>
        <span class="text-xs text-orange-400 font-mono" x-text="`Semester ${course.semester}`"></span>
      </li>
    </template>
  </ul>
</div>
```

> **Mandatory Best Practice:** Always supply a unique `:key` attribute (e.g., `:key="course.id"`) for efficient DOM tracking and patch performance.

---

## 7. Advanced: Smooth Transitions with `x-transition`

Animate elements entering and leaving the DOM when toggled with `x-show`:

```html
<div x-data="{ open: false }" class="relative">
  <button @click="open = !open" class="px-4 py-2 bg-orange-600 text-white rounded font-bold">
    Dropdown Menu
  </button>

  <!-- Smooth fade and scale transition -->
  <div x-show="open" 
       @click.outside="open = false"
       x-transition:enter="transition ease-out duration-200"
       x-transition:enter-start="opacity-0 scale-95"
       x-transition:enter-end="opacity-100 scale-100"
       x-transition:leave="transition ease-in duration-150"
       x-transition:leave-start="opacity-100 scale-100"
       x-transition:leave-end="opacity-0 scale-95"
       class="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-2xl">
    <a href="#" class="block py-1.5 text-slate-300 hover:text-white">My Profile</a>
    <a href="#" class="block py-1.5 text-slate-300 hover:text-white">Settings</a>
  </div>
</div>
```

---

## 7. Advanced: `x-cloak`, `x-ref`, and `x-init`

<div class="grid-2">
<div class="card">

#### 1. `x-cloak` (Prevent FOUC)
Hides elements until Alpine is fully loaded:

```html
<style>
  [x-cloak] { display: none !important; }
</style>

<div x-data="{ open: false }" x-cloak>
  <p x-show="open">No flickering on page load!</p>
</div>
```

</div>
<div class="card">

#### 2. `x-ref` & `$refs` (Direct DOM Access)
Direct element reference without `document.querySelector`:

```html
<div x-data>
  <input type="text" x-ref="searchField" placeholder="Search...">
  <button @click="$refs.searchField.focus()">
    Focus Input
  </button>
</div>
```

</div>
</div>

### 3. `x-init` (Component Lifecycle)
Runs JavaScript initialization logic when the component mounts:
```html
<div x-data="{ items: [] }" x-init="items = await (await fetch('/api/courses')).json()">
  <span x-text="`Total courses: ${items.length}`"></span>
</div>
```

---

## 8. The Magic Properties (The `$` Magics)

Alpine provides built-in magic helpers prefixed with the `$` sign:

| Magic Property | Purpose & Functionality |
| :--- | :--- |
| **`$el`** | References the root DOM element of the current component |
| **`$refs`** | Provides access to all elements tagged with `x-ref` within the component |
| **`$event`** | The raw native browser Event object (e.g., `$event.target.value`) |
| **`$dispatch`** | Dispatches a custom DOM event that bubbles up to parent containers (`$dispatch('item-added', { id: 1 })`) |
| **`$watch`** | Observes state mutations (`$watch('tab', val => console.log(val))`) |
| **`$nextTick`** | Executes a callback after Alpine has finished updating the DOM |
| **`$store`** | Accesses global reactive state stores registered via `Alpine.store()` |

---

## 9. Reusable Components: `Alpine.data()`

When component logic grows too complex for inline HTML attributes, extract it into reusable functions:

```javascript
// Register a reusable component function
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
<!-- Instantiate the component across your HTML markup -->
<div x-data="dropdown(false)">
  <button @click="toggle()">Menu</button>
  <div x-show="open" @click.outside="close()">Content...</div>
</div>

<div x-data="dropdown(true)">
  <button @click="toggle()">Second Menu</button>
  <div x-show="open" @click.outside="close()">Content...</div>
</div>
```

---

## 9. Global State Management: `Alpine.store()`

Share reactive state seamlessly across detached components in separate DOM trees:

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
<!-- Component A: Header Cart Badge -->
<nav x-data class="p-4 bg-slate-900 text-white flex justify-between">
  <span>ITF Web Store</span>
  <span>Cart: <strong class="text-orange-400" x-text="$store.cart.count"></strong> items</span>
</nav>

<!-- Component B: Product Card located elsewhere on the page -->
<div x-data class="p-4 bg-slate-800 rounded">
  <h4>Web Development Course Book</h4>
  <button @click="$store.cart.add({ id: 101, title: 'Web Dev' })" class="btn">
    Add to Cart
  </button>
</div>
```

---

## 10. Practical Example 1: Accessible Modal Dialog

A production-ready modal dialog with backdrop blur, Escape key dismissal, and outside click handling:

```html
<div x-data="{ modalOpen: false }" class="p-4">
  <button @click="modalOpen = true" class="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold">
    Open Modal Dialog
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

    <!-- Modal Box with @click.outside -->
    <div @click.outside="modalOpen = false"
         class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
      <h3 class="text-2xl font-bold text-orange-400">Important Announcement</h3>
      <p class="mt-2 text-slate-300 text-sm">
        This dialog closes seamlessly on Escape keypress or by clicking outside the modal boundary.
      </p>
      <div class="mt-6 flex justify-end gap-3">
        <button @click="modalOpen = false" class="px-4 py-2 bg-slate-800 rounded">Cancel</button>
        <button @click="modalOpen = false" class="px-4 py-2 bg-orange-600 rounded font-bold">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

---

## 10. Practical Example 2: Live Search & Filterable Course List

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
}" class="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white">

  <div class="flex gap-4 mb-4">
    <input type="text" x-model="search" placeholder="Search by course title..." class="p-2 bg-slate-800 border border-slate-700 rounded w-full">
    <select x-model="selectedSemester" class="p-2 bg-slate-800 border border-slate-700 rounded">
      <option value="all">All Semesters</option>
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

# Mastering Alpine.js

<p class="subtitle">&lt;Minimal Setup, Maximum Reactivity /&gt;</p>

### Key Takeaways for Students

1. **Think Declarative:** Express component behavior directly inside HTML attributes
2. **Master the Essentials:** Command `x-data`, `x-show`, `x-bind` (`:`), and `x-on` (`@`)
3. **Leverage Modifiers:** Use `@click.outside` and `@keydown.escape.window` for accessible UIs
4. **Scale with Architecture:** Use `Alpine.data()` and `Alpine.store()` for growing web applications
5. **The Modern Web Stack:** Combine **Tailwind CSS v4** for design with **Alpine.js** for frontend reactivity!

<div class="meta-box" style="margin-top: 24px;">
  <strong>Next Step:</strong> Build a complete interactive web dashboard using Tailwind CSS v4 & Alpine.js!
</div>
