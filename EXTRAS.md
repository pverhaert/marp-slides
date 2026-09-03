# EXTRAS: 15 Features ter Verbetering van de Slide Decks

Dit document beschrijft 15 concrete features om de Marp presentaties voor Thomas More Hogeschool (Toegepaste Informatica / ITF) nog gebruiksvriendelijker, interactiever en didactisch sterker te maken voor zowel studenten als docenten.

---

## Overzicht van Features

| Nr | Checkbox | Feature Naam | Moeilijkheidsgraad | Korte Omschrijving |
|---|---|---|---|---|
| 01 | [ ] | Interactieve Zoekfunctie | Gemiddeld | Sneltoets (Ctrl+K of /) om direct op trefwoorden door alle slides te zoeken en direct naar de juiste pagina te springen. |
| 02 | [x] | Presentatie Voortgangsbalk | Laag | Een subtiele horizontale balk bovenaan het scherm die visueel toont hoe ver de student of docent in het deck gevorderd is. |
| 03 | [ ] | Sneltoetsen Help Overlay | Laag | Een pop-up venster met alle Marp sneltoetsen (presentermodus, overzicht, fullscreen, navigatie) op te roepen via toets '?'. |
| 04 | [ ] | Interactieve Code Sandbox | Hoog | Direct HTML, CSS en JavaScript code bewerken en het resultaat live bekijken in een embedded modal venster. |
| 05 | [ ] | Directe PDF en Offline Export Knop | Gemiddeld | Een knop in de controller om het deck met 1 klik te downloaden als printklare PDF of zelfstandig offline HTML bestand. |
| 06 | [x] | Directe Taalwisselaar | Gemiddeld | Een compacte dropdown om direct te wisselen tussen de Nederlandse, Engelse of Franse versie van dezelfde slide. |
| 07 | [ ] | Virtuele Laserpointer en Tekenpen | Gemiddeld | Een virtuele laserpointer of markeerstift waarmee de docent tijdens live lessen belangrijke code of schema's kan omcirkelen. |
| 08 | [ ] | Inklapbare Oplossingen en Spoilers | Laag | Klikbare knoppen die uitwerkingen van oefeningen of quizantwoorden pas tonen nadat studenten zelf hebben nagedacht. |
| 09 | [ ] | Toegankelijkheid en Lettergrootte Regelaar | Laag | Knoppen om het basislettertype te vergroten of een modus met extra hoog contrast in te schakelen voor studenten met visuele noden. |
| 10 | [x] | Inhoudsopgave Zijpaneel | Gemiddeld | Een uitschuifbaar drawer-menu met alle hoofdstukken en sectietitels voor snelle en gestructureerde navigatie. |
| 11 | [ ] | Presentatietimer en Pauzeklok | Gemiddeld | Een configureerbare timer voor docenten om spreektijd te bewaken of een aftellende pauzeklok te tonen in het auditorium. |
| 12 | [ ] | Code Themawisselaar | Laag | Een schakelaar tussen donkere en lichte syntax highlighting voor optimale leesbaarheid op projectoren in fel verlichte lokalen. |
| 13 | [ ] | Hervat Laatst Bekeken Slide | Laag | Onthoudt via localStorage waar de student gebleven was en biedt bij heropenen aan direct terug te keren naar die pagina. |
| 14 | [ ] | QR Code Generator voor Mobiel | Gemiddeld | Genereert een QR code van de huidige slide zodat studenten de inhoud direct op hun eigen laptop of smartphone kunnen openen. |
| 15 | [ ] | In-Slide Zelfevaluatie Quizzen | Hoog | Interactieve meerkeuzevragen direct in de presentatie met onmiddellijke feedback (groen of rood) om voorkennis te testen. |
| 16 | [x] | Instellingen Modal (Dark / Light Mode) | Laag | Een subtiel tandwielicoon linksonder dat een uitbreidbare instellingenmodal opent om direct te schakelen tussen Dark en Light mode. |

---

## Uitgebreide Omschrijving per Feature

