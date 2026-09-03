---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Bootstrap 5.3 Grid'
footer: 'Web Essentials - Thomas More University of Applied Sciences'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bootstrap 5.3 Grid System

<p class="subtitle">&lt;Building responsive layouts with 12 columns /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Essentials | <strong>Module:</strong> Bootstrap Layout
</div>

---

## Table of Contents

1. **What is Bootstrap?** - Introduction and purpose
2. **The Three Building Blocks** - Container, Row, Columns
3. **Breakpoints** - Responsive screen tiers
4. **Containers** - Container types and behaviors
5. **The 12-Column Model** - How to partition the page
6. **Responsive Classes** - `col-sm-`, `col-md-`, `col-lg-`
7. **Auto-layout** - Automatic column sizing
8. **Nesting Columns** - Grid within grid
9. **Gutters** - Spacing between columns
10. **Offset and Order** - Positioning and sequence
11. **Practical Example** - Portfolio layout
12. **Common Pitfalls** - Mistakes to avoid

---

## What is Bootstrap 5.3?

Bootstrap is an **open-source CSS framework** providing ready-to-use styles and UI components for responsive web development.

<div class="grid-2">
<div class="card card-accent">

#### Why Bootstrap?

- No need to write CSS from scratch
- Automatically **responsive** (adapts to any screen size)
- Highly consistent and well-documented
- Widely adopted across the software industry

</div>
<div class="card card-cyan">

#### Installation via CDN

```html
<!-- Inside your <head> -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```

Or via npm:
```bash
npm install bootstrap@5.3
```

</div>
</div>

---

## The Three Building Blocks

The Bootstrap grid always relies on **three nested elements** in this strict sequence:

<div class="card card-glass">

#### Grid Hierarchy

- **`.container`** - Centers content horizontally and provides horizontal padding
- **`.row`** - Wrapper for columns; applies negative margins to counteract gutters
- **`.col` or `.col-*`** - Immediate children of `.row` containing the actual page content

</div>

```html
<div class="container">
  <div class="row">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
  </div>
</div>
```

> **Crucial Rule:** Never place a `.col` directly inside a `.container`. Columns must always be direct children of a `.row`!

---

## Breakpoints - Responsive Screen Tiers

Bootstrap 5.3 defines **6 responsive breakpoints** based on minimum viewport widths:

| Name | Class Infix | Min. Width | Typical Device |
| :--- | :---: | :---: | :--- |
| Extra small | *(none)* | < 576px | Small phones (portrait) |
| **Small** | `sm` | 576px | Phones (landscape) |
| **Medium** | `md` | 768px | Tablets |
| **Large** | `lg` | 992px | Laptops / small desktops |
| **Extra large** | `xl` | 1200px | Desktop monitors |
| **XXL** | `xxl` | 1400px | Large widescreen displays |

> **Mobile-first approach:** Bootstrap styles scale upwards. A class without an infix applies to all viewports; a class with an infix applies from that breakpoint **and wider**.

---

## Containers

Containers serve as the outermost wrapper for your layout structure:

<div class="grid-3">
<div class="card card-accent">

#### `.container`

Fixed maximum width per breakpoint. Automatically centered with side margins.

```html
<div class="container">
  ...
</div>
```

</div>
<div class="card card-cyan">

#### `.container-fluid`

Always 100% wide, spanning the entire viewport width at all times.

```html
<div class="container-fluid">
  ...
</div>
```

</div>
<div class="card">

#### `.container-{bp}`

100% wide until the specified breakpoint is reached, then fixed width.

```html
<div class="container-md">
  ...
</div>
```

</div>
</div>

---

## The 12-Column Model

Every Bootstrap row is subdivided into **12 equal columns**. You specify how many units each element spans:

<div class="card card-glass">

#### Partitioning 12 Units

- `col-12` = 12/12 = **100%** width (spans the full row)
- `col-6` + `col-6` = 6/12 + 6/12 = two columns of **50%** each
- `col-4` + `col-4` + `col-4` = three columns of **33.3%** each
- `col-8` + `col-4` = main content of **66.7%** + sidebar of **33.3%**

</div>

> **Golden Rule:** Column units inside a `.row` should add up to **12**. If the total exceeds 12, extra columns automatically wrap onto a new line.

---

## Basic Grid Syntax

```html
<div class="container">
  <div class="row">

    <!-- 4 out of 12 columns = 33% width -->
    <div class="col-4">Sidebar</div>

    <!-- 8 out of 12 columns = 67% width -->
    <div class="col-8">Main Content</div>

  </div>
  <div class="row">

    <!-- Three equal columns: 4 + 4 + 4 = 12 -->
    <div class="col-4">Project Card 1</div>
    <div class="col-4">Project Card 2</div>
    <div class="col-4">Project Card 3</div>

  </div>
</div>
```

---

## Responsive Classes

Combine multiple breakpoint classes to create **adaptive layouts across device sizes**:

```html
<!-- Mobile: 100% wide | Tablet: 50% wide | Laptop: 33.3% wide -->
<div class="col-12 col-md-6 col-lg-4">
  Project Card
</div>
```

<div class="grid-3">
<div class="card card-accent">

#### Mobile (`< 768px`)
`col-12`
- Occupies **100%** width
- Cards stack vertically

</div>
<div class="card card-cyan">

#### Tablet (`>= 768px`)
`col-md-6`
- Occupies **50%** width
- 2 cards per row side by side

</div>
<div class="card">

