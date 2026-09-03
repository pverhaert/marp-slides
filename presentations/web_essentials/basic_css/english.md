---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - CSS3'
footer: 'Web Essentials - Thomas More University of Applied Sciences'
---

<!-- _class: lead -->

# CSS3 Essentials

<p class="subtitle">&lt;Styling, Layout & Animations /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Essentials | <strong>Topic:</strong> CSS3 Complete Summary
</div>

---

## Table of Contents

1. **Introduction, Syntax & Selectors** - Cascade, specificity & inheritance
2. **Typography & Colors** - Web fonts, REM/EM/PX & interactive pseudo-classes
3. **The Box Model & Borders** - Content, padding, border, margin & `box-sizing`
4. **Display, Lists & Tables** - Block vs inline, navigation lists & zebra tables
5. **Backgrounds & Images** - Gradients, covers, `object-fit` & CSS filters
6. **Layout: Floats, Positioning & Media Queries** - RWD, fixed/sticky & z-index
7. **Modern Layout: Flexbox & Grid** - 1D flex containers & 12-column grids
8. **Transforms, Transitions & Animations** - 2D/3D effects & keyframes

---

## 1. Introduction to CSS3

### What is CSS?

- **Cascading Style Sheets**: the standard style language for the web
- Separates **content and structure (HTML)** from **visual presentation (CSS)**
- Ensures a **consistent design system** across an entire website

### Where to write CSS?

1. **External CSS file** (`<link rel="stylesheet" href="style.css">`) - *Best practice!*
2. **Embedded CSS** (inside `<style>` tags in the `<head>`)
3. **Inline CSS** (via the `style="..."` attribute) - *Avoid this!*

> **W3C Validation:** Always validate your stylesheets using the official [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).

---

## 1. CSS Syntax: The Style Rule

A CSS rule consists of a **selector** and a **declaration block**:

```css
/* Selector { Property: Value; } */
h2 {
  color: #e84e10;
  background-color: #181f2a;
  margin-left: 20px;
  font-family: 'Outfit', sans-serif;
}
```

<div class="grid-2">
<div class="card">

#### Rule Structure

- **Selector:** Identifies which HTML elements will be formatted
- **Declaration:** Property + value pair terminated with a semicolon `;`

</div>
<div class="card">

#### Syntax Conventions

- Wrap values containing spaces in quotes: `"Times New Roman"`
- Group multiple selectors with commas: `h1, h2, h3`

</div>
</div>

---

## 1. The 5 Core Selectors

| Selector Type | HTML Example | CSS Notation | Description |
| :--- | :--- | :--- | :--- |
| **Tag selector** | `<p>Text</p>` | `p { color: white; }` | Selects all elements of this tag type |
| **Class selector** | `<p class="intro">` | `.intro { font-weight: bold; }` | Reusable styling across multiple elements |
| **ID selector** | `<header id="main">` | `#main { background: #000; }` | Unique element on the page |
| **Pseudo-class** | `<a href="...">` | `a:hover { color: #ff753a; }` | Targets element state or user interaction |
| **Attribute selector** | `<a target="_blank">` | `a[target="_blank"] { ... }` | Selects based on HTML attribute values |

```css
/* Combinations */
article.highlight { ... } /* Targets only <article> elements with class highlight */
article .highlight { ... } /* Targets elements with class highlight INSIDE an <article> */
```

---

## 1. Cascade, Priority & Specificity

When multiple rules target the same element, the **cascade** decides which rule applies:

### Priority Order (Highest to Lowest)

1. **Web Developer Inline CSS** (`style="..."`)
2. **Web Developer Embedded CSS** (`<style>`)
3. **Web Developer External CSS** (`style.css`)
4. **User Browser Settings**
5. **Default Browser Stylesheet**

### Equal Priority Resolution

- The **last declared rule** in the stylesheet overrides earlier rules.
- More specific selectors (`#id`) win over general tag selectors (`p`).
- **`!important`:** Forces absolute override (use strictly as a last resort!).

---

## 1. CSS Inheritance

Elements inherit select styles from their **ancestor elements** down the DOM tree:

