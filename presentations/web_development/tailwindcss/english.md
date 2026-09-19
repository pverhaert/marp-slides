---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Tailwind CSS v4'
footer: 'Web Development - Thomas More University of Applied Sciences'
---

<!-- _class: lead -->

# Tailwind CSS v4

<p class="subtitle">&lt;Utility-First Modern CSS Framework /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Development | <strong>Topic:</strong> Tailwind CSS v4 Fundamentals & What Is New
</div>

---

## Table of Contents

1. **What is Utility-First CSS?** - Philosophy, benefits, and comparison with traditional CSS
2. **Installation & Getting Started in v4** - The modern `@import "tailwindcss";` standard
3. **Core Utilities** - Spacing, Sizing, Typography, and Colors
4. **Layout & Box Model** - Flexbox, CSS Grid, Borders, and Shadows
5. **Modifiers & Responsive Design** - `hover:`, `focus:`, `dark:`, and Mobile-First breakpoints
6. **Arbitrary Values & the '!' Modifier** - Dynamic values (`w-[350px]`) and `!important`
7. **Customization in v4: `@theme` & Custom Classes** - Colors, breakpoints, `@utility`, and `@apply`
8. **Practical Component Example** - Step by step building a modern UI card
9. **What is New in Tailwind CSS v4?** - Oxide engine in Rust, CSS-first config, and migration from v3

---

## Interactive Playground: Tailwind Play <span class="badge">Online Sandbox</span>

Want to test the example code from this presentation immediately without any local setup?

