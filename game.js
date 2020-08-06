var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(".btn").click( function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio =  new Audio( "sounds/" + name + ".mp3")
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
   else {
     var wrongaudio =  new Audio( "sounds/wrong.mp3")
     wrongaudio.play();

     var gameOver = $("body");
     gameOver.addClass("game-over");
     setTimeout(function() {
       gameOver.removeClass("game-over");
     }, 200);

     $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}




function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.round(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}


function animatePress(currentColor) {
    var flash = $("#" + currentColor);
    flash.addClass("pressed");
    setTimeout(function() {
      flash.removeClass("pressed");
    }, 100);
}


$(document).keydown(function(event){


  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence()
    started = true;
  }
});



function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