```css
body {
  font-family: 'Outfit', sans-serif;
  color: #e6edf3;
  line-height: 1.6;
}
/* All p, h1, li, span elements automatically inherit font-family and text color! */
```

<div class="grid-2">
<div class="card">

#### Inherited Properties

- Typography: `font-family`, `font-size`, `font-weight`, `line-height`
- Text styling: `color`, `letter-spacing`, `text-align`
- Lists: `list-style-type`

</div>
<div class="card">

#### Non-Inherited Properties

- Box model: `margin`, `padding`, `border`, `width`, `height`
- Backgrounds: `background-color`, `background-image`
- Positioning: `position`, `display`, `top`, `left`

</div>
</div>

---

## 2. Typography & Web Safe Fonts

By default, browsers support a limited selection of pre-installed **Web Safe Fonts**:

```css
/* Always specify font fallbacks ending with a generic family */
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
p {
  font-family: Georgia, 'Times New Roman', serif;
}
code {
  font-family: 'Fira Code', Consolas, Monaco, monospace;
}
```

### Generic Font Families

- `sans-serif`: Modern clean fonts without serifs (Arial, Roboto, Outfit)
- `serif`: Traditional fonts with decorative serifs (Times, Georgia)
- `monospace`: Fixed-width character spacing for code (Fira Code, Courier)
- `cursive` & `fantasy`: Decorative and display scripts

---

## 2. Web Fonts: Google Fonts & `@font-face`

### Method 1: Google Fonts (`@import` or `<link>`)

```css
/* At the very top of your external CSS file */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

body {
  font-family: 'Outfit', sans-serif;
}
```

### Method 2: Self-Hosted Fonts via `@font-face`

```css
@font-face {
  font-family: 'ThomasMoreCustom';
  src: url('fonts/custom-font.woff2') format('woff2'),
       url('fonts/custom-font.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}
```

---

## 2. Essential Text Properties

```css
.article-body {
  font-size: 1.125rem;          /* 18px using relative units */
  font-weight: 600;             /* Thickness: 100 to 900 or normal/bold */
  font-style: italic;           /* normal | italic | oblique */
  line-height: 1.6;             /* Relative unitless line spacing */
  text-align: justify;          /* left | right | center | justify */
  text-decoration: none;        /* none | underline | line-through */
  text-transform: uppercase;    /* uppercase | lowercase | capitalize */
  letter-spacing: 0.05em;       /* Spacing between individual letters */
}
```

> **Accessibility Tip:** Always use relative units (`rem` or `em`) for `font-size` so that typography respects the user's browser accessibility settings!

---

## 2. Units: PX vs EM vs REM <span class="badge">Recommended</span>

| Unit | Type | Base Reference | Behavior in Nested Elements |
| :--- | :--- | :--- | :--- |
| **`px` (Pixel)** | Absolute | Fixed display pixels | Does **not** scale with browser base font settings |
| **`em`** | Relative | `font-size` of **immediate parent** | **Compounding:** scales multiplicatively in nested trees |
| **`rem` (Root EM)** | Relative | `font-size` of the **root (`<html>`) element** | **Consistent & predictable** across the entire DOM |

### Why is `rem` strongly preferred?

1. **Accessibility (A11y):** If a user adjusts their default browser font size (e.g. from `16px` to `24px`), all layout dimensions and text scale proportionally.
2. **No Compounding Bug:** With `em`, `font-size: 1.2em` in nested lists compounds exponentially (`16px -> 19.2px -> 23px`). With `rem`, `1.2rem` is always strictly `1.2 * root`.

```css
html { font-size: 16px; }      /* Default root: 1rem = 16px */
h1   { font-size: 2.25rem; }   /* 2.25 * 16px = 36px (predictable & responsive) */
p    { font-size: 1rem; }      /* 1 * 16px = 16px */
```

---

## 2. Color Formats in CSS3

| Model | Example | Description |
| :--- | :--- | :--- |
| **Named Color** | `color: orange;` | 140 standard named colors |
| **HEX (Hexadecimal)** | `color: #e84e10;` | 6 characters (RRGGBB) from `00` to `FF` |
| **RGB** | `color: rgb(232, 78, 16);` | Red, Green, Blue integers from `0` to `255` |
| **RGBA (with Alpha)** | `color: rgba(232, 78, 16, 0.8);` | Includes opacity channel (`0.0` to `1.0`) |
| **HSL / HSLA** | `color: hsl(17, 88%, 49%);` | Hue (0-360 deg), Saturation (%), Lightness (%) |

