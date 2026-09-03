---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - HTML5'
footer: 'Web Essentials - Thomas More University of Applied Sciences'
---

<!-- _class: lead -->

# HTML5 Essentials

<p class="subtitle">&lt;Web Development Fundamentals /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Essentials | <strong>Topic:</strong> HTML5 Complete Summary
</div>

---

## Table of Contents

1. **Introduction to HTML5** - History, standards & W3C validation
2. **Basic Structure & Document Outline** - Tags, metadata & semantics
3. **Images on the Web** - Formats, **WebP**, SVG & best practices
4. **Hyperlinks** - Internal, external & anchor links (`<a>`)
5. **Special Characters** - HTML entities & non-breaking spaces
6. **Lists** - `<ul>`, `<ol>`, `<dl>` & Emmet
7. **Tables** - Semantic structure, cell merging (`colspan`/`rowspan`)
8. **Towards CSS** - Linking stylesheets, `div`/`span`, `id`/`class` & viewport

---

## 1. Introduction to HTML5

### What is HTML?

- **HyperText Markup Language**: the standard markup language for web pages
- Defines the **content and structure** of web pages
- Browsers (Chrome, Firefox, Safari, Edge) interpret HTML to render visual pages

### Why HTML5?

- **Cross-browser & cross-device**: consistent display across desktop, tablet, and mobile
- **Accessibility & SEO**: search engines and screen readers understand semantic structure
- **Native features**: audio, video, structural elements, and rich form controls without plugins

---

## 1. W3C Standards & Validation

### The World Wide Web Consortium (W3C)

