const guessedLettersTracker = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterGuess = document.querySelector("#letter");
const wordBeingGuessed = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemaingSpan = document.querySelector(".remaining span");
const guessMessages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLettersArray = [];

//This function generates the dots for the word to be guessed. One dot per letter.
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
    wordBeingGuessed.innerText = numDots.join("");
};

letterDots(word);

//This listens for the Guess! button to be clicked and then begins the process.
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessages.innerText = "";
    let guessedLetter = letterGuess.value.toUpperCase();
    const validGuess = validateGuess(guessedLetter);
    if (validGuess) makeGuess(guessedLetter);
    letterGuess.value = "";
});

//This function checks for empty input, more than letter, or non-letter inputs.
const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input == "") {
        guessMessages.innerText = "You didn't enter anything...";
    } else if (input.length > 1) {
        guessMessages.innerText = "Just one letter please";
    } else if (input.match(acceptedLetter) == null) {
        guessMessages.innerText = "That is not an acceptable entry";
    } else {
        return input;
    }
};

//This function checks if the letter has been guessed already before or not.
const makeGuess = function (letter) {
    if (guessedLettersArray.includes(letter)) {
        guessMessages.innerText = `You already guessed ${letter}. Try again`;
    } else {
        guessMessages.innerText = `You guessed ${letter}`;
        guessedLettersArray.push(letter);
        displayGuessedLetters(letter);
        return letter;
    };
};


//This is the function that displays the letters that have been guessed.
const displayGuessedLetters = function (letter) {
    guessedLettersTracker.innerHTML = "";
    for (let e of guessedLettersArray) {
        let li = document.createElement("li");
        li.innerText = e;
        guessedLettersTracker.append(li);
    };
    wordInProgress(letter);
    console.log(`tracker: ${guessedLettersArray}`);
};

//This function reveals the letters as they are guessed.
const wordInProgress = function (letter) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    let wordInDots = (wordBeingGuessed.innerText).split("");
    console.log(wordInDots);
    console.log(wordArray);
    console.log(guessedLettersArray);
    // for (const e of guessedLettersArray) {
    wordArray.forEach(function (i, index) {
        if (i === letter) {
            wordInDots[index] = letter;
        };
    });
    // };
    const currentWordInDots = wordInDots.join("");
    wordBeingGuessed.innerText = currentWordInDots;
    winOrLoss(currentWordInDots, wordUpper)
};


const winOrLoss = function(currentWordInDots, wordUpper) {
    if (currentWordInDots === wordUpper) {
        guessMessages.classList.add("win");
        guessMessages.outerHTML = '<p class="highlight win">You guessed the word correctly!</p>';
    }
};