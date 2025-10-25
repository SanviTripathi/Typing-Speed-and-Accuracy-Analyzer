const textToType = document.getElementById("textToType");
const inputText = document.getElementById("inputText");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const resultsCard = document.getElementById("results");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect in every skill.",
  "Typing fast requires focus and patience.",
  "JavaScript is fun to learn and practice.",
  "Consistency is key to mastering anything."
];

let startTime, timerInterval;

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", submitGame);
resetBtn.addEventListener("click", resetGame);

function startGame() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  textToType.textContent = sentences[randomIndex];
  inputText.value = "";
  inputText.disabled = false;
  inputText.focus();
  startTime = new Date();
  submitBtn.disabled = false;
  resultsCard.style.display = "none";
  timerInterval = setInterval(updateTime, 1000);
}

function submitGame() {
  clearInterval(timerInterval);
  calculate();
  inputText.disabled = true;
  submitBtn.disabled = true;
  resultsCard.style.display = "block"; // Show results
}

function resetGame() {
  clearInterval(timerInterval);
  timeEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0";
  inputText.value = "";
  inputText.disabled = true;
  submitBtn.disabled = true;
  textToType.textContent = "Click 'Start' to begin typing!";
  resultsCard.style.display = "none";
}

function updateTime() {
  const currentTime = new Date();
  const seconds = Math.floor((currentTime - startTime) / 1000);
  timeEl.textContent = seconds;
}

function calculate() {
  const typed = inputText.value;
  const original = textToType.textContent;

  // Correct characters
  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) correctChars++;
  }

  // Accuracy
  const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 0;
  accuracyEl.textContent = accuracy;

  // WPM
  const minutes = (new Date() - startTime) / 60000;
  const wordsTyped = typed.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / minutes);
  wpmEl.textContent = isNaN(wpm) || !isFinite(wpm) ? 0 : wpm;

  // Time
  const seconds = Math.floor((new Date() - startTime) / 1000);
  timeEl.textContent = seconds;
}
