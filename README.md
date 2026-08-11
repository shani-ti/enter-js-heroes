# Hero HQ

The running project for **Enter - JS** (Shani Titelbaum, Wix).

**One file. Eight steps. It grows all day.** Everything you write today goes into
`src/app.js`. By the last step that same file fetches real superheroes off the
internet and renders an interactive roster.

## For students

1. **Fork** this project (top-right in StackBlitz) - otherwise your work is not saved.
2. Open `src/app.js`. Work top to bottom, one `STEP` banner at a time.
3. Open the **Console** tab for steps 1-5. From step 6 your heroes appear on the **page**.
4. Some steps ask you to **change code you already wrote**. That is deliberate - read
   the TODO before you start typing.

You install nothing; StackBlitz runs it all in the browser.

### The eight steps

| Step | Lesson | What you do | Continues by |
| --- | --- | --- | --- |
| 1 | 1 · Language core | Declare your hero: `const`/`let`, five primitives, `typeof` | new code |
| 2 | 1 · Coercion | Template literal, `Number()`, the falsy guard | **rewriting** your step 1 summary |
| 3 | 2 · Flow | Group the loose variables into a `hero` object, add a villain, battle loop | **absorbing** step 1's variables |
| 4 | 3 · Functions | Extract `attack` / `isDefeated` / `runBattle`, add a `describe()` method | **moving** step 3's loop into functions |
| 5 | 4 · Arrays & objects | Two fighters become a roster array + `map`/`filter`/`reduce` | **growing** step 3's objects |
| 6 | 5 · DOM | `renderRoster()` puts the roster on the page | rendering step 5's data |
| 7 | 6 · Events | Wire the toolbar: attack, heal, recruit, click a card | **`const` roster becomes `let`** |
| 8 | 7 · Async | Delete the hardcoded data, `fetch` real heroes instead | **gutting** step 5's array |

### Fell behind? Nothing is lost

Every step has a checkpoint: the exact file state at the *start* of that step.

```bash
cp checkpoints/step-05.js src/app.js
```

Now you are caught up and can carry on with step 5. (In StackBlitz: open the
checkpoint file, select all, copy, paste over `src/app.js`.)

## Project layout

```
hero-hq/
  index.html          # app shell: header, the toolbar (dead until step 7), #roster
  src/
    main.js           # imports app.js - you never need to touch this
    app.js            # >>> ALL of your work happens here <<<
    style.css         # Wix-branded cards, HP bars, controls - already written
  checkpoints/
    step-01.js ... step-08.js   # catch-up snapshots, one per step
```

## The capstone API (step 8)

<https://akabab.github.io/superhero-api/api/all.json> - no key, CORS-friendly,
and it is a static file on GitHub Pages so a room full of forks cannot rate-limit it.
563 characters with `powerstats` (0-100), `appearance.race`, `work.occupation`,
`biography.publisher` and portrait images.

Three traps are waiting in that data, all deliberate. The step 8 TODOs point at them
without giving the answers away.

---

## For the instructor

The annotated answer key is the private
**[enter-js-heroes-solutions](https://github.com/shani-ti/enter-js-heroes-solutions)**
repo: one cumulative snapshot per step (`after-step-0N.js`) with `// WHY:` and
`// TRAP:` commentary, plus expected console output. Those comment lines are
stripped from everything in this public repo, so `checkpoints/` gives students
working code without handing them the talking points.

Checkpoints and solutions are generated from a single source of truth, so a step
can never drift between the two. To reveal an answer in class, open the matching
`after-step-0N.js` from your local clone of the private repo, or paste it over
`src/app.js` and run it.

### Deploying for class

Share this URL; students click **Fork**:

```
https://stackblitz.com/github/wix-academy/enter-js-heroes
```

That URL only works while this repo is **public**. `wix-academy` does not let plain
members create or publish public repos, so if this repo is currently private an org
owner has to flip it - check before class, because a private repo silently breaks the
StackBlitz fork flow for every student.

### Run locally (StackBlitz needs none of this)

Requires **Node 18+** (Vite 5). On a Wix machine npm defaults to the internal
registry, so point it at the public one:

```bash
npm install --registry=https://registry.npmjs.org
npm run dev
```
