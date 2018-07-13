// Shuffle function from http://stackoverflow.com/a/2450976 provided by the project

function shuffle(array) {
    var currentIndex = array.length,
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

/*
 * Create a list that holds all of your cards
 */
const cardsList = document.querySelectorAll('.card');
const cardsArray = Array.from(cardsList); // Shuffle function requires an array

// remove classes from each card before starting the game
const deck = document.querySelector('.deck');
for (card of cardsArray) {
    deck.innerHTML = "";
    [].forEach.call(cardsArray, function (item) {
        deck.appendChild(item);
    });
    card.classList.remove('show', 'open', 'match', 'disable');
}

//shuffle the array of cards using the provided "shuffle" method below
const cards = shuffle(cardsArray);

//Using deck (the parent) to append new childs e.g. the shuffled cards
for (card of cards) {
    deck.appendChild(card);
}
// Display the cards
let displayCard = function () {
    this.classList.add('open');
    this.classList.add('show');
    this.classList.add('disable');
};

// Adds a click event on each card using a loop
for (card of cards) {
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openCard);
};
/*
 * Compare the cards to test the matching
 */

// Set the arrays containing cards to empty
let openedCards = []; // Set an empty array of opened cards
let matchedCards = []; // This array helps to count the number of matched cards to know when the game is over

/// Add and compare 2 cards
function openCard() {
    openedCards.push(this);
    console.log(openedCards);
    if (openedCards.length === 2) {
        // Compare the 2 cards
        testMatching();
        console.log(openedCards);
        console.log(matchedCards);
    }
};

function testMatching() {
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
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

