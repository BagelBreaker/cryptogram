const startButton = document.getElementById("startButton");
const ciphertext = document.getElementById("ciphertext");
const freq = document.getElementById("freq");
const bestTime = document.getElementById("bestTime");


let currentPB;
function solveTime() {

}
function pbTime(currentPB) {
    if (currentPB > solveTime()) {
        currentPB = solveTime();
        console.log("New PB logged");
        bestTime.textContent = `Your current best time is ${currentPB}.`;
    }
}
function aristocratCipher() {
    
    fetch("quotes.json")
    .then(response => response.json())
    .then()
}