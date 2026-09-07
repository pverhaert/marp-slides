---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Bootstrap 5.3.8 Grid'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bootstrap 5.3.8 Grid System

<p class="subtitle">&lt;Building responsive layouts with 12 columns /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Essentials | <strong>Module:</strong> Bootstrap Layout
</div>

---

## Table of Contents

1. **What is Bootstrap 5.3.8?** - Introduction and modular setup
2. **Why Reboot?** - CSS normalization and box-sizing
3. **Difference .css vs .min.css** - Development versus production
4. **The Three Building Blocks** - Container, Row, Columns
5. **Breakpoints** - Responsive viewport boundaries
6. **Containers** - Container types and widths
7. **The 12-Column Model** - Dividing the layout
8. **Responsive Classes** - `col-sm-`, `col-md-`, `col-lg-`
9. **Auto-layout** - Automatic column sizing
10. **Difference .col vs .col-auto** - Space sharing versus content sizing
11. **Nesting Columns** - Subgrids within columns
12. **Gutters** - Spacing between columns
13. **Offset and Order** - Positioning and reordering
14. **Practical Example & Common Mistakes** - Portfolio layout and best practices

---

## What is Bootstrap 5.3.8?

Bootstrap is a popular **open-source CSS framework** for designing responsive, mobile-first web pages.

<div class="grid-2">
<div class="card card-accent">

#### Why Bootstrap in Web Essentials?

- Avoid building complex grids and media queries from scratch
- Fully **responsive** and dependable across every screen dimension
- Industry standard for clean, structured layouts
- **Semester 1:** We focus **exclusively** on layout and the 12-column grid
- **Semester 2:** UI components (modals, navbar, alerts, buttons) follow later

</div>
<div class="card card-cyan">

#### Modular CDN Installation (v5.3.8)

Load **only** reboot and grid in your `<head>`:

```html
<!-- 1. Reset and normalization baseline -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-reboot.min.css">

<!-- 2. The 12-column flexbox grid system -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-grid.min.css">
```

> **Important:** In Semester 1, do **not** load the full `bootstrap.min.css`. Modular stylesheets keep your code lightweight and pedagogically clear!

</div>
</div>

---

## Why Add `bootstrap-reboot`?

Every browser (Chrome, Firefox, Safari, Edge) applies its own default margins, font sizes, and dimensions. **Reboot** establishes a single universal baseline.

<div class="grid-2">
<div class="card card-accent">

#### What is and does Reboot?

- An evolved **CSS reset** (built on top of Normalize.css)
- Eliminates inconsistent browser styling (*user-agent styles*)
- Provides a stable, predictable foundation for the grid
- **Typography baseline:** `line-height: 1.5` and modern system fonts
- **Element resets:** `table` (`border-collapse`), forms, and links normalized

</div>
<div class="card card-cyan">

#### Crucial for the Grid

- **`box-sizing: border-box`** on every element:
  - Padding and border are included **inside** calculated widths
  - Essential to prevent columns from jumping or overflowing!
- **Consistent margins:**
  - `margin-top: 0` on `h1`-`h6`, `p`, and lists prevents unexpected margin collapsing
  - Predictable `margin-bottom` constructed with `rem` units

</div>
</div>

---

## Difference: `xxx.css` vs `xxx.min.css`

Bootstrap distributes two variants of each stylesheet. Both contain **the exact same CSS rules**, but differ in formatting and file size:

<div class="grid-2">
<div class="card">

#### `xxx.css` (Development version)

- **Human-readable format:** spaces, tabs, line breaks, and comments
- **Purpose:** Studying how Bootstrap crafts rules and local debugging
- **Disadvantage:** Much larger file size (extra network overhead)

```css
/* Example in bootstrap-grid.css */
.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}
```

</div>
<div class="card card-accent">

#### `xxx.min.css` (Production version)

- **Minified:** All whitespace, line breaks, and comments are stripped
- **Purpose:** Production and live environments (such as via CDN)
- **Advantage:** **60% to 80% smaller** file size

```css
/* Same rule in bootstrap-grid.min.css */
.row-cols-auto>*{flex:0 0 auto;width:auto;}
```

> **Conclusion:** Always use the `.min.css` variant in HTML projects for faster loading speeds and optimal performance!

</div>
</div>

---

## The Three Building Blocks

The Bootstrap grid relies on **three nested elements** in this fixed order:

<div class="card card-glass">

#### Grid Hierarchy

- **`.container`** - Provides side margins and centers content horizontally on the page
- **`.row`** - Wrapper for columns; applies negative margins to neutralize gutters
- **`.col` or `.col-*`** - The actual columns that hold content (direct children of `.row`)

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

