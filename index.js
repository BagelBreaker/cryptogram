const startButton = document.getElementById("startButton");
const ciphertext = document.getElementById("ciphertext");
const freq = document.getElementById("freq");
const bestTime = document.getElementById("bestTime");


let currentPB;
let currentQuote = "";
let solved = false;
let currentQuoteArr = currentQuote.split('');
let userInput = "";
let userArr = [];
let quoteArr = [];
let letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

async function aristocratCiphertext() {
    
    const quotes = await fetch("quotes.json").then(r => r.json());
    let quote1 = quotes[Math.floor(Math.random() * quotes.length)].quote.toUpperCase();
    quoteArr = shuffle([...letters]);


    const cipherMap = {};
    for (let i = 0; i < 26; i++) {
      cipherMap[letters[i]] = quoteArr[i];
    }
  
    // encrypt the quote
    const encrypted = [...quote1].map(ch =>
      /[A-Z]/.test(ch) ? cipherMap[ch] : ch
    ).join("");
  
    // return results
    return {
      plain: quote1,
      cipher: encrypted,
      map: cipherMap
    };

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
// aristocratCiphertext().then(({ plain, cipher, map }) => {
//     console.log("Plain:", plain);
//     console.log("Cipher:", cipher);
//     console.log("Map:", map);
//   });