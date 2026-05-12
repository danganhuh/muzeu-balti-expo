# Bălți: Vitrina Timpului — funcționalități și plan de proiect

Document public: descrierea aplicației, funcționalitățile planificate, arhitectura informațională și planul de realizare. Aplicația este o expoziție interactivă gamificată, **exclusiv client-side**, destinată vizitatorilor tineri ai unui muzeu (inclusiv utilizare pe ecran tactil și pe telefon).

---

## 1. Rezumat proiect

| | |
|--|--|
| **Denumire** | Bălți: Vitrina Timpului |
| **Scop** | Oferirea unei experiențe educative imersive despre istoria locală și regională (Bălți / Moldova), sub formă de parcurs interactiv, nu o simplă listă administrativă de date. |
| **Public** | Copii și elevi; utilizare în muzeu (kiosk / TV tactil) și acasă (telefon, eventual după scanarea unui cod QR). |
| **Limbi** | Română, rusă, engleză (interfață și conținut, structurat prin i18n). |

---

## 2. Obiective de experiență (UX)

- Parcurs clar: de la „început” la săli, exponate, activități și recompense vizibile.
- Misiuni scurte (aprox. 2–4 minute), feedback imediat după acțiuni.
- Ton prietenos, accesibil, cu respect pentru rigoarea informației istorice.
- Suport pentru **temă deschisă / întunecată** și pentru **ecrane mari tactile** (ținte de atingere generoase, fără dependență exclusivă de hover).

---

## 3. Funcționalități principale

### 3.1. Explorer — săli, exponate, personaje

- Navigare pe **săli tematice**; în fiecare sală, **carduri de exponate** (scroll orizontal, tip carusel).
- **Filtrare** după epocă și categorie; opțiuni utile: favorite, nevizitate.
- Pentru fiecare exponat: **apreciere (like)**, **adăugare / eliminare din albumul personal** (colecție), marcare **„Am învățat”** pentru progres.
- Pagină de detaliu: descriere, **fapte scurte** (bullets educative), legături către personaje și artefacte asociate, unde există date.

**Entități principale:** sală (`Hall`), exponat (`Exhibit`), artefact (`Artifact`), personaj istoric (`HistoricalPerson`), categorii / epoci.

### 3.2. Quiz și insigne

- Seturi de **cinci întrebări** cu variante de răspuns; după fiecare răspuns, feedback și scurtă explicație educativă.
- La final: scor; **insignă** acordată dacă scorul atinge un prag definit.
- Vizualizare insigne într-o secțiune tip **„cabinet al exploratorului”** (progres personal, fără cont de utilizator).

**Entități:** quiz, întrebare, insignă, înregistrări de progres la nivel de dispozitiv.

### 3.3. Cronologie interactivă

- Prezentare a evenimentelor pe o **axă temporală** (scroll orizontal, noduri selectabile).
- Fișă detaliu pentru fiecare eveniment; legătură cu exponate relevante.
- **Misiune de ordonare cronologică** (evenimente amestecate → ordine corectă după an), adaptată la tactil pe ecran mare și la interacțiune simplă pe mobil.

**Entități:** eveniment de cronologie (`TimelineEvent`).

### 3.4. Progres, clasament local, setări

- **Progres global:** exponate studiate, misiuni completate, insigne obținute.
- **Clasament local** (pe dispozitiv): primele poziții pentru quiz / mini-jocuri, cu pseudonim editabil.
- **Setări persistate:** limbă, temă (inclusiv varianta „sistem”), opțional mod afișare pentru kiosk.

---

## 4. Fluxuri utilizator (scurt)

1. **Telefon:** alegere limbă → explorare săli și exponate → like / album / studiat → quiz → vizualizare insigne și progres.
2. **Kiosk:** același conținut cu layout optimizat pentru atingeri repetate, elemente UI mai mari, QR pentru continuare pe telefon unde este cazul.
3. **Reluare activități:** acces din zona de progres; se păstrează recordurile și insigne deja câștigate; se poate relua o activitate pentru exersare.

---

## 5. Stack tehnic propus