> **Golden Rule:** Never place a `.col` directly inside a `.container`. Columns must always be direct children of a `.row`!

---

## Breakpoints - Responsive Boundaries

Bootstrap 5.3.8 features **6 breakpoints** based on minimum viewport widths:

<div class="grid-2">
<div>

| Name | Prefix | Min. Width | Typical Device |
| :--- | :---: | :---: | :--- |
| Extra small | *(none)* | < 576px | Small phones (portrait) |
| **Small** | `sm` | 576px | Phones (landscape) |
| **Medium** | `md` | 768px | Tablets |
| **Large** | `lg` | 992px | Laptops / small desktops |
| **Extra large** | `xl` | 1200px | Desktops |
| **XXL** | `xxl` | 1400px | Large widescreen monitors |

</div>
<div>

> **Mobile-first:**
>
> - Bootstrap styles scale upward from small to large screens.
> - A class without a breakpoint applies to all viewports.
> - A class with a prefix applies from that breakpoint **and wider**.

</div>
</div>

---

## Containers

Containers serve as the outermost wrapper for every layout:

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

Always spans 100% across the full width of the viewport.

```html
<div class="container-fluid">
  ...
</div>
```

</div>
<div class="card">

#### `.container-{bp}`

100% wide until the specified breakpoint, then switches to a fixed max-width.

```html
<div class="container-md">
  ...
</div>
```

</div>
</div>

---

## The 12-Column Model

A Bootstrap row is divided into **12 equal column units**. You decide how many units each element occupies:

<div class="card card-glass">

#### Distribution of 12 Units

- `col-12` = 12/12 = **100%** width (full row)
- `col-6` + `col-6` = 6/12 + 6/12 = two columns of **50%**
- `col-4` + `col-4` + `col-4` = three columns of **33.3%**
- `col-8` + `col-4` = main content of **66.7%** + sidebar of **33.3%**

</div>

> **Rule of Thumb:** Column unit numbers within a `.row` must total **12**. If the sum exceeds 12, subsequent columns automatically wrap to a new line.

---

## Basic Grid Syntax

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- 4 of 12 = 33% wide -->
    <div class="col-4">Sidebar</div>

    <!-- 8 of 12 = 67% wide -->
    <div class="col-8">Main Content</div>

  </div>
  <div class="row">

    <!-- 3 equal columns: 4+4+4 -->
    <div class="col-4">Card 1</div>
    <div class="col-4">Card 2</div>
    <div class="col-4">Card 3</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
<span class="badge" style="font-size: 0.72rem; padding: 2px 8px;">.container</span>
<span style="font-size: 0.72rem; color: #8b949e;">centered with padding</span>
</div>
<!-- Row 1: 4 + 8 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; margin-bottom: 10px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(total: 12 columns)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">Sidebar (33%)</div>
</div>
<div style="flex: 8; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.8rem;">.col-8</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">Main Content (67%)</div>
</div>
</div>
</div>
<!-- Row 2: 4 + 4 + 4 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Card 1</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Card 2</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Card 3</div>
</div>
</div>
</div>
</div>

</div>
</div>

---

## Responsive Classes

Combine multiple breakpoint classes to define **distinct layouts across screen sizes**:

```html
<!-- Phone: 100% wide | Tablet: 50% wide | Laptop: 33.3% wide -->
<div class="col-12 col-md-6 col-lg-4">
  Project Card
</div>
```

<div class="grid-3">
<div class="card card-accent">

#### Phone (`< 768px`)

`col-12`

- Takes **100%** width
- Cards stack vertically

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(232, 78, 16, 0.4); display: flex; flex-direction: column; gap: 4px;">
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">Card 1 (100%)</div>
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">Card 2 (100%)</div>
</div>

</div>
<div class="card card-cyan">

#### Tablet (`>= 768px`)

`col-md-6`

- Takes **50%** width
- 2 cards side by side per row

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(0, 156, 171, 0.4); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">C1 (50%)</div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">C2 (50%)</div>
</div>

</div>
<div class="card">

#### Laptop (`>= 992px`)

`col-lg-4`

- Takes **33.3%** width
- 3 cards side by side per row

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(230, 237, 243, 0.25); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">C1 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">C2 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">C3 (33%)</div>
</div>

</div>
</div>

---

## Auto-layout Columns

Use `col` **without a number** to distribute columns equally across available space:

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

Every `.col` automatically receives exactly **1/3** of available width.

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
</div>

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

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
  <div style="flex: 2; background: rgba(232, 78, 16, 0.25); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col-6</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">50%</div>
  </div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
</div>

</div>
</div>