### 01. Interactieve Zoekfunctie (Slide Search & Quick Jump)
- **Doel:** Studenten en docenten in staat stellen om razendsnel specifieke termen, syntaxvoorbeelden of functienamen terug te vinden binnen decks van 30 of meer slides.
- **Didactische meerwaarde:** Tijdens het maken van labo-oefeningen willen studenten niet tientallen slides handmatig doorbladeren op zoek naar die ene CSS selector of Livewire directive. Een zoekvenster verhoogt de efficiëntie aanzienlijk.
- **Technische implementatie:** Een JavaScript component in `scripts.js` luistert naar `Ctrl+K`, `Cmd+K` of de slash-toets `/`. Bij activering opent een modal venster met zoekveld. Het script indexeert de tekstinhoud en koppen van alle `<section>` elementen. Bij het typen toont het overeenkomstige slides met een korte contextzin. Een klik of Enter navigeert direct naar het corresponderende paginanummer via de interne Marp hash (`#15`).

---

### 02. Presentatie Voortgangsbalk (Top Progress Bar)
- **Doel:** Een visuele indicator bovenaan het scherm die exact aangeeft hoe ver de presentatie gevorderd is.
- **Didactische meerwaarde:** Geeft studenten tijdens hoorcolleges en zelfstudie een helder tijdsbesef en mentally framework over de resterende lesstof van de sessie.
- **Technische implementatie:** Hoewel Marp een ingebouwde Bespoke progressbar optie heeft, kan een op maat gemaakte balk in `scripts.js` of via CSS variabelen worden geplaatst. De balk krijgt een hoogte van 3px, een zachte Thomas More oranje kleur (`#e84e10`) en schaalt soepel via `width: calc((huidigeSlide - 1) / (totaalSlides - 1) * 100%)`.

---

### 03. Sneltoetsen Help Overlay (Keyboard Shortcuts Modal)
- **Doel:** Een overzichtelijke sneltoetsenlijst tonen wanneer de gebruiker op de toets `?` drukt.
- **Didactische meerwaarde:** Veel handige Marp functies (zoals `f` voor volledig scherm, `o` voor overzichtsgewijs tegeloverzicht en `p` voor presentatormodus met notities) zijn onbekend bij studenten en beginnende docenten.
- **Technische implementatie:** Een lichte CSS glassmorphism overlay met een overzichtelijke tabel van alle sneltoetsen. Sluit met `Escape` of een klik buiten het venster.

---

### 04. Interactieve Code Sandbox (Embedded Code Runners)
- **Doel:** Studenten toestaan om codevoorbeelden uit de slides direct live aan te passen en het resultaat te inspecteren zonder een externe editor te openen.
- **Didactische meerwaarde:** Verlaagt de drempel om te experimenteren. Studenten kunnen direct waarden aanpassen in HTML semantiek, CSS flexbox eigenschappen of JavaScript statements om het effect te zien.
- **Technische implementatie:** Bij codeblokken met een specifieke klasse (bijvoorbeeld `.runnable`) verschijnt een knop "Probeer live". Klikken opent een overlay met een gesplitst venster: links een bewerkbaar tekstveld en rechts een beveiligd `iframe` (`sandbox="allow-scripts"`) dat het resultaat realtime rendert.

---

### 05. Directe PDF en Offline Export Knop
- **Doel:** Studenten een eenvoudige knop bieden om de volledige presentatie lokaal op te slaan voor offline studie of het maken van aantekeningen.
- **Didactische meerwaarde:** Niet alle studenten hebben altijd toegang tot stabiel internet onderweg (bijvoorbeeld op de trein). Een print- en bewaaroptie verhoogt de toegankelijkheid.
- **Technische implementatie:** Een subtiel menu icoontje in de hoek van de slide met opties zoals "Afdrukken / Opslaan als PDF" (roept `window.print()` aan, waarvoor de CSS print styles al geoptimaliseerd zijn) en eventueel een directe link naar de vooraf gecompileerde PDF versie in de map `assets/`.

---

### 06. Directe Taalwisselaar (In-Slide Language Switcher)
- **Doel:** Eenvoudig wisselen tussen de Nederlandse, Engelse en Franse versie van een slide deck met behoud van de actieve slidelocatie.
- **Didactische meerwaarde:** ITF opleidingen kennen meertalige studentengroepen en vakken die in het Engels of Nederlands worden gedoceerd. Als een student een concept in het Engels niet begrijpt, kan met 1 klik dezelfde slide in het Nederlands worden geraadpleegd.
- **Technische implementatie:** Een compact taalkeuzemenu (NL, EN, FR) rechtsboven of in de controller. Wanneer de gebruiker op "EN" klikt terwijl men op slide 12 staat, navigeert de browser direct naar `../english.html#12`.

