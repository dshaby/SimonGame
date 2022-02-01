buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;

$("body").one("keydown", function (event) {
    $("h1").text("Level " + level);
    nextSequence(); //Should NOW be Level 1
});


$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(lastUserAnswer) {

    if (gamePattern[lastUserAnswer] === userClickedPattern[lastUserAnswer]) {
        console.log("Success!");
        console.log("userClickedPattern: " + userClickedPattern);
        console.log("gamePattern: " + gamePattern);

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }

    else {
        playSound("wrong");
        $("h1").text("Game Over, Please Refresh");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
}