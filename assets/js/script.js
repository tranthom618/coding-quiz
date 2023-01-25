// Start Screen Page
let homeEl = document.querySelector("#homestart");
let startBtn = document.querySelector("#startQuiz");

// Questions Screen Page
let quizEl = document.querySelector("#quiz");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");

//Game Over Screen Page Elements
let gameoverEl = document.querySelector("#gameOver");
let plnameEl = document.querySelector("#playerName");
let submitNameBtnEl = document.querySelector("#submitName");
let finalScoreEl = document.querySelector("#score");

// Button to view high scores
let highscoreBtn = document.querySelector("#viewHighs");

// Links to timer element in html
let timerEl = document.querySelector("#timer");

// Score/Stats Tracking Variables
var score = 0;
var currentQuestion = 0;
var highScores = [];
var timeStart = 5;
var secondsPassed = 0;
var interval;

// The list of questions stored as an array. Curly brackets allows more variables/arrays within the same index position.
var questions = [
    {
        title: "To open the developer tools: ",
        choices: ["Right Click -> Inspect", "Ctrl+O (Open Dev Tools!)", "Ctrl+4 (Four/for Dev Tools!)", "Ctrl+P (Produce Dev Tools!)"],
        answer: "Right Click -> Inspect"
    },

    {
        title: "Conditional statements commonly include if & else statements. What's the other one?",
        choices: ["Elvis", "Elves Fit", "Else If", "Elles Eef"],
        answer: "Else If"
    },

    {
        title: "To print a text to the console, use what syntax?",
        choices: ["console.print()", "console.say()", "siri.console()", "console.log()"],
        answer: "console.log()"
    },

    {
        title: "What language is considered the skeleton of a website?",
        choices: ["Polish", "HTML", "Vietnamese", "Seven-Up"],
        answer: "HTML"
    },

    {
        title: "Which type of variable is one that's assigned as trueor false?",
        choices: ["Boolean", "String Bean", "Boo Jeans", "Snoolean"],
        answer: "Boolean"
    },
];

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
            // By using .length, it'll move the question to the last of the array, then pushes to the nextQuestion function which will "end" the quiz.
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

    // Checks if the user has completed all the questions (it knows the number from finding the array length)
    if (currentQuestion < questions.length) {
        // Calls function to display the next question if there's still remaining questions.
        displayQuestion();
    } 
    // If all the questions have been answerred then:
    else {
        stopTimer();

        // If statement to find the remaining time and make it your score.
        if ((timeStart - secondsPassed) > 0) {score += (timeGiven - secondsPassed)};
        // Prints out player's score, hides the quiz, changes screens, shows timer zero
        finalScoreEl.textContent = score;
        hide(quizEl);
        show(gameoverEl);
        timerEl.textContent = 0;
    }
}

// Function that displays the current question
function displayQuestion() {
    // Dispays the text of the question
    questionEl.textContent = questions[currentQuestion].title;

    // Displays all the choices stored within the answers (that's within an array hence .children)
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = 
    }
}

// Adds listener to the start button and calls the apropriate functions to start the quiz
startBtn.addEventListener("click", function () {
    hide(homeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});