function Start() {
  const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUV".split("");
  const deck = document.getElementById("deck");
  deck.innerHTML = "";

  function pickUniqueLetter(pool) {
    const index = Math.floor(Math.random() * pool.length);
    return pool.splice(index, 1)[0];
  }

  const colors = ["red", "red", "green", "green"];
  const letterPool = [...alphabetUpper];

  let cards = colors.map(color => ({
    letter: pickUniqueLetter(letterPool),
    color
  }));

  cards = shuffle(cards);

  // Génération HTML : carte = container + front + back
  for (const cardData of cards) {
    const card = document.createElement("div");
    card.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = `card-face front ${cardData.color}`;
    front.textContent = cardData.letter;

    const back = document.createElement("div");
    back.className = "card-face back";

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    deck.appendChild(card);
  }

  // Flip après un mini délai
  setTimeout(() => {
    document.querySelectorAll(".card").forEach(c => c.classList.add("flip"));
  }, 50);
}

// Shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

Start();