---

### 07. Virtuele Laserpointer en Tekenpen (Live Annotatie Tool)
- **Doel:** De muiscursor tijdens presentaties transformeren in een oplichtende laserpointer of een interactieve markeerstift.
- **Didactische meerwaarde:** Docenten kunnen tijdens colleges op grote projectieschermen heel gericht de aandacht vestigen op een specifieke regel code of diagramonderdeel.
- **Technische implementatie:** Een canvas layer over de presentatie die geactiveerd wordt met een sneltoets (zoals toets `L` voor laserpointer en `D` voor tekenen). De laserpointer volgt de cursor met een opvallende gloeiende oranje cirkel. Tekeningen kunnen met één toetsdruk (`C` voor clear) weer gewist worden.

---

### 08. Inklapbare Oplossingen en Spoilers (Interactive Solution Reveal)
- **Doel:** Antwoorden op vragen of oplossingen van oefeningen standaard verbergen achter een klikbare interactieve knop.
- **Didactische meerwaarde:** Voorkomt dat studenten passief naar de oplossing kijken voordat ze zelf hebben geprobeerd de vraag te beantwoorden of de code te bedenken.
- **Technische implementatie:** Styling van het standaard HTML `<details>` en `<summary>` element binnen `thomasmore.css`. Voorzien van een stijlvolle knop "Toon uitwerking" met een soepele slide-down animatie en contrasterende kaartachtergrond.

---

### 09. Toegankelijkheid en Lettergrootte Regelaar (A11y Font Scaler & Contrast)
- **Doel:** De mogelijkheid bieden om lettergroottes dynamisch te vergroten en te schakelen naar een extra contrastrijke weergave.
- **Didactische meerwaarde:** Essentieel voor studenten met een visuele functiebeperking en nuttig in auditoria met minder scherpe projectoren of fel invallend zonlicht.
- **Technische implementatie:** Knoppen met `A-` en `A+` in de controller. Het script past via CSS variabelen de root font size aan (`--marpit-root-font-size`), waardoor alle teksten en componenten proportioneel meeschalen zonder layoutbreuk.

---

### 10. Inhoudsopgave Zijpaneel (Slide Outline & Section Drawer)
- **Doel:** Een inklapbaar navigatiepaneel aan de zijkant van het scherm dat een hiërarchisch overzicht geeft van alle hoofdonderwerpen in het deck.
- **Didactische meerwaarde:** Biedt direct overzicht over de structuur van het hoofdstuk en laat studenten gericht navigeren naar deelonderwerpen zonder door alle tussenliggende slides te moeten klikken.
- **Technische implementatie:** Een JavaScript functie leest bij het laden van de pagina alle `<h1>` en `<h2>` tags uit de `<section>` elementen. Deze worden omgezet naar een geordende lijst in een verborgen zijpaneel. Een zwevende menuknop of swipe-gebaar opent de drawer.

---

### 11. Presentatietimer en Pauzeklok (Speaker Timer & Countdown)
- **Doel:** Een discrete klok voor de docent en een paginagrote aftellende pauzeklok voor studenten.
- **Didactische meerwaarde:** Helpt de docent om binnen het lesrooster te blijven. Tijdens lespauzes of groepsoefeningen zien studenten exact hoeveel minuten en seconden er nog over zijn.
- **Technische implementatie:** Een timerfunctie in `scripts.js`. Met sneltoets `T` kan een pauzetijd worden ingesteld (bijvoorbeeld 15 minuten). De slide toont een strakke cirkelvormige timer met Thomas More oranje progressiering die aftelt naar nul.

---

### 12. Code Themawisselaar (Light & Dark Code Theme Toggle)
- **Doel:** De syntax highlighting van codeblokken met 1 klik kunnen schakelen tussen donkere achtergrond (standaard) en lichte achtergrond.
- **Didactische meerwaarde:** In sommige klaslokalen met slechte verduistering zijn donkere codeblokken moeilijk leesbaar op het projectiescherm. Een lichte modus lost dit direct op.
- **Technische implementatie:** Een CSS toggle class (`.code-theme-light`) op de body die de CSS variabelen `--color-code-bg`, `--color-border` en de Highlight.js tokenschaduwen tijdelijk aanpast naar een lichte variant met hoog contrast.

