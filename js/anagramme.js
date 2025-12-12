let wordToGuess = "";
const wordElement = document.getElementById("word");
const guessButton = document.getElementById("guess-btn");
const wordInput = document.getElementById("letter"); // on garde ton input
const retry = document.getElementById("retry");

// 🔤 Fonction pour retirer les accents (É → E, À → A…)
function normalizeWord(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

// 🔀 Mélange les lettres d’un mot
function shuffleWord(word) {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
}

// 🎯 Récupère un mot depuis l’API
function fetchWord() {
    fetch("https://trouve-mot.fr/api/random/1")
        .then((response) => response.json())
        .then((words) => {
            wordToGuess = words[0].name.toUpperCase(); // garde les accents
            console.log("Mot à deviner :", wordToGuess);

            const scrambled = shuffleWord(wordToGuess);
            wordElement.textContent = scrambled;
            wordInput.value = "";
            wordInput.focus();
        })
        .catch((error) => {
            console.error("Erreur API :", error);
        });
}

// 📝 Vérifie la proposition du joueur
function makeGuess() {
    const guess = normalizeWord(wordInput.value);
    wordInput.value = "";

    if (guess === normalizeWord(wordToGuess)) {
        alert("Bravo, vous avez trouvé le mot !");
        fetchWord(); // nouveau mot
    } else {
        alert("Incorrect, réessayez !");
    }
}

// ▶️ Boutons
guessButton.addEventListener("click", makeGuess);
retry.addEventListener("click", fetchWord);

const giveUpButton = document.getElementById("giveUp");

giveUpButton.addEventListener("click", () => {
    alert("Le mot était : " + wordToGuess);
    fetchWord(); // recharge un nouveau mot
});

// ▶️ Démarrage
fetchWord();
console.log(wordToGuess);