### `opacity` vs `rgba()`

- `opacity: 0.5;` makes the **entire element including its text and child nodes** translucent.
- `background-color: rgba(...);` makes **only the background** translucent, keeping text 100% sharp and readable!

---

## 2. Interactive Pseudo-classes for Links

Always style hyperlink states in the **LVHA order** (Lord Vader Handles All):

```css
/* 1. Unvisited link */
a:link {
  color: #009cab;
  text-decoration: none;
}
/* 2. Previously visited link */
a:visited {
  color: #8b949e;
}
/* 3. Mouse cursor hover */
a:hover {
  color: #ff753a;
  text-decoration: underline;
}
/* 4. Active moment of clicking */
a:active {
  color: #e84e10;
}
```

---

## 3. The CSS Box Model

Every element on a web page is rendered as a rectangular box comprised of **4 layers**:

<div class="card" style="text-align: center; padding: 18px; border: 2px dashed var(--color-accent);">
  <div style="background: rgba(232, 78, 16, 0.2); padding: 14px; border: 1px solid var(--color-accent); border-radius: 4px;">
    <strong>MARGIN</strong> (Outer spacing - transparent)
    <div style="background: rgba(0, 156, 171, 0.25); padding: 12px; margin: 10px; border: 2px solid var(--color-secondary); border-radius: 4px;">
      <strong>BORDER</strong> (Border outline surrounding padding)
      <div style="background: rgba(24, 31, 42, 0.9); padding: 12px; margin: 10px; border: 1px solid var(--color-border); border-radius: 4px;">
        <strong>PADDING</strong> (Inner clearance between content and border)
        <div style="background: #e84e10; color: #fff; padding: 10px; margin: 10px; font-weight: bold; border-radius: 4px;">
          CONTENT (Text, images, media)
        </div>
      </div>
    </div>
  </div>
</div>

---

## 3. `box-sizing: border-box`

By default, CSS calculates dimensions via `content-box` (total width = content + padding + border), causing unexpected layout overflow bugs!

```css
/* Universal Box Model Reset */
*, *::before, *::after {
  box-sizing: border-box;
}
```

<div class="grid-2">
<div class="card">

#### `content-box` (Default)

- `width: 300px` + `padding: 20px` + `border: 5px`
- Total rendered width = **350px**!

</div>
<div class="card">

#### `border-box` (Recommended)

- `width: 300px` includes padding and border
- Total rendered width remains **exactly 300px**!

</div>
</div>

---

## 3. Margin & Padding Shorthands

Clockwise direction order: **Top - Right - Bottom - Left (TRBL)**

```css
/* 4 values: Top, Right, Bottom, Left */
margin: 10px 20px 15px 5px;

/* 2 values: [Top & Bottom] [Left & Right] */
padding: 15px 30px;

/* 1 value: applies equally to all 4 sides */
margin: 20px;

/* Horizontally centering a fixed-width block element */
.container {
  width: 960px;
  margin: 0 auto; /* Top/Bottom: 0, Left/Right: automatic centering */
}
```

> **Margin Collapsing:** Adjacent vertical margins do not add up; they collapse into the single largest margin value between the two elements.

---

## 3. Borders, Radius & Box Shadow

```css
.card-box {
  /* Border shorthand: width, style, color */
  border: 2px solid #2c3647;
  border-left: 6px solid #e84e10; /* Override specific side */

  /* Rounded corners */
  border-radius: 8px;           /* All 4 corners */
  /* border-radius: 50%; -> Transforms a square image into a perfect circle! */

  /* Drop shadow: [X-offset] [Y-offset] [Blur] [Spread] [Color] */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
```

### Outline vs Border

- `border` occupies physical layout space within the box model.
- `outline` floats outside the border without shifting surrounding layout elements (essential for accessible `:focus` keyboard navigation).

---

## 4. The `display` Property

Controls the formatting context and flow behavior of an element:

```css
.block-el   { display: block; }        /* <div>, <p>, <h1> */
.inline-el  { display: inline; }       /* <span>, <a>, <strong> */
.hybrid-el  { display: inline-block; }  /* Buttons, tags */
.hidden-el  { display: none; }          /* Completely removed from flow */
```

| Property | `block` | `inline` | `inline-block` |
| :--- | :---: | :---: | :---: |
| **Starts on new line?** | Yes | No | No |
| **Width & Height adjustable?** | Yes | No | Yes |
| **Default width:** | 100% of parent | Content width only | Content width only |
| **Margin & Padding:** | Full 4 sides | Horizontal only | Full 4 sides |

---

## 4. `display: none` vs `visibility: hidden`

<div class="grid-2">
<div class="card">

#### `display: none;`

- Completely removes the element from the document flow
- Neighboring elements shift to fill the vacated space
- Not visible and occupies **0px space**

```css
.completely-hidden {
  display: none;
}
```

</div>
<div class="card">

#### `visibility: hidden;`

- Makes the element visually invisible
- The element **retains its original dimensions and blank space**
- Acts as a transparent placeholder

```css
.invisible-placeholder {
  visibility: hidden;
}
```

</div>
</div>

---

## 4. Styling Lists & Navigation Bars

HTML lists (`<ul>`, `<ol>`) are commonly transformed into clean navigation menus:

```css
/* Horizontal Navigation Bar using <ul> */
nav ul {
  list-style: none;             /* Removes default bullet points */
  margin: 0;
  padding: 0;
  display: flex;                /* Aligns menu items horizontally */
  gap: 24px;
}

nav li a {
  display: block;
  padding: 10px 16px;
  color: #ffffff;
  background-color: #181f2a;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

nav li a:hover {
  background-color: #e84e10;
}
```

---

## 4. Styling Tables with CSS

```css
table {
  width: 100%;
  border-collapse: collapse;    /* Eliminates double borders between cells! */
  margin: 16px 0;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #2c3647;
  text-align: left;
}

th {
  background-color: #1c2331;
  color: #ff753a;
}

/* Zebra striping for enhanced scannability */
tbody tr:nth-child(even) {
  background-color: #18202d;
}

tbody tr:hover {
  background-color: rgba(232, 78, 16, 0.15); /* Subtle row hover highlight */
}
```

---

## 5. Background Images (`background-image`)

```css
.hero-banner {
  /* Image path */
  background-image: url('images/campus.webp');
  
  /* Prevent tile repetition */
  background-repeat: no-repeat;
  
  /* Alignment and sizing */
  background-position: center center;
  background-size: cover;          /* cover: fills viewport | contain: fits whole image */
  
  /* Parallax effect: image remains fixed while scrolling */
  background-attachment: fixed;
  
  height: 400px;
}
```

```css
/* Concise Shorthand Syntax */
.hero-banner {
  background: #0f141c url('images/campus.webp') no-repeat center / cover fixed;
}
```

---

## 5. CSS Gradients

Gradients are rendered mathematically as lightweight, scalable background images:

<div class="grid-2">
<div class="card">

#### Linear Gradient

Color transition along a directional angle:

```css
.linear-box {
  background: linear-gradient(
    135deg, 
    #e84e10 0%, 
    #0f141c 100%
  );
}
```

</div>
<div class="card">

#### Radial Gradient

Circular color transition radiating from a center point:

```css
.radial-box {
  background: radial-gradient(
    circle at center, 
    #ff753a 0%, 
    #0f141c 70%
  );
}
```

</div>
</div>

```css
/* Semi-transparent dark gradient overlay to ensure text contrast over photos */
.hero-overlay {
  background: linear-gradient(rgba(15, 20, 28, 0.8), rgba(15, 20, 28, 0.8)), url('photo.webp');
}
```

---

## 5. Images: `object-fit` & Filters

### Responsive Images & `object-fit`

Prevents image distortion when forced into fixed aspect ratio containers:

```css
img.responsive-cover {
  width: 100%;
  height: 250px;
  object-fit: cover;            /* Fills container without aspect ratio distortion */
  object-position: center top;   /* Anchors focus to top of image */
  display: block;
}
```

