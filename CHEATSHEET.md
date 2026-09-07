# Cheatsheet: Marp & Thomas More Theme

This document provides a comprehensive overview of all available CSS classes from [thomasmore.css](/presentations/css/thomasmore.css), along with all Marp Markdown syntax to author and customize presentations manually.

---

## 1. Available CSS Classes in `thomasmore.css`

The Thomas More theme includes ready-to-use utility classes and layout components for creating professional presentations.

### 1.1 Slide Layouts & Covers

| Class | Description | Example |
| --- | --- | --- |
| `section.lead` | Hero cover slide layout with orange/cyan radial gradient background. Headers and footers are automatically hidden. | `<!-- _class: lead -->` |
| `p.subtitle` | Subtitle beneath the main title on a cover slide (Fira Code font in light orange). | `<p class="subtitle">Web Essentials - Academic Year 2024-2025</p>` |
| `.meta-box` | Frosted glass info box with an orange left accent border for course and instructor metadata. | `<div class="meta-box">ITF Web Development</div>` |

```html
<!-- _class: lead -->

# Vue.js Fundamentals
<p class="subtitle">Building Single Page Applications with Vue 3</p>

<div class="meta-box">
  Thomas More Hogeschool - Applied Computer Science (ITF)<br>
  Course: Front-end Development | Instructor: ITF Team
</div>
```

---

### 1.2 Card System (`.card`)

Cards group related information inside dark containers with subtle borders and shadows:

| Class | Description |
| --- | --- |
| `.card` | Standard dark container card with border and shadow. |
| `.card.card-accent` | Card with a 3px Thomas More orange top border and subtle orange background glow. |
| `.card.card-cyan` | Card with a 3px ITF cyan top border and subtle cyan background glow. |
| `.card.card-glass` | Frosted glass card with `-webkit-backdrop-filter` / `backdrop-filter: blur(12px)` and orange tinted border. |

```html
<div class="grid-2">
  <div class="card card-accent">
    <h4>Orange Accent</h4>
    <p>Primary core concept or definition.</p>
  </div>
  <div class="card card-cyan">
    <h4>Cyan Accent</h4>
    <p>Supplementary technical explanation or tip.</p>
  </div>
</div>
```

---

### 1.3 Columns & Grid Layouts

Split the slide cleanly into multi-column layouts:

| Class | Distribution | Best Used For |
| --- | --- | --- |
| `.grid-2` or `.split-2` | 50% / 50% | Two equal columns |
| `.grid-3` or `.split-3` | 33% / 33% / 33% | Three equal columns |
| `.split-1-2` | 33% left / 67% right | Narrow sidebar or image on the left, broad explanation on the right |
| `.split-2-1` | 67% left / 33% right | Wide code snippet on the left, explanation on the right |
| `.split-1-3` | 25% left / 75% right | Compact visual on the left, detailed content on the right |
| `.split-3-1` | 75% left / 25% right | Detailed content on the left, compact visual on the right |
| `.split-left` | Flexbox align left | Horizontal alignment of elements |
| `.split-right` | Flexbox align right | Horizontal alignment in reverse order |

```html
<div class="split-1-2">
  <div class="img-box">
    <img src="./images/architecture.png" class="img-glow" alt="Architecture Diagram">
    <p class="caption">Figure 1: MVC Architecture</p>
  </div>
  <div class="card card-glass">
    <h4>Key Characteristics</h4>
    <ul>
      <li>Clear separation of concerns between business logic and presentation.</li>
      <li>High reusability of controllers and data models.</li>
    </ul>
  </div>
</div>
```

---

### 1.4 Media Cards & Image Helpers

Designed for presenting screenshots, diagrams, and technical schematics cleanly:

| Class | Description |
| --- | --- |
| `.media-card` | Grid layout with image on the left and text on the right within a dark card container. |
| `.media-card.media-card-right` | Grid layout with text on the left and image on the right within a dark card container. |
| `.img-glow` | Adds a Thomas More orange glow around an image. |
| `.img-glow-cyan` | Adds an ITF cyan glow around an image. |
| `.img-frame` | Wraps a screenshot or icon in a padded dark border frame. |
| `.img-center` | Centers an image horizontally across the slide. |
| `.img-box` or `.figure-box` | Flex container for stacking an image and its caption centered vertically. |
| `.caption` | Monospaced muted caption label below an image. |

