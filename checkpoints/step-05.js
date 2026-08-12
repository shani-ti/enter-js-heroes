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

// 1a: const for the fixed traits, let for the ones that change.
const heroName = "Superman"; // string
const origin = "Kryptonian"; // string
let healthPoints = 100;      // number
let rescues = 42;            // number
let isActive = true;         // boolean
let teamName = null;         // null      - empty on purpose
let lastMission;             // undefined - never assigned

// 1b: value and type, side by side.
console.log("-- values --");
console.log(heroName, origin, healthPoints, rescues, isActive, teamName, lastMission);
console.log("-- types --");
console.log(typeof heroName, typeof healthPoints, typeof isActive, typeof teamName, typeof lastMission);

// 1c: reassignment.
healthPoints = 92;           // fine - let can be reassigned
// origin = "Mutant";        // TypeError: Assignment to constant variable.

// Stretch 1:
console.log(typeof typeof 5); // "string"
console.log(typeof NaN);      // "number"


// 2a: the same summary, rebuilt with a template literal. This REPLACED the
//     + version from step 1 - the file changed, it did not just grow.
const summary = `${heroName} the ${origin} - HP ${healthPoints}, ${rescues} rescues`;
console.log(summary);


// ------------------------------------------------------------
//  STEP 2 · Tame the types                (Lesson 1 · ~10 min)
// ------------------------------------------------------------

// 2b: explicit conversion, so the maths actually works.
const powerFromServer = "7";
const powerLevel = Number(powerFromServer);
console.log(powerLevel * 10); // 70

// 2c: the falsy guard - and the "0" trap.
function describeHero(heroName) {
  const safeName = heroName ? heroName : "Unknown vigilante";
  console.log(safeName);
}
describeHero("");   // "Unknown vigilante"  - "" is falsy
describeHero(null); // "Unknown vigilante"  - null is falsy
describeHero("0");  // "0"                  - TRAP: a non-empty string is truthy

// Stretch: the evil puzzles.
console.log([] + []);     // ""                -> both arrays coerce to "" and concat
console.log([] + {});     // "[object Object]" -> [] -> "", {} -> "[object Object]"
console.log(1 + "1" - 1); // 10                -> 1 + "1" is "11", then "11" - 1 is 10


// ------------------------------------------------------------
//  STEP 3 · The roster data               (revised in step 4)
// ------------------------------------------------------------
//  The battle LOOP that lived here moved into runBattle() in step 4.
//  What is left is the data - which is exactly the right split.

const hero = {
  name: heroName,
  origin,
  healthPoints,
  rescues,
  // 4c: a method, so it can reach the object through `this`.
  describe() {
    console.log(`${this.name} the ${this.origin}, HP ${this.healthPoints}`);
  },
};
const villain = { name: "Loki", origin: "Asgardian", healthPoints: 85, rescues: 0 };

function damageFor(origin) {
  switch (origin) {
    case "Kryptonian":
      return 22;
    case "Mutant":
    case "Asgardian": // shared case - deliberate fall-through, not a bug
      return 18;
    default:
      return 12;
  }
}

// Step 2 stretch, kept for reference:
console.log([] == false); // true  -> [] becomes "" becomes 0, false becomes 0
console.log(null == 0);   // false -> null is loosely equal ONLY to undefined
console.log(NaN == NaN);  // false -> NaN is never equal to anything, even itself


// ------------------------------------------------------------
//  STEP 4 · Refactor into functions       (Lesson 3 · ~12 min)
// ------------------------------------------------------------

// 4a: one job, one function - and a default parameter for the optional bit.
function attack(attacker, defender, critChance = 0) {
  const base = damageFor(attacker.origin);
  const isCritical = Math.random() < critChance;
  const damage = isCritical ? base * 2 : base;
  return Math.max(0, defender.healthPoints - damage);
}

// 4b: a predicate - reads like English at the call site.
const isDefeated = (fighter) => fighter.healthPoints <= 0;

// 4e: the step 3 loop, now expressed in terms of those two functions.
function runBattle(hero, villain) {
  let round = 1;
  while (!isDefeated(hero) && !isDefeated(villain)) {
    villain.healthPoints = attack(hero, villain);
    hero.healthPoints = attack(villain, hero);

    if (isDefeated(hero)) {
      console.log(`Round ${round}: ${hero.name} is down!`);
    } else if (hero.healthPoints < 40) {
      console.log(`Round ${round}: ${hero.name} Critical! (${hero.healthPoints})`);
    } else {
      console.log(`Round ${round}: ${hero.name} Healthy (${hero.healthPoints})`);
    }
    round++;
  }
  console.log(`Winner: ${isDefeated(hero) ? villain.name : hero.name}`);
}
runBattle(hero, villain);
hero.describe(); // "Superman the Kryptonian, HP 20"

// Stretch 1: a closure factory. `amount` outlives makeMedkit's return.
function makeMedkit(amount) {
  return (fighter) => {
    fighter.healthPoints += amount;
    return fighter.healthPoints;
  };
}
const smallMedkit = makeMedkit(15);
const testDummy = { ...hero }; // heal a COPY, so the roster numbers below stay put
console.log(smallMedkit(testDummy)); // 35  (20 + 15)

// Stretch 2: the arrow trap.
const brokenHero = {
  name: "Vision",
  describe: () => console.log(`I am ${this?.name}`),
};
brokenHero.describe(); // "I am undefined"


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
