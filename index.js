var userChosenPattern = [];
var gamePattern = [];
var lvl = 1;
var started = 0;
var userlevel = 1;

function newSequence() {
  userChosenPattern = [];
  var randomNumber = Math.round(Math.random() * 3);
  var getID = $(".btn").eq(randomNumber).attr("id");
  gamePattern.push(getID);
  var toPlay = "sounds/" + getID + ".mp3";
  $(".btn").eq(randomNumber).fadeOut(20).fadeIn(20);
  var audio = new Audio(toPlay);
  audio.play();
  var texts = "Level " + lvl;
  $("#level-title").text(texts);
  lvl = lvl + 1;
}
$(".btn").click(function handler() {
  var name = $(this);
  playsound(name);
  animatePress(name);
  var boo = $(this).attr("id");
  userChosenPattern.push(boo);
  var Current = userChosenPattern.length - 1;
  check(Current);
});
function playsound(name) {
  var getID = $(name).attr("id");

  var toPlay1 = "sounds/" + getID + ".mp3";
  console.log(toPlay1);
  var audio = new Audio(toPlay1);
  audio.play();
}
function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}
$(document).on("keydown", function loop() {
  if (started === 0) {
    newSequence();
    started++;
  }
});
function check(CurrentLevel) {
  if (userChosenPattern[CurrentLevel] === gamePattern[CurrentLevel]) {
    console.log("success");

    if (userChosenPattern.length === gamePattern.length) {
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    var ausit = new Audio("sounds/wrong.mp3");
    ausit.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over"), 200;
    });
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).on("keydown", reset);
  }
}
function reset() {
  started = 0;
  lvl = 1;
  gamePattern = [];

  userChosenPattern = [];
}
