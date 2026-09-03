---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Flux UI'
footer: 'Web Development - Thomas More University of Applied Sciences'
---

<!-- _class: lead -->

# Flux UI Components

<p class="subtitle">&lt;Modern, Accessible UI Components for Laravel & Livewire /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Development | <strong>Topic:</strong> Flux UI Library & Forms in Laravel 13
</div>

---

## Table of Contents

1. **What is Flux UI?** - Official component library for Livewire and Tailwind
2. **Installation & Setup in Laravel 13** - Composer package, scripts, and layout setup
3. **Interactive Playground** - Official documentation and component sandbox
4. **Why Flux? Advantages over "Vanilla" Tailwind** - Accessibility, consistency, and velocity
5. **Code Comparison: Flux Input vs Manual HTML** - 18 lines of boilerplate vs 1 clean line
6. **Form Components (Free Tier)** - `flux:input`, `flux:textarea`, `flux:select`, `flux:checkbox`, `flux:radio`
7. **Buttons & Actions** - `flux:button`, variants, sizes, and Livewire loading states
8. **Modals & Overlays** - `flux:modal` with focus trapping and backdrop blur
9. **Data Display & Containers** - `flux:badge`, `flux:card`, and `flux:table`
10. **Customization & Theming** - Variants, Tailwind overrides, accent colors, and slots
11. **Practical Example in Laravel** - Complete input form with validation and modal
12. **Summary & Best Practices** - Guidelines for building professional Laravel UIs

---

## Interactive Playground: Flux UI Docs <span class="badge">Online Documentation</span>

Consult the official documentation during lectures and lab assignments for all free components:

