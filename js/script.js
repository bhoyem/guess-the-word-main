const guessedLettersTracker = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterGuess = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemaingSpan = document.querySelector(".remaining span");
const guessMessages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const letterDots = function (word) {
    // console.log(word.length);
    // console.log(word[0]);
    let numLetters = word.length;
    let numDots = [];
    for (let i = 0; i < numLetters; i++) {
        numDots[i] = "●";
        // console.log(numDots[i]);
        // console.log(word[i]);
    };
    wordInProgress.innerText = numDots.join("");
    // i = i++;
};

letterDots(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessages.innerText = "";
    let guessedLetter = letterGuess.value.toUpperCase();
    // console.log(guessedLetter);
    guessInput(guessedLetter);
    console.log(guessedLetter);
    letterGuess.value = "";
});

const guessInput = function (guessedLetter) {
    const acceptedLetter = /[a-zA-Z]/;
    // console.log(guessedLetter.match(acceptedLetter));
    if (guessedLetter == "") {
        guessMessages.innerText = "You didn't enter anything...";
    } else if (guessedLetter.length > 1) {
        guessMessages.innerText = "Just one letter please";
    } else if (guessedLetter.match(acceptedLetter) == null) {
        guessMessages.innerText = "That is not an acceptable entry";
    } else {
        if (guessedLetters.includes(guessedLetter)) {
            guessMessages.innerText = `You already guessed ${guessedLetter}. Try again`;
        } else {
            guessMessages.innerText = `You guessed ${guessedLetter}`
            guessedLetters.push(guessedLetter);
            console.log(guessedLetters);
            makeGuess(guessedLetter);
            return guessedLetter;
        }
    }
};

const makeGuess = function (letter) {
    
 };