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



// function renderCipher(quotex) {
//     ciphertext.innerHTML = "";
//     for (let i = 0; i < quotex.length; i++) {
//         const

//         if (quotex[i] == ' ') {

//         }
//     }


    
// }
startButton.onclick = async () => {
    const { plain, cipher, map } = await aristocratCiphertext();
    currentQuote    = plain;
    currentCipher   = cipher;
    userArr         = Array(cipher.length).fill("");
    renderCipher();
  };
  
  function renderCipher() {

    ciphertext.innerHTML = "";
    bestTime.textContent = "";
  

    for (let i = 0; i < currentCipher.length; i++) {
      const ch   = currentCipher[i];
      const cell = document.createElement("span");
      cell.className = "cell";
      cell.style.display = "inline-block";
      cell.style.margin = "0 .5em";
      cell.style.textAlign = "center";
  
      if (/[A-Z]/.test(ch)) {

        const top = document.createElement("div");
        top.textContent = ch;
        top.style.fontWeight = "bold";
  

        const input = document.createElement("input");
        input.maxLength = 1;
        input.style.width = "1em";
        input.value = userArr[i] || "";
  

        const plainChar = currentQuote[i];
        const guess     = input.value;
        if (guess === "") {
          input.style.borderColor = "";
        } else if (guess === plainChar) {
          input.style.borderColor = "green";
        } else {
          input.style.borderColor = "red";
        }
  

        input.addEventListener("input", e => {
          const v = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
          for (let j = 0; j < currentCipher.length; j++) {
            if (currentCipher[j] === ch) userArr[j] = v;
          }
          renderCipher();
        });
  
        cell.appendChild(top);
        cell.appendChild(input);
      } else {
        // space or punctuation
        cell.textContent = ch;
      }
  
      ciphertext.appendChild(cell);
    }
  

    if (userArr.join("") === currentQuote) {
      bestTime.textContent = "🎉 Congratulations! You solved this quote!";
      return;  // stop here so the message isn’t immediately cleared
    }
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