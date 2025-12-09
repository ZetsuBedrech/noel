let wordToGuess = "";
let displayedWord = [];
let incorrectGuesses = [];
let attemptsLeft = 6;

const wordElement = document.getElementById("word");
const incorrectGuessesElement = document.getElementById("incorrect-guesses");
const guessButton = document.getElementById("guess-btn");
const letterInput = document.getElementById("letter");
const retry = document.getElementById("retry");

// 🔤 Fonction pour retirer les accents (É → E, À → A…)
function normalizeLetter(letter) {
    return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 🎯 Récupère un mot depuis l’API
function fetchWord() {
    fetch("https://trouve-mot.fr/api/random/1")
        .then((response) => response.json())
        .then((words) => {
            wordToGuess = words[0].name.toUpperCase(); // mot avec accents
            console.log("Mot à deviner :", wordToGuess);
            initializeGame();
        })
        .catch((error) => {
            console.error("Erreur API :", error);
        });
}

// 🔄 Initialise le jeu
function initializeGame() {
    displayedWord = Array(wordToGuess.length).fill("_");
    incorrectGuesses = [];
    attemptsLeft = 6;

    wordElement.textContent = displayedWord.join(" ");
    incorrectGuessesElement.textContent = "";
    letterInput.value = "";
    letterInput.focus();
}

// 📝 Vérifie une lettre
function makeGuess() {
    const rawInput = letterInput.value.toUpperCase();
    const guess = normalizeLetter(rawInput); // E → compare aussi É, È, Ê, Ë
    letterInput.value = "";

    // Vérifie entrée valide
    if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
        alert("Veuillez entrer une lettre valide.");
        return;
    }

    // Vérifie si déjà essayé
    if (incorrectGuesses.includes(guess) || displayedWord.includes(rawInput)) {
        alert("Vous avez déjà deviné cette lettre.");
        return;
    }

    let found = false;

    // Teste toutes les lettres du mot (même accentuées)
    for (let i = 0; i < wordToGuess.length; i++) {
        if (normalizeLetter(wordToGuess[i]) === guess) {
            displayedWord[i] = wordToGuess[i]; // garde l'accent réel
            found = true;
        }
    }

    wordElement.textContent = displayedWord.join(" ");

    if (found) {
        // gagné
        if (!displayedWord.includes("_")) {
            alert("Bravo, vous avez gagné !");
        }
    } else {
        // Lettre incorrecte
        incorrectGuesses.push(guess);
        incorrectGuessesElement.textContent = incorrectGuesses.join(", ");

        attemptsLeft--;
        if (attemptsLeft === 0) {
            alert("Perdu ! Le mot était : " + wordToGuess);
        }
    }
}

// ▶️ Boutons
guessButton.addEventListener("click", makeGuess);
retry.addEventListener("click", fetchWord);

// ▶️ Démarrage
fetchWord();