---

### 13. Hervat Laatst Bekeken Slide (Resume Session via LocalStorage)
- **Doel:** Automatisch onthouden welke slide de gebruiker het laatst open had staan.
- **Didactische meerwaarde:** Als een student de browser sluit of per ongeluk herlaadt, hoeft men niet opnieuw handmatig naar bijvoorbeeld slide 24 te zoeken.
- **Technische implementatie:** Bij elke slide-overgang bewaart `scripts.js` het slidenummer in `localStorage.setItem('last_slide_' + pathname, slideIndex)`. Bij het opnieuw openen van de presentatie verschijnt een subtiele toast-notificatie: "Verdergaan bij slide 24? [Ja] [Begin]".

---

### 14. QR Code Generator voor Mobiel Meeloopmodus
- **Doel:** Een QR code projecteren van de actieve presentatie en slide.
- **Didactische meerwaarde:** Studenten die achteraan in een groot auditorium zitten en moeite hebben om code op het projectiescherm te lezen, kunnen de QR code scannen en de presentatie synchroon openen op hun eigen laptop of smartphone.
- **Technische implementatie:** Een lichtgewicht pure SVG QR code generator library in `scripts.js`. Met sneltoets `Q` verschijnt een pop-up met de QR code die direct linkt naar de actieve URL inclusief paginanummer (bijvoorbeeld `https://.../livewire/dutch.html#18`).

---

### 15. In-Slide Zelfevaluatie Quizzen (Interactive Checkpoints)
- **Doel:** Korte interactieve controlevragen integreren tussen grote theorieblokken door.
- **Didactische meerwaarde:** Actief leren stimuleren. Door na een kernconcept direct een vraag te stellen (bijvoorbeeld: "Welk selector heeft de hoogste specificiteit?"), kunnen studenten meteen toetsen of ze de stof hebben begrepen vooraleer verder te gaan.
- **Technische implementatie:** Speciale HTML data attributen op knoppen binnen een kaartcomponent:
  ```html
  <div class="card quiz-box">
    <h4>Kennischeck: CSS Grid</h4>
    <p>Welke property definieert het aantal kolommen?</p>
    <button class="quiz-btn" data-correct="false">grid-template-rows</button>
    <button class="quiz-btn" data-correct="true">grid-template-columns</button>
    <button class="quiz-btn" data-correct="false">grid-column-gap</button>
  </div>
  ```
  Een compact script kleurt de aangeklikte knop direct groen bij een juist antwoord of rood bij een fout antwoord met een korte toelichting.

---

### 16. Instellingen Modal (Dark & Light Mode Toggle)
- **Doel:** Een niet-storend instellingenicoon linksonder dat een uitbreidbare instellingenmodal opent om te schakelen tussen de donkere standaardweergave en een lichte weergave met hoog contrast.
- **Didactische meerwaarde:** Geeft docenten en studenten de vrijheid om de weergave direct aan te passen aan de omgeving. In een verduisterde zaal of thuis is Dark Mode prettig voor de ogen; in een lokaal met fel binnenvallend zonlicht of een zwakkere projector zorgt Light Mode voor maximale leesbaarheid van tekst en code.
- **Technische implementatie:** 
  - Een zwevend tandwielicoon linksonder dat in rust subtiel transparant is (`opacity: 0.15`) en bij hover oplicht in Thomas More oranje.
  - Een frosted glass dialoogvenster (`backdrop-filter: blur(8px)`) met schakelknoppen voor Donker en Licht.
  - Het script bewaart de voorkeur in `localStorage.getItem('marp_theme_mode')` en activeert de klasse `body.theme-light`.
  - In `thomasmore.css` herschrijft `body.theme-light section` de centrale kleurvariabelen (`--color-background`, `--color-foreground`, `--color-code-bg`, etc.) zodat alle slides, codeblokken, tabellen en kaarten direct omschakelen naar een strakke, heldere lichte stijl.
  - Toetsenbordvriendelijk (sluit met `Escape`) en modulair opgezet om later eenvoudig extra opties aan toe te voegen.

