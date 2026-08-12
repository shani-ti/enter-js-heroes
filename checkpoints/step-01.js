// ============================================================
//  HERO HQ  ·  Enter - JS
// ------------------------------------------------------------
//  ONE file. EIGHT steps. It grows all day.
//
//  - Work top to bottom. Every step has a STEP banner.
//  - Some steps ask you to CHANGE code you already wrote.
//    That is the point - real projects get edited, not restarted.
//  - Steps 1-5 print to the CONSOLE tab.
//    From step 6 your heroes appear on the PAGE.
//  - Fell behind? Copy checkpoints/step-0N.js over this file
//    and rejoin the class.
// ============================================================


// ------------------------------------------------------------
//  STEP 1 · Create your hero              (Lesson 1 · ~12 min)
// ------------------------------------------------------------
//  Open the CONSOLE tab to watch your output as you work.

// TODO 1a: declare your hero with the RIGHT keyword for each trait.
//   Fixed traits (never change):  const  ->  heroName, origin
//   Changing traits:              let    ->  healthPoints, rescues
//   Between them, use all five everyday primitives at least once:
//   string, number, boolean, null, undefined.
//
// const heroName = ...
// const origin = ...       // 'Kryptonian' | 'Asgardian' | 'Mutant' | 'Human' ...
// let healthPoints = ...
// let rescues = ...
// let isActive = ...       // boolean
// let teamName = null;     // no team yet - empty ON PURPOSE
// let lastMission;         // undefined - JS has nothing to give you

// TODO 1b: log each value AND its type.
//   Hint: console.log(heroName, typeof heroName);

// TODO 1c: try to reassign one `let` and one `const`.
//   Which one throws? Why?

// TODO Stretch 1: predict BEFORE you run, then check.
//   console.log(typeof typeof 5);  // ?
//   console.log(typeof NaN);       // ?


// TODO Stretch 2: build a one-line hero summary using + - the painful way.
//   Mix the numbers into the string. Notice anything odd? Keep that feeling,
//   it is what step 2 is for.
//   const painfulSummary = "HP: " + healthPoints + " Rescues: " + rescues;


// ------------------------------------------------------------
//  STEP 2 · Tame the types                (Lesson 1 · ~10 min)
// ------------------------------------------------------------
//  Start with TODO 2a, a few lines ABOVE this banner - the summary you wrote
//  in step 1. Edits happen where the code is, not where the lesson is.

// TODO 2b: a power level arrives from a server as a STRING.
const powerFromServer = "7";
//   Make `powerLevel * 10` give the NUMBER 70 - not "7101010..." and not NaN.
//   Convert it explicitly.

// TODO 2c: write a guard. If a hero's name is falsy, log "Unknown vigilante".
//   Test it with each of these and watch what happens:
//     ""     -> ?
//     null   -> ?
//     "0"    -> ?   <- this one is the trap. Why?
function describeHero(heroName) {
  // const safeName = heroName ? heroName : "Unknown vigilante";
  // console.log(safeName);
}
// describeHero("");
// describeHero(null);
// describeHero("0");

// TODO Stretch: predict THEN verify. Explain each one in a comment.
//   console.log([] + []);     // ?
//   console.log([] + {});     // ?
//   console.log(1 + "1" - 1); // ?


// ------------------------------------------------------------
//  STEP 3 · The battle simulator          (Lesson 2 · ~14 min)
// ------------------------------------------------------------

// TODO 3a: your hero is still five loose variables. Group them into ONE
//   object - and reuse the variables you already declared (property shorthand).
//   Note the key stays `name` even though the variable is `heroName`: step 8
//   maps the API's `name` field onto it, so the shape has to match.
// const hero = { name: heroName, origin, healthPoints, rescues };

// TODO 3b: add a villain with the same shape.
// const villain = { name: "Loki", origin: "Asgardian", healthPoints: 85, rescues: 0 };

// TODO 3c: damageFor(origin) using a switch.
//   Kryptonian hits hardest. Mutant and Asgardian SHARE a case. Everyone
//   else falls to the default.
function damageFor(origin) {
  // switch (origin) { case "Kryptonian": ... default: ... }
}

// TODO 3d: loop the rounds. Each round BOTH fighters take damage.
//   Log Critical / Healthy each round with if / else if.
//   Stop when someone reaches 0, then announce the winner.
//   Use === everywhere. Never ==.

// TODO Stretch 1: why does `if (healthPoints)` misbehave at exactly 0? Fix it.
// TODO Stretch 2: predict then run, and comment each one.
//   console.log([] == false); // ?
//   console.log(null == 0);   // ?
//   console.log(NaN == NaN);  // ?


// ------------------------------------------------------------
//  STEP 4 · Refactor into functions       (Lesson 3 · ~12 min)
// ------------------------------------------------------------
//  Nothing new on screen here. You are cleaning up code you already wrote -
//  which is most of what the job actually is.

// TODO 4a: attack(attacker, defender) -> the defender's NEW healthPoints.
//   Give it an optional third parameter with a DEFAULT: critChance = 0.

// TODO 4b: isDefeated(fighter) -> boolean.

// TODO 4e: runBattle(hero, villain) - move the loop you cut out of step 3
//   in here, and make it call attack() and isDefeated() instead of doing the
//   arithmetic inline. Then call it once.

// TODO Stretch 1: makeMedkit(amount) returns a FUNCTION (a closure) that
//   heals by that fixed amount every time it is called.

// TODO Stretch 2: rewrite describe as an arrow function and explain in a
//   comment why this.name breaks.


