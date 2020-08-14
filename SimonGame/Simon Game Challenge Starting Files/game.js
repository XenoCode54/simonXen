var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
let levelNumber = 0;
var gameStarted = false;

console.log(gamePattern);

$('.btn').click(function (e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));

})

$(document).keypress(function () {
if (gameStarted === false) {
    gameStarted = true;
    nextSequence();
    console.log(gamePattern);
}
})

// All functions down here!!

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function nextSequence() {
    var level = 'level ' + levelNumber;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    levelNumber++;
    $('h1').text(level);
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
        console.log('correct');

    } else {
        var failSound = new Audio('sounds/wrong.mp3');
        failSound.play();
        $('h1').text('Game Over, Press Any Key To Restart');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
        console.log('wrong');
    }
}

function startOver() {
levelNumber = 0;
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}