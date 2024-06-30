const guessedLettersTracker = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterGuess = document.querySelector("#letter");
const wordBeingGuessed = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const guessMessages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const directions = document.querySelector("form label");
console.log(directions.innerHTML);
let word = "funny";
let guessedLettersArray = [];
let remainingGuesses = 8;


//This function pulls a random word from a fetched list of words.
const getWord = async function () {
    const request = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const words = await request.text();
    const wordArray = words.split("\n");

    const selectRandomWord = function (wordArray) {
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        const randomWord = wordArray[randomIndex];
        console.log(`| x${randomWord}x |`);
        word = randomWord;
    };

    selectRandomWord(wordArray);
    letterDots(word);
};

//This function generates the dots for the word to be guessed. One dot per letter.
const letterDots = function (word) {
    let numLetters = word.length;
    let numDots = [];
    for (let i = 0; i < numLetters; i++) {
        numDots[i] = "●";
    };
    wordBeingGuessed.innerText = numDots.join("");
};


getWord();


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

//This function reveals the letters as they are guessed and determines if the number of guesses will change.
const wordInProgress = function (letter) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    let wordInDots = (wordBeingGuessed.innerText).split("");
    let skipCountFlag = 0;
    console.log(guessedLettersArray);
    wordArray.forEach(function (i, index) {
        if (i === letter) {
            wordInDots[index] = letter;
            skipCountFlag = 1;
        };
    });
    if (skipCountFlag == 0) countGuesses();
    const currentWordInDots = wordInDots.join("");
    wordBeingGuessed.innerText = currentWordInDots;
    winOrLoss(currentWordInDots, wordUpper)
};

//This function decrements the guesses remaining and updates the message accordingly.
const countGuesses = function () {
    remainingGuesses--;
    console.log(`Guesses remaining: ${remainingGuesses}`);
    if (remainingGuesses <= 0) {
        guessMessages.classList.add("highlight");
        guessMessages.innerText = `Sorry, you have run out of guesses. Try again?`;
        startOver();
    } else if (remainingGuesses == 1) {
        guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        guessesRemainingSpan.innerText = `${remainingGuesses} guesses`
    }
    return;
};

//This function checks if the player has guessed all the letters.
const winOrLoss = function (currentWordInDots, answer) {
    if (currentWordInDots === answer) {
        startOver();
        guessMessages.classList.add("win");
        guessMessages.innerText = 'You guessed the word correctly!';
    }
    return;
};

//This function will hide and/or reveal fields when the game ends.
const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    guessedLettersTracker.classList.add("hide");
    letterGuess.classList.add("hide");
    directions.classList.add("hide");
    playAgainButton.classList.remove("hide");
    return;
};

playAgainButton.addEventListener("click", function (e) {
    guessButton.classList.remove("hide");
    guessesRemaining.classList.remove("hide");
    guessedLettersTracker.classList.remove("hide");
    letterGuess.classList.remove("hide");
    directions.classList.remove("hide");
    playAgainButton.classList.add("hide");
    letterGuess.value = "";
    remainingGuesses = 8;
    wordInProgress.innerText = "";
    guessMessages.innerText = '';
    if (guessMessages.classList.contains("win")) guessMessages.classList.remove("win");
    if (guessMessages.classList.contains("highlight")) guessMessages.classList.remove("highlight");
    guessMessages.classList.remove("win");
    console.log(guessMessages.outerHTML);
    guessedLettersArray = [];
    guessedLettersTracker.innerHTML = "";
    guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
    getWord();
});