**[fluxui.dev/docs](https://fluxui.dev/docs)**

<div class="grid-2">
<div class="card">

#### What the Free Tier of Flux Includes
- **Complete Form Suite:** Inputs, textareas, selects, checkboxes, switches, and radio groups
- **Buttons & Badges:** All primary, outline, ghost, and danger variants
- **Modals & Dialogs:** Accessible dialog overlays with keyboard trapping
- **Icons & Cards:** Standardized Lucide icons and container wrappers

</div>
<div class="card">

#### Curriculum Integration
- In **Web Development**, we combine **Laravel 13**, **Tailwind CSS v4**, **Livewire v4**, and **Flux UI**
- This provides the fastest, most reliable stack for modern web applications

</div>
</div>

---

## 1. What is Flux UI?

Flux is an **official UI component library** designed specifically for Livewire and Tailwind CSS:

<div class="grid-2">
<div class="card">

#### Tailored for Livewire
- Created by Caleb Porzio (creator of Livewire and Alpine.js)
- Components automatically understand `wire:model`, error bags, and loading states
- Zero need for complex JavaScript bridges or heavy React/Vue wrappers

</div>
<div class="card">

#### Powered by Tailwind CSS
- Leverages modern Tailwind utility classes
- Full out-of-the-box Dark Mode support
- 100% customizable via standard Tailwind classes and theme variables

</div>
</div>

---

## 2. Installation & Setup in Laravel 13

Install Flux into your Laravel application via Composer:

```bash
# 1. Install the Flux package
composer require livewire/flux

# 2. Publish assets and configuration (optional for customizing)
php artisan flux:publish
```

Add Flux directives into your root application layout (`resources/views/layouts/app.blade.php`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>ITF Web Development</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @fluxAppearance
</head>
<body class="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
    {{ $slot }}

    @fluxScripts
</body>
</html>
```

---

## 4. Why Flux? Advantages over Handcrafted Tailwind

Why do we use Flux instead of manually crafting every HTML element with Tailwind classes?

<div class="grid-2">
<div class="card">

#### 1. Built-in Accessibility (A11y)
- Correct ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-expanded`)
- Automated connection between `<label for="...">` and `<input id="...">`
- Comprehensive keyboard navigation (Tab, Escape, Arrows) and modal focus trapping

</div>
<div class="card">

#### 2. Automatic Livewire Validation
- Renders validation errors **without manual `@error` blocks**
- Automatically highlights input borders in red on failure
- Clears error states as soon as the user corrects their input

</div>
</div>

<div class="grid-2" style="margin-top: 16px;">
<div class="card">

#### 3. Massive Productivity Boost
- 80-90% fewer lines of Blade code across views
- Eliminates repetitive copy-pasting of complex form structures

</div>
<div class="card">

#### 4. Consistent Design System
- Unified focus rings, typography, and dark mode throughout the entire app

</div>
</div>

---

## 5. Code Comparison: Manual Tailwind Form Field

Look at the overwhelming boilerplate required for **a single form field** with validation:

```html
<!-- Manual Tailwind & Blade Form Input: 18 lines of boilerplate! -->
<div>
    <div class="flex justify-between items-center mb-1">
        <label for="email" class="block text-sm font-medium text-slate-200">
            Email Address <span class="text-red-500">*</span>
        </label>
        <span class="text-xs text-slate-400">Required</span>
    </div>
    
    <div class="relative rounded-md shadow-sm">
        <input 
            type="email" 
            id="email" 
            wire:model.blur="email" 
            placeholder="student@thomasmore.be"
            class="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 @error('email') border-red-500 text-red-400 focus:border-red-500 @enderror"
            aria-invalid="@error('email') true @else false @enderror"
        >
    </div>
    <p class="mt-1 text-xs text-slate-400">Use your Thomas More student account.</p>

    @error('email')
        <p class="mt-1 text-xs text-red-500 font-medium">{{ $message }}</p>
    @enderror
</div>
```

---

## 5. Code Comparison: The Same Feature in Flux UI

The exact same input with label, description, badge, icon, and automated validation in Flux:

```html
<!-- Flux UI Component: Exactly 1 clean, readable line of code! -->
<flux:input 
    type="email"
    label="Email Address" 
    badge="Required"
    description="Use your Thomas More student account."
    icon="envelope" 
    wire:model.blur="email" 
    placeholder="student@thomasmore.be" 
/>
```

<div class="grid-2" style="margin-top: 14px;">
<div class="card">

#### Automated Behind the Scenes
1. Generates semantic `<label>` with badge
2. Insets and centers the envelope icon smoothly
3. Binds description via `aria-describedby`

</div>
<div class="card">

#### Automatic Error Handling
- Detects `$errors->has('email')` from Livewire
- Displays error message with warning icon in red
- Applies red ring and border styles automatically

</div>
</div>

---

## 6. Form Components: Input & Passwords

Flux provides convenient modifiers for input fields:

```html
<!-- 1. Text Input with Search Icon and Clear Button -->
<flux:input icon="magnifying-glass" wire:model.live="search" placeholder="Search..." clearable />

<!-- 2. Password Field with Built-in Toggle Visibility (viewable) -->
<flux:input type="password" label="Password" wire:model="password" viewable />

<!-- 3. Numeric Input with Prefix and Suffix -->
<flux:input type="number" label="Price" wire:model="price">
    <x-slot:prefix>EUR</x-slot:prefix>
    <x-slot:suffix>.00</x-slot:suffix>
</flux:input>

<!-- 4. Field with Keyboard Shortcut Badge -->
<flux:input label="Quick Search" placeholder="Press shortcut" kbd="Ctrl+K" />
```

---

## 6. Form Components: Textarea & Select

```html
<!-- Auto-resizing Textarea with rows or character hints -->
<flux:textarea 
    label="Project Description" 
    wire:model="description" 
    placeholder="Describe your Web Development project..." 
    rows="4" 
/>

<!-- Standardized Dropdown Select -->
<flux:select label="Curriculum Track" wire:model="track" placeholder="Select a track...">
    <flux:select.option value="app-dev">Application Development</flux:select.option>
    <flux:select.option value="ai">Artificial Intelligence</flux:select.option>
    <flux:select.option value="cloud">Cloud & Cyber Security</flux:select.option>
</flux:select>
```

> **Note:** Both `<flux:textarea>` and `<flux:select>` automatically handle labels, descriptions, and validation errors just like `<flux:input>`.

---

## 6. Form Components: Checkbox, Radio & Switch

```html
<!-- 1. Single Checkbox with Description -->
<flux:checkbox label="I accept the Terms and Conditions" wire:model="terms" />

<!-- 2. Checkbox Group -->
<flux:checkbox.group label="Interests" wire:model="skills">
    <flux:checkbox value="laravel" label="Laravel & Livewire" />
    <flux:checkbox value="tailwind" label="Tailwind CSS v4" />
    <flux:checkbox value="alpine" label="Alpine.js" />
</flux:checkbox.group>

<!-- 3. Radio Group -->
<flux:radio.group label="Campus Location" wire:model="campus">
    <flux:radio value="geel" label="Campus Geel" />
    <flux:radio value="lier" label="Campus Lier" />
</flux:radio.group>

<!-- 4. Toggle Switch -->
<flux:switch label="Receive email notifications" wire:model="notifications" />
```

---

## 7. Buttons & Actions (`flux:button`)

Flux buttons feature built-in visual variants, sizing, and Livewire loading indicators:

```html
<div class="flex flex-wrap gap-3 items-center">
    <!-- Primary Action -->
    <flux:button variant="primary" wire:click="save">Save</flux:button>

    <!-- Subtle / Outline Variants -->
    <flux:button variant="filled">Filled Button</flux:button>
    <flux:button variant="outline">Outline Button</flux:button>
    <flux:button variant="ghost">Ghost Button</flux:button>

    <!-- Destructive Action (Red) -->
    <flux:button variant="danger" wire:click="delete">Delete</flux:button>

    <!-- Buttons with Icons and Sizes -->
    <flux:button icon="plus" size="sm" variant="primary">Add Item</flux:button>
    <flux:button icon-trailing="arrow-right">Next Step</flux:button>
</div>
```

> **Automatic Loading State:** When binding `wire:click="save"`, `<flux:button>` automatically displays a loading spinner and disables user clicks during server execution!

---

## 8. Modals & Dialogs (`flux:modal`)

Build fully accessible dialogs and popups in just a few lines of Blade:

```html
<!-- 1. Trigger Button -->
<flux:modal.trigger name="edit-user">
    <flux:button variant="primary" icon="pencil">Edit User</flux:button>
</flux:modal.trigger>

<!-- 2. Modal Component -->
<flux:modal name="edit-user" class="md:w-96 space-y-6">
    <div>
        <h3 class="text-lg font-bold">Edit Profile</h3>
        <p class="text-sm text-slate-400">Update your contact details.</p>
    </div>

    <flux:input label="Full Name" wire:model="name" />
    <flux:input label="Email Address" type="email" wire:model="email" />

    <div class="flex justify-end gap-2">
        <flux:modal.close>
            <flux:button variant="ghost">Cancel</flux:button>
        </flux:modal.close>
        <flux:button variant="primary" wire:click="updateProfile">Save Changes</flux:button>
    </div>
</flux:modal>
```

---

## 9. Data Display: Badges, Cards & Tables

```html
<!-- 1. Badges across multiple colors and sizes -->
<flux:badge color="orange">Web Development</flux:badge>
<flux:badge color="cyan" size="sm">ITF</flux:badge>
<flux:badge color="emerald" icon="check">Active</flux:badge>
<flux:badge color="rose" icon="x-mark">Inactive</flux:badge>

<!-- 2. Structured Card Container -->
<flux:card class="space-y-4">
    <div class="flex justify-between items-center">
        <h4 class="font-bold text-lg">Course Details</h4>
        <flux:badge color="orange">Semester 2</flux:badge>
    </div>
    <p class="text-sm text-slate-400">Build reactive interfaces using the modern TALL stack.</p>
    <flux:button size="sm" variant="outline">Learn More</flux:button>
</flux:card>
```

---

## 10. Customization & Theming

Flux is built to integrate seamlessly with your project design tokens:

<div class="grid-2">
<div class="card">

#### 1. Direct Tailwind Overrides
Append custom Tailwind classes to any Flux component via standard `class` attributes:

```html
<flux:input 
    label="Search" 
    class="bg-slate-950 border-orange-500/50" 
/>
<flux:button 
    class="w-full shadow-lg hover:shadow-orange-500/20"
>
    Submit
</flux:button>
```

</div>
<div class="card">

#### 2. Configuring Accent Colors
Set custom accent colors per component or globally in your layout:

```html
<!-- Accent color per component -->
<flux:button accent="orange">
    Thomas More Orange
</flux:button>

<!-- Variant and size settings -->
<flux:badge color="orange" size="lg">
    Featured
</flux:badge>
```

</div>
</div>

---

## 10. Advanced: Composable Subcomponents & Slots

When you need bespoke layouts, break down fields into discrete child components:

```html
<flux:field>
    <div class="flex justify-between items-center">
        <flux:label>Student Number</flux:label>
        <span class="text-xs text-orange-400 font-mono">r0123456</span>
    </div>

    <flux:input icon="identification" wire:model="studentNumber" placeholder="r-number" />

    <flux:description>Enter the r-number displayed on your student ID card.</flux:description>

    <!-- Custom error rendering if needed -->
    <flux:error name="studentNumber" />
</flux:field>
```

> **Flexibility:** Using `<flux:field>` preserves automated ARIA binding while granting 100% control over the HTML layout.

---

## 11. Practical Example: Course Registration Form

```html
<flux:card class="max-w-xl mx-auto space-y-6">
    <div>
        <h3 class="text-xl font-bold">Register for Web Development</h3>
        <p class="text-sm text-slate-400">Complete the form below to confirm your enrollment.</p>
    </div>

    <form wire:submit="register" class="space-y-4">
        <flux:input label="Student Name" wire:model="name" icon="user" required />
        <flux:input type="email" label="Email Address" wire:model="email" icon="envelope" required />

        <flux:select label="Elective Course" wire:model="course">
            <flux:select.option value="livewire">Livewire v4 & Flux UI</flux:select.option>
            <flux:select.option value="alpine">Alpine.js Essentials</flux:select.option>
            <flux:select.option value="tailwind">Tailwind CSS v4 Advanced</flux:select.option>
        </flux:select>

        <flux:checkbox label="I agree to the exam terms and regulations" wire:model="agree" />

        <div class="flex justify-end gap-3 pt-2">
            <flux:button variant="ghost" type="reset">Reset</flux:button>
            <flux:button variant="primary" type="submit">Confirm Registration</flux:button>
        </div>
    </form>
</flux:card>
```

---

<!-- _class: lead -->

# Mastering Flux UI

<p class="subtitle">&lt;Write Less Blade, Build Better Interfaces /&gt;</p>

### Key Takeaways for Students

1. **Eliminate Boilerplate:** Leverage `<flux:input>`, `<flux:select>`, and `<flux:button>` for clean views
2. **Automated Validation:** Stop writing repetitive `@error` blocks and custom red border classes
3. **Accessibility First:** Enjoy built-in ARIA labeling and modal keyboard navigation
4. **Built-in Loading Feedback:** Buttons automatically handle loading spinners on `wire:click`
5. **The Ultimate Laravel 13 Stack:** **Tailwind CSS v4** + **Livewire v4** + **Flux UI**!

<div class="meta-box" style="margin-top: 24px;">
  <strong>Documentation:</strong> Visit <a href="https://fluxui.dev/docs">fluxui.dev/docs</a> to explore all components!
</div>
