var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false;
var level = 0

//clicked by user&play sound
$(".btn").click(function (event) {
  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
  
})

$("body").keydown(function (event) {
  if (!started) {
    $("h1").text(`Level ${level+1}`)
    nextSequence()
    started = true
  }
})

function nextSequence() {
  
  userClickedPattern = []

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)
  
  level++
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100)
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function () {
        nextSequence()
      },1000)
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3")
    wrong.play()
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver()
  }
}

function startOver(){
  gamePattern = []
  level = 0
  started = false
}