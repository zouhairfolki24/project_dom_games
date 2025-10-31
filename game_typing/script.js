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
