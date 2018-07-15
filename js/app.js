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
    deck = document.querySelector('.deck'),
    closeCross = document.querySelector('.close');

let cards = shuffle(cardsArray), //shuffle the array of cards
    openedCards = [], // Set an empty array of opened cards
    matchedCards = [], // This array helps to count the number of matched cards to know when the game is over
    moves = 0, // Set the moves counter
    counter = document.querySelector('.moves'),
    stars = document.querySelectorAll(".fa-star"),
    seconds = 0,
    minutes = 0,
    hours = 0,
    liveTimer,
    modal = document.querySelector(".overlay");

const timer = document.querySelector(".timer");



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

// 4. Add and compare 2 cards - Start movesCounter
function openCard() {
    openedCards.push(this);
    if (openedCards.length == 2) {
        // Compare the 2 cards
        testMatching();
        movesCounter();
    }
};

// 4.1  we set a test of matching cards otherwise we turn them over
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
    stopTimer();
}


// 4.2 we need to count each moves in order to set a rating of stars
movesCounter = () => {
    moves++
    counter.innerHTML = moves;
    // Set the rating with stars
    if (moves > 10 && moves <= 15) {
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

// 5. we set a timer to get the game duration
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

// 6. we reset the timer
resetTimer = () => {
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.innerHTML = "0:00";
    clearInterval(liveTimer);
}

// 7. we stop the timer at the end of the game 
stopTimer = () => {
    if (matchedCards.length == 16) {
        clearInterval(liveTimer);
    };
};
stopTimer();

// 8. Reset timer, moves number, rating and shuffle cards at the beginnig of a game
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

// 9. Adds a click event on refresh (restart) element
document.querySelector('.restart').addEventListener('click', resetGame);

