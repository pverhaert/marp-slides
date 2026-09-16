---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Development - PHP 8'
footer: 'Web Development - Thomas More Hogeschool'
---

<!-- _class: lead -->

# PHP 8 Fundamentals

<p class="subtitle">&lt;Modern Server-Side Scripting voor Web Development /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Toegepaste Informatica (ITF)<br>
  <strong>Vak:</strong> Web Development | <strong>Thema:</strong> PHP 8.5 Syntaxis, Datastructuren & OOP
</div>

---

## Inhoudsopgave

1. **Introductie tot PHP 8.5** - Server-side scripting, architectuur en PHP 8 highlights
2. **Voorbeeldproject & Ontwikkelomgeving** - GitHub repo, Laravel Herd en Browsersync
3. **Basis Syntaxis & Variabelen** - PHP tags, output, comments, datatypes en heredoc
4. **Operatoren & Evaluatie** - Rekenkundig, toewijzing, strikte gelijkheid en booleans
5. **Controlestructuren** - `if/else`, ternary operator, null coalescing (`??`), `switch` vs `match`, loops
6. **Arrays & Objecten** - Geïndexeerd, associatief, multidimensionaal, `stdClass` en debugging
7. **Functies & Typering** - Return types, default values, references, nullable types en arrow functions
8. **Formulieren Verwerken** - `$_GET` vs `$_POST`, `isset()` vs `empty()` en single page processing
9. **Klassen & OOP** - Properties, mutators, namespaces, constructors, method chaining en statische methoden

---

## 1. Introductie tot PHP: Wat is PHP?

PHP is een populaire **server-side scriptingtaal**, specifiek ontworpen voor webontwikkeling:

<div class="grid-2">
<div class="card">

#### Belangrijkste Eigenschappen

- **Server-side:** PHP code draait op de webserver, in tegenstelling tot client-side JavaScript in de browser
- **Platformonafhankelijk:** Draait vlekkeloos op Linux, Windows en macOS
- **Serverondersteuning:** Werkt naadloos met Nginx, Apache en IIS
- **Open-source & gratis:** Vrij te gebruiken en breed ondersteund door hostingproviders
- **C-style syntaxis:** Grote gelijkenissen met Java, C# en JavaScript

</div>
<div class="card">

#### Ecosystem & Toepassingen

- **Bekende platformen:** WordPress, Drupal, Magento, Moodle en Wikipedia
- **Moderne frameworks:** Symfony en **Laravel**
- **Oorsprong:** Gemaakt door Rasmus Lerdorf in 1994 (oorspronkelijk "Personal Home Page")
- **Huidige betekenis:** Recursief acroniem voor *PHP: Hypertext Preprocessor*
- **Versie in deze cursus:** **PHP 8.5.x**

</div>
</div>

---

## 1. Hoe werkt PHP? Client vs. Server Flow

De client (browser) ontvangt enkel het eindresultaat in platte HTML:

```
[Browser Client]  --> 1. HTTP Request (hello_world.php) --->  [Webserver: Nginx/Apache]
                                                                        |
                                                                2. Voert PHP engine uit
                                                                3. Database queries (optioneel)
                                                                4. Genereert plain HTML
                                                                        |
[Browser Client]  <-- 5. HTTP Response (Plain HTML output) <-- [Webserver: Nginx/Apache]
```

<div class="grid-2">
<div class="card">

#### Origineel PHP Bestand op de Server

```php
<!doctype html>
<html lang="nl">
<body>
  <h1><?php echo 'Hello world'; ?></h1>
</body>
</html>
```

</div>
<div class="card">

#### HTML Resultaat in de Browser

```html
<!doctype html>
<html lang="nl">
<body>
  <h1>Hello world</h1>
</body>
</html>
```

</div>
</div>

---

## 1. PHP 8 Highlights: Moderne Taalfuncties

PHP heeft de voorbije jaren een enorme metamorfose ondergaan naar een moderne, strikt getypeerde taal:

<div class="grid-2">
<div class="card">

#### Moderne Expressiviteit

- **Named arguments:** Argumenten doorgeven op naam in plaats van louter op positie
- **Match expressions:** Een schoner, expressief en strikt alternatief voor `switch`
- **Nullsafe operator (`?->`):** Veilig methoden aanroepen op objecten die mogelijk `null` zijn
- **Short arrow functions (`fn`):** Compacte closures voor functionele operaties

</div>
<div class="card card-accent">

#### Type Safety & Architectuur

- **Union types (`int|string`):** Waarden kunnen meerdere types aannemen
- **Nullable types (`?string`):** Expliciete ondersteuning voor afwezigheid van waarden
- **Readonly properties:** Eigenschappen die na initialisatie onveranderlijk zijn
- **Enums:** Type-veilige opsommingen van vaste waarden

</div>
</div>

---

## 1. Waarom PHP? Voorbereiding op Laravel <span class="badge">Cruciaal</span>

Deze inleiding in PHP 8 is geen alleenstaand onderwerp, maar de **onmisbare fundering** voor het vervolg van dit vak:

<div class="card card-cyan">

#### De directe link naar Laravel

Over enkele weken starten we met de ontwikkeling van een volwaardige **Laravel 13 webapplicatie**.
Laravel is geschreven in modern PHP. Een diepgaand begrip van de PHP 8 basisconcepten zorgt ervoor dat je begrijpt wat het framework onder de motorkap doet.

</div>

<div class="grid-2">
<div class="card">

#### Wat je direct herkent in Laravel

- **Routing & Controllers:** PHP klassen, methods en type hints
- **Blade templates:** Ternary operatoren en loops (`@foreach`)
- **Eloquent Models:** Associatieve arrays, object casting en nullables
- **Helpers:** Statische helper methods en method chaining

</div>
<div class="card">

#### Voorsprong voor studenten

- Je kent de syntax al vanuit Java, JavaScript en Python
- We focussen specifiek op de **PHP-eigen constructies**: het dollarteken `$`, array-mechanismen, strikte vergelijkingen en de null coalescing operator (`??`)

</div>
</div>

---

## 2. Het Voorbeeldproject: `learn_php8`

Tijdens dit hoofdstuk maken we gebruik van het officiële begeleidende oefenproject:

<div class="grid-2">
<div class="card">

#### Project Bronnen

- **GitHub Repository:**
  [github.com/pverhaert/learn_php8](https://github.com/pverhaert/learn_php8)
- **Online Preview:**
  [php8.z01.be](https://php8.z01.be/)
- Bevat alle theorievoorbeelden en praktische oefeningen
- Gestyled met Tailwind CSS voor een overzichtelijke UI

</div>
<div class="card">

#### Repo Klonen via de Terminal

Navigeer naar je projectenmap (bijvoorbeeld `C:\sites_laravel`) en voer uit:

```bash
git clone https://github.com/pverhaert/learn_php8.git php8
cd php8
rm -rf .git
npm install
```

`npm install` installeert de front-end tooling (Tailwind CSS, Browsersync) uit `package.json`.

</div>
</div>

---

## 2. Ontwikkelomgeving: Laravel Herd

In plaats van zware traditionele stacks (WAMP, XAMPP, MAMP) gebruiken we **Laravel Herd**:

<div class="grid-2">
<div class="card card-accent">

#### Waarom Laravel Herd?

- **Zero-configuration:** Geen gedoe met vhosts of handmatige Apache configuraties
- **Volledige stack:** Bevat Nginx, Node.js en meerdere PHP-versies (PHP 8.5)
- **Automatische HTTPS:** Eenvoudig lokale certificaten beheren met een klik op het slotje
- **Razendsnel:** Minimaal geheugengebruik en native prestaties op Windows en macOS

</div>
<div class="card">

#### Herd Configureren voor `php8`

1. Open Laravel Herd en ga naar **Sites**
2. Klik op de drie puntjes rechtsboven en kies **Show sites without valid driver**
3. Het project `php8` verschijnt nu in de lijst
4. Klik op het **slot-icoon** om het project via HTTPS te beveiligen: `https://php8.test`

</div>
</div>

---

## 2. Project Uitvoeren & Live Reloading

Open de projectmap `C:\sites_laravel\php8` in PhpStorm en start de watch-taak:

```bash
npm run watch
```

<div class="grid-2">
<div class="card">

#### Wat gebeurt er?

- Start een Browsersync proxy server op **`http://localhost:5500`**
- Monitort wijzigingen in PHP, JS en CSS bestanden
- Herlaadt de browser automatisch zodra je een bestand opslaat in je editor

</div>
<div class="card">

#### Directe URL vs Proxy

- **`http://localhost:5500`:** Browsersync proxy met automatische live-reload (aanbevolen tijdens het coderen)
- **`https://php8.test`:** Rechtstreekse Nginx URL via Herd (vereist manuele browser-refresh na wijzigingen)

</div>
</div>

---

## 3. Basis Syntaxis: PHP Code Blocks

PHP code kan naadloos worden geïntegreerd binnen HTML documenten via script tags:

```php
<!doctype html>
<html lang="nl">
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

#### Regels voor Script Blocks

- Start altijd met `<?php` en sluit af met `?>`
- Elk afzonderlijk statement eindigt verplicht met een puntkomma `;`
- `echo` is het basiscommando om tekst of HTML output te genereren

</div>
<div class="card">

#### Shorthand Varianten

- **Shorthand echo:** `<?= 'Hello world' ?>` is exact gelijk aan `<?php echo 'Hello world'; ?>`
- **Pure PHP bestanden:** Bevat een bestand enkel PHP code (geen HTML), dan **mag de closing tag `?>` worden weggelaten**

</div>
</div>

---

## 3. Basis Syntaxis: Comments & IDE Sneltoetsen

Goed gedocumenteerde code verhoogt de leesbaarheid en overdraagbaarheid:

```php
<?php
// Dit is een inline commentaarregel

/*
 * Dit commentaarblok
 * strekt zich uit over meerdere regels
 */

$score = 15; // Commentaar achter een statement
```

<div class="grid-2">
<div class="card card-cyan">

#### PhpStorm Sneltoetsen

- **Single-line comment:** `Ctrl + /` (toggle op geselecteerde regels)
- **Multi-line comment:** `Ctrl + Shift + /` (omringt selectie met `/* ... */`)
- **Code formatteren:** `Ctrl + Alt + L`

</div>
<div class="card">

#### Best Practice

Schrijf commentaar om het **waarom** achter complexe business logica uit te leggen, niet het overduidelijke "hoe" van standaard syntaxis.

</div>
</div>

---

## 3. Variabelen & Naming Conventions

In vergelijking met Java, JavaScript en Python valt direct het dollarteken op:

```php
$student1 = 'John Doe';
$percentage1 = 73.08;
$student2 = 'Jane Smith';
$hasGraduated = true;
```

<div class="grid-2">
<div class="card">

#### Strikte Naamgevingsregels

- Begint **altijd met een dollarteken (`$`)**
- Gevolgd door een letter of underscore `_` (nooit een cijfer als startteken)
- Bevat enkel alfanumerieke tekens en underscores (geen spaties of koppeltekens)
- **Hoofdlettergevoelig:** `$student` en `$Student` zijn twee totaal verschillende variabelen

</div>
<div class="card">

#### Conventies in PHP & Laravel

- Gebruik **camelCase** (`$firstName`) of **snake_case** (`$first_name`) voor variabelen
- Gebruik **PascalCase** (`StudentController`) voor klassennamen
- Variabelen hoeven niet vooraf gedeclareerd te worden met `let`, `var` of een type (zoals in Java of JS)

</div>
</div>

---

## 3. Datatypes in PHP 8

PHP is een dynamisch getypeerde taal: het type van een variabele wordt bepaald op basis van de toegekende waarde:

<div class="grid-2">
<div class="card">

#### Primitieve Datatypes

- **Integer:** Hele getallen (`42`, `-10`, `0`)
- **Float:** Decimale getallen (`3.14`, `12.7`, wetenschappelijk `34e-2`)
- **String:** Tekstreeksen (`'John Doe'`, `"Web Development"`)
- **Boolean:** Logische waarden (`true` of `false`)
- **NULL:** Variabele zonder toegekende waarde (`null`)

</div>
<div class="card">

#### Samengestelde & Speciale Types

- **Array:** Geordende mappen van waarden of sleutel-waarde paren
- **Object:** Instantie van een gedefinieerde klasse
- PHP zet types automatisch om waar nodig (type juggling), maar biedt via PHP 8 sterke mogelijkheden voor strikte typering

</div>
</div>

---

## 3. Type Juggling vs. Strikte Typering <span class="badge">PHP 8 Best Practice</span>

Standaard probeert PHP types automatisch om te zetten naar het verwachte type (**type juggling**). Met `declare(strict_types=1);` dwing je strikte types af:

<div class="grid-2">
<div class="card">

#### 1. Zonder strikte typering (Standaard)

```php
function sum(int $a, int $b): int {
    return $a + $b;
}

// String '10' wordt stil omgezet naar int 10
echo sum(5, '10'); // Output: 15
```

- **Voordeel:** Flexibel; handig omdat HTML formulier-inputs altijd strings zijn
- **Nadeel:** Verbergt typefouten en leidt tot onvoorspelbaar gedrag bij foutieve data

</div>
<div class="card card-accent">

#### 2. Met strikte typering (`strict_types=1`)

```php
declare(strict_types=1);

function sum(int $a, int $b): int {
    return $a + $b;
}

// String '10' gooit direct een TypeError!
echo sum(5, '10'); // Fatal error: TypeError
```

- **Voordeel:** Voorkomt subtiele bugs; fouten worden direct opgemerkt tijdens ontwikkeling
- **Nadeel:** Minder vergevingsgezind; invoer uit formulieren vereist expliciete casting

</div>
</div>

---

## 3. Strings: Concatenatie vs. Interpolatie

PHP biedt twee verschillende manieren om variabelen samen te voegen in tekst:

<div class="grid-2">
<div class="card">

#### 1. Concatenatie met punt (`.`)

- Werkt met zowel enkele als dubbele quotes
- Variabelen worden handmatig samengevoegd

```php
$student1 = 'John Doe';
$percentage = 73.08;

echo '<p>' . $student1 . ' behaalt ' . 
     $percentage . ' %</p>' . "\n";
```

*Voeg altijd spaties rond het puntteken toe voor optimale leesbaarheid.*

</div>
<div class="card">

#### 2. Interpolatie met dubbele quotes

- Variabelen binnen `"..."` worden automatisch vervangen door hun actuele waarde
- Geen breekpunten met punten nodig

```php
$student2 = 'Jane Smith';
$percentage = 64.84;

echo "<p>$student2 behaalt $percentage %</p>\n";
```

*Let op: string interpolatie werkt uitsluitend bij dubbele quotes, nooit bij enkele quotes.*

</div>
</div>

---

## 3. Multi-line Strings met Heredoc Notatie

Voor grotere blokken HTML output is de **Heredoc** syntax ideaal:

```php
$student1 = 'John Doe';
$percentage1 = 73.08;
$student2 = 'Jane Smith';
$percentage2 = 64.84;

echo <<<HTML
<article class="p-4 bg-slate-800 rounded">
  <h3>Resultaten ITF</h3>
  <p>$student1 behaalt $percentage1 %</p>
  <p>$student2 behaalt $percentage2 %</p>
</article>
HTML;
```

<div class="grid-2">
<div class="card">

#### Voordelen van Heredoc

- Geen omslachtige quotes of escaping nodig
- Regeleindes (`\n`) en inspringing blijven behouden
- Automatische variabele-interpolatie
- Ideaal in combinatie met Emmet afkortingen in PhpStorm

</div>
<div class="card">

#### Syntaxis Regels

- Start met `<<<` gevolgd door een identifier (bijv. `HTML` of `RESULTS`)
- De inhoud start op de volgende regel
- De sluit-identifier staat op een eigen regel, direct gevolgd door `;`

</div>
</div>

---

## 4. Rekenkundige Operatoren

PHP ondersteunt alle klassieke rekenkundige berekeningen:

| Operator | Omschrijving | Voorbeeld | Resultaat ($x = 10, $y = 3) |
| --- | --- | --- | --- |
| `+` | Optelling | `$x + $y` | `13` |
| `-` | Aftrekking | `$x - $y` | `7` |
| `*` | Vermenigvuldiging | `$x * $y` | `30` |
| `/` | Deling | `$x / $y` | `3.3333333333333` |
| `%` | Modulo (restwaarde) | `$x % $y` | `1` |
| `**` | Machtsverheffing (PHP 5.6+) | `$x ** $y` | `1000` (10³) |

<div class="card card-accent">

#### Escapen van het dollarteken in strings

Wil je de naam van een variabele letterlijk tonen in een dubbel gequote string in plaats van de waarde?
Plaats een backslash voor het dollarteken:
`echo "<p>\$x + \$y = " . ($x + $y) . "</p>";` produceert: `$x + $y = 13`.
Gebruik altijd **ronde haakjes** rond rekenkundige expressies bij string concatenatie.

</div>

---

## 4. Toewijzingsoperatoren & Increment

Toewijzingsoperatoren combineren een bewerking met een directe toewijzing aan de variabele:

<div class="grid-2">
<div class="card">

#### Samengestelde Toewijzingen

- `$x += $y` is identiek aan `$x = $x + $y`
- `$x -= $y` is identiek aan `$x = $x - $y`
- `$x *= $y` is identiek aan `$x = $x * $y`
- `$x /= $y` is identiek aan `$x = $x / $y`
- `$x %= $y` is identiek aan `$x = $x % $y`
- `$name .= $surname` voegt strings samen:
  `$name = $name . $surname`

</div>
<div class="card">

#### Increment & Decrement

- `$x++`: Verhoogt de waarde van `$x` met 1
- `$x--`: Verlaagt de waarde van `$x` met 1

```php
$score = 10;
$score += 5;   // $score is nu 15
$score++;      // $score is nu 16

$title = 'Web ';
$title .= 'Dev'; // $title is nu 'Web Dev'
```

</div>
</div>

---

## 4. Vergelijkingsoperatoren: Loose vs. Strict Equality

In PHP is het onderscheid tussen losse en strikte gelijkheid van cruciaal belang:

<div class="grid-2">
<div class="card">

#### Losse Gelijkheid (`==` en `!=`)

- Converteert types automatisch voor de vergelijking (type coercion)
- Kan leiden tot subtiele bugs

```php
$x = 10;     // integer
$y = '10';   // string

var_dump($x == $y); // true!
```

</div>
<div class="card card-accent">

#### Strikte Identiteit (`===` en `!==`)

- Vergelijkt zowel de **waarde** als het **datatype**
- **Gouden standaard** in modern PHP en Laravel

```php
$x = 10;     // integer
$y = '10';   // string

var_dump($x === $y); // false (int !== string)
```

</div>
</div>

#### Overige Vergelijkingen

- `$x < $y` (kleiner dan), `$x <= $y` (kleiner of gelijk)
- `$x > $y` (groter dan), `$x >= $y` (groter of gelijk)
- `<>` is een ouder synoniem voor `!=`

---

## 4. Booleans & Logische Operatoren

Hoe toont PHP booleans, en welke logische operatoren gebruiken we?

<div class="grid-2">
<div class="card">

#### Weergave van Booleans

Wanneer PHP een boolean omzet naar tekst:

- `true` wordt weergegeven als **`1`**
- `false` wordt weergegeven als **`""` (lege string)**

```php
echo true;  // Geeft: 1
echo false; // Geeft: (helemaal niets!)
```

*Gebruik `var_dump()` tijdens het debuggen om echte booleans te zien.*

</div>
<div class="card">

#### Logische Operatoren & Precedence

- `&&` (EN) en `||` (OF)
- `!` (NIET / negatie)
- `xor`: waar als precies een van beide waar is

> **Belangrijk:** PHP ondersteunt ook `and` en `or`, maar deze hebben een lagere operator prioriteit. Gebruik in conditionele expressies **altijd `&&` en `||`** om onverwachte voorrangsfouten te voorkomen.

</div>
</div>

---

## 5. Controlestructuren: Selectie (`if`, `else`, `elseif`)

Conditionele statements sturen de programmastroom op basis van logische expressies:

```php
$scorePHP = 9;

if ($scorePHP >= 10) {
    echo '<p>Proficiat, je bent geslaagd voor PHP!</p>';
} elseif ($scorePHP >= 8) {
    echo '<p>Je bent niet geslaagd, maar de score is tolereerbaar.</p>';
} else {
    echo '<p>Helaas niet geslaagd. Volgende keer beter!</p>';
}
```

<div class="grid-2">
<div class="card">

#### Syntaxis Details

- De conditie staat altijd tussen ronde haakjes `(...)`
- Het codeblok staat tussen accolades `{ ... }`
- `elseif` wordt in PHP bij voorkeur als een aaneengeschreven woord gebruikt

</div>
<div class="card">

#### Bekend uit Java / JavaScript

De structuur werkt identiek aan Java, JavaScript en C#. Het grote voordeel in PHP is de directe combinatie met HTML output.

</div>
</div>

---

## 5. De Ternary Operator <span class="badge">Veelvuldig in Laravel Blade</span>

De ternary operator is een krachtige shorthand voor eenvoudige `if-else` constructies:

```php
// Syntaxis: conditie ? expressieAlsWaar : expressieAlsOnwaar
$message = $scorePHP >= 10 ? 'Geslaagd' : 'Niet geslaagd';
```

<div class="card card-cyan">

#### Directe integratie in HTML weergave

```php
echo "<p class='" . ($scorePHP >= 10 ? 'text-green-500' : 'text-red-500') . "'>
        Jouw resultaat: $scorePHP
      </p>";
```

</div>

<div class="grid-2">
<div class="card">

#### Waarom zo belangrijk voor Laravel?

In **Blade views** ga je deze operator continu tegenkomen voor:

- Actieve menu-items highlighten: `class="{{ $active ? 'active' : '' }}"`
- Dynamische badges en statusteksten
- Formulier checkbox selecties

</div>
<div class="card">

#### Richtlijn

Gebruik de ternary operator enkel voor **enkelvoudige expressies**. Zodra er meerdere stappen of geneste condities nodig zijn, blijft een standaard `if-else` veel leesbaarder.

</div>
</div>

---

## 5. Null Coalescing Operator (`??`) <span class="badge">Cruciaal voor Laravel</span>

Het controleren op het bestaan van waarden is een van de meest voorkomende taken in webapplicaties:

<div class="card card-accent">

#### De traditionele manier vs. de moderne `??` operator

Traditioneel controleerden we variabelen met `isset()` en een ternary operator:

```php
$score = isset($scorePHP) ? $scorePHP : 'Geen score beschikbaar';
```

Met de **null coalescing operator (`??`)** schrijven we dit compact en elegant:

```php
$score = $scorePHP ?? 'Geen score beschikbaar';
```

Als `$scorePHP` bestaat en niet `null` is, krijgt `$score` die waarde. In elk ander geval geldt de fallback.

</div>

<div class="grid-2">
<div class="card">

#### Waarom cruciaal in Laravel?

- Request input uitlezen: `$name = $request->name ?? 'Gast';`
- Configuratie en environment waarden met fallbacks
- Optionele database relaties veilig renderen in Blade

</div>
<div class="card">

#### Chaining van Coalescing

Je kunt meerdere fallbacks achter elkaar plaatsen:

```php
$display = $userNickname ?? $userName ?? 'Anoniem';
```

</div>
</div>

---

## 5. `switch` vs. `match` Expression (PHP 8)

PHP 8 introduceert `match`, een enorme stap voorwaarts ten opzichte van het traditionele `switch`:

<div class="grid-2">
<div class="card">

#### Oude `switch` statement

- Vereist `break` statements om fall-through te vermijden
- Gebruikt losse vergelijking (`==`)
- Kent geen directe returnwaarde

```php
switch ($role) {
    case 'admin':
        $badge = 'Rood';
        break;
    case 'editor':
        $badge = 'Blauw';
        break;
    default:
        $badge = 'Grijs';
}
```

</div>
<div class="card card-accent">

#### Moderne PHP 8 `match` expression

- Evalueert direct naar een waarde (toewijsbaar)
- Gebruikt **strikte identiteit (`===`)**
- Geen `break` nodig, veel kortere syntax

```php
$badge = match ($role) {
    'admin'  => 'Rood',
    'editor' => 'Blauw',
    default  => 'Grijs',
};
```

*Gooit een `UnhandledMatchError` als er geen match is en geen `default` voorzien werd.*

</div>
</div>

---

## 5. Iteraties: `for` en `while`

PHP biedt klassieke lussen voor herhalende bewerkingen wanneer een conditie waar is:

<div class="grid-2">
<div class="card">

#### 1. `for` Loop (Aantal iteraties vooraf bekend)

```php
$base = 7;
$depth = 5;

for ($i = 1; $i <= $depth; $i++) {
    echo "<li>$i x $base = " . ($i * $base) . "</li>\n";
}
```

- Initialisatie: `$i = 1`
- Conditiecontrole vooraf: `$i <= $depth`
- Stapgrootte: `$i++`

</div>
<div class="card">

#### 2. `while` Loop (Conditiecontrole VOORAF)

```php
$base = 7;
$depth = 5;
$j = 1;

while ($j <= $depth) {
    echo "<li>$j x $base = " . ($j * $base) . "</li>\n";
    $j++;
}
```

- Controleert de conditie **vóór** elke iteratie
- Is de conditie direct `false`, dan draait de body 0 keer

</div>
</div>

---

## 5. Iteraties: De Cruciale `do-while` Edge Case

Wat gebeurt er als de conditie bij de start al `false` is (bijvoorbeeld bij `$depth = 0`)?

<div class="grid-2">
<div class="card">

#### `while` (Conditiecontrole VOORAF)

```php
$base = 7;
$depth = 0; // Diepte is 0

$j = 1;
while ($j <= $depth) {
    echo "<li>$j x $base</li>";
    $j++;
}
```

- **Output:** *(geen enkele regel)*
- **0 of meer keren:** Omdat `$j <= 0` direct `false` is, wordt het codeblok overgeslagen

</div>
<div class="card card-accent">

#### `do-while` (Conditiecontrole ACHTERAF)

```php
$base = 7;
$depth = 0; // Diepte is 0

$k = 1;
do {
    echo "<li>$k x $base</li>";
    $k++;
} while ($k <= $depth);
```

- **Output:** `1 x 7` *(geprint!)*
- **1 of meer keren:** Het codeblok draait altijd minstens eenmaal vóór de controle

</div>
</div>

---

## 6. Geïndexeerde Arrays

Arrays in PHP zijn dynamisch en kunnen groeien zonder vaste lengtebeperking:

```php
// Aanbevolen notatie met vierkante haken []
$teachers = ['Michaël Cloots', 'Jan Janssen', 'Patrick Verhaert'];

// Elementen individueel toewijzen via index (start bij 0)
$students[0] = 'John Doe';
$students[1] = 'Jane Doe';

// Element toevoegen aan het einde van de array (auto-increment index)
$teachers[] = 'Nieuwe Collega';
```

<div class="grid-2">
<div class="card">

#### Eigenschappen

- Starten standaard op index **`0`**
- De index van het laatste element is `count($array) - 1`
- `count($teachers)` geeft het totale aantal elementen terug

</div>
<div class="card">

#### Naming Convention

Gebruik altijd een **meervoudig zelfstandig naamwoord** voor arrays (`$students`, `$records`, `$courses`), zodat direct duidelijk is dat de variabele een collectie bevat.

</div>
</div>

---

## 6. Associatieve Arrays: Sleutel-Waarde Paren

In associatieve arrays worden numerieke indexen vervangen door betekenisvolle tekstsleutels (strings):

```php
// Alle elementen in een keer initialiseren
$scoresJane = [
    'PHP'                 => 17,
    'Business essentials' => 14,
    'English 2'           => 10,
];

// Individueel element ophalen of updaten
$scoresJane['PHP'] = 18;
```

<div class="card card-accent">

#### Interpolatie van associatieve array elementen

Wanneer je een associatief array element binnen een dubbel gequote string plaatst, moet je accolades `{}` gebruiken:

```php
// Correct met accolades:
echo "<p>Jane scoort voor PHP: {$scoresJane['PHP']}</p>";

// Of via string concatenatie:
echo "<p>Jane scoort voor PHP: " . $scoresJane['PHP'] . "</p>";
```

*Zonder accolades kan de PHP parser de array-sleutel binnen de string niet correct interpreteren.*

</div>

---

## 6. Multidimensionale Arrays

Een multidimensionale array is een geneste array waarbij elementen zelf ook weer arrays zijn:

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

#### Dieperliggende waarden aanspreken

Gebruik opeenvolgende vierkante haken:

```php
// Naam van de eerste student
echo $students[0]['name']; // John

// Score voor PHP van Jane
echo $students[1]['scores']['PHP']; // 17
```

</div>
<div class="card">

#### Toepassing in Webapplicaties

Vrijwel alle data uit databases, API-koppelingen en JSON responses komt binnen in de vorm van multidimensionale datastructuren.

</div>
</div>

---

## 6. Itereren met de `foreach` Lus

De `foreach` lus is de standaardmanier om arrays en collecties te doorlopen in PHP:

<div class="grid-2">
<div class="card">

#### 1. Enkel waarden uitlezen

```php
$fruits = ['Appel', 'Banaan', 'Kers'];

foreach ($fruits as $fruit) {
    echo "<li>$fruit</li>\n";
}
```

</div>
<div class="card">

#### 2. Index / Sleutel én Waarde

```php
$scores = ['PHP' => 16, 'Java' => 14];

foreach ($scores as $course => $score) {
    echo "<li>$course: $score</li>\n";
}
```

</div>
</div>

#### Geneste `foreach` voor multidimensionale arrays

```php
foreach ($students as $student) {
    echo "<h3>Student: {$student['name']}</h3><ul>";
    foreach ($student['scores'] as $vak => $score) {
        echo "<li>$vak: $score</li>";
    }
    echo "</ul>";
}
```

---

## 6. Objecten (`stdClass`) & Conversie

Naast arrays kent PHP ook generieke objecten (`stdClass`), waarbij eigenschappen worden aangesproken met de **pijl-operator (`->`)**:

<div class="grid-2">
<div class="card">

#### Conversie: Array naar Object

De meest robuuste manier om diepe geneste arrays om te zetten naar objecten is via JSON:

```php
// Converteert multidimensionale array naar stdClass objecten
$studentsObj = json_decode(json_encode($students));

// Eigenschappen benaderen via ->
foreach ($studentsObj as $student) {
    echo "<p>$student->name scoort {$student->scores->PHP}</p>";
}
```

</div>
<div class="card">

#### Belang van `json_decode()` parameters

- `json_decode($json)` (of met `false`): Geeft een **`stdClass` object** terug (`$obj->prop`)
- `json_decode($json, true)`: Geeft een **associatieve array** terug (`$arr['prop']`)

In Laravel Eloquent werken modellen vrijwel altijd als objecten met de pijl-notatie!

</div>
</div>

---

## 6. Debugging: `var_dump()` vs. `print_r()`

Wanneer data niet de verwachte structuur heeft, zijn debugging functies onmisbaar:

<div class="grid-2">
<div class="card">

#### `var_dump($variabele)`

- Toont het **datatype**, de **lengte** en de **waarde** van elk element
- Ideaal voor het opsporen van typefouten (bijvoorbeeld `'10'` vs `10`)

</div>
<div class="card">

#### `print_r($variabele)`

- Toont een schoner, compacter overzicht van arrays en objecten
- Makkelijker scanbaar voor grote datasets

</div>
</div>

<div class="card card-accent">

#### Tip: Behoud formattering met `<pre>` tags

Standaard drukt de browser alle spaties en enters uit debug functies samen tot 1 regel.
Omring je debug calls altijd met HTML `<pre>` tags voor een overzichtelijke boomstructuur:

```php
echo '<pre>';
var_dump($students);
echo '</pre>';
```

</div>

---

## 7. Functies Definiëren & Return Types

Functies groeperen herbruikbare logica. In modern PHP declareren we expliciet return types:

```php
// Functie zonder returnwaarde
function writeMessage(): void 
{
    echo "<p>Welkom bij het opleidingsonderdeel Web Development!</p>\n";
}

// Functie met parameters en een strikt return type
function calculateAverage(float $score1, float $score2): float 
{
    return ($score1 + $score2) / 2;
}
```

<div class="grid-2">
<div class="card">

#### Basisregels

- Begin met het sleutelwoord `function`
- Geef betekenisvolle namen in camelCase
- Gebruik `: void` als de functie bewust niets teruggeeft via `return`

</div>
<div class="card">

#### Aanroepen

```php
writeMessage();

$gemiddelde = calculateAverage(14.5, 18.0);
echo "<p>Gemiddelde: $gemiddelde</p>";
```

</div>
</div>

---

## 7. Parameters, Default Values & References

Functies kunnen flexibel worden geconfigureerd met optionele argumenten of referentie-parameters:

<div class="grid-2">
<div class="card">

#### Default Parameters (Optioneel)

Parameters met een standaardwaarde hoeven bij aanroep niet meegegeven te worden:

```php
function greet(string $name = 'Student'): void 
{
    echo "<p>Hallo, $name!</p>";
}

greet('Jan');   // Hallo, Jan!
greet();        // Hallo, Student!
```

*Plaats optionele parameters altijd achteraan.*

</div>
<div class="card">

#### By Value vs. By Reference (`&`)

- **By Value (standaard):** De functie werkt op een kopie; origineel blijft ongewijzigd
- **By Reference (`&`):** De functie wijzigt rechtstreeks de originele variabele

```php
function applyDiscount(float &$price): void 
{
    $price *= 0.8; // Wijzigt $price buiten de functie!
}

$bedrag = 100.0;
applyDiscount($bedrag);
echo $bedrag; // 80.0
```

</div>
</div>

---

## 7. Type Hinting: Nullable Types (`?type`) <span class="badge">Cruciaal voor Laravel</span>

Vaak kan een parameter of returnwaarde een specifiek type hebben, of `null` zijn (bijvoorbeeld een optioneel veld in de database):

<div class="card card-accent">

#### Nullable syntax met vraagteken (`?string`)

```php
function findUserEmail(?int $userId): ?string 
{
    if ($userId === null) {
        return null;
    }
    return "user_$userId@thomasmore.be";
}

echo findUserEmail(12);   // "user_12@thomasmore.be"
echo findUserEmail(null); // null
```

</div>

<div class="grid-2">
<div class="card">

#### Waarom cruciaal in Laravel?

- **Eloquent Models:** Optionele databasekolommen (`nullable()`)
- **Form Requests & DTO's:** Velden die niet verplicht zijn
- Voorkomt runtime null reference errors

</div>
<div class="card">

#### Betekenis van `?`

- `?string` is gelijk aan de union type `string|null`
- Zowel een string als de waarde `null` worden expliciet geaccepteerd

</div>
</div>

---

## 7. Type Hinting: Union Types & Foutafhandeling

PHP 8 breidt het typesysteem verder uit met union types en strikte foutdetectie:

<div class="grid-2">
<div class="card">

#### Union Types (`int|float|string`)

Laat toe dat een argument of returnwaarde tot meerdere expliciete types behoort:

```php
function formatScore(int|float $score): string 
{
    return number_format($score, 1) . ' / 20';
}

echo formatScore(14);   // "14.0 / 20"
echo formatScore(16.5); // "16.5 / 20"
```

- Types worden gescheiden door een pipe `|`
- Vervangt verouderde PHPDoc annotaties

</div>
<div class="card card-cyan">

#### Strikte Foutafhandeling: `TypeError`

Wordt er een type doorgegeven dat niet matched, dan gooit PHP direct een `TypeError`:

```php
// Bij actieve strict_types:
formatScore('veertien'); 
// Fatal error: Uncaught TypeError!
```

- Fouten crashen direct en luid tijdens ontwikkeling
- Voorkomt dat corrupte data stilletjes in de database belandt

</div>
</div>

---

## 7. Short Arrow Functies (`fn`) & `include_once`

Voor korte anonieme functies kent PHP 8 een beknopte pijlnotatie:

```php
// Klassieke anonieme functie
$doubleClassic = function($n) { return $n * 2; };

// Moderne Short Arrow Function (impliciete return van de expressie)
$double = fn(int $n): int => $n * 2;

$numbers = [1, 2, 3, 4];
$multiplied = array_map(fn($n) => $n * 10, $numbers); // [10, 20, 30, 40]
```

<div class="card">

#### Functies opsplitsen met `include_once`

Plaats herbruikbare functies in aparte bestanden (bijv. `shared/functions.php`):

```php
include_once '../shared/functions.php'; // Laadt het bestand eenmalig in
```

*Gebruik altijd relatieve paden of `$_SERVER['DOCUMENT_ROOT'] . '/shared/...'`. Een pad dat start met `/` verwijst in PHP immers naar de root van het serversysteem, niet naar je projectmap!*

</div>

---

## 8. Formulieren: HTML Formulier Basics

Formulieren zijn de primaire manier waarop gebruikers gegevens naar de webserver sturen:

```html
<form method="post" action="verwerk.php">
  <div>
    <label for="name">Naam:</label>
    <input type="text" name="name" id="name" required>
  </div>
  <div>
    <span>Geslacht:</span>
    <label><input type="radio" name="gender" value="M"> Man</label>
    <label><input type="radio" name="gender" value="F"> Vrouw</label>
  </div>
  <button type="submit">Verzenden</button>
</form>
```

<div class="grid-2">
<div class="card">

#### Kernattributen

- `action`: De bestemmings-URL waar de formulierdata naartoe wordt gestuurd
- `method`: De HTTP verzendmethode (`GET` of `POST`)
- `name`: **Cruciaal:** De waarde van het `name` attribuut vormt de array-sleutel in PHP!

</div>
<div class="card">

#### Superglobals

Bij verzending maakt PHP automatisch een associatieve array aan:

- `method="get"` vult de globale array **`$_GET`**
- `method="post"` vult de globale array **`$_POST`**

</div>
</div>

---

## 8. Formulierverwerking met `$_GET`

Bij `GET` worden alle formulierwaarden zichtbaar toegevoegd aan de URL (de query string):

```
https://php8.test/verwerk.php?name=John+Doe&gender=M
```

```php
// In het verwerkingsbestand (verwerk.php):
$name = !empty($_GET['name']) ? $_GET['name'] : 'Niet opgegeven';
$gender = $_GET['gender'] ?? 'Niet opgegeven';

echo "<p>Welkom, $name (Geslacht: $gender)</p>";
```

<div class="grid-2">
<div class="card">

#### Wanneer gebruik je `GET`?

- **Zoekopdrachten en filters:** URL kan worden gebookmarked of gedeeld
- **Geen gevoelige data:** Wachtwoorden horen nooit in een URL thuis
- **Beperkte lengte:** Browsers leggen limieten op aan URL-lengtes (~2048 tekens)

</div>
<div class="card card-accent">

#### `isset()` vs. `empty()`

- `isset($var)`: Waar als de variabele bestaat en **niet null** is
- `empty($var)`: Waar als de variabele niet bestaat, of `""`, `0`, `false`, `null` of `[]` is
- **Tip:** Een leeg tekstveld stuurt een lege string `""`. Gebruik daarom `empty()` om lege invoer op te sporen!

</div>
</div>

---

## 8. Formulierverwerking met `$_POST`

Bij `POST` worden gegevens onzichtbaar in de HTTP request body verzonden:

<div class="grid-2">
<div class="card">

#### Voordelen van `POST`

- **Veilig voor gevoelige data:** Wachtwoorden en persoonsgegevens verschijnen niet in de browsergeschiedenis of serverlogs
- **Geen datalimiet:** Geschikt voor grote tekstblokken en bestandsuploads
- Wijzigt doorgaans de staat op de server (create, update, delete)

</div>
<div class="card">

#### POST Data Inspecteren in DevTools

1. Druk op `F12` en open het tabblad **Network**
2. Verstuur het formulier in de browser
3. Klik op de request in de lijst
4. Bekijk in het tabblad **Payload** de exacte sleutels en waarden die verzonden zijn

</div>
</div>

```php
// Inlezen via de $_POST superglobal:
$name = !empty($_POST['name']) ? $_POST['name'] : 'Onbekend';
$gender = $_POST['gender'] ?? 'Niet geselecteerd';
```

---

## 8. Single Page Form: Het Concept & Flow

In plaats van een apart verwerkingsbestand (`verwerk.php`), kunnen we invoer en verwerking op **dezelfde pagina** houden:

<div class="grid-2">
<div class="card card-cyan">

#### Hoe werkt de flow?

- **`$_SERVER['PHP_SELF']`**: Verwijst altijd dynamisch naar de URL van het huidige script
- **Eerste bezoek (GET):** `$_POST` is leeg (`false`) -> het formulier wordt getoond
- **Na verzending (POST):** `$_POST` bevat data (`true`) -> de verwerking toont het resultaat

</div>
<div class="card card-accent">

#### Waarom Single Page?

- **Directe feedback:** Foutmeldingen of succesboodschappen op dezelfde pagina
- **State behoud:** Ingevoerde waarden kunnen opnieuw worden ingevuld bij validatiefouten
- **Eenvoud:** Geen extra omleidings- of verwerkingsscripts nodig

</div>
</div>

<div class="card">

#### Controlemechanisme in PHP

```php
if ($_POST) {
    // Formulier is verzonden: lees $_POST uit en toon bedanking of foutmelding
} else {
    // Eerste bezoek: toon het lege HTML-formulier
}
```

</div>

---

## 8. Single Page Form: Implementatie

Volledige opbouw met een standaard `if ($_POST) { ... } else { ... }` controlestructuur:

```php
<article>
<?php
if ($_POST) {
    $name = !empty($_POST['name']) ? $_POST['name'] : 'Niet ingevuld';
    $gender = $_POST['gender'] ?? 'Niet aangeduid';
    echo "<p>Bedankt voor je invoer, <b>$name</b> ($gender)!</p>";
    echo "<p><a href='{$_SERVER['PHP_SELF']}' class='btn'>Opnieuw invoeren</a></p>";
} else {
?>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <input type="text" name="name" placeholder="Jouw naam">
      <button type="submit">Verzend</button>
    </form>
<?php
}
?>
</article>
```

- **Resetknop:** De link naar `$_SERVER['PHP_SELF']` triggert een `GET`-request, waardoor `$_POST` leeg is en het `else`-blok het formulier opnieuw toont.

---

## 9. Klassen in PHP: De Basis (`Student`)

Object-Oriented Programming (OOP) organiseert code in klassen (blauwdrukken) en objecten:

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

#### Naming & Encapsulatie

- Klassenamen starten met een **hoofdletter** (PascalCase)
- Bestandsnaam is exact gelijk: `Student.php`
- `private`: eigenschappen enkel binnen de klasse zelf bereikbaar (encapsulatie)

</div>
<div class="card" style="margin-top: 15px;">

#### Mutators & `$this`

- **Getters & Setters:** Bieden gecontroleerde publieke toegang tot eigenschappen
- **`$this`**: Verwijst naar de huidige specifieke instantie
- **`->`**: Pijl-operator voor eigenschappen en methoden (`$this->name`)

</div>

</div>
</div>

---

## 9. Namespaces & Autoloading

Namespaces voorkomen naamconflicten en weerspiegelen de mappenstructuur van je applicatie:

<div class="grid-2">
<div class="card">

#### Definitie in de klasse

```php
// Bestand: classes/Student.php
namespace classes;

class Student 
{
    // ...
}
```

- Sleutelwoord `namespace` staat altijd als allereerste statement
- *Tip: Rechtsklik in PhpStorm op map -> **New -> PHP Class** genereert automatisch de namespace!*

</div>
<div class="card">

#### Gebruik via `use` statement

```php
// Bestand: course/test.php
include_once '../classes/Student.php';

use classes\Student;

$student = new Student();
$student->setName('John Doe');
echo $student->getName();
```

Zonder `use` zou je overal de Fully Qualified Name `\classes\Student` moeten schrijven.

</div>
</div>

---

## 9. Constructors & Geen Overloading (`Teacher`)

Een constructor initialiseert een object bij aanmaak via het `new` sleutelwoord:

<div class="grid-2">
<div>

```php
namespace classes\employees;

class Teacher 
{
    private string $name;
    private string $gender;

    // Geparametriseerde constructor
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

#### Geen Overloading in PHP

In tegenstelling tot Java ondersteunt PHP **geen meerdere constructors** met verschillende parameterlijsten!

**De oplossing:** Geef parameters default waarden (`= ''`). Hierdoor zijn zowel `new Teacher('Jan', 'M')` als `new Teacher()` perfect geldig met dezelfde constructor.

</div>
</div>

---

## 9. Method Chaining (`Number`)

Method chaining stelt ons in staat om meerdere bewerkingen achter elkaar op hetzelfde object uit te voeren:

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
        return $this; // Retourneert het object!
    }

    public function multiply(float|int $y): Number {
        $this->x *= $y;
        return $this; // Maakt de methode chainable
    }
}
```

</div>
<div>

<div class="card">

#### Fluent Interface in Actie

```php
$number = new Number(10);
$number->add(90)->multiply(3); 
// (10 + 90) * 3 = 300
```

Doordat elke methode `return $this;` oplevert, kan de volgende methode direct worden aangeroepen op het resultaat.

</div>

</div>
</div>

---

## 9. Statische Methoden & Eigenschappen (`Drawer`)

Statische leden behoren toe aan de klasse zelf, niet aan een individuele instantie:

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

- Aanroepen zonder `new`: `Drawer::circle(150)`
- Binnen de klasse verwijst **`self::`** naar statische leden
- **`$this` bestaat niet** in statische context!

</div>
<div class="card" style="margin-top: 15px;">

#### Klassenconstanten (`const`)

- Gedeclareerd in `UPPERCASE`: `const PI = 3.14;`
- Benaderen via `self::PI` of `Drawer::PI`
- Onveranderlijk na declaratie

</div>

</div>
</div>

---

## 9. Statische Methoden in de Praktijk: De Link naar Laravel

In Laravel zul je dagelijks fluent method chaining en statische aanroepen combineren:

<div class="grid-2">
<div class="card card-cyan">

#### Statische Helpers in Laravel

- **Datums & Tijd (Carbon):**
  `Carbon\Carbon::now()->addDays(7);`
- **String manipulatie:**
  `Str::upper('thomas more');`
- **Array operaties:**
  `Arr::first($records);`

</div>
<div class="card card-accent">

#### Query Builder & Database

```php
// Statische start + fluent chaining:
$records = DB::table('records')
    ->where('genre_id', 1)
    ->orderBy('title')
    ->get();
```

`DB::table()` initialiseert de builder, waarna chaining (`->where()->get()`) volgt.

</div>
</div>

<div class="card">

#### Ontwerprichtlijn

Gebruik statische methoden voor pure utilities die geen instantie-state nodig hebben, en instantie-methoden zodra een object zijn eigen unieke toestand moet bewaren.

</div>

---

## Samenvatting: Jouw Fundering voor Laravel 13

Je hebt nu de essentiële bouwstenen van modern PHP 8.5 onder de knie:

<div class="grid-2">
<div class="card">

#### Wat we hebben gezien

- **Syntaxis:** `$`, strings, heredoc en datatypes
- **Operatoren:** `===`, ternary en de `??` operator
- **Structuren:** `match`, loops en array-structuren
- **Functies:** Type hinting, nullable types (`?type`) en `fn`
- **Formulieren:** `$_GET`, `$_POST` en single page processing
- **OOP:** Klassen, encapsulation, chaining en static methods

</div>
<div class="card card-cyan">

#### Volgende Stappen

- Oefen met de bestanden in het **`learn_php8`** project
- Test de interactieve formulieren en OOP in Herd
- Volgende modules: **Tailwind CSS v4**, **Alpine.js** en het **Laravel 13 Vinyl Shop Project**!

<div class="meta-box" style="margin-top: 14px; padding: 10px 14px;">
  <strong>Vragen?</strong> Spreek je lectoren aan of raadpleeg <a href="https://itf-webdev.netlify.app/php/">itf-webdev.netlify.app</a>.
</div>

</div>
</div>
