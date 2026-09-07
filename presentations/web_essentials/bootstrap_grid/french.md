---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Grille Bootstrap 5.3.8'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# Système de Grille Bootstrap 5.3.8

<p class="subtitle">&lt;Construire des mises en page responsives avec 12 colonnes /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - Informatique Appliquée (ITF)<br>
  <strong>Cours :</strong> Web Essentials | <strong>Module :</strong> Bootstrap Layout
</div>

---

## Table des matières

1. **Qu'est-ce que Bootstrap 5.3.8 ?** - Introduction et configuration modulaire
2. **Pourquoi Reboot ?** - Normalisation CSS et box-sizing
3. **Différence .css vs .min.css** - Développement versus production
4. **Les trois éléments de base** - Container, Row, Colonnes
5. **Breakpoints** - Points de rupture responsives
6. **Containers** - Types et largeurs de conteneurs
7. **Le modèle à 12 colonnes** - Comment structurer la page
8. **Classes responsives** - `col-sm-`, `col-md-`, `col-lg-`
9. **Auto-layout** - Largeur automatique des colonnes
10. **Différence .col vs .col-auto** - Partage d'espace versus contenu
11. **Imbrication de colonnes** - Sous-grilles (Nesting)
12. **Gutters** - Espacement entre colonnes
13. **Offset et Order** - Décalage et réorganisation
14. **Exemple pratique & Erreurs fréquentes** - Layout portfolio et bonnes pratiques

---

## Qu'est-ce que Bootstrap 5.3.8 ?

Bootstrap est un **framework CSS open-source** populaire pour créer des sites web responsives et orientés mobile-first.

<div class="grid-2">
<div class="card card-accent">

#### Pourquoi Bootstrap en Web Essentials ?

- Évite de construire une grille complexe et des media queries à partir de zéro
- Totalement **responsive** et fiable sur toutes les tailles d'écran
- Standard de l'industrie pour des mises en page structurées et rapides
- **Semestre 1 :** Focus **uniquement** sur la mise en page et la grille à 12 colonnes
- **Semestre 2 :** Les composants d'interface (modales, navbar, boutons) suivront plus tard

</div>
<div class="card card-cyan">

#### Installation CDN modulaire (v5.3.8)

Chargez **uniquement** reboot et la grille dans votre balise `<head>` :

```html
<!-- 1. Reset et base de normalisation -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-reboot.min.css">

<!-- 2. Système de grille flexbox à 12 colonnes -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-grid.min.css">
```

> **Important :** Au Semestre 1, ne chargez **pas** le fichier complet `bootstrap.min.css`. Les fichiers modulaires gardent votre code léger et pédagogiquement clair !

</div>
</div>

---

## Pourquoi ajouter `bootstrap-reboot` ?

Chaque navigateur (Chrome, Firefox, Safari, Edge) applique ses propres marges et dimensions par défaut. **Reboot** établit une ligne de départ universelle.

<div class="grid-2">
<div class="card card-accent">

#### Qu'est-ce que Reboot et que fait-il ?

- Une version évoluée du **CSS reset** (bâtie sur Normalize.css)
- Supprime les incohérences entre navigateurs (*styles user-agent*)
- Fournit une base stable et prévisible pour la grille
- **Typographie de référence :** `line-height: 1.5` et polices système modernes
- **Normalisation des balises :** `table` (`border-collapse`), formulaires et liens

</div>
<div class="card card-cyan">

#### Crucial pour la Grille

- **`box-sizing: border-box`** sur tous les éléments :
  - Padding et bordures sont inclus **dans** la largeur calculée
  - Indispensable pour éviter que les colonnes ne sautent ou ne débordent !
- **Marges cohérentes :**
  - `margin-top: 0` sur `h1`-`h6`, `p` et listes évite l'effondrement imprévu des marges
  - `margin-bottom` prévisible construite avec des unités `rem`

</div>
</div>

---

## Différence : `xxx.css` vs `xxx.min.css`

Bootstrap propose deux variantes de chaque feuille de style. Elles contiennent **exactement les mêmes règles CSS**, mais diffèrent par leur format et leur taille :

<div class="grid-2">
<div class="card">

#### `xxx.css` (Version développement)

- **Format lisible :** avec espaces, tabulations, retours à la ligne et commentaires
- **Objectif :** Étudier les règles CSS de Bootstrap et déboguer localement
- **Inconvénient :** Fichier nettement plus lourd (surcoût réseau)

