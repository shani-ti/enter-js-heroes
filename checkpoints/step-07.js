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
const name = "Superman";     // string
const origin = "Kryptonian"; // string
let healthPoints = 100;      // number
let rescues = 42;            // number
let isActive = true;         // boolean
let teamName = null;         // null      - empty on purpose
let lastMission;             // undefined - never assigned

// 1b: value and type, side by side.
console.log("-- values --");
console.log(name, origin, healthPoints, rescues, isActive, teamName, lastMission);
console.log("-- types --");
console.log(typeof name, typeof healthPoints, typeof isActive, typeof teamName, typeof lastMission);

// 1c: reassignment.
healthPoints = 92;           // fine - let can be reassigned
// origin = "Mutant";        // TypeError: Assignment to constant variable.

// Stretch:
console.log(typeof typeof 5); // "string"
console.log(typeof NaN);      // "number"


// 2a: the same summary, rebuilt with a template literal. This REPLACED the
//     + version from step 1 - the file changed, it did not just grow.
const summary = `${name} the ${origin} - HP ${healthPoints}, ${rescues} rescues`;
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
  name,
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
//  STEP 5 · The roster engine             (one edit in step 7)
// ------------------------------------------------------------

// TODO 7a: change ONE word below - `const roster` has to become `let roster`.
//   In step 7 you replace the whole array on every click (immutably, with
//   map + spread), and const would refuse the reassignment.
const roster = [
  hero,
  villain,
  { name: "Storm", origin: "Mutant", healthPoints: 30, rescues: 27 },
  { name: "Vision", origin: "Android", healthPoints: 95, rescues: 12 },
  { name: "Batman", origin: "Human", healthPoints: 50, rescues: 88 },
];

const getNames = (roster) => roster.map((hero) => hero.name);
const active = (roster) => roster.filter((hero) => hero.healthPoints > 0);
const totalRescues = (roster) => roster.reduce((sum, hero) => sum + hero.rescues, 0);
const strongest = (roster) =>
  roster.reduce((best, hero) => (hero.healthPoints > best.healthPoints ? hero : best));

console.log(getNames(roster));
console.log(active(roster).length);
console.log(totalRescues(roster));
console.log(strongest(roster).name);

const text = JSON.stringify(roster);
const back = JSON.parse(text);
console.log(back[0].name);

const powerUp = (roster) =>
  roster.map((hero) => ({ ...hero, healthPoints: hero.healthPoints + 20 }));
console.log(powerUp(roster)[0].healthPoints);
console.log(roster[0].healthPoints);

const scoreboard = active(roster)
  .slice()
  .sort((first, second) => second.healthPoints - first.healthPoints)
  .map((hero) => `${hero.name} (${hero.healthPoints})`)
  .join(", ");
console.log(scoreboard);


// ------------------------------------------------------------
//  STEP 6 · Render the roster             (Lesson 5 · ~14 min)
// ------------------------------------------------------------

function renderRoster(roster) {
  const container = document.querySelector("#roster");
  container.innerHTML = ""; // clear, then rebuild from current data

  roster
    .slice() // Stretch 1: copy before sorting - sort mutates
    .sort((first, second) => second.healthPoints - first.healthPoints)
    .forEach((hero) => {
      const card = document.createElement("div");
      // Stretch 2: data decides the class, the class decides the look
      card.className = "hero-card" + (hero.healthPoints <= 0 ? " downed" : "");
      card.innerHTML = `
        <h3></h3>
        <div class="origin"></div>
        <div class="stats">HP: ${hero.healthPoints}</div>
        <div class="hp-bar">
          <div class="hp-fill" style="width:${Math.max(0, hero.healthPoints)}%"></div>
        </div>`;
      card.querySelector("h3").textContent = hero.name;
      card.querySelector(".origin").textContent = hero.origin;
      container.appendChild(card);
    });
}
renderRoster(roster);


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
