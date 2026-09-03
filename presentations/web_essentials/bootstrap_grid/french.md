---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Bootstrap 5.3 Grid'
footer: 'Web Essentials - Haute École Thomas More'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# Système de Grille Bootstrap 5.3

<p class="subtitle">&lt;Créer des mises en page responsives sur 12 colonnes /&gt;</p>

<div class="meta-box">
  <strong>Haute École Thomas More</strong> - Informatique Appliquée (ITF)<br>
  <strong>Cours:</strong> Web Essentials | <strong>Module:</strong> Bootstrap Layout
</div>

---

## Sommaire

1. **Qu'est-ce que Bootstrap?** - Introduction et objectifs
2. **Les trois blocs fondamentaux** - Conteneur, Ligne, Colonnes
3. **Points d'arrêt (Breakpoints)** - Seuils responsives
4. **Conteneurs** - Types et comportements
5. **Le modèle à 12 colonnes** - Comment subdiviser la page
6. **Classes responsives** - `col-sm-`, `col-md-`, `col-lg-`
7. **Disposition automatique (Auto-layout)** - Largeur automatique
8. **Imbrication de colonnes** - Nesting
9. **Gouttières (Gutters)** - Espacements entre colonnes
10. **Décalage (Offset) et Ordre (Order)** - Positionnement et agencement
11. **Exemple pratique** - Mise en page d'un portfolio
12. **Erreurs fréquentes** - Pièges à éviter

---

## Qu'est-ce que Bootstrap 5.3?

Bootstrap est un **framework CSS open-source** fournissant des styles prêts à l'emploi et des composants pour concevoir des sites web responsives.

<div class="grid-2">
<div class="card card-accent">

#### Pourquoi utiliser Bootstrap?

- Inutile d'écrire tout le CSS de zéro
- Automatiquement **responsive** (adapté à tous les écrans)
- Cohérent et très bien documenté
- Largement utilisé dans l'industrie

</div>
<div class="card card-cyan">

#### Installation via CDN

```html
<!-- Dans la balise <head> -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```

Ou via npm:
```bash
npm install bootstrap@5.3
```

</div>
</div>

---

## Les trois blocs fondamentaux

La grille Bootstrap repose toujours sur **trois éléments imbriqués** dans cet ordre précis:

<div class="card card-glass">

#### Hiérarchie de la Grille

- **`.container`** - Centre le contenu horizontalement et ajoute des marges latérales
- **`.row`** - Conteneur pour les colonnes; applique des marges négatives pour compenser les gouttières
- **`.col` ou `.col-*`** - Enfants directs de `.row` contenant le contenu réel

</div>

```html
<div class="container">
  <div class="row">
    <div class="col">Colonne 1</div>
    <div class="col">Colonne 2</div>
    <div class="col">Colonne 3</div>
  </div>
</div>
```

> **Règle essentielle:** Ne placez jamais une classe `.col` directement dans un `.container`. Les colonnes doivent obligatoirement être contenues dans une `.row`!

---

## Points d'arrêt (Breakpoints)

Bootstrap 5.3 propose **6 points d'arrêt** basés sur les largeurs minimales d'écran:

| Nom | Infixe | Largeur min. | Appareil type |
| :--- | :---: | :---: | :--- |
| Extra small | *(aucun)* | < 576px | Petits smartphones (portrait) |
| **Small** | `sm` | 576px | Smartphones (paysage) |
| **Medium** | `md` | 768px | Tablettes |
| **Large** | `lg` | 992px | Ordinateurs portables |
| **Extra large** | `xl` | 1200px | Écrans de bureau standards |
| **XXL** | `xxl` | 1400px | Grands écrans larges |

> **Approche Mobile-first:** Les styles Bootstrap s'appliquent vers le haut. Une classe sans infixe vaut pour tous les écrans; une classe avec infixe s'applique à partir de ce seuil **et plus large**.

---

## Conteneurs

Les conteneurs forment la structure englobante extérieure de votre layout:

<div class="grid-3">
<div class="card card-accent">

#### `.container`

Largeur maximale fixe par point d'arrêt. Centré automatiquement avec marges.

```html
<div class="container">
  ...
</div>
```

</div>
<div class="card card-cyan">

#### `.container-fluid`

Toujours 100% de large, couvrant l'intégralité de la largeur de la fenêtre.

```html
<div class="container-fluid">
  ...
</div>
```