### Visual CSS Filters

```css
img.filter-demo {
  filter: grayscale(100%);      /* Grayscale effect */
  transition: filter 0.3s ease;
}
img.filter-demo:hover {
  filter: grayscale(0%) brightness(110%); /* Full color + extra brightness on hover */
}
```

---

## 6. Floats & The Clearfix Hack

Originally designed **only to wrap running text around an image**:

```css
img.float-left {
  float: left;                  /* Floats image to the left */
  margin: 0 18px 12px 0;
}

/* Problem: parent container collapses to zero height */
/* Solution: Modern Clearfix */
.clearfix::after {
  content: "";
  display: block;
  clear: both;                  /* Clears both float sides */
}
```

> **Modern Standard:** Always use **Flexbox** or **CSS Grid** for columns and multi-component layouts, never `float`!

---

## 6. CSS Positioning (`position`)

| Value | Document Flow Behavior | Reference Point for `top/left/bottom/right` |
| :--- | :--- | :--- |
| **`static`** | Normal flow *(default)* | None (coordinates have no effect) |
| **`relative`** | Keeps original layout slot | Offset relative to its **original position** |
| **`absolute`** | **Removed** from flow | Offset relative to nearest **non-static parent** |
| **`fixed`** | **Removed** from flow | Offset relative to the **browser viewport** |
| **`sticky`** | Hybrid (`relative` + `fixed`) | Scrolls with document until reaching threshold |

```css
/* Standard Pattern: Relative Parent, Absolute Child */
.card-container { position: relative; }
.card-badge     { position: absolute; top: 12px; right: 12px; }
```

---

## 6. Sticky Headers & `z-index`

```css
/* Sticky navigation bar that locks to the top on scroll */
header.main-nav {
  position: sticky;
  top: 0;
  z-index: 1000;                /* Controls 3D vertical stacking layer */
  background-color: #0f141c;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
```

<div class="grid-2">
<div class="card">

#### How `z-index` works

- Sets which overlapping elements appear in front
- Operates **only on positioned elements** (`relative`, `absolute`, `fixed`, `sticky`)

</div>
<div class="card">

#### Stacking Context

- Higher numbers stack in front of lower numbers: `z-index: 999;`
- Negative integers place items behind: `z-index: -1;`

</div>
</div>

---

## 6. Responsive Design & Media Queries

**Responsive Web Design (RWD)** dynamically adapts layouts to different display sizes:

```html
<!-- Mandatory viewport meta tag in HTML head -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
/* Mobile-First Base CSS (for smartphones < 768px) */
.col {
  width: 100%;
}

/* Tablet & Desktop Breakpoint (from 768px width) */
@media screen and (min-width: 768px) {
  .col {
    width: 50%;
    float: left;
  }
}

/* Large Desktop Screens (from 1200px width) */
@media screen and (min-width: 1200px) {
  .col {
    width: 25%;
  }
}
```

---

## 7. Flexbox: 1D Flexible Containers

Flexbox is designed for one-dimensional layouts along a single axis (row OR column):

```css
.flex-container {
  display: flex;                /* Enables flexbox layout context */
  flex-direction: row;          /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;              /* nowrap | wrap (items wrap onto new lines) */
  gap: 20px;                    /* Gaps between items without margin hacks */
  
  /* Main Axis Alignment (X axis when row) */
  justify-content: space-between; /* flex-start | center | flex-end | space-between | space-evenly */
  
  /* Cross Axis Alignment (Y axis when row) */
  align-items: center;          /* stretch | flex-start | center | flex-end | baseline */
}
```

> **Classic CSS Trick:** Perfect horizontal and vertical centering in 3 lines:
> `display: flex; justify-content: center; align-items: center;`

---

## 7. Flexbox: Item Properties

Properties placed directly on the **child items** of a flex container:

```css
.flex-item {
  /* flex shorthand: [flex-grow] [flex-shrink] [flex-basis] */
  flex: 1 1 200px;
}
```

<div class="grid-2">
<div class="card">

#### `flex-grow` & `flex-shrink`

