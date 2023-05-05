var instructions = document.getElementById("instructions")
var startBtn = document.getElementById("startBtn")
var quiz = document.getElementById("quiz")
var questionHeader = document.getElementById("questionHeader")
var answerList = document.getElementById("answerList")

var questions = [
    {
        question: "What color is the sky?",
        choices: ["Blue", "Pink", "Orange", "Green"],
        correct: "Blue"
    }
]

startBtn.addEventListener("click", function() { 
    instructions.style.display = "none";
    startQuiz()
})

function startQuiz() {
    for(let i = 0; i < questions.length; i++) {
        questionHeader.innerHTML = questions[i].question
        var choicesArr = questions[i].choices;
        choicesArr.forEach(function(i) {
            var li = document.createElement("li")
            li.innerHTML = i
            answerList.append(li)
            // add event listener to li that calls a function to check if what they clicked == correct
        })
    }
}

