let wordsList = [];
let currentPlayerIndex = 0;
let playersWords = [];
let numPlayers = 0;

// Récupère la liste depuis le JSON
fetch("../json/imposteur.json")
  .then(response => response.json())
  .then(data => {
      wordsList = data;
      console.log("Liste de mots chargée :", wordsList);
  });

// Tirer un mot principal et son imposteur au hasard
function pickRandomPair() {
    const pair = wordsList[Math.floor(Math.random() * wordsList.length)];
    return pair; // {main: "...", impostor: "..."}
}

// Préparer les mots pour tous les joueurs
function assignWords(num) {
    const {main, impostor} = pickRandomPair();

    // Tous les joueurs sauf un ont le mot principal
    playersWords = Array(num - 1).fill(main);
    // Ajouter le mot de l'imposteur
    playersWords.push(impostor);

    // Mélanger les mots pour que l'imposteur ne soit pas toujours à la fin
    for (let i = playersWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playersWords[i], playersWords[j]] = [playersWords[j], playersWords[i]];
    }

    currentPlayerIndex = 0;
}

// Efface le résultat affiché
function clearResult() {
    const resultDiv = document.getElementById("resultPopUp");
    resultDiv.textContent = "";
}

function clearPlayerDisplay() {
    const playerDiv = document.getElementById("players");
    playerDiv.textContent = "";
}

// Afficher le mot pour le joueur courant
let wordShown = false; // indique si le mot a déjà été montré pour le joueur courant

function showNextPlayer() {
    clearResult(); // efface le résultat à chaque nouveau joueur

    const playerDiv = document.getElementById("players");

    // Si tous les joueurs ont vu leur mot
    if (currentPlayerIndex >= playersWords.length) {
        playerDiv.textContent = "Tous les joueurs ont vu leur mot !";
        return;
    }

    if (!wordShown) {
        // Première étape : phrase pour passer la tablette
        playerDiv.textContent = `Joueur ${currentPlayerIndex + 1}, prépare-toi !`;
        wordShown = true; // au prochain clic, on montrera le mot
    } else {
        // Deuxième étape : afficher le mot
        const playerWord = playersWords[currentPlayerIndex];
        playerDiv.textContent = `Joueur ${currentPlayerIndex + 1}, voici ton mot : ${playerWord}`;
        wordShown = false; // reset pour le joueur suivant
        currentPlayerIndex++; // passe au joueur suivant
    }
}

// Démarrer la partie
document.getElementById("start-btn").addEventListener("click", () => {
    clearResult();
    numPlayers = parseInt(document.getElementById("numPlayers").value);
    if (isNaN(numPlayers) || numPlayers < 3) {
        alert("Entrez un nombre de joueurs valide (minimum 3).");
        return;
    }
    assignWords(numPlayers);
    showNextPlayer();
});

// Prochain joueur
document.getElementById("next-btn")?.addEventListener("click", () => {
    showNextPlayer();
});

// Rejouer
document.getElementById("retry")?.addEventListener("click", () => {
    clearResult();
    currentPlayerIndex = 0;
    assignWords(numPlayers);
    showNextPlayer();
});

// Résultat final
document.getElementById("result").addEventListener("click", () => {
    const impostorIndex = playersWords.findIndex(word => word !== playersWords[0]);
    const impostorWord = playersWords[impostorIndex];
    clearPlayerDisplay();

    const resultDiv = document.getElementById("resultPopUp");
    resultDiv.textContent = `Le mot était "${playersWords[0]}" pour les autres joueurs. L'imposteur est le Joueur ${impostorIndex + 1} avec le mot "${impostorWord}".`;
    resultDiv.style.fontWeight = "bold";
    resultDiv.style.marginTop = "10px";
});
