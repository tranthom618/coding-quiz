// Start Screen Page
let homeEl = document.querySelector("#homestart");
let startBtn = document.querySelector("#startQuiz");

// Questions Screen Page
let quizEl = document.querySelector("#quiz");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");

// Button to view high scores
let highscoreBtn = document.querySelector("#viewHighs");

// Links to timer element in html
let timerEl = document.querySelector("#timer");

// Score/Stats Tracking Variables
var score = 0;
var currentQuestion = 0;
var highScores = [];
var timeStart = 100;
var secondsPassed = 0;
var interval;

// Placeholder to store questions until it can be later figured out
var questions = [];

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


// Hides the element so the next page can show up on a clear screen
function hide(element) {
    element.style.display = "none";
}

// Shows the next page with whatever is in the brackets of show('page-name')
function show(element) {
    element.style.display = "block";
}

// Function that resets for a new game
function reset() {
    secondsPassed = 0;
    score = 0;
    currentQuestion = 0;
    timerEl.textContent = 0;
}

// Function that will display next question when called.
function nextQuestion() {
    // Array index number positioning
    currentQuestion++;

    // Checks timer
    if (currentQuestion < questions.length) {
        // Calls function to display a question
        renderQuestion();
    } 
    // If time is out, stops timer and 
    else {
        stopTimer();
        if ((timeStart - secondsPassed) > 0) {score += (timeGiven - secondsElapsed)};
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}

// Adds listener to the start button and calls the apropriate functions to start the quiz
startBtn.addEventListener("click", function () {
    hide(homeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});