| Strat | Tehnologie |
|-------|----------------|
| Aplicație | React 18, TypeScript, Vite |
| Stil | CSS cu variabile; stil de bază aliniat landing-ului de referință (Manrope, paletă muzeu caldă); mod întunecat prin `data-theme` |
| Animații | Framer Motion (tranziții) + animații CSS ușoare acolo unde este suficient |
| Rutare | React Router v7/v6, cu `basename` pentru hosting static sub subcale |
| Stare globală | Zustand sau Context + `useReducer` (la alegerea echipei) |
| Persistență | `localStorage` (chei prefixate); IndexedDB opțional pentru extensii viitoare |
| Publicare | GitHub Pages; build static; workflow de integrare continuă opțional |

---

## 6. Identitate vizuală (rezumat)

- **Fundal deschis:** crem (`#faf7f2`), secțiuni bej (`#efe4d3`, `#f6efe4`).
- **Text:** brun-închis (`#1f1a15` / `#222`); text secundar gri-cald (`#5e5650`, `#6b6b6b`).
- **Accent:** brun muzeu (`#8b5e3c`); butoane principale în gradient cald (`#9a6a45` → `#7b5234`).
- **Tipografie:** Manrope pentru interfață; Georgia pentru titluri de tip expoziție.
- **Carduri:** fundal alb, colțuri 12px, bordură discretă, umbră ușoară, ridicare la hover pe dispozitive cu pointer fin.

Fișierele CSS ale landingului de referință sunt integrate în `src/styles/` (copii în `vendor/`) și agregate în `src/styles/index.css`.

---

## 7. Model de date (entități)

- **Hall:** identificator, slug, titluri pe limbi, imagine copertă, ordine afișare.
- **Exhibit:** sală, titlu, descrieri, epocă, categorie, imagine principală, legături către personaje / artefacte / evenimente, listă de fapte scurte.
- **Artifact:** nume, material, proveniență, interval de ani, imagine, legătură la exponat, clasificare opțională (ex. raritate pentru gamificare ușoară).
- **HistoricalPerson:** nume, rol, ani, biografie scurtă, portret, legături la exponate.
- **TimelineEvent:** an, titlu, rezumat, epocă, legături la exponate.
- **Quiz / Question / Badge:** structuri pentru întrebări, praguri, criterii de acordare a insignelor.
- **Intrări clasament local:** pseudonim, scor, marcaj temporal, cheie activitate.

---

## 8. Mini-jocuri (plan)

1. **Comoară ascunsă în vitrină:** imagine cu zone de descoperit; scor și timp limită opțional; valorifică recunoașterea obiectelor și contextul istoric.
2. **Misiune cronologie:** ordonare evenimente după an; consolidare competențe temporale.
3. **Memory ușor (personaj–faptă):** potrivire perechi; fixare de informații cheie despre personalități.

Scorurile și progresul se salvează local, cu prefix consistent al cheilor, pentru claritate și migrări ulterioare.

---

## 9. Persistență în browser (principii)

- Prefix recomandat: `vitrina:` pentru toate cheile.
- Exemple de domenii stocate: setări (limbă, temă), favorite, album, exponate studiate, evenimente văzute, progres quiz, insigne, realizări, clasament local.
- Versiune de schemă stocată separat; la citire, validare și valori implicite în caz de date lipsă sau corupte.

---

## 10. Lansare și infrastructură statică

- Build cu Vite; director de ieșire servit static.
- Configurare `base` pentru subcale pe GitHub Pages; rutor sincronizat cu aceeași bază.
- Fișier `public/.nojekyll` unde este necesar pentru GitHub Pages.
- Verificare locală: build + preview înainte de publicare.

---

## 11. Accesibilitate și calitate

- Respectarea contrastului în ambele teme.
- Suport `prefers-reduced-motion` pentru utilizatori sensibili la mișcare.
- Stări de focus vizibile; utilizare `aria-live` unde se actualizează scorul sau mesaje importante în timp real.
- Imagini cu text alternativ relevant.

---

## 12. Roadmap (faze)

1. **Faza A:** proiect Vite + React, integrare stiluri, temă clară / întunecată, schelet i18n și rutare.
2. **Faza B:** date de conținut (seed), explorer săli / exponate, filtre, like, album, marcare studiat, servicii de persistență.
3. **Faza C:** quiz, insigne, cronologie și misiune de ordonare, unul sau mai multe mini-jocuri, clasament local.
4. **Faza D:** optimizări kiosk, QR, build și publicare, documentație utilizator în README, polish accesibilitate și performanță (imagini lazy, etc.).

---

*Document actualizat pentru planificarea și descrierea proiectului „Vitrina Timpului”.*
