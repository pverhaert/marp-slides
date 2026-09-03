---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - Livewire v4'
footer: 'Web Development - Thomas More University of Applied Sciences'
---


<!-- _class: lead -->

# Livewire v4 Fundamentals

<p class="subtitle">&lt;Full-Stack Reactivity for Modern Laravel Applications /&gt;</p>

<div class="meta-box">
  <strong>Thomas More University of Applied Sciences</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Development | <strong>Topic:</strong> Livewire v4 Components, Server Reactivity & SPA Navigation
</div>

---

## Table of Contents

1. **What is Livewire v4?** - Philosophy, architecture, and how it works under the hood
2. **Installation & Quickstart** - Setting up Livewire in Laravel and component generation
3. **Interactive Testing** - Quickstart documentation and experimentation
4. **Component Architecture in v4** - Single-file components (`.blade.php`) vs multi-file classes
5. **Properties & Two-Way Data Binding** - `wire:model`, `.live`, `.blur`, and `mount()`
6. **Actions & Event Handling** - `wire:click`, `wire:submit`, parameters, and modifiers
7. **Loading States & Feedback** - `wire:loading`, `wire:target`, and action-scoped indicators
8. **Forms, Validation & Form Objects** - `#[Validate]`, `Form` classes, and realtime errors
9. **SPA Navigation & Performance** - `wire:navigate` and `wire:navigate.hover`
10. **Alpine.js & JavaScript Integration** - The `$wire` object and hybrid interactions
11. **What is New in Livewire v4?** - Single-file standard, faster morphing engine, and `#[Modelable]`
12. **Practical Example** - Realtime Live Search Data Table with pagination and CRUD

---

## Interactive Playground: Livewire v4 Docs <span class="badge">Online Documentation</span>

Want to explore the examples from this presentation or test them inside your Laravel project?

