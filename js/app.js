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
const cardsList = document.querySelectorAll(".card");
const cardsArray = Array.from(cardsList); // Shuffle function requires an array

// Display the cards
let displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disable");
};
// Adds a click event on each card using a loop
for (card of cardsList) {
    card.addEventListener("click", displayCard);
};

// remove classes from each card before starting the game
const deck = document.querySelector('.deck');
for (card of cardsList) {
    deck.innerHTML = "";
    [].forEach.call(cardsList, function (item) {
        deck.appendChild(item);
    });
    card.classList.remove("show", "open", "match", "disable");
}

//shuffle the list of cards using the provided "shuffle" method below
const shuffledCards = shuffle(cardsArray);

//Using deck (the parent) to append new childs e.g. the shuffled cards
for (card of shuffledCards) {
    deck.appendChild(card);
}