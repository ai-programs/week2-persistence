# Week 2 — Planning Document

## Overview

**Title:** Add a Leaderboard (and more)
**Duration:** 2 hours
**Builds on:** Week 1 (TypeRacer game)
**Key technology:** Firebase (Realtime Database or Firestore)
**Deploy:** GitHub Pages (Firebase config keys are public by design, so static hosting works fine)

---

## Core Concepts to Teach

### 1. HTTP — Request/Response Model

Use the students' own game from Week 1 as the example. When they open their TypeRacer in the browser:

- The browser sends a **GET request** to the web server
- The server responds with the HTML, CSS, and JS files
- The browser renders the page
- **The connection ends** — the server doesn't remember anything

This is the foundation: the web is built on simple request/response cycles.

### 2. Stateless — The "Forgetful" Web

HTTP is stateless. The server doesn't know who you are between requests. This leads directly to the problem:

- "You played the game. Got a great score. Closed the browser. Opened it again. Score is gone. Why?"
- Because nobody saved it anywhere. The server didn't remember, and the browser cleared its memory.

This is the natural setup for introducing persistence.

### 3. Persistence — Why We Need Databases

The question becomes: "Where can we save data so it survives beyond a single browser session?"

- **Option A: In the browser** (localStorage) — survives refresh/close, but only on YOUR machine, only in YOUR browser. Nobody else can see it.
- **Option B: On the internet** (database) — survives everything, accessible from anywhere, shareable with others.

We're going straight to Option B with Firebase because the real "wow moment" is shared data, not local storage.

### 4. Real-time Shared Data

The transformative moment: a student finishes a game, and their score appears on another student's screen in real time. No refresh needed. This is when they viscerally understand what a database does and why it matters.

---

## Firebase — What Students Should Understand

Students don't need to understand the implementation details. The Gemini AI assistant will handle the code. But they should walk away understanding:

- **A database is a place on the internet that stores data** — think of it like a shared spreadsheet that any app can read from and write to
- **Their app talks to Firebase using the internet** — same request/response model as HTTP, but the Firebase SDK handles the complexity
- **Data is structured** — it has a shape (name, score, date, etc.), similar to columns in a spreadsheet
- **Real-time sync** — Firebase can push updates to all connected clients instantly
- **Firebase Console** — a visual interface where you can see, edit, and manage the data (important for making data "tangible")

---

## Feature Ideas for Week 2

### Must-have
- **Shared leaderboard** — all students' scores in one place, visible to everyone, updated in real time

### Great additions (pick based on time)
- **Class chat** — a simple message wall next to the game. Students see messages from others appear live. Very powerful for understanding shared databases.
- **Player-to-player challenges** — "I typed this sentence in 15 seconds, can you beat me?" One student saves a challenge to Firebase, another accepts it.
- **Shared sentence pool** — each student adds custom sentences to the game. Everyone plays with everyone's sentences. The database grows with contributions.
- **Player profiles** — name, avatar, short bio stored in Firebase. Could introduce Firebase Authentication basics.

### The pedagogical value of each
| Feature | What it teaches |
|---|---|
| Shared leaderboard | Data persistence, reading/writing to a database, sorting |
| Class chat | Real-time sync, the "magic" of shared data |
| Challenges | Data relationships (who challenged whom), user interaction through data |
| Shared sentences | Contributing to a shared resource, arrays/collections in a database |
| Player profiles | User identity, authentication basics |

---

## Teaching Approach

### The "Problem → Solution" Arc

1. **Start with the problem** — "Your score disappears. That sucks. Let's fix it."
2. **Explain HTTP/stateless** — "Here's WHY it disappears"
3. **Introduce Firebase** — "Here's a place on the internet that remembers for us"
4. **Build it** — Students prompt Gemini to connect their game to Firebase
5. **See the magic** — Scores appear on classmates' screens in real time
6. **Explore the console** — Students open Firebase Console and SEE their data sitting there
7. **Iterate** — Add more features (chat, challenges, etc.)

### Firebase Console as a Teaching Tool

This is important: students should open the Firebase Console and see the data. It makes the abstract concept of "a database" tangible. They can:

- See entries appear as they play
- Edit data manually and watch it change in the app
- Delete entries and see them disappear
- Understand the structure (collections, documents, fields)

This is the closest thing to "feeling" the data, like seeing rows appear in a spreadsheet.

---

## Open Questions

### Setup & Infrastructure
- [ ] **How exactly to set up Firebase for the class?** Need to investigate the minimal setup for an IDX project. How many clicks/steps from zero to working database?
- [ ] **One shared Firebase project or one per student?** A shared project means everyone sees everyone's data (great for leaderboard). Individual projects mean isolation but more setup overhead. Recommendation: shared project owned by the school.
- [ ] **Can the Firebase project be pre-configured in the IDX template?** If yes, students import the template and Firebase is already connected. Zero setup on their end.

### Project Continuity
- [ ] **Stay with TypeRacer or start a new project?** Three weeks of TypeRacer might be too much. But building on Week 1's project shows clear progression. Could compromise: Week 2 adds Firebase to TypeRacer, Week 3 is a new project that uses Firebase from the start.
- [ ] **Template strategy:** Should the Week 2 template contain the student's finished Week 1 code? Or a "reference" TypeRacer that everyone starts from? If they all have different versions from Week 1, a standardized starting point might be cleaner.

### Curriculum Fit
- [ ] **How much HTTP theory vs hands-on time?** With only 2 hours, there's a tension between explaining concepts and building. Suggestion: 30 min theory/demo, 90 min hands-on.
- [ ] **Video resources for HTTP/internet concepts?** The course doc mentions exploring high-quality videos for core concepts. A good 5-minute video on HTTP could save 20 minutes of explaining.

### Technical Details
- [ ] **Firebase Realtime Database vs Firestore?** Realtime Database is simpler and more visual in the console. Firestore is more modern and structured. For this use case, Realtime Database might be better — it's more immediately impressive with real-time updates.
- [ ] **Security rules** — Firebase needs rules to control who can read/write. For a classroom setting, open rules are fine (anyone can read/write). But this is a teaching moment about security for later weeks.
- [ ] **Firebase SDK via CDN** — to keep things vanilla (no npm), the Firebase SDK should be loaded via script tag from CDN. Need to verify this works smoothly in IDX.

---

## Week 2 Template — What It Should Contain

```
week2-leaderboard/
├── .idx/
│   ├── dev.nix          ← Same as Week 1, possibly with Firebase CLI added
│   └── airules.md       ← Updated rules: Firebase context, Week 2 objectives
├── README.md            ← Instructions for students
├── index.html           ← TypeRacer base game (working version from Week 1 concept)
├── style.css            ← Game styles
├── main.js              ← Game logic (working, but no persistence yet)
└── firebase-config.js   ← Pre-configured Firebase connection (?)
```

The `airules.md` should be updated to:
- Include Firebase context and rules
- Guide Gemini to explain database concepts when relevant
- Maintain vanilla JS constraint (Firebase SDK via CDN, not npm)
- Reference Week 2 learning objectives

---

## Success Criteria

By the end of Week 2, students should:

- ✅ Understand what HTTP is (request/response, stateless)
- ✅ Understand WHY we need databases (persistence, shared data)
- ✅ Have a working leaderboard that all classmates can see
- ✅ Have seen their data in the Firebase Console
- ✅ Have iterated on their project with at least one additional Firebase feature
- ✅ Be excited about what else they can build with shared data
