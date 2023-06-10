// Starting variables, assigned HTMl elements, and Q&A array
var score = 0;
var questionsIndex = 0;
var startTime = 60;
var pauseInterval = 0;
var timeSubtraction = 5;
const remainingTime = document.getElementById("remainingTime");
const startBtn = document.getElementById("start-btn");
const instructions = document.getElementById("instructions");
const wrapper = document.getElementById("content");
const createUl = document.createElement("ul");
const multiChoiceQuestions = [{
        question: "Arrays in JavaScript can be used to store _______________.",
        multipleChoices: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the above"],
        answer: "4. All of the above"
    },
    {
        question: "The condition in an if/else statement is enclosed with __________.",
        multipleChoices: ["1. Quotes", "2. Parenthesis", "3. Curly Brackets", "4. Square Brackets"],
        answer: "2. Parenthesis"
    },
    {
        question: "Commonly used data types DO NOT include:",
        multipleChoices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        multipleChoices: ["1. Quotes", "2. Curly Brackets", "3. Commas", "4. Parenthesis"],
        answer: "1. Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        multipleChoices: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. console.log"],
        answer: "4. console.log"
    },
    {
        question: "The ________ HTML element is used to link a JavaScript file to an HTML file.", 
        multipleChoices: ["1. <body>", "2. <script>", "3. <html>", "4. <link>"],
        answer: "2. <script>"
    },
    {
        question: "The length of a string is returned by the ________ method.", 
        multipleChoices: ["1. .size", "2. .index", "3. .length", "4. None of the above"],
        answer: "3. .length"
    },
    {
        question: "In an HTML file you can locate the <script> element within the _________.", 
        multipleChoices: ["1. <body>", "2. <head>", "3. <footer>", "4. <section>"],
        answer: "1. <body>"
    }
];
// Event listener to start timer, and display questions
startBtn.addEventListener("click", function() {
    if (pauseInterval === 0) {
        pauseInterval = setInterval(function() {
            startTime--;
            remainingTime.textContent = "Time: " + startTime;
            if (startTime <= 0) {
                clearInterval(pauseInterval);
                finished();
                remainingTime.textContent = "Time's Up";
            }
        }, 1000);
    }
    display(questionsIndex);
});
// Displays questions and answers
function display(questionsIndex) {
    instructions.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < multiChoiceQuestions.length; i++) {
        let userQuestions = multiChoiceQuestions[questionsIndex].question;
        var userAnswers = multiChoiceQuestions[questionsIndex].multipleChoices;
        instructions.textContent = userQuestions;
    }
    userAnswers.forEach(function(nextQuestion) {
        let listItem = document.createElement("li");
        listItem.textContent = nextQuestion;
        instructions.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
};
// Compare choices with answers
function compare(event) {
    let element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.id = "createDiv";
        if (element.textContent == multiChoiceQuestions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct!   " + multiChoiceQuestions[questionsIndex].answer;
        } else {
            startTime = startTime - timeSubtraction;
            createDiv.textContent = "Wrong! The correct answer is:  " + multiChoiceQuestions[questionsIndex].answer;
        }
    }
    // Question Index determines which question user is on
    questionsIndex++;
    if (questionsIndex >= multiChoiceQuestions.length) {
        finished();
    } else {
        display(questionsIndex);
    }
    instructions.appendChild(createDiv);
};

function finished() {
    instructions.innerHTML = "";
    remainingTime.innerHTML = "";
    const createH1 = document.createElement("h1");
    createH1.id = "createH1";
    createH1.textContent = "All Done!"
    instructions.appendChild(createH1);
    const createP = document.createElement("p");
    createP.id = "createP";
    instructions.appendChild(createP);
    
    if (startTime >= 0) {
        var timeRemaining = startTime;
        const createP2 = document.createElement("p");
        clearInterval(pauseInterval);
        createP.textContent = "Your final score is: " + timeRemaining * 2;
        instructions.appendChild(createP2);
    }
    const infoPrompt = document.createElement("label");
    infoPrompt.id = "createLabel";
    infoPrompt.textContent = "Enter initials: ";
    instructions.appendChild(infoPrompt);
    // Input initials
    const userInitials = document.createElement("input");
    userInitials.type = "text";
    userInitials.id = "initials";
    userInitials.textContent = "";
    instructions.appendChild(userInitials);
    // Submit score and initials
    const saveInfo = document.createElement("button");
    saveInfo.type = "submit";
    saveInfo.id = "Submit";
    saveInfo.textContent = "Submit";
    instructions.appendChild(saveInfo);
    // Stores initials/score in local storage
    saveInfo.addEventListener("click", function() {
        var initials = userInitials.value;
        if (initials === "") {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining * 2
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("scores.html");
        }
    })
};