```html
<div class="media-card">
  <img src="./images/terminal.png" class="img-frame" alt="Terminal Output">
  <div>
    <h4>CLI Installation</h4>
    <p>Run the installation command in your terminal to initialize the project structure.</p>
  </div>
</div>
```

---

### 1.5 Badges (`.badge`)

Compact tags for displaying statuses, labels, tags, or version numbers:

| Class | Appearance | Code Snippet |
| --- | --- | --- |
| `.badge` | Solid orange background with white text | `<span class="badge">Important</span>` |
| `.badge.badge-cyan` | Solid cyan background with white text | `<span class="badge badge-cyan">Vue 3</span>` |
| `.badge.badge-outline` | Transparent background with orange border and light text | `<span class="badge badge-outline">Optional</span>` |
| `.badge.badge-outline-cyan` | Transparent background with cyan border and cyan text | `<span class="badge badge-outline-cyan">TypeScript</span>` |

```html
<h3>Component Lifecycle <span class="badge badge-cyan">v4.0</span> <span class="badge">New</span></h3>
```

---

## 2. Marp Markdown Syntax & Directives

Marp extends standard Markdown with presentation-specific directives and slide formatting capabilities.

### 2.1 Frontmatter (Global Document Settings)

Place the frontmatter YAML block at the very top of each `.md` file:

```markdown
---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - CSS Layouts'
footer: 'Web Essentials - Thomas More Hogeschool'
---
```

| Directive | Type | Description |
| --- | --- | --- |
| `marp: true` | Boolean | Required. Enables Marp presentation processing. |
| `theme: thomasmore` | String | Selects the active CSS theme. |
| `paginate: true` | Boolean | Displays slide page numbers in the bottom right corner. |
| `header: 'Text'` | String | Fixed header rendered at the top of each slide. |
| `footer: 'Text'` | String | Fixed footer rendered at the bottom of each slide. |
| `size: 16:9` | String | Slide aspect ratio (`16:9`, `4:3`, `A4`). Default is `16:9`. |

---

### 2.2 Slide Separators (`---`)

Create new slides using three hyphens on an isolated line:

```markdown
# Slide 1

Content for slide 1...

---

# Slide 2

Content for slide 2...
```

---

### 2.3 Slide-Specific Directives (Scoped Directives)

Use HTML comments prefixed with an underscore (`_`) to change a setting **for the current slide only**:

```markdown
<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _backgroundColor: #0f141c -->
<!-- _color: #ffffff -->

# Title Slide Without Header or Footer
```

> **Scoped Directive Rules:**
>
> - With an underscore (`<!-- _class: lead -->`): applies **only** to the current slide.
> - Without an underscore (`<!-- class: invert -->`): applies to the current slide and **all subsequent slides**.

---

### 2.4 Managing Slide Numbers

Temporarily suppress or restart slide numbering:

```markdown
<!-- _paginate: false -->
This slide will not display a slide number.

---

<!-- paginate: true -->
Slide numbering resumes starting from here.
```

---

### 2.5 Marp Image Syntax & Backgrounds

Marpit offers extended syntax to position and format images directly in Markdown:

#### A. Specifying Image Dimensions

```markdown
![w:400px](image.png)
![h:250px](image.png)
![w:500px h:300px](image.png)
```

#### B. Split Backgrounds (Image Alongside Text)

Place an image on the left or right side of the slide with automatic column splitting:

```markdown
## Flexbox Model

![bg right:40%](images/flexbox.png)

- `display: flex` turns the container into a flex context.
- `justify-content` controls alignment along the main axis.
- `align-items` controls alignment along the cross axis.
```

```markdown
## Grid System

![bg left:35%](images/grid.png)

- Text content is positioned on the right side (65% width).
- Image occupies the left side (35% width).
```

#### C. Full Slide Background Image & Filters