- Defines official web standards for developers and browser vendors
- Ensures uniformity, compatibility, and openness across the global web
- Official specifications available at [w3.org](https://www.w3.org)

### W3C HTML5 Validator <span class="badge">Essential</span>

- Check **every web page** using [validator.w3.org/nu](https://validator.w3.org/nu/)
- Detects syntax errors, unclosed tags, and missing required attributes
- **Golden Rule:** *Clean, valid HTML improves SEO ranking and prevents rendering bugs!*

---

## 1. Brief History of HTML

- **1991 - Tim Berners-Lee (CERN):** First version with 18 tags to link scientific research documents
- **1993 - HTML 1.0:** First official public release
- **1995 - HTML 2.0:** Introduced forms and tables
- **1997 - HTML 3.2 & HTML 4.01:** First official W3C recommendations
- **2014 - present - HTML5:** The modern industry standard
  - Continuously evolving (*Living Standard* maintained by WHATWG and W3C)
  - Focus on semantics, responsive design, multimedia, and web applications

---

## 2. Basic Structure & Document Outline

Every valid HTML5 document requires **4 core elements**:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Page Title</title>
  </head>
  <body>
    <!-- Visible content goes here -->
  </body>
</html>
```

> **Emmet Shortcut:** Type `!` and press `Tab` in VS Code to immediately generate the complete boilerplate outline!

---

## 2. The `<head>` & Metadata

The `<head>` contains background information **about** the page (not directly rendered in the viewport).

### Essential Head Tags

- `<title>`: Defines the browser tab title (**exactly 1 per page!**)
- `<meta charset="UTF-8">`: Character encoding (accents, symbols, emojis)
- `<meta name="description" content="...">`: Page summary shown in search engine results
- `<meta name="keywords" content="HTML, Web, Thomas More">`: Search keywords
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Mobile viewport scaling
- `<link rel="stylesheet" href="style.css">`: Links external CSS stylesheet

---

## 2. Text Structure & Comments

### Headings `<h1>` through `<h6>`

- `<h1>`: Main title of the page (crucial for SEO, recommended: 1 per page)
- `<h2>` through `<h4>`: Section and subsection titles
- *Best practice:* Avoid using `<h5>` and `<h6>` due to poor readability

### Paragraphs & Inline Formatting

- `<p>`: Paragraph (block-level element)
- `<strong>`: Indicates **high importance or seriousness** (rendered bold by default)
- `<em>`: Indicates *stress emphasis* (rendered italic by default)
- `<!-- Comment -->`: Ignored by the browser (`Ctrl + /` in VS Code)

---

## 2. Semantic HTML5 Structural Tags

Semantic tags provide **meaning** and context to different areas of a web page:

<div class="grid-2">
<div class="card">

#### Page Structure

- `<header>`: Introductory content, logo, or top header
- `<nav>`: Primary navigation links
- `<main>`: Unique central content of the document
- `<footer>`: Footer, author, copyright, contact info

</div>
<div class="card">

#### Content Grouping

- `<article>`: Self-contained, reusable content (blog post, news item)
- `<section>`: Thematic grouping of related content
- `<aside>`: Sidebar or related secondary information

</div>
</div>

---

## 2. Dividers: `<hr/>` and `<br/>`

### Horizontal Rule `<hr/>`

- **Thematic break**: marks a shift in topic between paragraphs
- Is an **empty element** (*void element* / self-closing)
- Spans the full available width as a visual divider line

### Line Break `<br/>`

- Forces a line break within a paragraph or address block
- *Warning:* Do **not** use `<br/>` to create empty vertical spacing between elements! Use CSS margin/padding instead.

---

## 3. Images: The `<img>` Element

Images are embedded using the void element `<img/>`:

```html
<img src="images/campus-geel.jpg" alt="Thomas More Campus Geel" width="600" height="400">
```

### Essential Attributes

- `src` *(required)*: Path to the image file
- `alt` *(required)*: Alternative text description
  - Essential for screen readers (accessibility)
  - Displayed if the image fails to load
  - Crucial for search engine image indexing
- `width` & `height`: Dimensions in pixels (prevents *layout shifts* during loading)

---

## 3. Semantic Grouping: `<figure>` & `<figcaption>`

Formally associates an image with a visible caption:

```html
<figure>
  <img src="images/students.webp" alt="Students coding together in a lab">
  <figcaption>Figure 1: ITF students in the Thomas More lab.</figcaption>
</figure>
```

### Why use `<figure>`?

- Creates an explicit semantic relationship between visual media and descriptive text
- Screen readers read the caption directly in context with the image
- Enables clean, unified styling as a single component in CSS

---

## 3. Image Formats Comparison

| Format | Colors | Type | Transparency | Animation | Best Use Case |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **GIF** | 256 (8-bit) | Raster | Index | Yes | Short animated memes and reactions |
| **JPG / JPEG** | 16M (24-bit) | Raster | No | No | Photos and complex realistic imagery (lossy) |
| **PNG (8/32)** | 256 / 16M | Raster | Alpha (transparent) | No | Logos, screenshots, sharp graphics (lossless) |
| **SVG** | Unlimited | Vector | Alpha | Yes | Logos, icons, infinitely scalable artwork |
| **WebP** | 16M (Lossy/Lossless) | Raster | Alpha (transparent) | Yes | Modern standard for web photos and graphics |

---

## 3. WebP: The Modern Image Format <span class="badge">Important</span>

### What is WebP?

- Modern image format developed by **Google**
- Engineered specifically for a **faster, lighter web**
- Supports both **lossy** (photo compression) and **lossless** (transparency and graphics)

### Key Advantages

- **25% to 34% smaller file size** compared to equivalent JPGs at identical visual quality
- **26% smaller** compared to equivalent PNGs while retaining alpha transparency
- Supports **animation** (much more efficient alternative to heavy GIF files!)
- Universally supported across all modern web browsers (Chrome, Edge, Firefox, Safari)

---

## 3. Implementing WebP with `<picture>`

For optimal backwards compatibility with legacy browsers, use the `<picture>` element:

```html
<picture>
  <!-- Modern browsers load high efficiency WebP -->
  <source srcset="images/banner.webp" type="image/webp">
  <!-- Fallback for legacy browsers -->
  <img src="images/banner.jpg" alt="Welcome to Thomas More" width="800" height="400">
</picture>
```

> **Web Performance Rule:** Always use WebP for web projects to dramatically optimize Largest Contentful Paint (LCP) and loading speed!

---

## 3. SVG Vector Graphics

**Scalable Vector Graphics (SVG)** are XML-based vector image files.

### Advantages of SVG

- Infinitely scalable to any screen resolution without quality loss or pixelation
- Extremely lightweight file size for logos, icons, and UI symbols
- Can be placed inline directly in HTML and styled or animated with CSS

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="#e84e10" stroke-width="4" fill="#181f2a" />
</svg>
```

*Common SVG tags:* `<svg>`, `<line/>`, `<circle/>`, `<rect/>`, `<polygon/>`, `<path/>`

---

## 3. Images: Best Practices & Paths

### File Paths

- **Relative paths:** `images/logo.png` or `../assets/photo.webp` *(Recommended)*
- **Absolute paths:** `https://example.com/photo.jpg`
- **Avoid Hotlinking:** Never link directly to images hosted on external servers (bandwidth theft, unreliable uptime, copyright infringement!)

### Best Practices

1. **Proper scaling:** Pre-scale image pixel dimensions to their intended display size
2. **Preserve aspect ratio:** Never distort image proportions in CSS
3. **Copyright:** Use your own assets or royalty-free platforms (Unsplash, Pexels)

---

## 4. Hyperlinks: The `<a>` Element

Links form the backbone of the World Wide Web (*HyperText*):

```html
<a href="https://thomasmore.be/en" target="_blank" rel="noopener noreferrer">
  Visit Thomas More University
</a>
```

### Link Types

1. **External link:** Points to an outside domain (`href="https://..."`)
2. **Internal link:** Points to another page within the same website (`href="about.html"`)
3. **Email link:** Opens the user's default email client (`href="mailto:info@thomasmore.be"`)
4. **Download link:** Triggers automatic file download (`href="docs/schedule.pdf" download`)

---

## 4. Anchor Links & The Target Attribute

### Anchor Links (Page Bookmarks)

Navigates directly to a specific section on the page using the `id` attribute:

```html
<!-- Link pointing to the target section -->
<a href="#contact-section">Go to Contact</a>

<!-- Target section on the same or another page -->
<section id="contact-section">
  <h2>Contact Us</h2>
</section>
```

### `target="_blank"` & Security

- Opens the destination page in a **new browser tab**
- Always include `rel="noopener noreferrer"` to prevent security exploits and performance leaks!

---

## 5. Special Characters (HTML Entities)

Characters like `<`, `>`, and `&` are reserved in HTML syntax. Use **entities** to display them literally:

| Symbol | Entity Code | Meaning |
| :---: | :--- | :--- |
| `&` | `&amp;` | Ampersand |
| `<` | `&lt;` | Less than |
| `>` | `&gt;` | Greater than |
| `"` | `&quot;` | Double quotation mark |
| `©` | `&copy;` | Copyright symbol |
| *(space)* | `&nbsp;` | **Non-breaking space** |

---

## 5. The Non-Breaking Space (`&nbsp;`)

The `&nbsp;` entity prevents text and values from awkwardly breaking across two lines:

```html
<!-- Bad: '€' and '50' could be split onto separate lines on small screens -->
<p>The tuition fee is € 50 per student.</p>

<!-- Correct: guaranteed to stay together on a single line -->
<p>The tuition fee is €&nbsp;50 per student.</p>
<p>Phone number: +32&nbsp;14&nbsp;56&nbsp;23&nbsp;10</p>
```

> **Tip:** Always use `&nbsp;` with measurement units (`100&nbsp;km/h`), currencies (`€&nbsp;25`), and formatted telephone numbers!

---

## 6. Lists in HTML

<div class="grid-2">
<div class="card">

#### Unordered List `<ul>`

Bullet point items:

```html
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
</ul>
```

</div>
<div class="card">

#### Ordered List `<ol>`

Numbered sequential steps:

```html
<ol start="1" type="1">
  <li>Analyze problem</li>
  <li>Write semantic HTML</li>
  <li>Validate with W3C</li>
</ol>
```

</div>
</div>

### Optional Attributes for `<ol>`

- `type="1|a|A|i|I"`: Sets numbering style (Arabic numbers, letters, Roman numerals)
- `start="3"`: Starts numbering from a specified integer
- `reversed`: Counts down in reverse numerical order

---

## 6. Nested Lists & Description Lists

### Nested Lists

```html
<ul>
  <li>Frontend
    <ul>
      <li>HTML5 & CSS3</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>
```

### Description Lists `<dl>`

Ideal for glossaries, FAQs, or key-value metadata:

```html
<dl>
  <dt>HTML</dt>
  <dd>The standard markup language for creating web pages.</dd>
  <dt>CSS</dt>
  <dd>The style language used to describe presentation and layout.</dd>
</dl>
```

---

## 7. Tables: Basic Structure

Tables are designed **strictly** for presenting two-dimensional structured tabular data.

```html
<table>
  <caption>Semester 1 Course Overview</caption>
  <tr>
    <th>Course Code</th>
    <th>Course Title</th>
    <th>ECTS Credits</th>
  </tr>
  <tr>
    <td>ITF101</td>
    <td>Web Essentials</td>
    <td>6</td>
  </tr>
</table>
```

> **WARNING:** **NEVER** use tables for layout or page positioning! Always use modern CSS (Flexbox / CSS Grid).

---

## 7. Advanced Semantic Table Structure

For large, accessible tables, group data rows semantically:

```html
<table>
  <caption>Exam Schedule</caption>
  <thead>
    <tr> <th>Course</th> <th>Date</th> <th>Room</th> </tr>
  </thead>
  <tbody>
    <tr> <td>Web Essentials</td> <td>Jan 15</td> <td>Z2.01</td> </tr>
    <tr> <td>Databases</td> <td>Jan 18</td> <td>Z1.14</td> </tr>
  </tbody>
  <tfoot>
    <tr> <td colspan="3">Total: 2 exams scheduled</td> </tr>
  </tfoot>
</table>
```

---

## 7. Merging Cells: `colspan` & `rowspan`

- **`colspan="n"`**: Merges *n* consecutive columns horizontally
- **`rowspan="n"`**: Merges *n* consecutive rows vertically

```html
<table border="1">
  <tr>
    <th colspan="2">Student Information</th>
  </tr>
  <tr>
    <td rowspan="2">Photo</td>
    <td>Name: John Doe</td>
  </tr>
  <tr>
    <td>Program: Applied Computer Science</td>
  </tr>
</table>
```

---

## 8. Towards CSS: `<div>` & `<span>`

HTML handles **content & structure**, while CSS handles **visual presentation**.
Generic containers are used to group elements for styling:

<div class="grid-2">
<div class="card">

#### Block-level: `<div>`

- Always starts on a **new line**
- Takes up the full available parent width
- Used to wrap cards, sections, or layout groups

```html
<div class="course-card">
  <h3>Web Essentials</h3>
  <p>Introduction to HTML5 & CSS3.</p>
</div>
```

</div>
<div class="card">

#### Inline-level: `<span>`

- Does **not** start on a new line
- Takes only the exact width of its content
- Used to style a specific snippet of text

```html
<p>
  Welcome to 
  <span class="highlight">Thomas More</span>!
</p>
```

</div>
</div>

---

## 8. Selectors: `id` vs `class`

| Property | `id` | `class` |
| :--- | :--- | :--- |
| **Uniqueness** | **Unique:** Allowed only **once per page** | **Reusable:** Allowed on **multiple elements** |
| **Purpose** | Unique page sections, anchor links (`#id`), JS | Reusable styling components and utility styles |
| **CSS Selector** | `#header-banner { ... }` | `.btn-primary { ... }` |
| **HTML Example** | `<header id="main-header">` | `<p class="lead text-orange">` |

```html
<!-- Combine multiple classes by separating them with spaces -->
<button class="btn btn-large btn-orange">Enroll Now</button>
```

---

## 8. Media Queries & Responsive Viewport

### 1. Viewport Meta Tag <span class="badge">Essential</span>

Ensures mobile browsers render the page at its true physical screen width rather than zooming out to a virtual desktop viewport:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. Media Queries

Allows CSS to adapt dynamically based on screen sizes and device characteristics:

- In HTML: `<link rel="stylesheet" media="screen and (max-width: 768px)" href="mobile.css">`
- Inside CSS: `@media (max-width: 768px) { ... }`

---

<!-- _class: lead -->

# Ready for CSS3

<p class="subtitle">&lt;Semantic HTML is the foundation of great design /&gt;</p>

### Key Takeaways

1. Always write **clean, semantic** HTML5
2. Use modern formats like **WebP** and **SVG**
3. Validate regularly using the **W3C Validator**
4. Structure data with semantic tables and lists

<div class="meta-box" style="margin-top: 24px;">
  <strong>Next Step:</strong> Styling with CSS3 - Fonts, Colors, Flexbox & Grid
</div>
