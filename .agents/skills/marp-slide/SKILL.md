---
name: marp-slide
description: Create professional Marp presentation slides with 8 beautiful themes (default, minimal, colorful, dark, gradient, tech, business, thomasmore). Use when users request slide creation, presentations, or Marp documents. Supports custom themes, image layouts, and "make it look good" requests with automatic quality improvements.
---

# Marp Slide Creator

Create professional, visually appealing Marp presentation slides with 8 pre-designed themes and built-in best practices.

## When to Use This Skill

Use this skill when the user:
- Requests to create presentation slides or Marp documents
- Asks to "make slides look good" or "improve slide design"
- Provides instructions like "make it nice", "make it cool", or specific brand requirements
- Wants to create lecture or seminar materials (e.g. Thomas More Hogeschool)
- Needs bullet-point focused slides with code blocks, tables, cards or images

## Quick Start

### Step 1: Select Theme

First, determine the appropriate theme based on the user's request and content.

**Quick theme selection:**
- **Thomas More Hogeschool / Academic Tech** -> thomasmore theme (`template-thomasmore.md`)
- **Technical/Developer content** -> tech theme (`template-tech.md`)
- **Business/Corporate** -> business theme (`template-business.md`)
- **Creative/Event** -> colorful or gradient theme
- **Academic/Simple** -> minimal theme
- **General/Unsure** -> default theme
- **Dark background preferred** -> thomasmore, dark or tech theme

For detailed theme selection guidance, read `references/theme-selection.md`.

### Step 2: Create Slides

1. **Read relevant references first**:
   - Always start by reading `references/marp-syntax.md` for basic syntax
   - For images: `references/image-patterns.md` (official Marpit image syntax)
   - For advanced features (math, emoji): `references/advanced-features.md`
   - For custom themes: `references/theme-css-guide.md`

2. Copy content from the appropriate template file:
   - `assets/template-thomasmore.md` - Thomas More Hogeschool Tech theme (Dark mode, brand orange, high contrast code & dark tables)
   - `assets/template-basic.md` - Default theme (most common)
   - `assets/template-minimal.md` - Minimal theme
   - `assets/template-colorful.md` - Colorful theme
   - `assets/template-dark.md` - Dark mode theme
   - `assets/template-gradient.md` - Gradient theme
   - `assets/template-tech.md` - Tech/code theme
   - `assets/template-business.md` - Business theme

3. Read `references/best-practices.md` for quality guidelines

4. Structure content following best practices:
   - Title slide with `<!-- _class: lead -->`
   - Concise h2 titles
   - 3-5 bullet points per slide
   - Adequate whitespace
   - Avoid en-dashes and em-dashes; use standard hyphens `-`

5. Add images if needed using patterns from `references/image-patterns.md`

6. Save to destination directory with `.md` extension

## Available Themes

### 1. Thomas More Tech Theme
**Colors**: Dark slate background (`#0f141c`), Thomas More orange accents (`#e84e10`, `#ff753a`), cyan accent (`#009cab`), white headings, high-contrast code highlighting
**Style**: Modern academic tech, cards (`.card`, `.grid-2`), badges (`.badge`), custom dark tables with zebra striping, Outfit & Fira Code typography
**Use for**: Thomas More courses, ITF Web Essentials, programming lectures, technical university presentations
**Template**: `template-thomasmore.md`
**CSS**: `theme-thomasmore.css`

### 2. Default Theme
**Colors**: Beige background, navy text, blue headings
**Style**: Clean, sophisticated with decorative lines
**Use for**: General seminars, lectures, presentations
**Template**: `template-basic.md`

### 3. Minimal Theme
**Colors**: White background, gray text, black headings
**Style**: Minimal decoration, wide margins, light fonts
**Use for**: Content-focused presentations, academic talks
**Template**: `template-minimal.md`

### 4. Colorful & Pop Theme
**Colors**: Pink gradient background, multi-color accents
**Style**: Vibrant gradients, bold fonts, rainbow accents
**Use for**: Youth-oriented events, creative projects
**Template**: `template-colorful.md`

### 5. Dark Mode Theme
**Colors**: Black background, cyan/purple accents
**Style**: Dark theme with glow effects, eye-friendly
**Use for**: Tech presentations, evening talks, modern look
**Template**: `template-dark.md`