```markdown
<!-- Full background image across the entire slide with dark overlay filters -->
![bg cover brightness:0.4 blur:2px](images/wallpaper.jpg)

# Crisp Readable Text Over Background Image
```

Available image filters:

- `brightness:0.5` (darker) or `brightness:1.5` (brighter)
- `contrast:1.2`
- `blur:4px`
- `grayscale:1`
- `sepia:0.8`
- `invert`
- `opacity:0.6`

---

### 2.6 Fragmented Lists (Step-by-Step Reveal)

To reveal bullet points one by one during a presentation:

```markdown
## Progressive Delivery

* First point (visible immediately)
* Second point (appears on next click or key press)
* Third point (appears on subsequent click)
```

Use asterisks (`*`) instead of hyphens (`-`) for step-by-step fragment animations.

---

### 2.7 Mathematical Formulas (MathJax / KaTeX)

Marp supports KaTeX mathematical formatting out of the box:

```markdown
Inline equation: $E = mc^2$

Block equation:
$$
\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}
$$
```

---

### 2.8 Presenter Notes

Add notes that are visible only in Marp Presenter Mode (press key `P` in the browser):

```markdown
## Slide Topic

Visible content displayed to students on screen...

<!--
Presenter Note:
- Mention the real-world case study regarding database indexing.
- Ask students about their previous experience with SQL joins.
-->
```

---

### 2.9 Local Style Overrides (`<style scoped>`)

When you need to adjust styling for a specific slide without affecting the global theme:

```markdown
<style scoped>
section {
  background: #151b23;
  justify-content: flex-start;
}
h2 {
  color: #009cab;
}
</style>

## Customized Slide Style
Text styled specifically for this individual slide only.
```

---

## 3. Code Highlighting Guidelines

The theme enforces dark high-contrast syntax highlighting via Highlight.js:

- Always specify supported language identifiers: `html`, `css`, `javascript`, `typescript`, `php`, `bash`, `json`, `sql`, `python`, `yaml`.
- **Important:** **Never use `blade`**, as Highlight.js does not have a native Blade definition. Always use `html` or `php` for Blade views and Flux UI components.

````markdown
```html
<div class="card card-accent">
  <h4>Livewire Counter</h4>
  <button wire:click="increment">+</button>
</div>
```
````

---

## 4. Marp CLI Export Commands

To compile slides manually from the terminal:

```bash
# Start local watch mode with live reload
npm run dev

# Export to standalone HTML file
npx -y @marp-team/marp-cli@latest --no-stdin presentations/my_deck.md --html -o presentations/my_deck.html

# Export to PDF
npx -y @marp-team/marp-cli@latest --no-stdin presentations/my_deck.md --pdf -o presentations/my_deck.pdf
```

---

## 5. Available Themes

In your frontmatter (`theme: <name>`), choose from the registered themes:

| Theme | Stylesheet | Style & Target Audience |
| --- | --- | --- |
| `thomasmore` | [thomasmore.css](file:///d:/Sites_Marp/presentations/css/thomasmore.css) | Default Thomas More ITF brand identity (orange/cyan accents, dark slate background with ambient gradient). |
| `tech` | [tech.css](file:///d:/Sites_Marp/presentations/css/tech.css) | Dark developer aesthetic with syntax highlighting focus, monospaced accents, and terminal cues. |
| `business` | [business.css](file:///d:/Sites_Marp/presentations/css/business.css) | Professional light corporate look with blue accents and clean typography. |
| `dark` | [dark.css](file:///d:/Sites_Marp/presentations/css/dark.css) | Sleek modern dark theme with cyan and purple highlights. |
| `gradient` | [gradient.css](file:///d:/Sites_Marp/presentations/css/gradient.css) | Vibrant purple-pink gradient background suited for creative decks. |
| `colorful` | [colorful.css](file:///d:/Sites_Marp/presentations/css/colorful.css) | Playful, bright theme with energetic pastel accents. |
| `minimal` | [minimal.css](file:///d:/Sites_Marp/presentations/css/minimal.css) | Calm, distraction-free monochrome typographic presentation. |
| `default` / `gaia` / `uncover` | *(built into Marp)* | Official standard themes shipped with the core Marp engine. |