```css
/* Exemple dans bootstrap-grid.css */
.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}
```

</div>
<div class="card card-accent">

#### `xxx.min.css` (Version production)

- **Minifié :** Tous les espaces, retours à la ligne et commentaires sont supprimés
- **Objectif :** Environnements de production et sites en ligne (ex: via CDN)
- **Avantage :** **60% à 80% plus léger** en taille de fichier

```css
/* Même règle dans bootstrap-grid.min.css */
.row-cols-auto>*{flex:0 0 auto;width:auto;}
```

> **Conclusion :** Utilisez toujours la variante `.min.css` dans vos projets web pour des temps de chargement réduits et des performances optimales !

</div>
</div>

---

## Les trois éléments de base

La grille Bootstrap fonctionne toujours avec **trois éléments imbriqués** dans cet ordre fixe :

<div class="card card-glass">

#### Hiérarchie de la Grille

- **`.container`** - Fournit des marges latérales et centre le contenu horizontalement
- **`.row`** - Conteneur pour les colonnes ; applique des marges négatives pour neutraliser les gutters
- **`.col` ou `.col-*`** - Les colonnes contenant le contenu (enfants directs de `.row`)

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

> **Règle d'or :** Ne placez jamais une `.col` directement dans un `.container`. Les colonnes doivent obligatoirement se trouver dans une `.row` !

---

## Breakpoints - Points de rupture responsives

Bootstrap 5.3.8 propose **6 breakpoints** basés sur des largeurs d'écran minimales :

<div class="grid-2">
<div>

| Nom | Préfixe | Largeur min. | Appareil type |
| :--- | :---: | :---: | :--- |
| Extra small | *(aucun)* | < 576px | Petits smartphones (portrait) |
| **Small** | `sm` | 576px | Smartphones (paysage) |
| **Medium** | `md` | 768px | Tablettes |
| **Large** | `lg` | 992px | Laptops / petits écrans |
| **Extra large** | `xl` | 1200px | Ordinateurs de bureau |
| **XXL** | `xxl` | 1400px | Grands écrans panoramiques |

</div>
<div>

> **Mobile-first :**
>
> - Les styles Bootstrap s'adaptent du plus petit vers le plus grand écran.
> - Une classe sans préfixe s'applique à tous les écrans.
> - Une classe avec préfixe s'applique à partir de ce breakpoint **et au-delà**.

</div>
</div>

---

## Containers

Les conteneurs sont l'enveloppe extérieure de chaque mise en page :

<div class="grid-3">
<div class="card card-accent">

#### `.container`

Largeur maximale fixe par breakpoint. Centré automatiquement avec marges latérales.

```html
<div class="container">
  ...
</div>
```

</div>
<div class="card card-cyan">

#### `.container-fluid`

Occupe toujours 100% de la largeur totale de la fenêtre (*viewport*).

```html
<div class="container-fluid">
  ...
</div>
```

</div>
<div class="card">

#### `.container-{bp}`

100% de large jusqu'au breakpoint défini, puis adopte une largeur maximale fixe.

```html
<div class="container-md">
  ...
</div>
```

</div>
</div>

---

## Le modèle à 12 colonnes

Une ligne Bootstrap est divisée en **12 unités de colonnes égales**. Vous déterminez la part de chaque bloc :

<div class="card card-glass">

#### Répartition des 12 unités

- `col-12` = 12/12 = **100%** de largeur (ligne complète)
- `col-6` + `col-6` = 6/12 + 6/12 = deux colonnes de **50%**
- `col-4` + `col-4` + `col-4` = trois colonnes de **33.3%**
- `col-8` + `col-4` = contenu principal de **66.7%** + barre latérale de **33.3%**

</div>

> **Règle générale :** Les chiffres des colonnes au sein d'une `.row` doivent totaliser **12**. Si le total dépasse 12, les colonnes suivantes passent automatiquement à la ligne.

---

## Syntaxe de base de la Grille

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- 4 sur 12 = 33% de large -->
    <div class="col-4">Barre latérale</div>

    <!-- 8 sur 12 = 67% de large -->
    <div class="col-8">Contenu principal</div>

  </div>
  <div class="row">

    <!-- 3 colonnes égales : 4+4+4 -->
    <div class="col-4">Carte 1</div>
    <div class="col-4">Carte 2</div>
    <div class="col-4">Carte 3</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
