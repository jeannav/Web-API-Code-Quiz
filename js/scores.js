var highScoreBtn = document.getElementById("highScore");
var clearBtn = document.getElementById("clear");
var startOver = document.getElementById("startOver");

// Clear scores if wanted
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
// Start from begining
startOver.addEventListener("click", function() {
    window.location.replace("index.html");
});
// Retreives local stroage and displays
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + "'s score: " + allScores[i].score;
        highScoreBtn.appendChild(createLi);
    }
}