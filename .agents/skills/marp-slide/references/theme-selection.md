# Marp Theme Selection Guide

Select the optimal theme from all 8 types according to your use case.

## Theme List and Use Cases

### 1. Thomas More Tech (theme-thomasmore.css / template-thomasmore.md)
**Features**: Dark slate background, Thomas More brand orange highlights, high contrast syntax highlighting, custom dark tables, card grid layouts, Outfit and Fira Code fonts
**Colors**: Dark background (#0f141c) + Thomas More Orange (#e84e10 / #ff753a) + Cyan accent (#009cab) + White headings (#ffffff)
**Use for**: Thomas More Hogeschool courses, ITF Web Essentials, programming modules, tech lectures
**Atmosphere**: Professional, academic tech, high contrast, branded

### 2. Default (theme-default.css / template-basic.md)
**Features**: Refined design, decorative lines, footer bar
**Colors**: Beige background + navy text + blue headings
**Use for**: General seminars, training, presentations
**Atmosphere**: Calm, elegant, sophisticated

### 3. Simple & Minimal (theme-minimal.css / template-minimal.md)
**Features**: Minimal decoration, wide margins, light fonts
**Colors**: White background + gray text + black headings
**Use for**: Content-focused presentations, academic talks, quiet impression
**Atmosphere**: Clean, simple, refined

### 4. Colorful & Pop (theme-colorful.css / template-colorful.md)
**Features**: Gradients, bright colors, bold emphasis
**Colors**: Pink background + multi-color accents
**Use for**: Youth-oriented, events, creative projects
**Atmosphere**: Fun, energetic, vibrant

### 5. Dark Mode (theme-dark.css / template-dark.md)
**Features**: Dark background, glow effects, eye-friendly
**Colors**: Black background + cyan/purple accents
**Use for**: Tech presentations, evening talks, modern impression
**Atmosphere**: Cool, modern, futuristic

### 6. Gradient Background (theme-gradient.css / template-gradient.md)
**Features**: Different gradient per slide, white text, shadow effects
**Colors**: Purple, pink, blue, green gradients
**Use for**: Visual-focused, creative presentations, impressive talks
**Atmosphere**: Vivid, dynamic, impressive

### 7. Tech/Code (theme-tech.css / template-tech.md)
**Features**: GitHub-style design, code fonts, Markdown-style symbols
**Colors**: Black background + blue/green accents
**Use for**: Programming courses, tech meetups, developer-focused
**Atmosphere**: Technical, developer-oriented, GitHub-style

### 8. Business-like (theme-business.css / template-business.md)
**Features**: Corporate presentation style, table support, top border
**Colors**: White background + dark navy headings + blue accents
**Use for**: Business presentations, proposals, reports
**Atmosphere**: Formal, trustworthy, professional

## Theme Selection Decision Flow

### Step 1: Filter by Use Case

**Thomas More / ITF / Academic Course** -> Thomas More Tech
**Technical/Developer-oriented** -> Tech/Code or Thomas More Tech
**Business/Corporate** -> Business-like
**Creative/Event** -> Colorful & Pop or Gradient Background
**Academic/Simple** -> Simple & Minimal
**General/Unsure** -> Default

### Step 2: Choose by Atmosphere

**Thomas More Branded / Tech** -> Thomas More Tech
**Bright and fun** -> Colorful & Pop, Gradient Background
**Calm and elegant** -> Default, Business-like
**Cool and modern** -> Dark Mode, Tech, Thomas More Tech
**Simple and clean** -> Simple & Minimal

### Step 3: Choose by Background Color

**Dark background**: Thomas More Tech, Dark Mode, Tech
**Bright background**: Simple & Minimal, Default, Business-like, Colorful & Pop
**Gradient**: Gradient Background

## Inferring from User Requests

### "Thomas More" / "ITF" / "School Colors"
-> Thomas More Tech (`template-thomasmore.md`)

### "Make it look good" / "Make it cool"
-> Decide based on content:
- Thomas More / ITF content: Thomas More Tech
- Business content: Business-like
- Technical content: Thomas More Tech or Tech/Code
- General: Default
- Creative: Gradient Background

### "Keep it simple" / "Make it readable"
-> Simple & Minimal or Default

### "Make it flashy" / "Make it stand out"
-> Colorful & Pop or Gradient Background

### "Technical" / "Programming"
-> Thomas More Tech or Tech/Code

### "Business" / "Corporate" / "Proposal"
-> Business-like

### "Dark" / "Black background" / "Eye-friendly"
-> Thomas More Tech, Dark Mode or Tech

## When to Use Default Theme

Use the default theme in these cases:
- User has not specified a particular theme
- Use case is not clear
- Only vague instructions like "make it look good"
- Training/seminar purposes without specific branding

## Suggesting Multiple Themes

Suggest 2-3 themes concisely in these cases:
- User asks "Which one is best?"
- Content allows for multiple options
- First-time user seems uncertain

Example suggestion:
"I recommend the following themes for this presentation:
1. **Thomas More Tech**: Branded tech style with orange accents and high contrast code
2. **Business-like**: Formal corporate impression
3. **Default**: Well-balanced all-purpose
Which would you prefer?"
