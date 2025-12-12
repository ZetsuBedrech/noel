document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const retryButton = document.getElementById('retry');
    const timer = document.getElementById('timer');
    const winner = document.getElementById('winner');
    let cards = [];
    let flippedCards = [];
    let matchedCards = 0;
    let gameOver = false;
    let timerInterval; // Variable pour stocker l'intervalle du timer

    // Crée un tableau de cartes avec des paires d'images
    const cardImages = [
        '../images/memorygame/imageA.jpg', '../images/memorygame/imageB.jpg', '../images/memorygame/imageC.jpg', '../images/memorygame/imageD.jpg',
        '../images/memorygame/imageE.png', '../images/memorygame/imageF.jpg', '../images/memorygame/imageG.png', '../images/memorygame/imageH.png'
    ];
    const cardsToCreate = [...cardImages, ...cardImages];


    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createCards() {
        shuffleArray(cardsToCreate);
        cardsToCreate.forEach(imageSrc => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-value', imageSrc);

            const img = document.createElement('img');
            img.setAttribute('src', imageSrc);
            img.setAttribute('alt', 'Image de la carte');
            img.classList.add('card-img');
            img.style.display = 'none';

            card.appendChild(img);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (gameOver || this.classList.contains('flipped') || flippedCards.length === 2) {
            return;
        }

        const img = this.querySelector('img');
        img.style.display = 'block';
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        const firstImg = firstCard.querySelector('img');
        const secondImg = secondCard.querySelector('img');

        if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedCards += 2;

            if (matchedCards === cards.length) {
                gameOver = true;
                winner.textContent = 'Bravo, vous avez gagné !';
                stopTimer();
            }

            flippedCards = [];
        } else {
            setTimeout(() => {
                firstImg.style.display = 'none';
                secondImg.style.display = 'none';
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    // Timer
    let startTime;
    let elapsedTime = 0;

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timer.textContent = `Temps : ${elapsedTime} s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Réinitialise le jeu
    function resetGame() {
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedCards = 0;
        gameOver = false;
        stopTimer();
    }

    // Initialise le jeu
    function startGame() {
        resetGame();
        createCards();
        startTimer();
        winner.textContent = '';
    }

    startGame();

    // Bouton Rejouer
    if (retryButton) {
        retryButton.addEventListener('click', () => {
            startGame();
        });
    } else {
        console.log("Le bouton 'Rejouer' n'a pas été trouvé.");
    }
});
