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

// Display the cards
let displayCard = function () {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disable');
};
// Adds a click event on each card using a loop
for (card of cardsList) {
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openCard);
};

// remove classes from each card before starting the game
const deck = document.querySelector('.deck');
for (card of cardsList) {
    deck.innerHTML = "";
    [].forEach.call(cardsList, function (item) {
        deck.appendChild(item);
    });
    card.classList.remove('show', 'open', 'match', 'disable');
}

//shuffle the list of cards using the provided "shuffle" method below
const shuffledCards = shuffle(cardsArray);

//Using deck (the parent) to append new childs e.g. the shuffled cards
for (card of shuffledCards) {
    deck.appendChild(card);
}


/*
 * Compare the cards to test the matching
 */

// Set the arrays containing cards to empty
let openedCards = []; // Set an empty array of opened cards
let matchedCards = []; // This array helps to count the number of matched cards to know when the game is over

/// Add and compare 2 cards
function openCard() {
    openedCards.push(this);

    if (openedCards.length === 2) {
        // Compare the 2 cards
        testMatching();

    } else {
        openedCards.push(this);

        // Compare the 2 cards
        testMatching();
    }
};

function testMatching() {
    if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
        openedCards[0].classList.toggle('match');
        openedCards[1].classList.toggle('match');
        // Adds the 2 matched cards in the array
        matchedCards.push(openedCards[0]);
        matchedCards.push(openedCards[1]);

        openedCards = [];
    } else {
        openedCards[0].classList.toggle('open', 'show', 'disable');
        openedCards[1].classList.toggle('open', 'show', 'disable');

        openedCards = [];
    }
}