- **`flex-grow: 1`**: Absorbs proportional remaining space
- **`flex-grow: 2`**: Grows twice as fast as sibling items
- **`flex-shrink: 1`**: Shrinks proportionally when space is limited

</div>
<div class="card">

#### `flex-basis` & `align-self`

- **`flex-basis: 250px`**: Initial base width before space distribution
- **`align-self: flex-end`**: Overrides `align-items` for this individual child

</div>
</div>

---

## 7. CSS Grid & 12-Column Layouts

CSS Grid is designed for two-dimensional layouts across rows AND columns simultaneously:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12 equal fractional units (1fr) */
  gap: 20px;
}

/* Main content spans 8 of the 12 columns (66.6% width) */
main.content {
  grid-column: span 8;
}

/* Sidebar spans remaining 4 columns (33.3% width) */
aside.sidebar {
  grid-column: span 4;
}

@media (max-width: 768px) {
  main.content, aside.sidebar {
    grid-column: span 12; /* On mobile, both collapse to full 100% width */
  }
}
```

---

## 8. 2D Transforms (`transform`)

Modifies element position, scale, and angle without disrupting surrounding layout flow:

```css
.box-transform {
  /* Translation (shift X, Y) */
  transform: translate(20px, -10px);
  
  /* Rotation */
  transform: rotate(15deg);
  
  /* Scaling (resize) */
  transform: scale(1.1);
  
  /* Skew (distortion) */
  transform: skew(5deg, 5deg);
  
  /* Combining multiple transformations */
  transform: translate(-50%, -50%) rotate(-5deg) scale(1.05);
  
  /* Set transformation anchor origin point */
  transform-origin: center center;
}
```

---

## 8. CSS Transitions

Creates smooth, interpolated animations between two CSS states (such as `:hover`):

```css
.interactive-btn {
  background-color: #181f2a;
  color: #ffffff;
  transform: translateY(0);
  
  /* Transition shorthand: [property] [duration] [timing-function] [delay] */
  transition: all 0.3s ease;
  /* transition: transform 0.2s ease-out, background-color 0.3s linear; */
}

.interactive-btn:hover {
  background-color: #e84e10;
  transform: translateY(-4px);   /* Button subtly floats upward */
  box-shadow: 0 6px 20px rgba(232, 78, 16, 0.4);
}
```

### Timing Functions

- `ease` (default: smooth start and stop) | `linear` (constant speed)
- `ease-in` (slow acceleration) | `ease-out` (gentle deceleration) | `cubic-bezier(...)`

---

## 8. CSS Keyframe Animations (`@keyframes`)

Build multi-step, self-running animations without JavaScript:

```css
/* 1. Define animation milestones */
@keyframes pulseGlow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(232, 78, 16, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(232, 78, 16, 0.8);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(232, 78, 16, 0.4);
  }
}

/* 2. Attach animation to element */
.call-to-action {
  animation: pulseGlow 2s infinite ease-in-out;
}
```

---

## 8. 3D Transforms & Card Flip

Establishing `perspective` on a parent element unlocks a 3D coordinate space (Z-axis):

```css
.flip-card-container {
  perspective: 1000px;          /* 3D depth perception in pixels */
}

.flip-card-inner {
  position: relative;
  width: 300px;
  height: 200px;
  transform-style: preserve-3d; /* Preserves 3D depth for child faces */
  transition: transform 0.6s ease;
}

.flip-card-container:hover .flip-card-inner {
  transform: rotateY(180deg);    /* Flips 180 degrees around the Y axis */
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;  /* Hides rear face when rotated away! */
}

.card-back {
  transform: rotateY(180deg);
}
```

---

<!-- _class: lead -->

# Mastering CSS3

<p class="subtitle">&lt;From Clean Structure to Engaging Interactive UI /&gt;</p>

### Key Takeaways

1. Always apply a **Universal Box Model Reset** (`box-sizing: border-box`)
2. Build responsive layouts **Mobile-First** using Flexbox and CSS Grid
3. Use relative units (`rem`, `em`, `%`, `fr`) for flexible scaling
4. Enhance user interaction with subtle **transitions & transforms**

<div class="meta-box" style="margin-top: 24px;">
  <strong>Next Step:</strong> JavaScript & Dynamic Web Applications
</div>