#### Laptop (`>= 992px`)
`col-lg-4`
- Occupies **33.3%** width
- 3 cards per row side by side

</div>
</div>

---

## Auto-layout Columns

Use `col` **without a number** to distribute available space equally:

<div class="grid-2">
<div class="card card-accent">

#### Equal Distribution

```html
<div class="row">
  <div class="col">Column 1</div>
  <div class="col">Column 2</div>
  <div class="col">Column 3</div>
</div>
```

Each `.col` automatically receives exactly **1/3** of the available width.

</div>
<div class="card card-cyan">

#### Fixed Width + Auto

```html
<div class="row">
  <div class="col">Auto rest</div>
  <div class="col-6">Fixed 50%</div>
  <div class="col">Auto rest</div>
</div>
```

The two `.col` elements split the remaining 50% equally (25% each).

</div>
</div>

> `col-auto` sizes the column based on the natural width of its **content** (`fit-content`).

---

## Nesting Columns

You can start a **nested sub-grid** inside any column by introducing another `.row`:

```html
<div class="container">
  <div class="row">

    <!-- Primary column: 8 of 12 columns -->
    <div class="col-8">
      <h2>Main Content</h2>

      <!-- Nested row: offers 12 new units within col-8 -->
      <div class="row">
        <div class="col-6">Inner Left (50%)</div>
        <div class="col-6">Inner Right (50%)</div>
      </div>
    </div>

    <!-- Sidebar: 4 of 12 columns -->
    <div class="col-4">Sidebar</div>

  </div>
</div>
```

---

## Gutters - Spacing Between Columns

Gutters control the **gutters / padding** between columns:

| Class | Application |
| :--- | :--- |
| `g-0` to `g-5` | Horizontal and vertical gutters |
| `gx-0` to `gx-5` | Horizontal gutters only (left/right) |
| `gy-0` to `gy-5` | Vertical gutters only (top/bottom) |

```html
<!-- Large horizontal gutter, compact vertical gutter -->
<div class="row gx-4 gy-2">
  <div class="col-6">Card A</div>
  <div class="col-6">Card B</div>
  <div class="col-6">Card C</div>
  <div class="col-6">Card D</div>
</div>
```

> `g-0` removes all gutters (useful for edge-to-edge layouts like photo galleries).

---

## Offset - Shifting Columns

Use `offset-{bp}-{n}` to shift a column to the right using blank column units:

```html
<div class="row">
  <!-- Spans 4 units, centered (4 blank + 4 content + 4 blank = 12) -->
  <div class="col-4 offset-4">
    Centered Box
  </div>
</div>

<div class="row">
  <div class="col-md-4">Left Box</div>
  <!-- Skips 4 column units on tablets and larger screens -->
  <div class="col-md-4 offset-md-4">Right Box</div>
</div>
```

> Useful for centered login forms, modal dialogs, or staggered portfolio cards.

---

## Order - Visual Reordering

Use `order-{bp}-{n}` to modify the **visual order** of content without altering the HTML structure:

```html
<div class="row">
  <!-- Mobile: order-2 (below) | Desktop: order-md-1 (left) -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>About Me</h2>
    <p>On desktop, this text appears to the left of the image.</p>
  </div>

  <!-- Mobile: order-1 (above) | Desktop: order-md-2 (right) -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="profile.webp" alt="Profile Picture">
  </div>
</div>
```

> Perfect for **mobile-first design**: display the photo first on mobile screens, and beside the text on desktop displays.

---

## Practical Example: Portfolio Layout

```html
<div class="container">

  <!-- Navigation: full width -->
  <div class="row">
    <div class="col-12"><nav>Portfolio of Jef</nav></div>
  </div>

  <!-- Main Section + Sidebar -->
  <div class="row gy-4">
    <!-- Mobile: 100% | Desktop: 8 columns -->
    <div class="col-12 col-lg-8">
      <h2>My Projects</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">Project 1</div>
        <div class="col-12 col-md-6 col-xl-4">Project 2</div>
        <div class="col-12 col-md-6 col-xl-4">Project 3</div>
      </div>
    </div>

    <!-- Mobile: 100% | Desktop: 4 columns -->
    <div class="col-12 col-lg-4">
      <aside>About Me & Contact</aside>
    </div>
  </div>

</div>
```

---

## Common Pitfalls

<div class="grid-2">
<div class="card card-accent">

#### Pitfalls to Avoid

- Placing `.col` directly in `.container` (without `.row`)
- Forgetting that breakpoint classes **cascade upwards** (`col-md-6` applies to `lg`, `xl`, and `xxl`)
- Columns in a single row that unintentionally do not sum to 12
- Applying margins directly to `.row`, breaking column alignment

</div>
<div class="card card-cyan">

#### Proper Structure

```html
<!-- CORRECT: container -> row -> col -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">...</div>
    <div class="col-12 col-md-6">...</div>
  </div>
</div>
```

</div>
</div>

> **Tip:** Use your **Browser DevTools** (F12) to inspect the flexbox grid and computed column dimensions visually.

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Summary

<p class="subtitle">&lt;Bootstrap 5.3 Grid - Key Takeaways /&gt;</p>

<div class="meta-box">
  - <strong>Hierarchy:</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 Columns:</strong> always distribute across 12 units per row<br>
  - <strong>Mobile-first:</strong> design from small (<code>col-12</code>) to large (<code>col-lg-4</code>)<br>
  - <strong>Utilities:</strong> <code>g-*</code> (gutters), <code>offset-*</code> (shifting), <code>order-*</code> (ordering)
</div>