> `col-auto` sizes the column to match its **natural content width** (`fit-content`). See the next slide for a direct comparison!

---

## Difference: `.col` vs `.col-auto`

How do automatic columns calculate their width within a `.row`?

<div class="grid-2">
<div>

<div class="card card-accent" style="margin-bottom: 12px; padding: 12px;">

#### `.col` &rarr; Space Sharer

- Fills all **remaining available space** (`flex-grow: 1`)
- Multiple `.col` elements share leftover space **equally**, regardless of content length

</div>

<div class="card card-cyan" style="padding: 12px;">

#### `.col-auto` &rarr; Content Follower

- Shrinks or expands exactly to fit its **content** (`fit-content`, `flex: 0 0 auto`)
- Ideal for compact elements such as badges, buttons, avatars, or icons

</div>

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<!-- Example 1: .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-accent-light); margin-bottom: 6px; font-family: var(--font-code);">With .col (equal distribution):</div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">Short (50%)</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">Longer text (50%)</div>
    </div>
  </div>
</div>

<!-- Example 2: .col-auto paired with .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">In practice: .col-auto + .col + .col-auto:</div>
  <div style="display: flex; gap: 6px; align-items: center;">
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">[ Badge ]</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col (flexible)</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">Article title...</div>
    </div>
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">&lt;Button&gt;</div>
    </div>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <strong>Golden Combination:</strong> Use <code>.col-auto</code> for elements with fixed content widths and <code>.col</code> to fill remaining space adaptively.
</div>

</div>
</div>

---

## Nesting Columns

You can start a **new nested grid within a column** by placing another `.row`:

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- Primary column: 8 of 12 -->
    <div class="col-8">
      <h2>Main Section</h2>

      <!-- Inner row: 12 units again! -->
      <div class="row">
        <div class="col-6">Left (50%)</div>
        <div class="col-6">Right (50%)</div>
      </div>
    </div>

    <!-- Sidebar: 4 of 12 -->
    <div class="col-4">Sidebar</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(0, 156, 171, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">Outer .row &nbsp;<span style="color: #8b949e;">(total 12 columns)</span></div>
<div style="display: flex; gap: 8px;">
<!-- Main column col-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.9); border: 2px solid var(--color-accent); border-radius: 6px; padding: 8px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
<span style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-8 (Main Section)</span>
<span style="font-size: 0.65rem; color: #8b949e;">67% of outer row</span>
</div>
<!-- Inner row -->
<div style="border: 1px dashed rgba(0, 156, 171, 0.6); border-radius: 4px; padding: 6px; background: rgba(15, 20, 28, 0.7);">
<div style="font-size: 0.68rem; color: var(--color-secondary); margin-bottom: 4px; font-family: var(--font-code);">Inner .row &nbsp;<span style="color: #8b949e;">(12 units reset!)</span></div>
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% of col-8</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% of col-8</div>
</div>
</div>
</div>
</div>
<!-- Sidebar col-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 4px;">Sidebar</div>
<div style="font-size: 0.65rem; color: #8b949e; margin-top: 2px;">33% of outer row</div>
</div>
</div>
</div>
</div>

<div style="font-size: 0.7rem; color: #8b949e; margin-top: 4px; line-height: 1.4;">
<strong>Key Takeaway:</strong> A nested <code>.row</code> resets the 12 columns within its immediate parent (<code>.col-8</code>).
</div>

</div>
</div>

---

## Gutters - Column Spacing

Gutters manage horizontal and vertical **padding** between columns:

<div class="grid-2">
<div>

| Class | Application |
| :--- | :--- |
| `g-0` to `g-5` | Horizontal and vertical gutters |
| `gx-0` to `gx-5` | Horizontal gutters only (X-axis) |
| `gy-0` to `gy-5` | Vertical gutters only (Y-axis) |

```html
<!-- gx-4: wide X space | gy-2: compact Y space -->
<div class="row gx-4 gy-2">
  <div class="col-6">Card A</div>
  <div class="col-6">Card B</div>
  <div class="col-6">Card C</div>
  <div class="col-6">Card D</div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px;">

<div style="border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">Visual: .row.gx-4.gy-2</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; row-gap: 8px;">
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Card A</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Card B</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Card C</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Card D</span>
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.66rem;">
    <span style="color: var(--color-secondary); font-family: var(--font-code);">&harr; gx-4 (column spacing)</span>
    <span style="color: var(--color-accent-light); font-family: var(--font-code);">&varr; gy-2 (row spacing)</span>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <code>g-0</code> removes all gutters (ideal for seamless edge-to-edge photo galleries).
</div>

</div>
</div>

---

## Offset - Shifting Columns

Use `offset-{bp}-{n}` to shift columns to the right using empty grid tracks:

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- Centered: 4 empty + 4 + 4 empty = 12 -->
  <div class="col-4 offset-4">
    Centered Box
  </div>
</div>

<div class="row">
  <div class="col-md-4">Left Block</div>
  <!-- Skips 4 columns -->
  <div class="col-md-4 offset-md-4">Right Block</div>
</div>
```

