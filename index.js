const startButton = document.getElementById("startButton");
const ciphertext = document.getElementById("ciphertext");
const freq = document.getElementById("freq");
const bestTime = document.getElementById("bestTime");


let currentPB;
let currentQuote = "";
let solved = false;
let currentQuoteArr = currentQuote.split('');
let userInput = [];

function aristocratCiphertext() {
    
    return fetch("quotes.json")
    .then(response => response.json())
    .then(quotes => {
        const quote1 = quotes[Math.floor(Math.random() * quotes.length)];
        return quote1.quote.toUpperCase();
        
    })

}

function isSolved(userInput, quoteArr) {
    for (let i = 0; i < 26; i++) {
        if (userInput[i] != quoteArr[i]) {
            return false;
        }
    }
    return true;
}
function solveTime() {

}
function pbTime(currentPB) {
    if (currentPB > solveTime()) {
        currentPB = solveTime();
        console.log("New PB logged");
        bestTime.textContent = `Your current best time is ${currentPB}.`;
    }
}



function renderCipher(currentQuote) {
    solved = false;


    
}

// while (!solved) {
//     currentquote = aristocratCiphertext();
//     document.getElementById("startButton").onclick = renderCipher(currentQuote);

// }
