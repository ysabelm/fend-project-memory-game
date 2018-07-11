// Shuffle function from http://stackoverflow.com/a/2450976

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

const cards = document.querySelectorAll('.card'); //It's a NodeList and shuffle function requires an array

//From a list of cards to an array
const cardsArray = Array.from(cards);

//shuffle the list of cards using the provided "shuffle" method below
const shuffledCards = shuffle(cardsArray);

//Using deck (the parent) to append new childs e.g. the shuffled cards
const deck = document.querySelector('.deck');

for (card of shuffledCards) {
    deck.appendChild(card);
}

/*
 * Display the cards on the page
 */
//classes: open show disable---> add or remove when clicking
//add each card's HTML to the page

//Set an empty array of opened cards
let openedCards = [];
let matchedCards = []; // This array helps to count the number of matched cards to know when the game is over

$(deck).on('click', '.card', handler) //The handler "knows" that any .card is e.target

function handler() {
    //(this) refers to the clicked card
    
    // There is one opened card
    if (openedCards.length === 1) {
        $(this).toggleClass('open show disable'); // disable class prevents the card to be clicked twice
        openedCards.push(this);

        //Do the 2 cards match?
        if (this.innerHTML === openedCards[0].innerHTML) {
            $(this).toggleClass('match');
            $(openedCards[0]).toggleClass('match');

            // Adds the 2 matched cards in the array
            matchedCards.push(this, openedCards[0]);

            openedCards = []; // Reinitialize to avoid adding other cards that therefore won't respond match condition (2 cards)

        } else {
            // To avoid that cards turn too quickly, use the setTimeout function
            setTimeout(function () {
                $(this).toggleClass('open show disable');
                $(openedCards[0]).toggle('open show disable');
                openedCards = []; // Has to be included in the function; otherwise it still fills up
            }, 400);
        }

    } else {
        //There is no opened card
        $(this).toggleClass('open show');
        openedCards.push(this);
    }
};





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Start the game

function init() {

    // Adds handler (or click) function
    handler();
}





// The game ends when all cards match
function endGame() {
    if (matchedCards.length === cards.length) {
        alert('Bravo, you did it!');
    }
}

// Reset the game
const resetButton = document.querySelector(".restart");
resetButton.addEventListener("click", function () {
    // Refresh the game
    deck.innerHTML = "";
    // Call `init` to display new cards and start to play (click)
    init();

    // Reset the game
    reset();

});