<span class="badge" style="font-size: 0.72rem; padding: 2px 8px;">.container</span>
<span style="font-size: 0.72rem; color: #8b949e;">centré avec padding</span>
</div>
<!-- Ligne 1: 4 + 8 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; margin-bottom: 10px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(total : 12 colonnes)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">Barre latérale (33%)</div>
</div>
<div style="flex: 8; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.8rem;">.col-8</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">Contenu principal (67%)</div>
</div>
</div>
</div>
<!-- Ligne 2: 4 + 4 + 4 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Carte 1</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Carte 2</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">Carte 3</div>
</div>
</div>
</div>
</div>

</div>
</div>

---

## Classes responsives

Combinez plusieurs classes de breakpoints pour définir **des agencements spécifiques par écran** :

```html
<!-- Téléphone : 100% large | Tablette : 50% large | Laptop : 33.3% large -->
<div class="col-12 col-md-6 col-lg-4">
  Carte de projet
</div>
```

<div class="grid-3">
<div class="card card-accent">

#### Téléphone (`< 768px`)

`col-12`

- Occupe **100%** de la largeur
- Les cartes s'empilent verticalement

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(232, 78, 16, 0.4); display: flex; flex-direction: column; gap: 4px;">
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">Carte 1 (100%)</div>
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">Carte 2 (100%)</div>
</div>

</div>
<div class="card card-cyan">

#### Tablette (`>= 768px`)

`col-md-6`

- Occupe **50%** de la largeur
- 2 cartes côte à côte par ligne

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(0, 156, 171, 0.4); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">C1 (50%)</div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">C2 (50%)</div>
</div>

</div>
<div class="card">

#### Laptop (`>= 992px`)

`col-lg-4`

- Occupe **33.3%** de la largeur
- 3 cartes côte à côte par ligne

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(230, 237, 243, 0.25); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">C1 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">C2 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">C3 (33%)</div>
</div>

</div>
</div>

---

## Colonnes en auto-layout

Utilisez `col` **sans chiffre** pour répartir les colonnes de manière égale :

<div class="grid-2">
<div class="card card-accent">

#### Répartition égale

```html
<div class="row">
  <div class="col">Colonne 1</div>
  <div class="col">Colonne 2</div>
  <div class="col">Colonne 3</div>
</div>
```

Chaque `.col` reçoit automatiquement exactement **1/3** de la largeur libre.

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
</div>

</div>
<div class="card card-cyan">

#### Largeur fixe + Auto

```html
<div class="row">
  <div class="col">Reste auto</div>
  <div class="col-6">Fixe 50%</div>
  <div class="col">Reste auto</div>
</div>
```

Les deux `.col` se partagent équitablement les 50% restants (25% chacune).

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
  <div style="flex: 2; background: rgba(232, 78, 16, 0.25); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col-6</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">50%</div>
  </div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
</div>

</div>
</div>

> `col-auto` adapte la largeur de la colonne à son **contenu naturel** (`fit-content`). Voir la slide suivante pour une comparaison détaillée !

---

## Différence : `.col` versus `.col-auto`

Comment les colonnes automatiques déterminent-elles leur taille dans une `.row` ?

<div class="grid-2">
<div>

<div class="card card-accent" style="margin-bottom: 12px; padding: 12px;">

#### `.col` &rarr; Partage d'espace

- Occupe tout **l'espace libre disponible** (`flex-grow: 1`)
- Plusieurs `.col` se partagent cet espace **à parts égales**, quelle que soit la longueur du texte

</div>

<div class="card card-cyan" style="padding: 12px;">

#### `.col-auto` &rarr; Selon le contenu

- Épouse exactement la largeur de son **contenu propre** (`fit-content`, `flex: 0 0 auto`)
- Idéal pour les éléments compacts comme badges, boutons, avatars ou icônes

</div>

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<!-- Exemple 1: .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-accent-light); margin-bottom: 6px; font-family: var(--font-code);">Avec .col (partage équitable) :</div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">Court (50%)</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">Texte long (50%)</div>
    </div>
  </div>
</div>

<!-- Exemple 2: .col-auto combiné à .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">En pratique : .col-auto + .col + .col-auto :</div>
  <div style="display: flex; gap: 6px; align-items: center;">
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">[ Badge ]</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col (reste)</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">Titre de l'article...</div>
    </div>
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">&lt;Bouton&gt;</div>
    </div>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <strong>Combinaison gagnante :</strong> Utilisez <code>.col-auto</code> pour des éléments de largeur fixe et <code>.col</code> pour occuper fluidement l'espace restant.