</div>
<div class="card">

#### `.container-{bp}`

100% de large jusqu'au point d'arrêt spécifié, puis largeur fixe.

```html
<div class="container-md">
  ...
</div>
```

</div>
</div>

---

## Le modèle à 12 colonnes

Chaque ligne Bootstrap est divisée en **12 colonnes égales**. Vous déterminez le nombre d'unités occupées par chaque élément:

<div class="card card-glass">

#### Répartition sur 12 unités

- `col-12` = 12/12 = **100%** de la largeur (toute la ligne)
- `col-6` + `col-6` = 6/12 + 6/12 = deux colonnes de **50%**
- `col-4` + `col-4` + `col-4` = trois colonnes de **33.3%**
- `col-8` + `col-4` = contenu principal de **66.7%** + barre latérale de **33.3%**

</div>

> **Règle d'or:** La somme des unités dans une `.row` doit être égale à **12**. Si le total dépasse 12, les colonnes excédentaires passent automatiquement à la ligne suivante.

---

## Syntaxe de base de la grille

```html
<div class="container">
  <div class="row">

    <!-- 4 colonnes sur 12 = 33% de largeur -->
    <div class="col-4">Barre latérale</div>

    <!-- 8 colonnes sur 12 = 67% de largeur -->
    <div class="col-8">Contenu principal</div>

  </div>
  <div class="row">

    <!-- Trois colonnes égales: 4 + 4 + 4 = 12 -->
    <div class="col-4">Carte 1</div>
    <div class="col-4">Carte 2</div>
    <div class="col-4">Carte 3</div>

  </div>
</div>
```

---

## Classes responsives

Combinez plusieurs classes de points d'arrêt pour créer des **mises en page adaptées à chaque taille d'écran**:

```html
<!-- Mobile: 100% de large | Tablette: 50% | Ordinateur: 33.3% -->
<div class="col-12 col-md-6 col-lg-4">
  Carte de projet
</div>
```

<div class="grid-3">
<div class="card card-accent">

#### Mobile (`< 768px`)
`col-12`
- Occupe **100%** de la largeur
- Les cartes s'empilent verticalement

</div>
<div class="card card-cyan">

#### Tablette (`>= 768px`)
`col-md-6`
- Occupe **50%** de la largeur
- 2 cartes côte à côte par ligne

</div>
<div class="card">

#### Ordinateur (`>= 992px`)
`col-lg-4`
- Occupe **33.3%** de la largeur
- 3 cartes côte à côte par ligne

</div>
</div>

---

## Disposition automatique (Auto-layout)

Utilisez la classe `col` **sans chiffre** pour répartir l'espace disponible de manière égale:

<div class="grid-2">
<div class="card card-accent">

#### Distribution égale

```html
<div class="row">
  <div class="col">Colonne 1</div>
  <div class="col">Colonne 2</div>
  <div class="col">Colonne 3</div>
</div>
```

Chaque `.col` reçoit automatiquement exactement **1/3** de la largeur disponible.

</div>
<div class="card card-cyan">

#### Largeur fixe + Auto

```html
<div class="row">
  <div class="col">Auto reste</div>
  <div class="col-6">Fixe 50%</div>
  <div class="col">Auto reste</div>
</div>
```

Les deux éléments `.col` se partagent équitablement les 50% restants (25% chacun).

</div>
</div>

> `col-auto` adapte la largeur de la colonne en fonction de la taille naturelle de son **propre contenu** (`fit-content`).

---

## Imbrication de colonnes (Nesting)

Vous pouvez démarrer une **nouvelle sous-grille** à l'intérieur d'une colonne en ajoutant une autre `.row`:

```html
<div class="container">
  <div class="row">

    <!-- Colonne principale: 8 colonnes sur 12 -->
    <div class="col-8">
      <h2>Section Principale</h2>

      <!-- Ligne imbriquée: offre à nouveau 12 unités dans col-8 -->
      <div class="row">
        <div class="col-6">Bloc gauche imbriqué (50%)</div>
        <div class="col-6">Bloc droit imbriqué (50%)</div>
      </div>
    </div>

    <!-- Barre latérale: 4 colonnes sur 12 -->
    <div class="col-4">Barre latérale</div>

  </div>
</div>
```

---

## Gouttières (Gutters)

Les gouttières contrôlent les **espacements internes** (padding) entre les colonnes:

| Classe | Application |
| :--- | :--- |
| `g-0` à `g-5` | Espacement horizontal et vertical |
| `gx-0` à `gx-5` | Espacement horizontal uniquement (gauche/droite) |
| `gy-0` à `gy-5` | Espacement vertical uniquement (haut/bas) |

```html
<!-- Grande gouttière horizontale, petite gouttière verticale -->
<div class="row gx-4 gy-2">
  <div class="col-6">Carte A</div>
  <div class="col-6">Carte B</div>
  <div class="col-6">Carte C</div>
  <div class="col-6">Carte D</div>
</div>
```

> `g-0` supprime toutes les gouttières (idéal pour des galeries photos bord à bord).

---

## Décalage (Offset)

Utilisez `offset-{bp}-{n}` pour décaler une colonne vers la droite en créant des colonnes vides:

```html
<div class="row">
  <!-- Occupe 4 colonnes, centrée (4 vides + 4 contenu + 4 vides = 12) -->
  <div class="col-4 offset-4">
    Bloc centré
  </div>
</div>

<div class="row">
  <div class="col-md-4">Bloc gauche</div>
  <!-- Ignore 4 unités de colonne sur tablette et écrans plus larges -->
  <div class="col-md-4 offset-md-4">Bloc droit</div>
</div>
```

> Idéal pour des formulaires de connexion centrés, des boîtes modales ou des éléments décalés.

---

## Ordre d'affichage (Order)

Avec `order-{bp}-{n}`, modifiez **l'ordre visuel** des colonnes sans changer la structure HTML:

```html
<div class="row">
  <!-- Mobile: order-2 (en bas) | Desktop: order-md-1 (à gauche) -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>À Propos</h2>
    <p>Sur ordinateur, ce texte apparaît à gauche de l'image.</p>
  </div>

  <!-- Mobile: order-1 (en haut) | Desktop: order-md-2 (à droite) -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="photo.webp" alt="Photo de profil">
  </div>
</div>
```

> Idéal pour le **design mobile-first**: afficher la photo en haut sur smartphone, et à côté du texte sur ordinateur.

---

## Exemple pratique: Mise en page de Portfolio

```html
<div class="container">

  <!-- Navigation: pleine largeur -->
  <div class="row">
    <div class="col-12"><nav>Portfolio de Jef</nav></div>
  </div>

  <!-- Section Principale + Barre latérale -->
  <div class="row gy-4">
    <!-- Mobile: 100% | Desktop: 8 colonnes -->
    <div class="col-12 col-lg-8">
      <h2>Mes Projets</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">Projet 1</div>
        <div class="col-12 col-md-6 col-xl-4">Projet 2</div>
        <div class="col-12 col-md-6 col-xl-4">Projet 3</div>
      </div>
    </div>

    <!-- Mobile: 100% | Desktop: 4 colonnes -->
    <div class="col-12 col-lg-4">
      <aside>À propos & Contact</aside>
    </div>
  </div>

</div>
```

---

## Erreurs fréquentes

<div class="grid-2">
<div class="card card-accent">

#### Pièges à éviter

- Placer `.col` directement dans `.container` (sans `.row`)
- Oublier que les classes de points d'arrêt **s'appliquent vers le haut** (`col-md-6` vaut aussi pour `lg`, `xl` et `xxl`)
- Colonnes dans une ligne dont la somme ne fait pas 12 involontairement
- Ajouter des marges personnalisées sur `.row` ce qui brise l'alignement

</div>
<div class="card card-cyan">

#### Structure recommandée

```html
<!-- CORRECT: container -> row -> col -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">...</div>
    <div class="col-12 col-md-6">...</div>
  </div>
</div>
```

</div>
</div>

> **Astuce:** Utilisez les **Outils de développement (F12)** de votre navigateur pour inspecter visuellement la grille flexbox et les largeurs calculées.

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Résumé

<p class="subtitle">&lt;Grille Bootstrap 5.3 - Points Clés /&gt;</p>

<div class="meta-box">
  - <strong>Hiérarchie:</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 Colonnes:</strong> toujours répartir sur 12 unités par ligne<br>
  - <strong>Mobile-first:</strong> concevoir du petit (<code>col-12</code>) vers le grand (<code>col-lg-4</code>)<br>
  - <strong>Utilitaires:</strong> <code>g-*</code> (gouttières), <code>offset-*</code> (décalage), <code>order-*</code> (ordre)
</div>