Consult the official documentation:
**[livewire.laravel.com/docs/4.x/quickstart](https://livewire.laravel.com/docs/4.x/quickstart)**

<div class="grid-2">
<div class="card">

#### Why Livewire in Laravel?

- **Build reactive UIs:** No separate REST/GraphQL endpoints or complex client state management required
- **100% PHP & Blade:** Stay within the Laravel ecosystem (Eloquent, Auth, Policies, Validation)
- **Direct server synchronization:** State updates automatically via small JSON payloads

</div>
<div class="card">

#### Recommended during class

- Copy code examples directly from these presentation slides
- Observe how server methods bind directly to Blade buttons and inputs
- Combine Livewire with **Tailwind CSS** and **Alpine.js** for the full TALL-stack stack

</div>
</div>

---

## 1. What is Livewire v4?

Livewire is a **full-stack framework for Laravel** that enables you to build dynamic, reactive user interfaces using only PHP and Blade:

```html
<?php
use Livewire\Component;

new class extends Component {
    public int $count = 0;

    public function increment(): void {
        $this->count++;
    }
};
?>

<div class="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white">
    <h3 class="text-xl font-bold">Counter: <span class="text-orange-400">{{ $count }}</span></h3>
    <button wire:click="increment" class="mt-4 px-4 py-2 bg-orange-600 rounded font-bold">
        + Increment Counter
    </button>
</div>
```

---

## 1. How Livewire Works Under the Hood

Livewire converts typical request/response cycles into a seamless reactive experience:

<div class="grid-2">
<div class="card">

#### The 4 Lifecycle Steps

1. **Initial Render:** Livewire renders the component on the server and delivers pure HTML
2. **User Interaction:** User clicks `wire:click` or types into `wire:model`
3. **AJAX Payload:** Livewire sends a lightweight JSON request with the updated state
4. **DOM Morphing:** The server re-evaluates the Blade view; Livewire morphs **only the changed DOM nodes**

</div>
<div class="card">

#### Developer Benefits

- **Zero API Duplication:** No need for boilerplate controllers or JSON resource transformers
- **Complete Security:** Authorization, gates, and validation execute directly on the server
- **SEO Optimized:** All pages are server-side rendered (SSR) out-of-the-box

</div>
</div>

---

## 2. Installation & Your First Component

Install Livewire into an existing Laravel application via Composer:

```bash
# 1. Install Livewire package
composer require livewire/livewire

# 2. Generate a new Livewire component
php artisan make:livewire TaskList
```

Include the component in any standard Blade template:

```html
<!-- In resources/views/dashboard.blade.php -->
<x-layouts.app>
    <h1 class="text-2xl font-bold mb-6">My Tasks</h1>

    <!-- Include component via Blade tag -->
    <livewire:task-list />
</x-layouts.app>
```

---

## 4. Component Architecture in v4: Single-File Components

In Livewire v4, **Single-File Components** are the default standard. PHP logic and Blade templates reside in one unified file:

```html
<?php // resources/views/components/todos.blade.php

use Livewire\Component;

new class extends Component {
    public array $todos = ['HTML5 Essentials', 'CSS3 Layouts'];
    public string $newTodo = '';

    public function addTodo(): void {
        if (!empty($this->newTodo)) {
            $this->todos[] = $this->newTodo;
            $this->reset('newTodo');
        }
    }
};
?>

<div>
    <div class="flex gap-2">
        <input type="text" wire:model="newTodo" placeholder="New task..." class="input">
        <button wire:click="addTodo" class="btn">Add</button>
    </div>
    <ul class="mt-4 space-y-2">
        @foreach($todos as $todo)
            <li wire:key="{{ $loop->index }}" class="p-2 bg-slate-800 rounded">{{ $todo }}</li>
        @endforeach
    </ul>
</div>
```

---

## 5. Properties & Two-Way Binding (`wire:model`)

Public properties declared on your component automatically synchronize with form input elements:

```html
<div class="space-y-4">
    <!-- 1. Standard wire:model (synchronizes on action/form submission) -->
    <input type="text" wire:model="title" class="input" placeholder="Title">

    <!-- 2. wire:model.live (realtime server sync on every keypress) -->
    <input type="text" wire:model.live="search" class="input" placeholder="Live search...">

    <!-- 3. wire:model.blur (syncs when user unfocuses the input element) -->
    <input type="email" wire:model.blur="email" class="input" placeholder="Email">

    <!-- 4. wire:model.debounce.500ms (waits 500ms after the last keypress) -->
    <input type="text" wire:model.live.debounce.500ms="query" class="input">
</div>
```

> **Lifecycle Methods:** Use `$this->reset('property')` to reset a state variable and `mount()` to set up initial parameters on component load.

---

## 6. Actions & Event Handling

Bind user interactions directly to backend PHP component methods:

```html
<div class="space-y-3">
    <!-- Basic click action -->
    <button wire:click="publish" class="btn">Publish</button>

    <!-- Passing parameters to server action -->
    <button wire:click="deletePost({{ $post->id }})" class="btn-danger">Delete</button>

    <!-- Form submission (automatically prevents default page refresh) -->
    <form wire:submit="save">
        <input type="text" wire:model="name" required>
        <button type="submit">Save</button>
    </form>

    <!-- Keydown modifiers -->
    <input type="text" wire:keydown.enter="save" wire:keydown.escape="cancel">
</div>
```

---

## 7. Loading States & Feedback (`wire:loading`)

Provide immediate visual feedback to users during network roundtrips to the server:

```html
<form wire:submit="savePost">
    <input type="text" wire:model="title">

    <button type="submit" class="btn">
        <!-- Hide default label while saving -->
        <span wire:loading.remove wire:target="savePost">Save Post</span>
        <!-- Show loading indicator while saving -->
        <span wire:loading wire:target="savePost">Saving...</span>
    </button>

    <!-- Scoped action notification -->
    <div wire:loading wire:target="savePost" class="text-sm text-orange-400 mt-2">
        Processing data on server...
    </div>

    <!-- Dim container while server is working -->
    <div wire:loading.class="opacity-50 pointer-events-none" wire:target="savePost">
        Content temporarily disabled during processing...
    </div>
</form>
```

---

## 8. Forms & Validation in Livewire

Livewire provides clean, expressive validation using PHP Attributes:

```php
<?php
use Livewire\Attributes\Validate;
use Livewire\Component;
use App\Models\Article;

new class extends Component {
    #[Validate('required|min:3|max:100')]
    public string $title = '';

    #[Validate('required|min:10')]
    public string $content = '';

    public function save(): void {
        $this->validate();

        Article::create([
            'title' => $this->title,
            'content' => $this->content,
        ]);

        session()->flash('message', 'Article successfully created!');
        $this->reset();
    }
};
?>
```

---

## 8. Realtime Error Messages in Blade

Display validation errors directly beneath form fields using Laravel's standard `@error` directive:

```html
<form wire:submit="save" class="space-y-4">
    <div>
        <label class="block text-sm font-semibold">Title</label>
        <input type="text" wire:model.blur="title" class="input w-full">
        @error('title')
            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
        @enderror
    </div>

    <div>
        <label class="block text-sm font-semibold">Content</label>
        <textarea wire:model.blur="content" class="textarea w-full"></textarea>
        @error('content')
            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
        @enderror
    </div>

    <button type="submit" class="btn">Save Article</button>
</form>
```

---

## 8. Advanced: Dedicated Form Objects

For complex forms, encapsulate form fields and validation rules inside a reusable **Form Object**:

```php
<?php // app/Livewire/Forms/PostForm.php
namespace App\Livewire\Forms;

use Livewire\Form;
use Livewire\Attributes\Validate;

class PostForm extends Form {
    #[Validate('required|min:5')]
    public string $title = '';

    #[Validate('required|min:20')]
    public string $body = '';
}
```

```html
<?php // Component consuming the Form Object
use App\Livewire\Forms\PostForm;
use Livewire\Component;

new class extends Component {
    public PostForm $form;

    public function save(): void {
        $this->form->validate();
        // Persist $this->form->title into database...
    }
};
?>
```

---

## 9. Instant SPA Navigation with `wire:navigate`

Turn your Laravel app into a blazingly fast Single Page Application (SPA) without a client-side JavaScript router:

```html
<nav class="flex gap-4 p-4 bg-slate-900 border-b border-slate-800">
    <!-- wire:navigate fetches the page in the background and morphs DOM without a full reload -->
    <a href="/" wire:navigate class="text-white hover:text-orange-400">Dashboard</a>
    <a href="/courses" wire:navigate class="text-white hover:text-orange-400">Courses</a>

    <!-- wire:navigate.hover preloads the page the moment user hovers over the link -->
    <a href="/profile" wire:navigate.hover class="text-white hover:text-orange-400">My Profile</a>
</nav>
```

<div class="grid-2">
<div class="card">

#### What `wire:navigate` achieves

- Prevents white screen flashes during page transitions
- Preserves scroll position and reuses already loaded styles/scripts
- Handles browser history navigation (Back/Forward) effortlessly

</div>
<div class="card">

#### Instant Preloading

- `wire:navigate.hover` prefetches page payloads in milliseconds before the click occurs
- Produces **instantaneous (<10ms) perceived page loads** for end users!

</div>
</div>

---

## 10. Alpine.js & JavaScript Integration (`$wire`)

Livewire and Alpine.js share a tight symbiotic architecture. Access backend state directly in Alpine via `$wire`:

```html
<div x-data="{ localCount: 0 }">
    <!-- Read server property in Alpine -->
    <p>Character count in server model: <span x-text="$wire.content.length"></span></p>

    <!-- Trigger server action from JavaScript -->
    <button @click="$wire.save()" class="btn">
        Trigger Server Save via JS
    </button>

    <!-- Two-way binding between client state and server state -->
    <input type="text" x-model="$wire.query" placeholder="Type..." class="input">
</div>
```

### Essential `$wire` API

- `$wire.get('prop')` & `$wire.set('prop', value)` - Read and mutate backend properties
- `$wire.call('methodName', ...params)` - Execute PHP methods
- `$wire.$refresh()` - Manually request a fresh render from the server

---

## 11. What is New in Livewire v4? <span class="badge">Features</span>

Livewire v4 brings major performance and developer experience breakthroughs:

<div class="grid-2">
<div class="card">

#### 1. Single-File Standard

PHP classes and Blade templates combined into single `.blade.php` files with native slot and `{{ $attributes }}` forwarding.

#### 2. Modelable Child Components (`#[Modelable]`)

Directly bind custom child components with `wire:model` without tedious event boilerplate.

</div>
<div class="card">

#### 3. High-Performance Morphing

New internal morph algorithms minimize DOM mutations, boosting rendering performance and transition smoothness.

#### 4. Native Asset Bundling

Zero manual asset publishing; Livewire integrates seamlessly into Vite builds out-of-the-box.

</div>
</div>

---

## 12. Practical Example: Realtime Course Search Filter

```html
<?php
use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Course;

new class extends Component {
    use WithPagination;

    public string $search = '';
    public string $semester = 'all';

    public function updatingSearch(): void {
        $this->resetPage();
    }

    public function with(): array {
        return [
            'courses' => Course::query()
                ->when($this->search, fn($q) => $q->where('title', 'like', "%{$this->search}%"))
                ->when($this->semester !== 'all', fn($q) => $q->where('semester', $this->semester))
                ->paginate(5),
        ];
    }
};
?>

<div class="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">
    <div class="flex gap-4 mb-4">
        <input type="text" wire:model.live.debounce.300ms="search" placeholder="Search courses..." class="input w-full">
        <select wire:model.live="semester" class="select">
            <option value="all">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
        </select>
    </div>

    <div wire:loading class="text-orange-400 text-sm mb-2">Loading courses...</div>

    <div class="space-y-2">
        @forelse($courses as $course)
            <div wire:key="{{ $course->id }}" class="p-3 bg-slate-800 border border-slate-700 rounded flex justify-between">
                <span class="font-bold">{{ $course->title }}</span>
                <span class="text-xs text-orange-400 font-mono">Sem {{ $course->semester }}</span>
            </div>
        @empty
            <p class="text-slate-400 p-4">No courses found matching criteria.</p>
        @endforelse
    </div>
</div>
```

---

<!-- _class: lead -->

# Mastering Livewire v4

<p class="subtitle">&lt;Full-Stack Reactivity Without Leaving PHP /&gt;</p>

### Key Takeaways for Students

1. **Think Full-Stack:** Build reactive interfaces using familiar PHP and Blade conventions
2. **Master `wire:model`:** Combine `.live` and `.debounce` for responsive user inputs
3. **Always Provide Feedback:** Leverage `wire:loading` and `wire:target` for clear network states
4. **SPA Performance:** Take advantage of `wire:navigate` for instant page transitions
5. **The Modern TALL Stack:** Combine **Tailwind CSS v4**, **Alpine.js**, **Laravel**, and **Livewire v4**!

<div class="meta-box" style="margin-top: 24px;">
  <strong>Next Step:</strong> Build a complete reactive full-stack web app with Livewire v4 and Laravel!
</div>
