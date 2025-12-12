function Start() {
    const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const themeUpper = [
    "ANIMAUX TERRESTRES",
    "FRUITS",
    "LEGUMES",
    "PAYS",
    "CAPITALES",
    "CORPS",
    "MEUBLES",
    "COULEURS",
    "METIERS",
    "PRENOMS",
    "NOURRITURE",
    "BOISSONS",
    "OBJETS",
    "OUTILS",
    "JEUX VIDEO",
    "FILMS / SERIES",
    "ANIMAUX MARINS",
    "LANGUES",
    "MARQUES",
    "APPLICATIONS",
    "VILLES",
    "INSECTES"
];

    const letterDiv = document.getElementById("letter");
    const themeDiv = document.getElementById("theme");

    // Fonction pour piocher un ElEment au hasard
    function pickRandom(arr) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    const letter = pickRandom(alphabetUpper);
    const theme = pickRandom(themeUpper);

    letterDiv.textContent = letter;
    themeDiv.textContent = theme;
}

Start();