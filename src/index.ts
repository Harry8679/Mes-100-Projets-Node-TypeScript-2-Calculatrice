// ─────────────────────────────────────────────────
// Projet #2 — Calculatrice CLI
//
// Concepts appris :
//   - function         → découper le code en blocs
//   - number, string   → types de base TypeScript
//   - Number()         → convertir string → nombre
//   - isNaN()          → vérifier si c'est un nombre
//   - process.exit(1)  → quitter si erreur
// ─────────────────────────────────────────────────


// ── Étape 1 : lire les arguments ──────────────────
// On s'attend à recevoir : node index.ts 10 + 5
//   process.argv[2] = "10"
//   process.argv[3] = "+"
//   process.argv[4] = "5"

const arg1     = process.argv[2]; // ex: "10"
const operateur = process.argv[3]; // ex: "+"
const arg2     = process.argv[4]; // ex: "5"


// ── Étape 2 : vérifier que les arguments existent ─
// Si l'utilisateur ne passe rien → on arrête tout
if (arg1 === undefined || operateur === undefined || arg2 === undefined) {
  console.log("❌ Erreur : il manque des arguments.");
  console.log("   Usage : npx ts-node src/index.ts 10 + 5");
  process.exit(1); // 1 = quitter avec une erreur
}


// ── Étape 3 : convertir les strings en nombres ────
// process.argv retourne TOUJOURS des strings.
// "10" + "5" = "105" (concaténation !) — pas ce qu'on veut.
// Number("10") = 10  (vrai nombre)
// Number("abc") = NaN (Not a Number)

const nombre1: number = Number(arg1);
const nombre2: number = Number(arg2);


// ── Étape 4 : vérifier que ce sont bien des nombres
// isNaN() retourne true si la valeur n'est pas un nombre valide
function verifierNombre(valeur: number, original: string): void {
  if (isNaN(valeur)) {
    console.log(`❌ Erreur : "${original}" n'est pas un nombre valide.`);
    process.exit(1);
  }
}

verifierNombre(nombre1, arg1);
verifierNombre(nombre2, arg2);


// ── Étape 5 : effectuer le calcul ─────────────────
// On crée une fonction qui prend 3 paramètres typés
// et retourne un nombre (: number après les parenthèses)

function calculer(a: number, op: string, b: number): number {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  } else if (op === "/") {
    // Cas spécial : division par zéro
    // En JS, 10 / 0 = Infinity (pas d'erreur automatique !)
    if (b === 0) {
      console.log("❌ Erreur : division par zéro impossible.");
      process.exit(1);
    }
    return a / b;
  } else {
    console.log(`❌ Erreur : opérateur "${op}" non supporté.`);
    console.log("   Utilise : + - * /");
    process.exit(1);
  }
}


// ── Étape 6 : afficher le résultat ────────────────
const resultat: number = calculer(nombre1, operateur, nombre2);
console.log(`${nombre1} ${operateur} ${nombre2} = ${resultat}`);