// Shuffle function from http://stackoverflow.com/a/2450976 provided by the project
shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Declare all variables - Global scope
const cardsList = document.querySelectorAll('.card'),
    cardsArray = Array.from(cardsList), // Shuffle function requires an array
    deck = document.querySelector('.deck');

let cards = shuffle(cardsArray), //shuffle the array of cards
    openedCards = [], // Set an empty array of opened cards
    matchedCards = [], // This array helps to count the number of matched cards to know when the game is over
    moves = 0, // Set the moves counter to empty
    counter = document.querySelector('.moves'),
    stars = document.querySelectorAll('.fa-star');

const timer = document.querySelector('.timer');

let seconds = 0,
    minutes = 0,
    hours = 0,
    liveTimer,
    timeDuration;

// 1. Remove classes at the beginning of the game
removeClasses = () => {
    for (card of cards) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        card.classList.remove('show', 'open', 'match', 'disable');
    }
}
removeClasses();

// 2. Display the cards
displayCard = function () {
    this.classList.add('open');
    this.classList.add('show');
    this.classList.add('disable');
};

// 3. Add a click event on each card using a loop
for (card of cards) {
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openCard);
};

// 4. Add and compare 2 cards - Start movesCounter, timer until all cards match.
function openCard() {
    openedCards.push(this);

    let showModal = document.querySelector('.overlay');

    if (openedCards.length == 2) {
        // Compare the 2 cards
        testMatching();
        movesCounter();
    }
    if (matchedCards.length === 16) {

        showModal.classList.add('show');

        stopTimer();
        messageScore();

    }
}

// 4.1  Set a test of matching cards otherwise turn them over
testMatching = () => {
    if (openedCards[0].innerHTML == openedCards[1].innerHTML) {
        openedCards[0].classList.toggle('match');
        openedCards[1].classList.toggle('match');
        // Adds the 2 matched cards in the array
        matchedCards.push(openedCards[0]);
        matchedCards.push(openedCards[1]);

        openedCards = [];
    } else {
        setTimeout(() => {
            openedCards[0].classList.remove('open', 'show', 'disable');
            openedCards[1].classList.remove('open', 'show', 'disable');

            openedCards = [];

        }, 600);
    }
}


// 4.2 Count each moves in order to set a rating of stars
movesCounter = () => {
    moves++
    counter.innerHTML = moves;
    // Set the rating with stars
    if (moves > 8 && moves <= 15) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'hidden';
            }
        }
    } else if (moves > 15) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'hidden';
            }
        }
    }
}

// 5. Set a timer to get the game duration
startTimer = () => {
    liveTimer = setInterval(function () {
        if (seconds < 10) {
            timer.innerHTML = `${minutes}:0${seconds}`;
        } else {
            timer.innerHTML = `${minutes}:${seconds}`;
        }
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}
startTimer();

// 6. Stop the timer if the game is finished
stopTimer = () => {
    clearInterval(liveTimer);
    timeDuration = timer.innerHTML;
}

// 7. Reset the timer
resetTimer = () => {
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.innerHTML = "0:00";
    clearInterval(liveTimer);
}

// 8. Reset all components at the beginning of a game
function resetGame() {
    // shuffle cards
    cards = shuffle(cards);
    // remove all classes from each card
    removeClasses();
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
    }
    //reset timer
    resetTimer();
}

// 9. Add a click event on refresh (restart) element
document.querySelector('.restart').addEventListener('click', resetGame);

// 10. Create modal elements
createHtmlModal = () => {
    const container = document.querySelector('.container');
    const modal = document.createElement('div');
    modal.className = "overlay";

    const popup = document.createElement('div');
    popup.className = "popup";
    modal.append(popup);

    const h2 = document.createElement('h2');
    h2.innerHTML = "Bravo! You did it!";
    popup.append(h2);

    const h3 = document.createElement('h3');
    h3.innerHTML = "Score of the game";
    popup.append(h3);

    const a = document.createElement('a');
    a.className = 'close';
    a.href = '#';
    a.innerHTML = 'x';
    popup.append(a);

    const resultScore = document.createElement('div');
    resultScore.className = 'result-score';
    popup.append(resultScore);

    const movesNumber = document.createElement('p');
    movesNumber.className = 'movesNumber';
    resultScore.append(movesNumber);

    const timeDuration = document.createElement('p');
    timeDuration.className = 'timeDuration';
    resultScore.append(timeDuration);

    const starRating = document.createElement('p');
    starRating.className = 'starRating';
    resultScore.append(starRating);

    const buttonModal = document.createElement('div');
    buttonModal.className = 'button-modal';
    popup.append(buttonModal);

    const replayButton = document.createElement('button');
    replayButton.innerHTML = 'Play Again!'
    replayButton.className = 'replay';
    buttonModal.append(replayButton);

    container.append(modal);

};
createHtmlModal();

// 11. Show output for moves, timeDuration and starRating
messageScore = () => {

    let starRating = 3;
    if (moves <= 8) {
        starRating = 3;
    } else if (moves > 8 && moves <= 15) {
        starRating = 2;
    } else {
        starRating = 1;
    }

    //showing move, rating, time on modal
    document.querySelector(".movesNumber").innerHTML = 'Moves : ' + moves;
    document.querySelector(".starRating").innerHTML = 'Stars : ' + starRating;
    document.querySelector(".timeDuration").innerHTML = 'Time :  ' + timeDuration;

    closeModal();
}

// 12. Close modal
function closeModal() {
    closeCross = document.querySelector('.close');
    showModal = document.querySelector('.overlay');

    closeCross.addEventListener("click", function () {
        showModal.classList.remove("show");
    });
}

// 13. Replay Game
function replayGame() {
    resetGame();
    showModal = document.querySelector('.overlay');
    showModal.classList.toggle('hide');
}
document.querySelector('.replay').addEventListener('click', replayGame);