// ------------------------------------------------------------
//  STEP 5 · The roster engine             (Lesson 4 · ~16 min)
// ------------------------------------------------------------

// TODO 5a: two fighters become a ROSTER. Build an array that starts with the
//   hero and villain you already have, then add three more heroes with the
//   same shape ({ name, origin, healthPoints, rescues }).
//   Suggestions: Storm (Mutant, 30, 27), Vision (Android, 95, 12),
//                Batman (Human, 50, 88)
// const roster = [hero, villain, ...];

// TODO 5b: getNames(roster)      -> array of names          (map)
// TODO 5c: active(roster)        -> healthPoints > 0 only   (filter)
// TODO 5d: totalRescues(roster)  -> one number              (reduce)
// TODO 5e: strongest(roster)     -> the highest-HP hero
// TODO 5f: round-trip the roster through JSON.stringify / JSON.parse

// TODO Stretch 1: powerUp(roster) -> a NEW array with every healthPoints + 20,
//   leaving the original untouched (spread).
// TODO Stretch 2: one expression - active heroes, sorted by healthPoints
//   descending, as a printable scoreboard string.


// ------------------------------------------------------------
//  STEP 6 · Render the roster             (Lesson 5 · ~14 min)
// ------------------------------------------------------------
//  Switch from the Console tab to the PAGE. Your data is about to be visible.

// TODO 6: write renderRoster(roster) so it:
//   - selects #roster
//   - clears it       (roster.innerHTML = "")
//   - builds one .hero-card per hero and appends it
//   - shows name, origin and healthPoints, plus an HP bar:
//       <div class="hp-bar"><div class="hp-fill" style="width:NN%"></div></div>
//   Use textContent for the name (safe), innerHTML only for your own markup.
function renderRoster(roster) {
  // const container = document.querySelector("#roster");
  // ...
}
// renderRoster(roster);

// TODO Stretch 1: sort the cards by healthPoints, highest first.
// TODO Stretch 2: add the "downed" class to any hero on 0 HP so they grey out.


// ------------------------------------------------------------
//  STEP 7 · Make it interactive           (Lesson 6 · ~12 min)
// ------------------------------------------------------------
//  The toolbar above the roster is already on the page (see index.html) and
//  every control does nothing. Your job: make the page LISTEN.

// TODO 7b: click a hero card -> log that hero's name.
//   Put ONE listener on #roster, not one per card (event delegation), so
//   heroes added later work with no extra wiring.
//   Hint: const card = event.target.closest(".hero-card");

// TODO 7c: #attack-round -> every hero takes 15 damage, then re-render so the
//   HP bars shrink. Build a NEW array with map + spread; never mutate.

// TODO 7d: #recruit-form submit -> add the typed hero to the roster, re-render.
//   Call event.preventDefault() FIRST or the page reloads and wipes your work.
//   Read the name from event.target.elements.heroName.value.

// TODO Stretch: #heal-all -> every hero +20, immutably, then re-render.


// ------------------------------------------------------------
//  STEP 8 · Fetch the multiverse    (Lesson 7 · CAPSTONE · ~16 min)
// ------------------------------------------------------------
//  The finale. Same app, same functions - real heroes off the internet.
//
//  API (no key, CORS-friendly, cannot be rate-limited by a room of forks):
//    https://akabab.github.io/superhero-api/api/all.json
//
//  One record looks like:
//    { name: "Batman",
//      powerstats: { intelligence: 81, durability: 55, combat: 90, ... },
//      appearance: { race: "Human", gender: "Male", ... },
//      biography: { publisher: "DC Comics", alignment: "good", ... },
//      work:      { occupation: "-", base: "Gotham City" },
//      images:    { sm: "https://...jpg", ... } }

// The eight heroes we actually want on the wall.
const HEADLINERS = [
  "Superman",
  "Batman",
  "Wonder Woman",
  "Spider-Man",
  "Iron Man",
  "Thor",
  "Storm",
  "Black Panther",
];

// TODO 8c: write `async function loadRoster()`.
// TODO 8d: const response = await fetch(API);
//          const data = await response.json();
//          Check response.ok and throw if the server said no.
// TODO 8e: map the API shape onto YOUR hero shape:
//            - name         <- name
//            - origin       <- appearance.race
//            - dayJob       <- work.occupation
//            - healthPoints <- powerstats.durability (already 0-100)
//            - rescues      <- powerstats.combat
//          THREE traps are waiting for you here:
//            1. The endpoint returns ALL 563 characters. There is no
//               ?limit= and no pagination - filter it down yourself,
//               with HEADLINERS above. (Array.includes is your friend.)
//            2. Filtering 8 names gives you NINE heroes. Find out why
//               before you fix it.
//            3. This API has TWO different ways of saying "no data", and
//               only one of them is falsy. A missing race is null. A missing
//               occupation is the string "-". So `occupation || "Unknown"`
//               puts a bare dash on the card - remember describeHero("0")
//               from step 2? Same trap, real data.
// TODO 8f: assign the result to `roster`, then renderRoster(roster).
//          Your step 7 buttons keep working - do not touch them.
// TODO 8g: wrap the whole thing in try/catch and show the error in #roster.

// TODO Stretch 1: show "Loading..." while awaiting, replace it when done.
// TODO Stretch 2: fetch this list AND one single hero
//   (https://akabab.github.io/superhero-api/api/id/70.json) in PARALLEL with
//   Promise.all, and log which one arrived.
// TODO Stretch 3: put each hero's portrait on their card (images.sm). The CSS
//   for .hero-card img is already written.
