# Interactive Marp Slide Presentation Platform

A turnkey, modern presentation deck generator and interactive slide platform built with [Marp](https://marp.app/). Designed for higher education, corporate training, and technical documentation with multi-language support, custom branding, high-contrast dark themes, live reload development, and automated static publishing.

- **Repository:** <https://github.com/pverhaert/marp-slides>
- **Live Demo / Hosting:** <https://pv-slides.netlify.app/>

---

## Key Features

- **Standardized Multi-Theme Engine:** Includes customized themes (`thomasmore`, `tech`, `business`, `dark`, `gradient`, `colorful`, `minimal`) configured via `marp.config.js`.
- **Interactive Slide Viewer:** Injected client-side utilities (`scripts.js`) providing theme toggling (dark/light), language switching modal, presentation progress, keyboard shortcuts, speaker notes, and fullscreen mode.
- **Local Dev Server with Live Reload:** Built-in Node.js server (`presentations/js/watch.js`) with Server-Sent Events (SSE) for instant browser reloading whenever Markdown or CSS files are updated.
- **Responsive Portal Page:** A dark slate dashboard (`index.html`) displaying courses, modules, tags, and multi-language launch badges (NL, EN, FR).
- **Automated Production Build:** Bundling script (`presentations/js/build.js`) that compiles all slides to HTML, injects viewer scripts, filters out raw Markdown, and outputs a ready-to-deploy static site to `dist/`.
- **AI-Powered Authoring Workflow:** Built-in `AGENTS.md` and `.agents/skills/marp-slide/` instructions allowing AI assistants to generate pedogogically structured slides adhering to your institutional style.

---

## Quick Start

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (installed with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pverhaert/marp-slides.git
   cd marp-slides
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Local Development

Start the development server with live reload:

```bash
npm run dev
```

This starts the server on port `4040` (or `3000` by default):

- Portal / Dashboard: `http://localhost:4040/` (or `http://localhost:4040/presentations/`)
- Any presentation can be accessed directly through the portal or via its path.
- When you edit any `.md` or `.css` file, the slides recompile and connected browser windows refresh automatically.

To specify a custom port in package.json scripts:

```bash
"watch": "node presentations/js/watch.js --port=5000"
```

### Production Build

To compile all presentations for production deployment:

```bash
npm run build
```

This performs a 4-step build:

1. Cleans the `dist/` directory.
2. Compiles all `.md` presentations recursively using Marp CLI.
3. Injects interactive viewer scripts (`scripts.js`, settings, navigation) into each generated HTML file.
4. Copies static assets (CSS, images, icons, index portal) into `dist/`, excluding raw Markdown files.

---

## Project Structure

```
.
|-- .agents/
|   `-- skills/
|       `-- marp-slide/
|           |-- SKILL.md                 # Agent skill instructions and rules
|           |-- assets/                  # Starter templates for each theme
|           `-- references/              # Syntax, layouts, and image patterns
|-- .vscode/
|   `-- settings.json                    # VS Code settings
|-- presentations/
|   |-- css/
|   |   |-- thomasmore.css               # Primary brand stylesheet and utility classes
|   |   |-- settings.css                 # Interactive slide menu and viewer styles
|   |   `-- tech.css, dark.css, ...      # Alternative Marp theme stylesheets
|   |-- js/
|   |   |-- build.js                     # Static production build pipeline
|   |   |-- inject-scripts.js            # Script injection utility
|   |   |-- scripts.js                   # Client-side presentation enhancements
|   |   `-- watch.js                     # Development server with live reload (SSE)
|   |-- [course_name]/                   # Course directory (e.g. web_development)
|   |   `-- [module_name]/               # Module directory (e.g. css_layout)
|   |       |-- dutch.md                 # Dutch version of slides
|   |       |-- english.md               # English version of slides
|   |       |-- french.md                # French version of slides
|   |       `-- assets/                  # Module-specific images and diagrams
|   |-- index.html                       # Dashboard portal homepage
|   `-- styles.css                       # Dashboard portal stylesheet
|-- dist/                                # Production output folder (created on build)
|-- AGENTS.md                            # AI persona, brand rules, and generation guidelines
|-- CHEATSHEET.md                        # Quick reference for CSS utility classes
|-- marp.config.js                       # Marp CLI configuration and theme registration
`-- package.json                         # Dependencies and npm scripts
```

---

## Customizing for Your Domain or Institution

You can easily adapt this repository for another university, company, school, or subject matter.

### 1. Update the AI Agent Persona (`AGENTS.md`)

The `AGENTS.md` file defines how AI coding assistants generate presentations in this workspace:

- **Agent Persona:** Update the identity, institution name, department, and subject expertise.
- **Brand Colors:** Replace the color variables with your institution's palette:

  ```css
  --color-background: #0f141c;
  --color-foreground: #e6edf3;
  --color-accent: #e84e10;       /* Your primary brand color */
  --color-secondary: #009cab;    /* Your secondary accent color */
  ```

- **Language Requirements:** Define which languages your institution requires (e.g. Dutch, English, French, German).
- **Didactic Rules:** Update pedagogical constraints, forbidden patterns (e.g. em-dashes, emojis), or code block requirements for your curriculum.

### 2. Customize Themes and Branding (`presentations/css/`)

- The active default theme is `thomasmore` defined in `presentations/css/thomasmore.css`.
- You can edit `thomasmore.css` directly or create a new file (e.g. `mytheme.css`) and register it in `marp.config.js`:

  ```javascript
  module.exports = {
    themeSet: [
      './presentations/css/mytheme.css',
      './presentations/css/tech.css',
      './presentations/css/business.css'
    ],
    html: true
  };
  ```

- **Never put `<style>` tags directly into Markdown files.** Keep all styling centralized in your theme CSS to ensure uniform compilation across all decks.

### 3. Customize the Portal Page (`presentations/index.html`)

Modify `presentations/index.html` to showcase your own courses:

- Update header titles, institution badge, and subtitle.
- Create course sections (`<section>`) and module cards (`<div class="card">`).
- Use the two-part badge style for multi-language buttons:

  ```html
  <div class="button-group">
    <a href="course/module/dutch.html" class="card-button">
      <span class="lang-code">NL</span>
      <span class="lang-label">Nederlands</span>
    </a>
    <a href="course/module/english.html" class="card-button secondary">
      <span class="lang-code">EN</span>
      <span class="lang-label">English</span>
    </a>
    <a href="course/module/french.html" class="card-button secondary">
      <span class="lang-code">FR</span>
      <span class="lang-label">Français</span>
    </a>
  </div>
  ```

- Adjust card border, surface colors, and hover effects in `presentations/styles.css`.

### 4. Leverage AI Skills (`.agents/skills/marp-slide/`)

When using AI assistants, the skill system provides modular guidelines:

- `SKILL.md`: Main entry point for presentation workflows.
- `assets/template-*.md`: Ready-to-use slide templates for each theme.
- `references/marp-syntax.md`: Overview of Marp-specific Markdown features (directives, pagination, headers/footers).
- `references/image-patterns.md`: Guidelines for Marpit image syntax (background images, split slides, sizing filters).
- `references/advanced-features.md`: Advanced elements such as math formulas, tables, and media formatting.
- `references/best-practices.md`: Slide readability guidelines (text density, contrast, typography hierarchy).

---

## Slide Creation Workflow

When adding a new presentation module, follow this standard pattern:

### Step 1: Directory Structure

Organize files by course and module using lowercase with underscores:

```
presentations/
  computer_networks/
    routing_protocols/
      dutch.md
      english.md
      assets/
        network-topology.webp
```

### Step 2: Frontmatter

Every `.md` file must begin with standard Marp frontmatter:

```markdown
---
marp: true
theme: thomasmore
paginate: true
header: 'Department | Course - Module'
footer: 'Course Name - Institution'
---
```

### Step 3: Slide Syntax and Layout Utilities

Use the CSS classes documented in `CHEATSHEET.md`:

- **Title Slide:**

  ```markdown
  <!-- _class: lead -->
  # Module Title
  <p class="subtitle">Module Subtitle or Description</p>
  ```

- **Two-Column Layout:**

  ```markdown
  <div class="grid-2">
  <div>

  ### Left Column
  - Point A
  - Point B

  </div>
  <div>

  ### Right Column
  - Point C
  - Point D

  </div>
  </div>
  ```

- **Cards and Badges:**

  ```markdown
  <div class="card card-accent">
    <span class="badge">Important</span>
    <p>Key concept summary goes here.</p>
  </div>
  ```

### Step 4: Code Blocks

Always specify a supported Highlight.js language identifier:

- Supported: `html`, `css`, `javascript`, `typescript`, `php`, `bash`, `json`, `sql`, `python`, `yaml`.
- Note: For Blade templates or Laravel Flux components, use `html` or `php` because Highlight.js does not have a native Blade syntax definition.

---

## Hosting and Deployment

### Netlify Deployment

This repository is optimized for deployment on Netlify:

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18 or higher

Configuration can be handled via `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/"
  to = "/index.html"
  status = 200
```

On every `git push` to your repository, Netlify will run `npm run build`, compile all presentation files, and deploy the updated static portal. Raw Markdown files and AI agent folders are never exposed publicly.

### Alternative Hosts

Because `npm run build` generates a completely static bundle in `dist/`, the output can be deployed to:

- **GitHub Pages:** Point GitHub Pages to the `dist` branch or upload the artifact via GitHub Actions.
- **Vercel:** Set Output Directory to `dist` and Build Command to `npm run build`.
- **Cloudflare Pages:** Set Build output directory to `dist`.
- **Any Standard Web Server:** Copy the contents of `dist/` to your web server document root (Apache, Nginx, Caddy).

---

## License and Attribution

Created by Patrick Verhaert for Thomas More Hogeschool (IT Factory).
Free to adapt and use for educational and commercial presentation needs.
