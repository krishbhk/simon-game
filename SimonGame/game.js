var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = []
var gamePattern = [];
var level = 0
var keyPressCheck = false

$(document).keypress(function(){
  if (keyPressCheck==false) {
    level = 0;
    userClickedPattern=[];
    gamePattern = [];
    $("#level-title").text("Level " + level);
    keyPressCheck=true;
    nextSequence();
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);}
  }else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over"); }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    keyPressCheck = false;
  }
}

function nextSequence() {
  var userClickedPattern = []
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

$(".btn").click( function(){
  var userChosenColor = $(this).attr('id');
  // alert(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1)
})

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed"); }, 50);
}