Use the official interactive playground:
**[play.tailwindcss.com](https://play.tailwindcss.com)**

<div class="grid-2">
<div class="card">

#### Why Tailwind Play?

- **Instant feedback:** Write HTML utility classes and preview the live UI in your browser
- **Full feature set:** Supports all hover states, focus rings, responsive breakpoints, and dark mode
- **Zero setup:** No Node.js, Vite, or local tooling required to start experimenting

</div>
<div class="card">

#### Recommended during class

- Copy code examples directly from these slides
- Paste them into the Tailwind Play sandbox
- Adjust colors, spacing (`p-4` to `p-8`), or layouts on the fly to see the immediate result

</div>
</div>

---

## 1. What is Utility-First CSS?

In traditional CSS development, you invent a **class name** first and then write isolated CSS rules:

```html
<!-- Traditional: Semantic classes -->
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="https://picsum.photos/id/41/100/100" alt="Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">New Message</h4>
    <p class="chat-notification-message">You have 1 unread message!</p>
  </div>
</div>
```

**Drawbacks of traditional CSS:**

- Constant *naming fatigue* (struggling to name every single container)
- Bloated stylesheets that grow continuously as features are added
- Fear of regression bugs when editing existing shared CSS classes

---

## 1. The Utility-First Approach in Tailwind

With Tailwind CSS, you compose interfaces by combining **small, single-purpose utility classes** directly in your HTML:

```html
<!-- Tailwind CSS: Utility-first -->
<div class="p-6 max-w-sm mx-auto bg-slate-800 rounded-xl shadow-lg flex items-center gap-x-4 border border-slate-700">
  <div class="shrink-0">
    <img class="size-12 rounded-full" src="https://picsum.photos/id/41/100/100" alt="Logo">
  </div>
  <div>
    <h4 class="text-xl font-medium text-white">New Message</h4>
    <p class="text-slate-400 text-sm">You have 1 unread message!</p>
  </div>
</div>
```

<div class="grid-2">
<div class="card">

#### Applied Utilities

- `p-6`: padding of 1.5rem (24px)
- `max-w-sm`: maximum width of 24rem
- `bg-slate-800`: dark slate background
- `rounded-xl`: smooth curved border radius

</div>
<div class="card">

#### Layout & Typography

- `flex items-center gap-x-4`: flex alignment with gap
- `text-white font-medium`: white text with medium weight
- `size-12`: equal width and height of 3rem (48px)

</div>
</div>

---

## 1. Why Choose Tailwind CSS?

<div class="grid-2">
<div class="card">

#### 1. Zero Naming Fatigue

No need to invent arbitrary names like `.sidebar-inner-wrapper-v2`.

#### 2. Built-in Design Tokens

No random pixel values (`17px`, `19px`), but a mathematically consistent scale for spacing, fonts, and colors.

</div>
<div class="card">

#### 3. Micro Production Bundle

Tailwind extracts and compiles **only the classes you actually use**. Production CSS is frequently under 15KB!

#### 4. Fearless Local Editing

Modifying a button only alters that specific markup element, eliminating unexpected side-effects across other pages.

</div>
</div>

---

## 2. Installation & Setup in Tailwind CSS v4

Tailwind CSS v4 introduces a **CSS-first** developer workflow. No JavaScript configuration file required!

### Step 1: Install via npm / Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 2: Register plugin in `vite.config.ts`

```javascript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### Step 3: Import in your main CSS file (`style.css`)

```css
@import "tailwindcss";
```

---

## 3. Spacing: Padding & Margin

Tailwind uses a 4px-based scaling system where **1 unit = 0.25rem = 4px**:

| Class | CSS Property | Value (at root 16px) |
| :--- | :--- | :--- |
| `p-1` / `m-1` | `padding` / `margin` | `0.25rem` (4px) |
| `p-2` / `m-2` | `padding` / `margin` | `0.5rem` (8px) |
| `p-4` / `m-4` | `padding` / `margin` | `1rem` (16px) |
| `p-6` / `m-6` | `padding` / `margin` | `1.5rem` (24px) |
| `p-8` / `m-8` | `padding` / `margin` | `2rem` (32px) |

```html
<!-- Directional Spacing -->
<div class="pt-4 pb-2 px-6 mx-auto">
  <!-- pt = padding-top, pb = padding-bottom, px = padding left + right -->
  <!-- mx-auto = margin: 0 auto (horizontal centering) -->
</div>
```

---

## 3. Sizing: Width & Height

```html
<!-- Fixed and relative sizing -->
<div class="w-full max-w-lg min-h-64">
  <!-- w-full: width 100% -->
  <!-- max-w-lg: max-width 32rem (512px) -->
  <!-- min-h-64: min-height 16rem (256px) -->
</div>

<!-- size-* shortcut for square dimensions -->
<img class="size-16 rounded-full" src="avatar.webp" alt="Avatar">
<!-- size-16 is equivalent to: w-16 h-16 (64px x 64px) -->
```

<div class="grid-2">
<div class="card">

#### Fractional Widths (Percentages)

- `w-1/2` = `50%`
- `w-1/3` = `33.33%`
- `w-3/4` = `75%`

</div>
<div class="card">

#### Viewport Units

- `w-screen` = `100vw`
- `h-screen` = `100vh`
- `min-h-dvh` = `100dvh` (dynamic mobile viewport)

</div>
</div>

---

## 3. Typography & Text Styles

```html
<h1 class="text-3xl font-bold tracking-tight leading-tight uppercase">
  Thomas More ITF
</h1>
<p class="text-base font-normal text-slate-400 leading-relaxed text-justify line-clamp-2">
  A clear summary of Tailwind CSS v4 for Applied Computer Science students.
</p>
```

| Category | Essential Tailwind Classes |
| :--- | :--- |
| **Size** | `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-xl` (20px), `text-3xl` (30px) |
| **Weight** | `font-light` (300), `font-normal` (400), `font-semibold` (600), `font-bold` (700) |
| **Alignment** | `text-left`, `text-center`, `text-right`, `text-justify` |
| **Transform** | `uppercase`, `lowercase`, `capitalize`, `normal-case` |
| **Decoration** | `underline`, `line-through`, `no-underline` |

---

## 3. The Color Palette

Tailwind provides an expertly calibrated color scale from `50` (lightest) to `950` (darkest):

```html
<!-- Background, text, and border colors -->
<button class="bg-orange-600 text-white border border-orange-500 hover:bg-orange-700">
  Enroll Now
</button>
```

<div class="grid-2">
<div class="card">

#### Built-in Color Families

- **Neutrals:** `slate`, `gray`, `zinc`, `neutral`, `stone`
- **Accents:** `orange`, `amber`, `yellow`, `emerald`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `rose`

</div>
<div class="card">

#### Opacity Modifier Slash

Easily apply alpha transparency to any color utility:

- `bg-slate-900/80` = 80% background opacity
- `text-white/50` = 50% text opacity
- `border-orange-500/25` = 25% border opacity

</div>
</div>

---

## 4. Box Model, Borders & Shadows

```html
<div
  class="border-2 border-slate-500 rounded-xl shadow-xl/30 shadow-slate-600 ring-1 ring-white/10">
  <p class="p-4 text-orange-700">Visually striking card with borders and elevation.</p>
</div>
```

<div class="grid-2">
<div class="card">

#### Border Radius (`rounded-*`)

- `rounded-sm`: 2px
- `rounded-md`: 6px
- `rounded-lg`: 8px
- `rounded-2xl`: 16px
- `rounded-full`: 9999px (circular badges and pills)

</div>
<div class="card">

#### Box Shadows & Rings

- `shadow-sm`, `shadow-md`, `shadow-xl`
- `ring-2 ring-orange-500`: paints an outline without shifting box model layout (ideal for accessibility focus rings)

</div>
</div>

---

## 4. Flexbox Utilities in Tailwind

```html
<!-- Navigation Header using Flexbox -->
<nav class="flex flex-row justify-between items-center gap-6 p-4 bg-slate-900">
  <div class="font-bold text-orange-500">Thomas More</div>
  
  <ul class="flex items-center gap-4">
    <li><a href="#" class="text-slate-300 hover:text-white">Home</a></li>
    <li><a href="#" class="text-slate-300 hover:text-white">Courses</a></li>
  </ul>
  
  <button class="shrink-0 px-4 py-2 bg-orange-600 rounded-lg text-white font-medium">
    Login
  </button>
</nav>
```

- **Direction:** `flex-row`, `flex-col`, `flex-wrap`
- **Main Axis (Justify):** `justify-start`, `justify-center`, `justify-between`, `justify-around`
- **Cross Axis (Align):** `items-start`, `items-center`, `items-end`, `items-stretch`
- **Gap:** `gap-2`, `gap-4`, `gap-8` (replaces margin hacks!)

---

## 4. CSS Grid Utilities in Tailwind

Build multi-column grid layouts with concise utility classes:

```html
<!-- Responsive 12-Column Grid Layout -->
<div class="grid grid-cols-12 gap-6">
  <!-- Main content takes 8 columns -->
  <main class="col-span-12 md:col-span-8 bg-slate-800 p-6 rounded-xl">
    <h2 class="text-2xl font-bold text-white">Main Content Area</h2>
  </main>
  
  <!-- Sidebar takes 4 columns -->
  <aside class="col-span-12 md:col-span-4 bg-slate-800 p-6 rounded-xl">
    <h3 class="text-xl font-bold text-orange-400">Sidebar Widget</h3>
  </aside>
</div>
```

- `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-12`
- `col-span-4`, `col-span-6`, `col-span-full`
- `gap-6` (sets both row and column spacing)

---

## 5. Pseudo-class Modifiers (`hover:`, `focus:`)

Style interactive component states by prefixing modifiers to any utility class:

```html
<button class="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg
               border border-slate-700
               hover:bg-orange-600 hover:border-orange-500 hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
               active:bg-orange-800
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all duration-200">
  Click Me
</button>
```

- **`hover:`**: Mouse cursor hovers over element
- **`focus:`**: Element focused via keyboard Tab or click
- **`active:`**: Mouse button actively pressed down
- **`disabled:`**: Input or button in disabled state
- **`transition-*` & `duration-*`**: Smooth animated property transitions

---

## 5. Advanced Modifiers: `group-hover:` & `peer:`

### 1. `group-hover` (Styling based on parent state)

```html
<div class="group p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
  <h3 class="text-white group-hover:text-orange-500 transition">HTML5 Course</h3>
  <p class="text-slate-400 group-hover:text-slate-200">Hovering over the card turns this title orange.</p>
</div>
```

### 2. `peer` (Styling based on sibling input state)

```html
<!-- Input validation styling using peer -->
<input type="email" class="peer border rounded p-2 bg-slate-900 text-white" placeholder="Email address" required>
<p class="hidden peer-invalid:block text-red-500 text-xs mt-1">Invalid email address!</p>
```

---

## 5. Responsive Design (Mobile-First)

Tailwind adheres to the **Mobile-First** approach. Unprefixed classes target mobile; breakpoint modifiers apply **at that screen width and above (`min-width`)**:

| Prefix | Minimum Screen Width | Target Device Class |
| :--- | :--- | :--- |
| *(default)* | `0px` and up | Smartphones (portrait) |
| **`sm:`** | `640px` | Large phones / small tablets |
| **`md:`** | `768px` | Tablets (iPad portrait) |
| **`lg:`** | `1024px` | Laptops / desktop screens |
| **`xl:`** | `1280px` | Standard monitors |
| **`2xl:`** | `1536px` | Ultra-wide displays |

```html
<!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
  <div class="p-4 bg-slate-800 rounded">Card 1</div>
  <div class="p-4 bg-slate-800 rounded">Card 2</div>
</div>
```

---

## 5. Dark Mode Support

Seamlessly support dark and light visual themes with the `dark:` modifier:

```html
<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-white p-6 rounded-xl border border-slate-200 dark:border-slate-800">
  <h3 class="text-lg font-bold text-slate-900 dark:text-orange-400">Automatic Theme Switching</h3>
  <p class="text-slate-600 dark:text-slate-300 mt-2">
    Automatically adapts to the visitor's operating system preferences.
  </p>
</div>
```

### Dark Mode Strategies

1. **System Preference (Default):** Responds to OS `@media (prefers-color-scheme: dark)`.
2. **Manual Toggle:** Applies when `class="dark"` is added to the root `<html>` element.

---

## 6. Arbitrary Values & One-Offs

Need to break outside the default design tokens for a unique edge-case? Use **square brackets `[...]`**:

```html
<!-- Custom pixel widths or exact hex colors -->
<div class="w-[320px] top-[17px] bg-[#e84e10] p-[13px] tracking-[0.25em]">
  Custom layout with exact dimensions.
</div>

<!-- Complex CSS functions -->
<div class="mt-[20px] grid grid-cols-[200px_1fr_100px] h-[calc(100vh-300px)] border">
  Custom grid structure
</div>
```

> **Best Practice:** Reserve arbitrary values for rare one-offs. For repeated design tokens, define them in `@theme` inside your stylesheet!

---

## 6. The '!' (Important) Modifier

Need to override an aggressive CSS rule from a third-party UI library or legacy stylesheet?

In **Tailwind CSS v4**, you place the exclamation mark `!` at the **very end** of the class name:

```html
<!-- v4 Syntax: Trailing exclamation mark -->
<div class="bg-red-600! text-white! p-6! hidden! md:block!">
  Critical alert banner that overrides all third-party widget styles.
</div>
```

<div class="grid-2">
<div class="card">

#### Syntax Change in v4

- **v3 (old):** `!bg-red-600`, `hover:!bg-orange-600`
- **v4 (new):** `bg-red-600!`, `hover:bg-orange-600!`
- *Rationale:* Aligns with CSS syntax (`property: value !important;`)

</div>
<div class="card">

#### How it works & Rule

- `bg-red-600!` generates: `background-color: #dc2626 !important;`
- `p-0!` generates: `padding: 0px !important;`
- Use `!` **strictly as a last resort** for third-party CSS clashes

</div>
</div>

---

## 7. Theme Customization: Custom Colors via `@theme`

In Tailwind v4, you define custom brand colors directly in CSS inside the `@theme` directive:

```css
/* Inside your main CSS file (style.css) */
@import "tailwindcss";

@theme {
  /* Define Thomas More brand colors */
  --color-tmk-orange: #e84e10;
  --color-tmk-orange-light: #ff753a;
  --color-tmk-blue: #009cab;
  --color-tmk-dark: #0f141c;
}
```

<div class="grid-2">
<div class="card">

#### Generated Utility Classes

- `bg-tmk-orange` and `text-tmk-blue`
- `border-tmk-orange/50` (with opacity support)
- `hover:bg-tmk-orange-light`

</div>
<div class="card">

#### Dual Benefit

- Instantly usable as Tailwind utility classes
- Simultaneously available at runtime as native CSS variables: `var(--color-tmk-orange)`

</div>
</div>

---

## 7. Theme Customization: Custom Breakpoints

Customize existing screen breakpoints or introduce new ones via `@theme`:

```css
@theme {
  /* 1. Override existing breakpoint (md was 768px -> becomes 800px) */
  --breakpoint-md: 800px;

  /* 2. Add extra-small breakpoint (xs: 480px) */
  --breakpoint-xs: 480px;

  /* 3. Add ultra-wide display breakpoint (3xl: 1920px) */
  --breakpoint-3xl: 1920px;
}
```

```html
<!-- Use your custom breakpoints directly in HTML -->
<div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 3xl:grid-cols-6 gap-4">
  <div class="p-4 bg-slate-800 rounded">Responsive item</div>
</div>
```

> **Tip:** To clear all default breakpoints and start from a blank canvas, use `--breakpoint-*: initial;`.

---

## 7. Creating Custom Classes: `@apply` vs `@utility`

Frequently repeating the same combination of utility classes? Create a custom class:

<div class="grid-2">
<div class="card">

#### Method 1: `@apply` (Component Classes)

Groups utilities under a traditional selector:

```css
.card-tmk {
  @apply bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl;
}

.btn-tmk {
  @apply bg-tmk-orange text-white px-5 py-2.5 rounded-lg font-bold hover:opacity-90 transition;
}
```

</div>
<div class="card">

#### Method 2: `@utility` (New in v4)

Creates a true atomic utility that automatically supports `hover:`, `dark:`, and `md:`:

```css
@utility tab-active {
  background-color: var(--color-tmk-orange);
  color: #ffffff;
  font-weight: 700;
}
```

Usage: `<button class="hover:tab-active dark:tab-active">Tab</button>`

</div>
</div>

---

## 8. Practical Example: Building a Modern Card Component

Bringing all concepts together into a modern, responsive Thomas More course card with custom `@theme` colors:

```html
<article class="group relative flex flex-col justify-between overflow-hidden rounded-2xl
                bg-slate-900 border border-slate-800 p-6 shadow-xl
                hover:border-tmk-orange/50 hover:shadow-tmk-orange/10
                transition-all duration-300">
  <div>
    <div class="flex items-center justify-between">
      <span class="rounded-full bg-tmk-orange/10 px-3 py-1 text-xs font-semibold text-tmk-orange-light border border-tmk-orange/20">
        ITF Module
      </span>
      <span class="text-xs text-slate-500 font-mono">Semester 1</span>
    </div>
    
    <h3 class="mt-4 text-xl font-bold text-white group-hover:text-tmk-orange-light transition-colors">
      Web Development
    </h3>
    <p class="mt-2 text-sm text-slate-400 leading-relaxed">
      Learn modern frontend engineering with Tailwind CSS v4, component architecture, and responsive layouts.
    </p>
  </div>

  <a href="#" class="mt-6 inline-flex items-center justify-center rounded-lg bg-tmk-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition active:scale-95">
    Start Course →
  </a>
</article>
```

---

## 9. What is New in Tailwind CSS v4? <span class="badge">Next Generation</span>

Tailwind CSS v4.0 is a **ground-up re-architecture** of the framework:

<div class="grid-2">
<div class="card">

#### Core Architectural Upgrades

1. **Oxide Engine (Rust):** Blazing fast compilation (up to 100x faster!)
2. **CSS-First Configuration:** No `tailwind.config.js` needed
3. **`@theme` Directive:** Configure design tokens directly in CSS

</div>
<div class="card">

#### Modern Web Platform Integrations

1. **Automatic Content Discovery:** No manual path arrays
2. **Single Import:** `@import "tailwindcss";`
3. **Native CSS Features:** P3 colors, `@starting-style`, Container Queries

</div>
</div>

---

## 9. Comparison Table: Tailwind v3 vs Tailwind v4

| Feature | Tailwind CSS v3 | Tailwind CSS v4 |
| :--- | :--- | :--- |
| **Compiler Engine** | JavaScript + PostCSS | **Rust Oxide Engine + Lightning CSS** |
| **Build Speed** | Milliseconds to seconds | **Microseconds (up to 100x faster)** |
| **Configuration** | `tailwind.config.js` | **CSS-First via `@theme` in CSS** |
| **Import Syntax** | `@tailwind base; @tailwind components; ...` | **`@import "tailwindcss";`** |
| **Content Discovery** | Manual paths array in JS | **Automatic workspace scanning** |
| **Color Space** | sRGB (Hex / RGB) | **OKLCH & Display P3 support** |
| **Container Queries** | Required separate plugin | **Native out-of-the-box** |

---

## 9. Automated Migration via Upgrade Tool

Upgrading an existing Tailwind v3 project to v4 is made easy with the official CLI migration tool:

```bash
npx @tailwindcss/upgrade@next
```

### What does the upgrade tool do automatically?

1. Parses your existing `tailwind.config.js`.
2. Converts custom colors, fonts, and spacing into `@theme` rules in your CSS file.
3. Replaces legacy `@tailwind` directives with `@import "tailwindcss";`.
4. Updates `package.json` dependencies and bundler config (Vite / Next.js).
5. Cleans up obsolete PostCSS config files.

---

<!-- _class: lead -->

# Mastering Tailwind CSS v4

<p class="subtitle">&lt;Faster Builds, Modern CSS & Instant Productivity /&gt;</p>

### Key Takeaways for Students

1. **Think Utility-First:** Compose interfaces rapidly in HTML using consistent tokens
2. **Design Mobile-First:** Use `sm:`, `md:`, `lg:` for responsive layout adaptations
3. **Master Modifiers:** Leverage `hover:`, `focus:`, `group-hover:`, and `dark:`
4. **Harness v4 Power:** Experience microsecond builds and CSS-first configuration via `@theme`

<div class="meta-box" style="margin-top: 24px;">
  <strong>Next Step:</strong> Build your own responsive web dashboard with Tailwind v4!
</div>