</div>

</div>
</div>

---

## Imbrication de colonnes (Nesting)

Vous pouvez démarrer une **nouvelle sous-grille dans une colonne** en plaçant une nouvelle `.row` :

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- Colonne principale : 8 sur 12 -->
    <div class="col-8">
      <h2>Section principale</h2>

      <!-- Ligne interne : 12 unités ! -->
      <div class="row">
        <div class="col-6">Gauche (50%)</div>
        <div class="col-6">Droite (50%)</div>
      </div>
    </div>

    <!-- Barre latérale : 4 sur 12 -->
    <div class="col-4">Barre latérale</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(0, 156, 171, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">Ligne extérieure .row &nbsp;<span style="color: #8b949e;">(total : 12 colonnes)</span></div>
<div style="display: flex; gap: 8px;">
<!-- Colonne principale col-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.9); border: 2px solid var(--color-accent); border-radius: 6px; padding: 8px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
<span style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-8 (Section principale)</span>
<span style="font-size: 0.65rem; color: #8b949e;">67% de la ligne ext.</span>
</div>
<!-- Ligne interne -->
<div style="border: 1px dashed rgba(0, 156, 171, 0.6); border-radius: 4px; padding: 6px; background: rgba(15, 20, 28, 0.7);">
<div style="font-size: 0.68rem; color: var(--color-secondary); margin-bottom: 4px; font-family: var(--font-code);">Ligne interne .row &nbsp;<span style="color: #8b949e;">(12 unités à nouveau !)</span></div>
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% de col-8</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% de col-8</div>
</div>
</div>
</div>
</div>
<!-- Barre latérale col-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 4px;">Barre latérale</div>
<div style="font-size: 0.65rem; color: #8b949e; margin-top: 2px;">33% de la ligne ext.</div>
</div>
</div>
</div>
</div>

<div style="font-size: 0.7rem; color: #8b949e; margin-top: 4px; line-height: 1.4;">
<strong>Concept clé :</strong> Une <code>.row</code> imbriquée réinitialise les 12 colonnes au sein de son parent direct (<code>.col-8</code>).
</div>

</div>
</div>

---

## Gutters - Espacement entre colonnes

Les gutters contrôlent **l'espacement** (padding) horizontal et vertical entre colonnes :

<div class="grid-2">
<div>

| Classe | Application |
| :--- | :--- |
| `g-0` à `g-5` | Espacement horizontal et vertical |
| `gx-0` à `gx-5` | Espacement horizontal uniquement (axe X) |
| `gy-0` à `gy-5` | Espacement vertical uniquement (axe Y) |

```html
<!-- gx-4 : grand espace en X | gy-2 : espace compact en Y -->
<div class="row gx-4 gy-2">
  <div class="col-6">Carte A</div>
  <div class="col-6">Carte B</div>
  <div class="col-6">Carte C</div>
  <div class="col-6">Carte D</div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px;">

<div style="border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">Visuel : .row.gx-4.gy-2</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; row-gap: 8px;">
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Carte A</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Carte B</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Carte C</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">Carte D</span>
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.66rem;">
    <span style="color: var(--color-secondary); font-family: var(--font-code);">&harr; gx-4 (écart horizontal)</span>
    <span style="color: var(--color-accent-light); font-family: var(--font-code);">&varr; gy-2 (écart vertical)</span>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <code>g-0</code> supprime tout espacement (idéal pour des galeries photo continues).
</div>

</div>
</div>

---

## Offset - Décalage de colonnes

Utilisez `offset-{bp}-{n}` pour décaler une colonne vers la droite grâce à des unités vides :

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- Centré : 4 vides + 4 + 4 vides = 12 -->
  <div class="col-4 offset-4">
    Bloc centré
  </div>
</div>

<div class="row">
  <div class="col-md-4">Bloc gauche</div>
  <!-- Saute 4 colonnes -->
  <div class="col-md-4 offset-md-4">Bloc droit</div>
</div>
```

> Idéal pour centrer des formulaires de connexion, des modales ou des galeries asymétriques.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Ligne 1: col-4 offset-4 &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 vides</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Centré</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">(reste: 4)</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 vides</div>
    </div>
  </div>
</div>

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">Ligne 2: col-md-4 + offset-md-4</div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Gauche</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-md-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 sautées</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">Droite</div>
    </div>
  </div>