### 6. Gradient Background Theme
**Colors**: Purple/pink/blue/green gradients (varies per slide)
**Style**: Different gradient per slide, white text, shadows
**Use for**: Visual-focused, creative presentations
**Template**: `template-gradient.md`

### 7. Tech/Code Theme
**Colors**: GitHub-style dark background, blue/green accents
**Style**: Code fonts, Markdown-style headers with # symbols
**Use for**: Programming tutorials, tech meetups, developer content
**Template**: `template-tech.md`

### 8. Business Theme
**Colors**: White background, navy headings, blue accents
**Style**: Corporate presentation style, top border, table support
**Use for**: Business presentations, proposals, reports
**Template**: `template-business.md`

## Creating Slides Process

### Basic Workflow

1. **Understand requirements**
   - Identify content: title, topics, key points
   - Determine target audience (e.g. Thomas More students)
   - Assess formality level

2. **Select theme**
   - Use quick selection rules above
   - If uncertain, consult `references/theme-selection.md`
   - Default to default theme or thomasmore theme if related to Thomas More / ITF

3. **Apply template**
   - Load appropriate template from `assets/`
   - CSS is already embedded - no external files needed
   - Maintain template structure

4. **Structure content**
   - Title slide: `<!-- _class: lead -->` + h1
   - Content slides: h2 title + bullet points
   - Use 3-5 bullet points per slide
   - Use standard hyphens `-` (never en-dashes or em-dashes)

5. **Refine quality**
   - Read `references/best-practices.md`
   - Ensure adequate whitespace
   - Maintain consistency
   - Keep text concise

6. **Add images**
   - If needed, consult `references/image-patterns.md`
   - Common: `![bg right:40%](image.png)` - Image on right, text on left
   - Use proper Marp image syntax

7. **Output file**
   - Save to destination directory with `.md` extension

## Image Integration

For slides with images, consult `references/image-patterns.md` for detailed syntax.

Common patterns:
- **Side image**: `![bg right:40%](image.png)` - Image on right, text on left
- **Centered**: `![w:600px](image.png)` - Centered with specific width
- **Full background**: `![bg](image.png)` - Full-screen background
- **Multiple images**: Multiple `![bg]` declarations

Example lecture pattern:
```markdown
## Slide Title

![bg right:40%](diagram.png)

- Explanation point 1
- Explanation point 2
- Explanation point 3
```

## Quality Checklist

Before delivering slides, verify:
- [ ] Theme selected appropriately for content
- [ ] CSS theme is embedded in the file
- [ ] Title slide uses `<!-- _class: lead -->`
- [ ] All h2 titles are concise
- [ ] Bullet points are 3-5 items per slide
- [ ] High contrast code blocks and table text on dark backgrounds
- [ ] No en-dashes or em-dashes are used
- [ ] Images use proper Marp syntax
- [ ] Content follows best practices

## References

### Core Documentation
- **Marp syntax**: `references/marp-syntax.md` - Basic Marp/Marpit syntax (directives, frontmatter, pagination, etc.)
- **Image patterns**: `references/image-patterns.md` - Official image syntax (bg, filters, split backgrounds)
- **Theme CSS guide**: `references/theme-css-guide.md` - How to create custom themes based on Marpit specification
- **Advanced features**: `references/advanced-features.md` - Math, emoji, fragmented lists, Marp CLI, VS Code
- **Official themes**: `references/official-themes.md` - default, gaia, uncover themes documentation

### Quality & Selection Guides
- **Theme selection**: `references/theme-selection.md` - How to choose the right theme for content
- **Best practices**: `references/best-practices.md` - Quality guidelines for high-impact slides

### Templates & Assets
- **Templates**: `assets/template-*.md` - Starting points with embedded CSS for each theme (8 themes)
- **Standalone CSS**: `assets/theme-*.css` - CSS files for reference (already embedded in templates)

### Official External Links
- **Marp Official Site**: https://marp.app/
- **Marpit Directives**: https://marpit.marp.app/directives
- **Marpit Image Syntax**: https://marpit.marp.app/image-syntax
- **Marpit Theme CSS**: https://marpit.marp.app/theme-css
- **Marp Core GitHub**: https://github.com/marp-team/marp-core
- **Marp CLI GitHub**: https://github.com/marp-team/marp-cli