> Ideal for centered login forms, modal dialogues, or staggered portfolio items.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Row 1: col-4 offset-4 &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 empty</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Centered</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">(rest: 4)</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 empty</div>
    </div>
  </div>
</div>

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Row 2: col-md-4 + offset-md-4</div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Left</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-md-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 skipped</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Right</div>
    </div>
  </div>
</div>

</div>
</div>

---

## Order - Visual Reordering

Use `order-{bp}-{n}` to adjust **visual display order** without altering HTML markup:

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- Mobile: bottom | Desktop: left -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>About Me</h2>
    <p>Text appears left of photo.</p>
  </div>

  <!-- Mobile: top | Desktop: right -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="photo.webp" alt="Profile">
  </div>
</div>
```

> Perfect for **mobile-first design**: display the photo first on mobile screens and the text below, while placing text on the left on desktop.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 1px solid rgba(232, 78, 16, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">Mobile (&lt; 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">Stacked</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div style="background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-1: Photo (top)</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-2: Text 'About Me' (bottom)</span>
    </div>
  </div>
</div>

<div style="border: 1px solid rgba(0, 156, 171, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge badge-cyan" style="font-size: 0.68rem; padding: 1px 6px;">Desktop (&gt;= 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">Side by side</span>
  </div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 8; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-md-1: Text (8 cols)</span>
    </div>
    <div style="flex: 4; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-md-2: Photo (4 cols)</span>
    </div>
  </div>
</div>

</div>
</div>

---

## Practical Example: Portfolio Layout

<div class="grid-2">
<div>

```html
<div class="container">
  <!-- Navigation: 100% -->
  <div class="row">
    <div class="col-12"><nav>Portfolio</nav></div>
  </div>

  <!-- Main Section + Sidebar -->
  <div class="row gy-4">
    <div class="col-12 col-lg-8">
      <h2>Projects</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">P1</div>
        <div class="col-12 col-md-6 col-xl-4">P2</div>
        <div class="col-12 col-md-6 col-xl-4">P3</div>
      </div>
    </div>

    <div class="col-12 col-lg-4">
      <aside>About & Contact</aside>
    </div>
  </div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
<span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">.container</span>
<span style="font-size: 0.65rem; color: #8b949e;">Desktop wireframe preview</span>
</div>
<!-- Navigation -->
<div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 5px 8px; margin-bottom: 8px; font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">
.col-12: &lt;nav&gt; Portfolio
</div>
<!-- Body row -->
<div style="display: flex; gap: 8px;">
<!-- Projects col-lg-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.8); border: 1px solid var(--color-secondary); border-radius: 6px; padding: 8px;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-secondary); font-family: var(--font-code); margin-bottom: 6px;">
.col-12.col-lg-8 (Projects)
</div>
<!-- Nested project cards -->
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P1</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P2</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P3</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
</div>
</div>
<!-- Aside col-lg-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">.col-12.col-lg-4</div>
<div style="font-size: 0.68rem; color: var(--color-foreground); margin-top: 4px;">About & Contact</div>
</div>
</div>
</div>

</div>
</div>

---

## Common Mistakes

<div class="grid-2">
<div class="card card-accent">

#### Pitfalls

- `.col` placed directly in `.container` (missing `.row`)
- Forgetting that breakpoint classes cascade **upwards** (`col-md-6` also applies to `lg`, `xl`, and `xxl`)
- Columns inside a row unintentionally not summing up to 12
- Applying margins directly to `.row`, breaking column alignment

</div>
<div class="card card-cyan">

#### Correct Structure

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

> **Tip:** Use **Browser DevTools** (F12) to inspect the flexbox grid lines and computed column widths visually.

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Summary

<p class="subtitle">&lt;Bootstrap 5.3.8 Grid - Key Takeaways /&gt;</p>

<div class="meta-box">
  - <strong>Hierarchy:</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 Columns:</strong> Always allocate 12 units per row<br>
  - <strong>Mobile-first:</strong> Design from small (<code>col-12</code>) to large (<code>col-lg-4</code>)<br>
  - <strong>Utilities:</strong> <code>g-*</code> (gutters), <code>offset-*</code> (shifting), <code>order-*</code> (reordering)
</div>
