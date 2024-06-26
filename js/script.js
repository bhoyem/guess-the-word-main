const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterGuess = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemaingSpan = document.querySelector(".remaining span");
const guessMessages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    let guessedLetter = letterGuess.value;
    console.log(guessedLetter);
    letterGuess.value = "";
});

letterDots(word);