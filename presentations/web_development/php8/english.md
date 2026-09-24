---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - PHP 8'
footer: 'Web Development - Thomas More Hogeschool'
---

<!-- _class: lead -->

# PHP 8 Fundamentals

<p class="subtitle">&lt;Modern Server-Side Scripting for Web Development /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Applied Computer Science (ITF)<br>
  <strong>Course:</strong> Web Development | <strong>Topic:</strong> PHP 8.5 Syntax, Data Structures & OOP
</div>

---

## Table of Contents

1. **Introduction to PHP 8.5** - Server-side scripting, architecture and PHP 8 highlights
2. **Example Project & Environment** - GitHub repo, Laravel Herd and Browsersync
3. **Basic Syntax & Variables** - PHP tags, output, comments, data types and heredoc
4. **Operators & Evaluation** - Arithmetic, assignment, strict equality and booleans
5. **Control Structures** - `if/else`, ternary operator, null coalescing (`??`), `switch` vs `match`, loops
6. **Arrays & Objects** - Indexed, associative, multidimensional, `stdClass` and debugging
7. **Functions & Typing** - Return types, default values, references, nullable types and arrow functions
8. **Form Processing** - `$_GET` vs `$_POST`, `isset()` vs `empty()` and single page processing
9. **Classes & OOP** - Properties, mutators, namespaces, constructors, method chaining and static methods

---

## 1. Introduction to PHP: What is PHP?

PHP is a popular **server-side scripting language**, specifically designed for web development:

<div class="grid-2">
<div class="card">

#### Key Characteristics

- **Server-side:** PHP code runs on the web server, unlike client-side JavaScript in the browser
- **Cross-platform:** Runs smoothly on Linux, Windows and macOS
- **Server support:** Works seamlessly with Nginx, Apache and IIS
- **Open-source & free:** Freely usable and broadly supported by hosting providers
- **C-style syntax:** Strong similarities to Java, C# and JavaScript

</div>
<div class="card">

#### Ecosystem & Applications

- **Well-known platforms:** WordPress, Drupal, Magento, Moodle and Wikipedia
- **Modern frameworks:** Symfony and **Laravel**
- **Origins:** Created by Rasmus Lerdorf in 1994 (originally "Personal Home Page")
- **Current meaning:** Recursive acronym for *PHP: Hypertext Preprocessor*
- **Version in this course:** **PHP 8.5.x**

</div>
</div>

---

## 1. How PHP Works: Client vs. Server Flow

The client (browser) only receives the final result in plain HTML:

```
[Browser Client]  --> 1. HTTP Request (hello_world.php) --->  [Webserver: Nginx/Apache]
                                                                        |
                                                                2. Executes PHP engine
                                                                3. Database queries (optional)
                                                                4. Generates plain HTML
                                                                        |
[Browser Client]  <-- 5. HTTP Response (Plain HTML output) <-- [Webserver: Nginx/Apache]
```

<div class="grid-2">
<div class="card">

#### Original PHP File on the Server

```php
<!doctype html>
<html lang="en">
<body>
  <h1><?php echo 'Hello world'; ?></h1>
</body>
</html>
```

</div>
<div class="card">

#### HTML Result in the Browser

```html
<!doctype html>
<html lang="en">
<body>
  <h1>Hello world</h1>
</body>
</html>
```

</div>
</div>

---

## 1. PHP 8 Highlights: Modern Language Features

In recent years, PHP has undergone a major transformation into a modern, strictly typed language:

<div class="grid-2">
<div class="card">

#### Modern Expressiveness

- **Named arguments:** Pass arguments by parameter name rather than strictly by position
- **Match expressions:** A cleaner, expressive and strict alternative to `switch`
- **Nullsafe operator (`?->`):** Safely call methods on objects that may potentially be `null`
- **Short arrow functions (`fn`):** Compact closures for functional array operations

</div>
<div class="card card-accent">

#### Type Safety & Architecture

- **Union types (`int|string`):** Values can accept multiple explicit types
- **Nullable types (`?string`):** Explicit support for the absence of values
- **Readonly properties:** Properties that cannot be modified after initialisation
- **Enums:** Type-safe enumerations of fixed allowed values

</div>
</div>

---

## 1. Why PHP? Preparation for Laravel <span class="badge">Crucial</span>

This introduction to PHP 8 is not an isolated topic, but the **essential foundation** for the remainder of this course:

<div class="card card-cyan">

#### Direct Link to Laravel

In a few weeks, we will begin developing a full-featured **Laravel 13 web application**.
Laravel is written in modern PHP. A solid grasp of core PHP 8 concepts ensures you understand what the framework does under the hood.

</div>

<div class="grid-2">
<div class="card">

#### What You Will Instantly Recognise

- **Routing & Controllers:** PHP classes, methods and type hints
- **Blade templates:** Ternary operators and loops (`@foreach`)
- **Eloquent Models:** Associative arrays, object casting and nullables
- **Helpers:** Static helper methods and method chaining

</div>
<div class="card">

#### Head Start for Students

- You already know core programming syntax from Java, JavaScript and Python
- We focus specifically on **PHP-specific constructs**: the dollar sign `$`, array handling, strict comparisons and the null coalescing operator (`??`)

</div>
</div>

---

## 2. Example Project: `learn_php8`

Throughout this chapter we make use of the official companion practice project:

<div class="grid-2">
<div class="card">

#### Project Resources

