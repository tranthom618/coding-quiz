// Start Screen Page
let homeEl = document.querySelector("#homestart");
let startBtn = document.querySelector("#startQuiz");

// Score Tracking Variables
let highscoreBtn = document.querySelector("#viewHighs");
let timerEl = document.querySelector("#timer");

var score = 0;
var currentQuestion = 0;
var highScores = [];
var timeStart = 100;
var secondsPassed = 0;
var interval;

// Timer function to start and end when time expires
function startTimer() {
    // Displays timer
    timerEl.textContent = timeStart;

    // Main code to track time and update timer. 1000 ms = 1 second
    interval = setInterval(function () {
        secondsPassed++;
        timerEl.textContent = timeStart - secondsPassed;

        // If statement to confirm when time has expired
        if (secondsPassed >= timeStart) {
            // By using .length, it'll move the question to the last of the array and "end" the quiz.
            currentQuestion = questions.length;
            nextQuestion();
        }
    }, 1000);
}

// Function when called, stops the timer.
function stopTimer() {
    clearInterval(interval);
}

// Adds listener to the start button and calls the apropriate functions to start the quiz
startBtn.addEventListener("click", function () {
    startTimer();
});

// Function that'll move on to the next question when called.
function nextQuestion() {

}