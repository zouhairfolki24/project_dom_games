
const icons = ["😊", "🐶", "🍕", "🚗", "🌸", "🎈", "⚽", "🎵"];
let cards = [...icons, ...icons];
cards.sort(() => Math.random() - 0.5);

const board = document.getElementById("board");

let firstBox = null;
let secondBox = null;
let stopClick = false;

// Create Cards
cards.forEach(icon => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.icon = icon;
    box.textContent = "";
    box.addEventListener("click", flipBox);
    board.appendChild(box);
});

function flipBox() {
    if (stopClick || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.icon;

    if (!firstBox) {
        firstBox = this;
        return;
    }

    secondBox = this;
    checkMatch();
}

function checkMatch() {
    if (firstBox.dataset.icon === secondBox.dataset.icon) {
        markAsMatched();
    } else {
        hideBoxes();
    }
}

function markAsMatched() {
    firstBox.classList.add("matched");
    secondBox.classList.add("matched");
    reset();
}

function hideBoxes() {
    stopClick = true;
    setTimeout(() => {
        firstBox.classList.remove("flipped");
        secondBox.classList.remove("flipped");
        firstBox.textContent = "";
        secondBox.textContent = "";
        reset();
    }, 800);
}

function reset() {
    firstBox = null;
    secondBox = null;
    stopClick = false;
}