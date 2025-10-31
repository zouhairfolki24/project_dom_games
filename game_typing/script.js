const text = "This handout will help you improve your typing speed.";
const board = document.getElementById("board");
const input = document.getElementById("input");
const result = document.getElementById("result");
const speedBox = document.getElementById("speed");
const timeEl = document.getElementById("time");

let timeLeft = 60;
let timer;
let started = false;

text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    board.appendChild(span);
});

const spans = board.querySelectorAll("span");

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}


input.addEventListener("input", () => {
    const typed = input.value;

    if (!started) {
        started = true;
        startTimer();
    }

    for (let i = 0; i < spans.length; i++) {
        const currentChar = typed[i];
        const correctChar = text[i];

        if (currentChar == null) {
            spans[i].classList.remove("correct", "wrong");
        } else if (currentChar === correctChar) {
            spans[i].classList.add("correct");
            spans[i].classList.remove("wrong");
        } else {
            spans[i].classList.add("wrong");
            spans[i].classList.remove("correct");
        }
    }

    if (typed === text) {
        clearInterval(timer);
        endGame();
    }
});

function endGame() {
    input.disabled = true;

    let correct = document.querySelectorAll(".correct").length;
    let total = text.length;
    let accuracy = ((correct / total) * 100).toFixed(1);

    let words = input.value.trim().split(/\s+/).length;
    let wpm = Math.round(words / ((60 - timeLeft) / 60));

    result.textContent = "✅ Time's up!";

    speedBox.innerHTML = `
    🏁 WPM: ${isNaN(wpm) ? 0 : wpm} <br>
    🎯 Accuracy: ${accuracy}%
  `;
}