- **GitHub Repository:**
  [github.com/pverhaert/learn_php8](https://github.com/pverhaert/learn_php8)
- **Online Preview:**
  [php8.z01.be](https://php8.z01.be/)
- Contains all theory examples and hands-on exercises
- Styled with Tailwind CSS for a clean, legible UI

</div>
<div class="card">

#### Cloning the Repo via Terminal

Navigate to your projects directory (e.g. `C:\sites_laravel`) and run:

```bash
git clone https://github.com/pverhaert/learn_php8.git php8
cd php8
rm -rf .git
npm install
```

`npm install` installs the front-end tooling (Tailwind CSS, Browsersync) from `package.json`.

</div>
</div>

---

## 2. Development Environment: Laravel Herd

Instead of heavy traditional LAMP/WAMP stacks (XAMPP, MAMP), we use **Laravel Herd**:

<div class="grid-2">
<div class="card card-accent">

#### Why Laravel Herd?

- **Zero-configuration:** No hassle with vhosts or manual Apache configurations
- **Complete stack:** Bundles Nginx, Node.js and multiple PHP versions (PHP 8.5)
- **Automatic HTTPS:** Easily manage local certificates with a click on the lock icon
- **Lightning fast:** Minimal memory footprint and native performance on Windows and macOS

</div>
<div class="card">

#### Configuring Herd for `php8`

1. Open Laravel Herd and navigate to **Sites**
2. Click the three dots at top right and choose **Show sites without valid driver**
3. The project `php8` appears in the list
4. Click the **lock icon** to secure the site with HTTPS: `https://php8.test`

</div>
</div>

---

## 2. Running the Project & Live Reloading

Open the project folder `C:\sites_laravel\php8` in PhpStorm and start the watch task:

```bash
npm run watch
```

<div class="grid-2">
<div class="card">

#### What Happens Behind the Scenes?

- Starts a Browsersync proxy server on **`http://localhost:5500`**
- Monitors changes across PHP, JS and CSS files
- Automatically refreshes the browser the moment you save a file in your editor

</div>
<div class="card">

#### Direct URL vs. Proxy

- **`http://localhost:5500`:** Browsersync proxy with automatic live-reload (recommended during development)
- **`https://php8.test`:** Direct Nginx URL via Herd (requires manual browser refresh after code changes)

</div>
</div>

---

## 3. Basic Syntax: PHP Code Blocks

PHP code integrates seamlessly inside HTML documents using script tags:

```php
<!doctype html>
<html lang="en">
<head>
  <?php include_once('../shared/meta.php'); ?>
  <title>Hello world</title>
</head>
<body>
  <h1>Hello world</h1>
  <p><?php echo 'Hello world'; ?></p>
</body>
</html>
```

<div class="grid-2">
<div class="card">

#### Script Block Rules

- Always start with `<?php` and close with `?>`
- Each individual statement must end with a semicolon `;`
- `echo` is the primary construct used to output text or HTML

</div>
<div class="card">

#### Shorthand Variations

- **Shorthand echo:** `<?= 'Hello world' ?>` is fully equivalent to `<?php echo 'Hello world'; ?>`
- **Pure PHP files:** If a file contains only PHP code (no HTML), the closing tag `?>` **must be omitted**

</div>
</div>

---

## 3. Basic Syntax: Comments & IDE Shortcuts

Well-documented code enhances readability and maintainability:

```php
<?php
// This is an inline single-line comment

/*
 * This comment block
 * spans across multiple lines
 */

$score = 15; // Comment following a statement
```

<div class="grid-2">
<div class="card card-cyan">

#### PhpStorm Shortcuts

- **Single-line comment:** `Ctrl + /` (toggle on selected lines)
- **Multi-line comment:** `Ctrl + Shift + /` (wraps selection with `/* ... */`)
- **Format code:** `Ctrl + Alt + L`

</div>
<div class="card">

#### Best Practice

Write comments to explain the **why** behind complex business logic, never the obvious "how" of standard syntax.

</div>
</div>

---

## 3. Variables & Naming Conventions

Compared to Java, JavaScript and Python, the dollar sign immediately stands out:

```php
$student1 = 'John Doe';
$student2 = "Jane Smith";
$percentage1 = 73.08;
$hasGraduated = true;
```

<div class="grid-2">
<div class="card">

#### Strict Naming Rules

- **Always begins with a dollar sign (`$`)**
- Followed by a letter or underscore `_` (never a digit as starting character)
- May only contain alphanumeric characters and underscores (no spaces or hyphens)
- **Case-sensitive:** `$student` and `$Student` are two completely different variables

</div>
<div class="card">

#### Conventions in PHP & Laravel

- Use **camelCase** (`$firstName`) or **snake_case** (`$first_name`) for variable names
- Use **PascalCase** (`StudentController`) for class names
- Variables do not require pre-declaration keywords like `let`, `var` or explicit types

</div>
</div>

---

## 3. Data Types in PHP 8

PHP is a dynamically typed language: the type of a variable is inferred based on its assigned value:

<div class="grid-2">
<div class="card">

#### Primitive Data Types

- **Integer:** Whole numbers (`42`, `-10`, `0`)
- **Float:** Floating-point numbers (`3.14`, `12.7`, scientific `34e-2`)
- **String:** Text sequences (`'John Doe'`, `"Web Development"`)
- **Boolean:** Logical values (`true` or `false`)
- **NULL:** Variable without an assigned value (`null`)

</div>
<div class="card">

#### Compound & Special Types

- **Array:** Ordered maps of values or key-value pairs
- **Object:** Instance of a defined class
- PHP converts types automatically where needed (type juggling), but offers strong support for strict typing via PHP 8

</div>
</div>

---

## 3. Type Juggling vs. Strict Typing <span class="badge">Optional</span>

By default, PHP attempts to convert types automatically to the expected type (**type juggling**). With `declare(strict_types=1);`, you enforce strict type checking:

<div class="grid-2">
<div class="card">

#### 1. Without Strict Typing (Default)

```php
function sum(int $a, int $b): int {
    return $a + $b;
}

// String '10' is silently converted to int 10
echo sum(5, '10'); // Output: 15
```

- **Advantage:** Flexible; practical because HTML form inputs always arrive as strings
- **Disadvantage:** Hides type bugs and leads to unpredictable behavior on invalid inputs

</div>
<div class="card card-accent">

#### 2. With Strict Typing (`strict_types=1`)

```php
declare(strict_types=1);

function sum(int $a, int $b): int {
    return $a + $b;
}

// String '10' throws a TypeError immediately!
echo sum(5, '10'); // Fatal error: TypeError
```

- **Advantage:** Prevents subtle bugs; errors are surfaced immediately during development
- **Disadvantage:** Less forgiving; form inputs require explicit casting

</div>
</div>

---

## 3. Strings: Concatenation vs. Interpolation

PHP provides two different techniques to incorporate variables into text:

<div class="grid-2">
<div class="card">

#### 1. Concatenation with Dot (`.`)

- Works with both single and double quotes
- Variables are joined manually with dot operators

```php
$student1 = 'John Doe';
$percentage = 73.08;

echo '<p>' . $student1 . ' achieves ' . 
     $percentage . ' %</p>' . "\n";
```

*Always place spaces around dot operators for maximum readability.*

</div>
<div class="card">

#### 2. Interpolation with Double Quotes

- Variables inside `"..."` are evaluated and replaced with their current value
- No manual breaking and dot joining needed

```php
$student2 = 'Jane Smith';
$percentage = 64.84;

echo "<p>$student2 achieves $percentage %</p>\n";
```

*Note: String interpolation only works with double quotes, never inside single quotes.*

</div>
</div>

---

## 3. Multi-line Strings with Heredoc Syntax

For larger blocks of HTML output, the **Heredoc** syntax is ideal:

```php
$student1 = 'John Doe';
$percentage1 = 73.08;
$student2 = 'Jane Smith';
$percentage2 = 64.84;

echo <<<HTML
<article class="p-4 bg-slate-800 rounded">
  <h3>ITF Results</h3>
  <p>$student1 achieves $percentage1 %</p>
  <p>$student2 achieves $percentage2 %</p>
</article>
HTML;
```

<div class="grid-2">
<div class="card">

#### Advantages of Heredoc

- No tedious quote escaping required
- Preserves line breaks (`\n`) and code indentation
- Automatic variable interpolation
- Pairs perfectly with Emmet abbreviations in PhpStorm

</div>
<div class="card">

#### Syntax Rules

- Starts with `<<<` followed by an identifier (e.g. `HTML` or `RESULTS`)
- Content begins on the next line
- Closing identifier sits on its own line, immediately followed by `;`

</div>
</div>

---

## 4. Arithmetic Operators

PHP supports all standard arithmetic calculations:

| Operator | Description | Example | Result ($x = 10, $y = 3) |
| --- | --- | --- | --- |
| `+` | Addition | `$x + $y` | `13` |
| `-` | Subtraction | `$x - $y` | `7` |
| `*` | Multiplication | `$x * $y` | `30` |
| `/` | Division | `$x / $y` | `3.3333333333333` |
| `%` | Modulo (remainder) | `$x % $y` | `1` |
| `**` | Exponentiation (PHP 5.6+) | `$x ** $y` | `1000` (10³) |

<div class="card card-accent">

#### Escaping the Dollar Sign in Strings

To display the variable name literally inside a double-quoted string instead of its evaluated value, prepend a backslash before the dollar sign:
`echo "<p>\$x + \$y = " . ($x + $y) . "</p>";` produces: `$x + $y = 13`.
Always use **parentheses** around arithmetic expressions when concatenating with strings.

</div>

---

## 4. Assignment Operators & Increment

Assignment operators combine an operation with an immediate assignment back to the variable:

<div class="grid-2">
<div class="card">

#### Compound Assignments

- `$x += $y` is identical to `$x = $x + $y`
- `$x -= $y` is identical to `$x = $x - $y`
- `$x *= $y` is identical to `$x = $x * $y`
- `$x /= $y` is identical to `$x = $x / $y`
- `$x %= $y` is identical to `$x = $x % $y`
- `$name .= $surname` concatenates strings:
  `$name = $name . $surname`

</div>
<div class="card">

#### Increment & Decrement

- `$x++`: Increments the value of `$x` by 1
- `$x--`: Decrements the value of `$x` by 1

```php
$score = 10;
$score += 5;   // $score is now 15
$score++;      // $score is now 16

$title = 'Web ';
$title .= 'Dev'; // $title is now 'Web Dev'
```

</div>
</div>

---

## 4. Comparison Operators: Loose vs. Strict Equality

In PHP, the distinction between loose and strict equality is of crucial importance:

<div class="grid-2">
<div class="card">

#### Loose Equality (`==` and `!=`)

- Converts types automatically before evaluation (type coercion)
- Can easily lead to subtle and unexpected bugs

```php
$x = 10;     // integer
$y = '10';   // string

var_dump($x == $y); // true!
```

</div>
<div class="card card-accent">

#### Strict Identity (`===` and `!==`)

- Compares both the **value** and the underlying **data type**
- **Gold standard** across modern PHP and Laravel codebases

```php
$x = 10;     // integer
$y = '10';   // string

var_dump($x === $y); // false (int !== string)
```

</div>
</div>

#### Additional Comparisons

- `$x < $y` (less than), `$x <= $y` (less than or equal)
- `$x > $y` (greater than), `$x >= $y` (greater than or equal)
- `<>` is an older synonym for `!=`

---

## 4. Booleans & Logical Operators

How does PHP render booleans, and which logical operators do we use?

<div class="grid-2">
<div class="card">

#### Boolean String Output

When PHP casts a boolean value to text:

- `true` is rendered as **`1`**
- `false` is rendered as **`""` (an empty string)**

```php
echo true;  // Outputs: 1
echo false; // Outputs: (nothing at all!)
```

*Use `var_dump()` during debugging to inspect genuine booleans.*

</div>
<div class="card">

#### Logical Operators & Precedence

- `&&` (AND) and `||` (OR)
- `!` (NOT / negation)
- `xor`: true if exactly one operand is true

> **Important:** PHP also supports `and` and `or`, but these have a lower operator precedence. In conditional statements, **always use `&&` and `||`** to avoid unexpected precedence bugs.

</div>
</div>

---

## 5. Control Structures: Selection (`if`, `else`, `elseif`)

Conditional statements direct the flow of execution based on logical expressions:

```php
$scorePHP = 9;

if ($scorePHP >= 10) {
    echo '<p>Congratulations, you passed PHP!</p>';
} elseif ($scorePHP >= 8) {
    echo '<p>You did not pass, but the score is tolerable.</p>';
} else {
    echo '<p>Unfortunately not passed. Better luck next time!</p>';
}
```

<div class="grid-2">
<div class="card">

#### Syntax Details

- The condition is always wrapped in parentheses `(...)`
- The code block is enclosed in curly braces `{ ... }`
- `elseif` is conventionally written as a single word in PHP

</div>
<div class="card">

#### Familiar from Java / JavaScript

The structure behaves identically to Java, JavaScript and C#. The primary power in PHP lies in its seamless combination with HTML output.

</div>
</div>

---

## 5. The Ternary Operator <span class="badge">Frequent in Laravel Blade</span>

The ternary operator is a powerful shorthand for concise `if-else` assignments:

```php
// Syntax: condition ? exprIfTrue : exprIfFalse
$message = $scorePHP >= 10 ? 'Passed' : 'Failed';
```

<div class="card card-cyan">

#### Direct Integration in HTML Rendering

```php
echo "<p class='" . ($scorePHP >= 10 ? 'text-green-500' : 'text-red-500') . "'>
        Your result: $scorePHP
      </p>";
```

</div>

<div class="grid-2">
<div class="card">

#### Why So Crucial in Laravel?

In **Blade views**, you will use this operator constantly for:

- Highlighting active navigation items: `class="{{ $active ? 'active' : '' }}"`
- Dynamic badges and status pill styling
- Form checkbox pre-selection states

</div>
<div class="card">

#### Guideline

Use the ternary operator only for **single expressions**. Once multiple actions or nested conditions are involved, a standard `if-else` remains far more readable.

</div>
</div>

---

## 5. Null Coalescing Operator (`??`) <span class="badge">Crucial for Laravel</span>

Compact alternative to `isset()` combined with a fallback assignment:

```php
// Traditional approach vs. modern ?? operator
$score = isset($scorePHP) ? $scorePHP : 'No score available';
$score = $scorePHP ?? 'No score available';
```

<div class="grid-2">
<div class="card card-accent">

#### Why Essential in Laravel?

- Request input: `$name = $request->name ?? 'Guest';`
- Configuration and environment fallbacks
- Safely rendering optional database relations in Blade

</div>
<div class="card">

#### Chaining Fallbacks

Chain multiple fallbacks consecutively:

```php
$display = $userNickname ?? $userName ?? 'Anonymous';
```

</div>
</div>

---

## 5. `switch` vs. `match` Expression (PHP 8)

PHP 8 introduced `match`, a significant leap forward compared to the traditional `switch`:

<div class="grid-2">
<div class="card">

#### Legacy `switch` Statement

- Requires `break` statements to prevent fall-through
- Uses loose comparison (`==`)
- Has no direct return value (statement only)

```php
switch ($role) {
    case 'admin':
        $badge = 'Red';
        break;
    case 'editor':
        $badge = 'Blue';
        break;
    default:
        $badge = 'Gray';
}
```

</div>
<div class="card card-accent">

#### Modern PHP 8 `match` Expression

- Evaluates directly into an assignable value
- Enforces **strict identity (`===`)**
- No `break` needed, concise syntax

```php
$badge = match ($role) {
    'admin'  => 'Red',
    'editor' => 'Blue',
    default  => 'Gray',
};
```

*Throws an `UnhandledMatchError` if no pattern matches and no `default` branch is provided.*

</div>
</div>

---

## 5. Iterations: `for` and `while`

PHP provides standard loop constructs for repeated execution while a condition evaluates to true:

<div class="grid-2">
<div class="card">

#### 1. `for` Loop (Known Number of Iterations)

```php
$base = 7;
$depth = 5;

for ($i = 1; $i <= $depth; $i++) {
    echo "<li>$i x $base = " . ($i * $base) . "</li>\n";
}
```

- Initialisation: `$i = 1`
- Condition check upfront: `$i <= $depth`
- Step increment: `$i++`

</div>
<div class="card">

#### 2. `while` Loop (Upfront Condition Check)

```php
$base = 7;
$depth = 5;
$j = 1;

while ($j <= $depth) {
    echo "<li>$j x $base = " . ($j * $base) . "</li>\n";
    $j++;
}
```

- Evaluates the condition **before** each iteration
- If the condition is immediately `false`, the body executes 0 times

</div>
</div>

---

## 5. Iterations: The Crucial `do-while` Edge Case

What happens when the condition evaluates to `false` right at the start (for example when `$depth = 0`)?

<div class="grid-2">
<div class="card">

#### `while` (Condition Checked UPFRONT)

```php
$base = 7;
$depth = 0; // Depth is 0

$j = 1;
while ($j <= $depth) {
    echo "<li>$j x $base</li>";
    $j++;
}
```

- **Output:** *(zero lines rendered)*
- **0 or more times:** Because `$j <= 0` is immediately `false`, the loop body is skipped entirely

</div>
<div class="card card-accent">

#### `do-while` (Condition Checked AFTERWARDS)

```php
$base = 7;
$depth = 0; // Depth is 0

$k = 1;
do {
    echo "<li>$k x $base</li>";
    $k++;
} while ($k <= $depth);
```

- **Output:** `1 x 7` *(printed!)*
- **1 or more times:** The code block always executes at least once before the evaluation occurs

</div>
</div>

---

## 6. Indexed Arrays

Arrays in PHP are dynamic and grow flexibly without fixed capacity limitations:

```php
// Recommended syntax with square brackets []
$teachers = ['Michaël Cloots', 'Jan Janssen', 'Patrick Verhaert'];

// Assign elements individually by numeric index (starts at 0)
$students[0] = 'John Doe';
$students[1] = 'Jane Doe';

// Append element to the end of the array (auto-increment index)
$teachers[] = 'New Colleague';
```

<div class="grid-2">
<div class="card">

#### Key Properties

- Indexed arrays start at index **`0`** by default
- The index of the final element is `count($array) - 1`
- `count($teachers)` returns the total number of elements

</div>
<div class="card">

#### Naming Convention

Always use a **plural noun** for array variables (`$students`, `$records`, `$courses`), immediately signalling that the variable holds a collection.

</div>
</div>

---

## 6. Associative Arrays: Key-Value Pairs

In associative arrays, numeric indexes are replaced by meaningful string keys:

```php
$scoresJane = ['PHP' => 17, 'Business essentials' => 14, 'English 2' => 10];
$scoresJane['PHP'] = 18; // Retrieve or update an individual element
```

<div class="card card-accent">

#### String Interpolation with Associative Arrays

Wrap array elements in curly braces `{}` inside double-quoted strings:

```php
// Correct with curly braces {} (or via explicit concatenation .):
echo "<p>Jane scores for PHP: {$scoresJane['PHP']}</p>";
echo "<p>Jane scores for PHP: " . $scoresJane['PHP'] . "</p>";
```

*Without curly braces, PHP cannot unambiguously parse the array key inside double quotes.*

</div>

---

## 6. Multidimensional Arrays

A multidimensional array is a nested array where elements are themselves arrays:

```php
$students = [
    [
        'name'   => 'John',
        'scores' => ['PHP' => 13, 'Business' => 8, 'English' => 18]
    ],
    [
        'name'   => 'Jane',
        'scores' => ['PHP' => 17, 'Business' => 14, 'English' => 10]
    ],
];
```

<div class="grid-2">
<div class="card">

#### Accessing Deep Values

Chain consecutive square brackets:

```php
// Name of the first student
echo $students[0]['name']; // John

// Jane's PHP score
echo $students[1]['scores']['PHP']; // 17
```

</div>
<div class="card">

#### Application in Web Applications

Nearly all data from database queries, external APIs and JSON responses arrives structured as multidimensional arrays.

</div>
</div>

---

## 6. Iterating with the `foreach` Loop

The `foreach` loop is the idiomatic standard for traversing arrays and collections in PHP:

<div class="grid-2">
<div class="card">

#### 1. Values Only

```php
$fruits = ['Apple', 'Banana', 'Cherry'];

foreach ($fruits as $fruit) {
    echo "<li>$fruit</li>\n";
}
```

</div>
<div class="card">

#### 2. Index / Key and Value

```php
$scores = ['PHP' => 16, 'Java' => 14];

foreach ($scores as $course => $score) {
    echo "<li>$course: $score</li>\n";
}
```

</div>
</div>

#### Nested `foreach` for Multidimensional Arrays

```php
foreach ($students as $student) {
    echo "<h3>Student: {$student['name']}</h3><ul>";
    foreach ($student['scores'] as $course => $score) {
        echo "<li>$course: $score</li>";
    }
    echo "</ul>";
}
```

---

## 6. Objects (`stdClass`) & Conversion

Alongside arrays, PHP supports generic objects (`stdClass`), whose properties are accessed via the **arrow operator (`->`)**:

<div class="grid-2">
<div class="card">

#### Conversion: Array to Object

The most robust technique to transform deeply nested arrays into objects is via JSON:

```php
// Converts multidimensional array to stdClass objects
$studentsObj = json_decode(json_encode($students));

// Access properties via ->
foreach ($studentsObj as $student) {
    echo "<p>$student->name scores {$student->scores->PHP}</p>";
}
```

</div>
<div class="card">

#### Importance of `json_decode()` Parameters

- `json_decode($json)` (or with `false`): Returns a **`stdClass` object** (`$obj->prop`)
- `json_decode($json, true)`: Returns an **associative array** (`$arr['prop']`)

In Laravel Eloquent, database models almost exclusively operate as objects with arrow notation!

</div>
</div>

---

## 6. Debugging: `var_dump()` vs. `print_r()`

When data structures do not behave as expected, debugging helper functions are indispensable:

<div class="grid-2">
<div class="card">

#### `var_dump($variable)`

- Displays the **data type**, **length** and **exact value** of each element
- Ideal for diagnosing subtle type issues (for example `'10'` vs `10`)

</div>
<div class="card">

#### `print_r($variable)`

- Produces a cleaner, more concise overview of arrays and objects
- Easier to scan quickly for large collections

</div>
</div>

<div class="card card-accent">

#### Tip: Preserve Indentation with `<pre>` Tags

By default, the browser collapses all whitespace and newlines from debug output into a single line.
Always wrap debug calls in HTML `<pre>` tags to preserve formatting and tree indentation:

```php
echo '<pre>';
var_dump($students);
echo '</pre>';
```

</div>

---

## 7. Defining Functions & Return Types

Functions encapsulate reusable logic. In modern PHP, we explicitly declare return types:

```php
// Function without a return value
function writeMessage(): void 
{
    echo "<p>Welcome to Web Development!</p>\n";
}

// Function with parameters and an explicit return type
function calculateAverage(float $score1, float $score2): float 
{
    return ($score1 + $score2) / 2;
}
```

<div class="grid-2">
<div class="card">

#### Basic Rules

- Start with the keyword `function`
- Use meaningful camelCase names
- Use `: void` when the function intentionally produces no `return` value

</div>
<div class="card">

#### Invocations

```php
writeMessage();

$average = calculateAverage(14.5, 18.0);
echo "<p>Average: $average</p>";
```

</div>
</div>

---

## 7. Parameters, Default Values & References

Functions can be configured with optional default parameters or pass-by-reference arguments:

<div class="grid-2">
<div class="card">

#### Default Parameters (Optional)

Parameters with default values do not need to be supplied during invocation:

```php
function greet(string $name = 'Student'): void 
{
    echo "<p>Hello, $name!</p>";
}

greet('John');   // Hello, John!
greet();         // Hello, Student!
```

*Always place optional parameters at the end.*

</div>
<div class="card">

#### By Value vs. By Reference (`&`)

- **By Value (default):** Operates on an isolated copy; the caller's variable remains unchanged
- **By Reference (`&`):** Directly alters the original variable in caller memory

```php
function applyDiscount(float &$price): void 
{
    $price *= 0.8; // Modifies $price outside the function!
}

$amount = 100.0;
applyDiscount($amount);
echo $amount; // 80.0
```

</div>
</div>

---

## 7. Type Hinting: Nullable Types (`?type`) <span class="badge">Crucial for Laravel</span>

Parameters or return values that accept a specific type or `null`:

```php
function findUserEmail(?int $userId): ?string {
    return $userId ? "user_$userId@thomasmore.be" : null;
}
echo findUserEmail(12);   // "user_12@thomasmore.be"
echo findUserEmail(null); // null
```

<div class="grid-2">
<div class="card card-accent">

#### Why Essential in Laravel?

- **Eloquent Models:** Optional database attributes (`nullable()`)
- **Form Requests:** Non-mandatory input fields
- Prevents fatal runtime type errors on `null`

</div>
<div class="card">

#### Meaning of `?`

- `?string` is shorthand for `string|null`
- Accepts both valid strings and explicit `null` values

</div>
</div>

---

## 7. Type Hinting: Union Types & Error Handling

PHP 8 expands the type system with union types and strict runtime error detection:

<div class="grid-2">
<div class="card">

#### Union Types (`int|float|string`)

Allows an argument or return value to match multiple explicit types:

```php
function formatScore(int|float $score): string 
{
    return number_format($score, 1) . ' / 20';
}

echo formatScore(14);   // "14.0 / 20"
echo formatScore(16.5); // "16.5 / 20"
```

- Types are separated by a pipe `|`
- Replaces legacy PHPDoc docblock annotations

</div>
<div class="card card-cyan">

#### Strict Error Handling: `TypeError`

Passing an invalid type causes PHP to throw a `TypeError` immediately:

```php
// With strict_types enabled:
formatScore('fourteen'); 
// Fatal error: Uncaught TypeError!
```

- Bugs fail fast and visibly during development
- Prevents corrupted data from silently reaching the database

</div>
</div>

---

## 7. Short Arrow Functions (`fn`) & `include_once`

For compact anonymous callbacks, PHP 8 provides concise arrow syntax:

```php
// Classic anonymous function
$doubleClassic = function($n) { return $n * 2; };

// Modern Short Arrow Function (implicit return of the expression)
$double = fn(int $n): int => $n * 2;

$numbers = [1, 2, 3, 4];
$multiplied = array_map(fn($n) => $n * 10, $numbers); // [10, 20, 30, 40]
```

<div class="card">

#### Splitting Functions with `include_once`

Place reusable helper functions into dedicated files (e.g. `shared/functions.php`):

```php
include_once '../shared/functions.php'; // Loads the file exactly once
```

*Always use relative paths or `$_SERVER['DOCUMENT_ROOT'] . '/shared/...'`. In PHP, a path starting with `/` points to the server system root, not your project directory!*

</div>

---

## 8. Forms: HTML Form Basics

Forms allow users to transmit input data to the web server:

```html
<form method="post" action="process.php">
  <label for="name">Name:</label>
  <input type="text" name="name" id="name" required>
  <label><input type="radio" name="gender" value="M"> Male</label>
  <label><input type="radio" name="gender" value="F"> Female</label>
  <button type="submit">Submit</button>
</form>
```

<div class="grid-2">
<div class="card">

#### Core Attributes

- `action`: Target URL where submitted data is routed
- `method`: HTTP transmission verb (`GET` or `POST`)
- `name`: **Crucial:** Sets the array key in PHP!

</div>
<div class="card card-accent">

#### Superglobals

PHP automatically populates a global array:

- `method="get"` populates **`$_GET`**
- `method="post"` populates **`$_POST`**

</div>
</div>

---

## 8. Form Processing with `$_GET`

With `GET`, all submitted form values are appended visibly to the URL query string:

```
https://php8.test/process.php?name=John+Doe&gender=M
```

```php
// In the destination file (process.php):
$name = !empty($_GET['name']) ? $_GET['name'] : 'Not specified';
$gender = $_GET['gender'] ?? 'Not specified';

echo "<p>Welcome, $name (Gender: $gender)</p>";
```

<div class="grid-2">
<div class="card">

#### When to Use `GET`?

- **Search queries and filters:** URLs can be bookmarked or shared
- **No sensitive data:** Passwords must never appear inside an address bar
- **Length limits:** Browsers enforce URI length limits (~2048 characters)

</div>
<div class="card card-accent">

#### `isset()` vs. `empty()`

- `isset($var)`: True if the variable exists and is **not null**
- `empty($var)`: True if the variable is unset, or `""`, `0`, `false`, `null` or `[]`
- **Tip:** An empty input submits an empty string `""`. Use `empty()` to detect blank inputs!

</div>
</div>

---

## 8. Form Processing with `$_POST`

With `POST`, payload data is transmitted invisibly within the HTTP request body:

<div class="grid-2">
<div class="card">

#### Advantages of `POST`

- **Secure for sensitive data:** Passwords and credentials never appear in history or access logs
- **No data limit:** Suitable for large text bodies and file uploads
- Typically modifies state on the server (create, update, delete)

</div>
<div class="card">

#### Inspecting POST Data in DevTools

1. Press `F12` and open the **Network** tab
2. Submit the form in the browser
3. Click the request in the log list
4. In the **Payload** tab, inspect the exact submitted keys and values

</div>
</div>

```php
// Reading data from the $_POST superglobal:
$name = !empty($_POST['name']) ? $_POST['name'] : 'Unknown';
$gender = $_POST['gender'] ?? 'Not selected';
```

---

## 8. Single Page Form: Concept & Flow

Instead of a separate processing file (`process.php`), we can maintain input and processing within the **same page**:

<div class="grid-2">
<div class="card card-cyan">

#### How the Flow Works

- **`$_SERVER['PHP_SELF']`**: Always resolves dynamically to the current script URL
- **First visit (GET):** `$_POST` is empty (`false`) -> the empty form is rendered
- **After submission (POST):** `$_POST` contains data (`true`) -> processes input and displays result

</div>
<div class="card card-accent">

#### Why Single Page?

- **Immediate feedback:** Error warnings or success messages on the exact same page
- **Preserve state:** User input can be re-populated into form fields upon validation errors
- **Simplicity:** No need for extra redirection or decoupled processing scripts

</div>
</div>

<div class="card">

#### PHP Control Mechanism

```php
if ($_POST) {
    // Form was submitted: read $_POST and display results or validation errors
} else {
    // Fresh visit: render the empty HTML form
}
```

</div>

---

## 8. Single Page Form: Implementation

Full implementation structured with a standard `if ($_POST) { ... } else { ... }` block:

```php
<article>
<?php
if ($_POST) {
    $name = !empty($_POST['name']) ? $_POST['name'] : 'Not filled in';
    $gender = $_POST['gender'] ?? 'Not specified';
    echo "<p>Thank you for submitting, <b>$name</b> ($gender)!</p>";
    echo "<p><a href='{$_SERVER['PHP_SELF']}' class='btn'>Submit again</a></p>";
} else {
?>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <input type="text" name="name" placeholder="Your name">
      <button type="submit">Submit</button>
    </form>
<?php
}
?>
</article>
```

- **Reset button:** Linking to `$_SERVER['PHP_SELF']` triggers a `GET` request, resetting `$_POST` to empty and causing the `else` block to render the form anew.

---

## 9. Classes in PHP: The Basics (`Student`)

Object-Oriented Programming (OOP) organises code into classes (blueprints) and objects:

<div class="grid-2">
<div>

```php
namespace classes;

class Student 
{
    private string $name;
    private string $gender;

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }
}
```

</div>
<div>

<div class="card">

#### Naming & Encapsulation

- Class names start with a **capital letter** (PascalCase)
- File name equals class name: `Student.php`
- `private`: properties are accessible only inside the class itself (encapsulation)

</div>
<div class="card" style="margin-top: 15px;">

#### Mutators & `$this`

- **Getters & Setters:** Provide controlled public access to internal state
- **`$this`**: Refers to the current specific object instance
- **`->`**: Arrow operator for properties and methods (`$this->name`)

</div>

</div>
</div>

---

## 9. Namespaces & Autoloading

Namespaces prevent name collisions and mirror the directory structure of your application:

<div class="grid-2">
<div class="card">

#### Definition Inside the Class

```php
// File: classes/Student.php
namespace classes;

class Student 
{
    // ...
}
```

- The `namespace` keyword must always sit as the very first statement
- *Tip: Right-click a folder in PhpStorm -> **New -> PHP Class** fills the namespace automatically!*

</div>
<div class="card">

#### Usage via the `use` Statement

```php
// File: course/test.php
include_once '../classes/Student.php';

use classes\Student;

$student = new Student();
$student->setName('John Doe');
echo $student->getName();
```

Without `use`, you would have to write the Fully Qualified Name `\classes\Student` everywhere.

</div>
</div>

---

## 9. Constructors & No Overloading (`Teacher`)

A constructor initializes an object upon instantiation using the `new` keyword:

<div class="grid-2">
<div>

```php
namespace classes\employees;

class Teacher 
{
    private string $name;
    private string $gender;

    // Parameterized constructor
    public function __construct(
        string $name = '', 
        string $gender = ''
    ) {
        $this->name = $name;
        $this->gender = $gender;
    }
}
```

</div>
<div class="card card-accent">

#### No Overloading in PHP

Unlike Java, PHP **does not support multiple constructors** with different parameter signatures!

**The solution:** Assign default values to parameters (`= ''`). This allows both `new Teacher('John', 'M')` and `new Teacher()` to work seamlessly with the same constructor.

</div>
</div>

---

## 9. Method Chaining (`Number`)

Method chaining allows us to execute multiple operations in sequence on the same object:

<div class="grid-2">
<div>

```php
namespace classes;

class Number 
{
    private float|int $x;

    public function __construct(float|int $x) {
        $this->x = $x;
    }

    public function add(float|int $y): Number {
        $this->x += $y;
        return $this; // Returns the object instance!
    }

    public function multiply(float|int $y): Number {
        $this->x *= $y;
        return $this; // Enables chaining
    }
}
```

</div>
<div>

<div class="card">

#### Fluent Interface in Action

```php
$number = new Number(10);
$number->add(90)->multiply(3); 
// (10 + 90) * 3 = 300
```

Because each method call returns `return $this;`, subsequent methods can be chained immediately on the returned result.

</div>

</div>
</div>

---

## 9. Static Methods & Properties (`Drawer`)

Static members belong to the class definition itself, rather than to an individual instance:

<div class="grid-2">
<div>

```php
namespace classes;

class Drawer 
{
    const PI = 3.14;
    private static string $color = 'blue';

    public static function circle(
        int $diameter = 100
    ): string {
        self::$color = 'purple';
        return __CLASS__; // Static chaining
    }
}
```

</div>
<div>

<div class="card">

#### Scope Resolution Operator (`::`)

- Call without `new`: `Drawer::circle(150)`
- Inside the class, **`self::`** targets static members and constants
- **`$this` does not exist** in static context!

</div>
<div class="card" style="margin-top: 15px;">

#### Class Constants (`const`)

- Declared in `UPPERCASE`: `const PI = 3.14;`
- Accessed via `self::PI` or `Drawer::PI`
- Immutable after declaration

</div>

</div>
</div>

---

## 9. Static Methods in Practice: The Link to Laravel

In Laravel, you will combine fluent method chaining and static calls on a daily basis:

<div class="grid-2">
<div class="card card-cyan">

#### Static Helpers in Laravel

- **Dates & Time (Carbon):**
  `Carbon\Carbon::now()->addDays(7);`
- **String manipulation:**
  `Str::upper('thomas more');`
- **Array operations:**
  `Arr::first($records);`

</div>
<div class="card card-accent">

#### Query Builder & Database

```php
// Static initialization + fluent chaining:
$records = DB::table('records')
    ->where('genre_id', 1)
    ->orderBy('title')
    ->get();
```

`DB::table()` initializes the query builder, after which fluent chaining (`->where()->get()`) constructs the query.

</div>
</div>

<div class="card">

#### Architectural Guideline

Use static methods for pure utility functions that require no instance state, and instance methods whenever an object must preserve its own unique internal state.

</div>

---

## Summary: Your Foundation for Laravel 13

You now command the essential building blocks of modern PHP 8.5:

<div class="grid-2">
<div class="card">

#### What We Covered

- **Syntax:** `$`, strings, heredoc and data types
- **Operators:** `===`, ternary and the `??` operator
- **Structures:** `match`, loops and array structures
- **Functions:** Type hinting, nullable types (`?type`) and `fn`
- **Forms:** `$_GET`, `$_POST` and single page processing
- **OOP:** Classes, encapsulation, chaining and static methods

</div>
<div class="card card-cyan">

#### Next Steps

- Practice with the examples in the **`learn_php8`** project
- Test the interactive forms and OOP in Laravel Herd
- Upcoming modules: **Tailwind CSS v4**, **Alpine.js** and the **Laravel 13 Vinyl Shop Project**!

<div class="meta-box" style="margin-top: 14px; padding: 10px 14px;">
  <strong>Questions?</strong> Speak with your lecturers or visit <a href="https://itf-webdev.netlify.app/php/">itf-webdev.netlify.app</a>.
</div>

</div>
</div>
