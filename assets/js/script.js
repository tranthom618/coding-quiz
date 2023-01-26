// Start Screen Page
let homeEl = document.querySelector("#homestart");
let startBtn = document.querySelector("#startQuiz");

// Questions Screen Page
let quizEl = document.querySelector("#quiz");
let questionEl = document.querySelector("#question");
let answersEl = document.querySelector("#answers");

//Game Over Screen Page Elements
let gameoverEl = document.querySelector("#gameOver");
let playernameEl = document.querySelector("#playerName");
let submitNameBtnEl = document.querySelector("#submitName");
let finalScoreEl = document.querySelector("#score");

// Highscore Leaderboard Page
let highscoresPageEl = document.querySelector("#viewHighs");
let leaderbdEl = document.querySelector("#leaderbd");
let goBackBtn = document.querySelector("#homeReturn");
let clearScoresBtn = document.querySelector("#clearBoard");

// Button to view high scores
let highscoreBtn = document.querySelector("#viewHighs");

// Links to timer element in html
let timerEl = document.querySelector("#timer");

// Score/Stats Tracking Variables
var currentQuestion = 0;
var highScores = [];
var timeStart = 60;
var secondsPassed = 0;
var interval;
var score = 0;





///////////////// Questions List/////////////////

// Curly brackets allows more variables/arrays within the same index position.
var questions = [
    { //index [0] of questions
        title: "To open the developer tools: ", // index[0] within questions[0] - It's an array within an array!
        // Below is an array of the multiple choice options within array that's within the array of questions[0]!
        choices: ["Right Click -> Inspect", "Ctrl+O (Open Dev Tools!)", "Ctrl+4 (Four/for Dev Tools!)", "Ctrl+P (Produce Dev Tools!)"], 
        answer: "Right Click -> Inspect" // The stored correct answer
    },

    { //index [1] of questions
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





///////////////// Functions List /////////////////

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

        // Prints out player's score, hides the quiz, shows the game over screen
        score = timeStart-secondsPassed;
        finalScoreEl.textContent = score;
        hide(quizEl);
        show(gameoverEl);
    }
}

// Function that displays the current question
function displayQuestion() {
    // Dispays the text of the question
    questionEl.textContent = questions[currentQuestion].title;

    // Displays all the choices stored within the answers (that's within an array hence .children)
    for (i = 0; i < answersEl.children.length; i++) {
        // For loop cycles through, using 'i' as an increment to choose which of the children[i] to show.
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQuestion].choices[i]}`;
        // First $ is used to select id= 0...3 in html under answers
        // Second $ is used to select the array questions, under the specified question #, then using i from the for loop to cycle through the answers in the array
    }
}

// Function to verify correct answer
function checkAnswer(answer) {
    // Matches the array of questions with the stored answer and the selected "choices" from the questions array
    if (questions[currentQuestion].answer == questions[currentQuestion].choices[answer.id]) {
        showCorrect("Correct!");
    }
    else {
        // Time penalty for wrong answers
        secondsPassed += 5;
        showCorrect("XX WRONG XX");
    }
}

// Function to print out timed temporary message for whether correct or wrong (cOrw = correctOrwrong)
function showCorrect(cOrw) {
    // Produces a line break
    let cOrwBr = document.createElement("br");
    // Produces a temporary div element that'll contain the message
    let cOrwMessage = document.createElement("div");
    // Uses the div element created just above to assign it the cOrw value given to the function
    cOrwMessage.textContent = cOrw;

    // Append displays the message at the end of the jumbrotron element
    document.querySelector(".jumbotron").appendChild(cOrwBr);
    document.querySelector(".jumbotron").appendChild(cOrwMessage);

    // Interval function to remove the correct/wrong message so it doesn't permanently stay - Set to show the message for 1.5 seconds
    setTimeout(function () {
        cOrwBr.remove();
        cOrwMessage.remove();
    }, 1500);

}

function displayLeader() {

}





///////////////// Event Listeners /////////////////

// Adds listener to the start button and calls the apropriate functions to start the quiz
startBtn.addEventListener("click", function () {
    //Hides starting home page
    hide(homeEl);
    // Starts timer
    startTimer();
    // Loads up the question in the elements but not yet displayed
    displayQuestion();
    // Show function displays the quiz element, showing the choices
    show(quizEl);
});

// Adds listener to the answers button and calls the function to check the answer
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

// Event Listener for the "Submit" button and the input text field for name (All on the "Game Over" Screen)
submitNameBtnEl.addEventListener("click", function () {
    let saveName = playernameEl.value
    // Creates an array that will store both player's name and their score (an array1 that contains an array2 of two objects, array2 is each istance of a quiz's score)
    let playerInfo = { username: saveName, playerScore: score };
    // Clears the stored name once it's been allocated to the playerInfo. Allows for next attempt.
    playernameEl.value = '';

    // Retrieves the locally stored array of scores and names. Uses JSON parsing to convert text format into a JS array. || Means if there's nothing stored, then [] will make it blank
    highScores = JSON.parse(localStorage.getItem("leaderbd")) || [];
    console.log(highScores);

    // Adds current score to the highScores array
    highScores.push(playerInfo);
 
    // Saves the array to local storage, uses JSON to convert array data to string data
    localStorage.setItem("leaderbd", JSON.stringify(highScores));

    // Once name is submitted, hides the Game Over screen, shows the high score leaderboard, then resets the current stats for a new quiz/game.
    hide(gameoverEl);
    displayLeader();
    reset();
});

// View Highscores Leaderboard Page Button
highscoresPageEl.addEventListener("click", function () {
    hide(homeEl);
    hide(quizEl);
    hide(gameoverEl);
    displayLeader();
    stopTimer();
    reset();
});

// Home Button after player is done viewing the Highscore Leaderboard
goBackBtn.addEventListener("click", function () {
    hide(highscoresPageEl);
    show(homeEl);
});