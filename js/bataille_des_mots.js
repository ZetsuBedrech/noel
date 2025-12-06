function Start() {
  const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUV".split("");
  const deck = document.getElementById("deck");
  deck.innerHTML = "";

  // Fonction utilitaire : tire une lettre unique
  function pickUniqueLetter(pool) {
    const index = Math.floor(Math.random() * pool.length);
    return pool.splice(index, 1)[0]; // Retire la lettre du pool
  }

  // Couleurs : 2 rouges, 2 verts
  const colors = ["red", "red", "green", "green"];

  // Liste de lettres qui vont être retirées à chaque tirage
  const letterPool = [...alphabetUpper];

  // Création des cartes avec lettres uniques
  let cards = colors.map(color => ({
    letter: pickUniqueLetter(letterPool),
    color
  }));

  // Mélange
  cards = shuffle(cards);

  // Génération HTML
  for (const cardData of cards) {
    const card = document.createElement("div");
    card.className = `card ${cardData.color}`;
    card.textContent = cardData.letter;
    deck.appendChild(card);
  }
}

// Mélange avec crypto (fiable)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

Start();