</div>

</div>
</div>

---

## Order - Réorganisation visuelle

Utilisez `order-{bp}-{n}` pour modifier **l'ordre visuel** sans toucher à la structure HTML :

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- Mobile : bas | Desktop : gauche -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>À propos</h2>
    <p>Texte à gauche de la photo.</p>
  </div>

  <!-- Mobile : haut | Desktop : droite -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="photo.webp" alt="Profil">
  </div>
</div>
```

> Parfait pour le **mobile-first** : affichez d'abord la photo sur smartphone et le texte en-dessous, tout en conservant le texte à gauche sur ordinateur.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 1px solid rgba(232, 78, 16, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">Mobile (&lt; 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">Empilé</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div style="background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-1: Photo (en haut)</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-2: Texte (en bas)</span>
    </div>
  </div>
</div>

<div style="border: 1px solid rgba(0, 156, 171, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge badge-cyan" style="font-size: 0.68rem; padding: 1px 6px;">Desktop (&gt;= 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">Côte à côte</span>
  </div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 8; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-md-1: Texte (8 cols)</span>
    </div>
    <div style="flex: 4; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-md-2: Photo (4 cols)</span>
    </div>
  </div>
</div>

</div>
</div>

---

## Exemple pratique : Layout Portfolio

<div class="grid-2">
<div>

```html
<div class="container">
  <!-- Navigation: 100% -->
  <div class="row">
    <div class="col-12"><nav>Portfolio</nav></div>
  </div>

  <!-- Section principale + Barre latérale -->
  <div class="row gy-4">
    <div class="col-12 col-lg-8">
      <h2>Projets</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">P1</div>
        <div class="col-12 col-md-6 col-xl-4">P2</div>
        <div class="col-12 col-md-6 col-xl-4">P3</div>
      </div>
    </div>

    <div class="col-12 col-lg-4">
      <aside>À propos & Contact</aside>
    </div>
  </div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
<span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">.container</span>
<span style="font-size: 0.65rem; color: #8b949e;">Aperçu wireframe desktop</span>
</div>
<!-- Navigation -->
<div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 5px 8px; margin-bottom: 8px; font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">
.col-12: &lt;nav&gt; Portfolio
</div>
<!-- Body row -->
<div style="display: flex; gap: 8px;">
<!-- Projets col-lg-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.8); border: 1px solid var(--color-secondary); border-radius: 6px; padding: 8px;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-secondary); font-family: var(--font-code); margin-bottom: 6px;">
.col-12.col-lg-8 (Projets)
</div>
<!-- Cartes de projets imbriquées -->
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P1</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P2</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P3</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
</div>
</div>
<!-- Aside col-lg-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col-12.col-lg-4</div>
<div style="font-size: 0.68rem; color: var(--color-foreground); margin-top: 4px;">À propos & Contact</div>
</div>
</div>
</div>

</div>
</div>

---

## Erreurs fréquentes

<div class="grid-2">
<div class="card card-accent">

#### Pièges à éviter

- `.col` placée directement dans un `.container` (sans `.row`)
- Oublier que les classes de breakpoints s'appliquent vers le **haut** (`col-md-6` s'applique aussi à `lg`, `xl` et `xxl`)
- Colonnes dans une ligne qui ne totalisent pas 12 par inadvertance
- Ajouter des marges directement à une `.row`, ce qui casse l'alignement

</div>
<div class="card card-cyan">

#### Structure correcte

```html
<!-- CORRECT : container -> row -> col -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">...</div>
    <div class="col-12 col-md-6">...</div>
  </div>
</div>
```

</div>
</div>

> **Conseil :** Utilisez les **DevTools du navigateur** (F12) pour inspecter visuellement les grilles flexbox et le calcul des largeurs de colonnes.

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Résumé

<p class="subtitle">&lt;Grille Bootstrap 5.3.8 - Points clés /&gt;</p>

<div class="meta-box">
  - <strong>Hiérarchie :</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 colonnes :</strong> toujours répartir 12 unités par ligne<br>
  - <strong>Mobile-first :</strong> concevoir du petit (<code>col-12</code>) vers le grand (<code>col-lg-4</code>)<br>
  - <strong>Utilitaires :</strong> <code>g-*</code> (espacements), <code>offset-*</code> (décalages), <code>order-*</code> (ordre visuel)
</div>
