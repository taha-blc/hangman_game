const KeyboardDiv = document.querySelector(".keyboard")
const wordDisplay = document.querySelector(".word-display")
const guessText = document.querySelector("#gues_table")
const picture = document.querySelector("#picture")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")
let currentWord
let wrongGuessCount
const maxGuesses = 6
let correctLetters
console.log(guessText)

const resetGame = () => {
    correctLetters = []
    wrongGuessCount = 0
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    picture.src = `images/hangman-${wrongGuessCount}.svg`
    KeyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
}



const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`
        gameModal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector('h4').innerText = `${isVictory ? 'Congarts!' : 'Game Over!'}`
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show")
    }, 300)
}

/* Buton oluşturma kodu */
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i);

    KeyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
    // console.log(String.fromCharCode(i))
}

/* Rondom Word */

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }
    else {
        wrongGuessCount++;
        picture.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`

    if (wrongGuessCount == maxGuesses) return gameOver(false)
    if (correctLetters.length == currentWord.length) return gameOver(true)

}

const getRandomWord = () => {

    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    console.log(word)
    let descript = document.querySelector("#hint");
    descript.innerHTML = hint

    currentWord = word
    resetGame();

}



getRandomWord()

playAgainBtn.addEventListener("click", getRandomWord)