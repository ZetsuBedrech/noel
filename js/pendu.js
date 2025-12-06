let wordToGuess = "";
let displayedWord = [];
let incorrectGuesses = [];
let attemptsLeft = 6; // Nombre d'essais avant de perdre
const test = document.getElementById("test");
const wordElement = document.getElementById("word");
const incorrectGuessesElement = document.getElementById("incorrect-guesses");
const guessButton = document.getElementById("guess-btn");
const letterInput = document.getElementById("letter");

// Fonction pour récupérer un mot depuis l'API
function fetchWord() {
    fetch("https://trouve-mot.fr/api/random/1")
        .then((response) => response.json())
        .then((words) => {
            wordToGuess = words[0].name.toUpperCase();  // Récupère le mot et le met en majuscules
            console.log("Mot à deviner:", wordToGuess);
            initializeGame();
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des mots :", error);
        });
}

// Initialise le jeu avec le mot récupéré
function initializeGame() {
    displayedWord = Array(wordToGuess.length).fill('_');
    wordElement.textContent = displayedWord.join(' '); // Affiche les underscores
    incorrectGuesses = [];
    attemptsLeft = 6; // Reset des tentatives
    incorrectGuessesElement.textContent = "";
    letterInput.value = ''; // Réinitialise le champ de saisie
    letterInput.focus(); // Place le curseur dans le champ de saisie
}

// Vérifie la lettre entrée et met à jour l'affichage
function makeGuess() {
    const guess = letterInput.value.toUpperCase();
    letterInput.value = ''; // Efface la saisie

    if (guess.length === 1 && /^[A-Z]$/.test(guess)) { // Vérifie si c'est une lettre valide
        if (incorrectGuesses.includes(guess) || displayedWord.includes(guess)) {
            alert("Vous avez déjà deviné cette lettre.");
            return;
        }

        if (wordToGuess.includes(guess)) {
            // Mise à jour des underscores avec la lettre devinée
            for (let i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === guess) {
                    displayedWord[i] = guess;
                }
            }

            wordElement.textContent = displayedWord.join(' '); // Affiche la nouvelle version du mot

            // Vérifie si le mot est entièrement deviné
            if (!displayedWord.includes('_')) {
                alert("Bravo, vous avez gagné !");
            }
        } else {
            // Si la lettre n'est pas dans le mot, l'ajoute aux mauvaises tentatives
            incorrectGuesses.push(guess);
            incorrectGuessesElement.textContent = incorrectGuesses.join(', ');

            attemptsLeft--;
            if (attemptsLeft === 0) {
                alert("Désolé, vous avez perdu ! Le mot était : " + wordToGuess);
            }
        }
    } else {
        alert("Veuillez entrer une lettre valide.");
    }
}

// rejouer
const retry = document.getElementById('retry');
retry.addEventListener("click", fetchWord);

// Ajout d'un écouteur pour le bouton "Deviner"
guessButton.addEventListener("click", makeGuess);

// Démarre le jeu en récupérant un mot
fetchWord();
