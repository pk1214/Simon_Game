// Array created to store the pattern of color choices made by the Player/user.
var userClickedPattern = [];

// Array created to store patterns created by the Computer/game.
var gamePattern = [];

// Array Created for randomization.
var buttonColours = ["red", "blue", "green", "yellow"];

// Store user chosen colours as pattern and
// pass the length as level in
// checkAnswer function to compare the levels.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Starting the game from level 0. This will be further incremented
// using (++). Because yes, there is no level as level 0.
var level = 0;

// As we want the nextSequence to be executed only on one/first
// keypress we set started to false,
// then after execution of nextSequence set it to true.
// Due to this, next time a key is pressed,
// the nextSequence will not execute.
var started = false;

//very important function
function nextSequence() {
  // We create a pattern for user in which
  // his/her selected colors
  // will be stored, when he/she presses the color.
  userClickedPattern = [];

  // Creating a variable which will store any
  // random number between 0-3.
  var randomNumber = Math.floor(Math.random() * 4);

  // Creating a variable which will store a random color.
  // The random color will be accessed based on the random index position
  // generated, due to the randomNumber variable.
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // As we need to start the level from 1,
  // we write the below LINE of code.
  level++;

  // Showing the user which level are they on [level number]
  $("#level-title").text("Level " + level);

  // Adding some animation to the randomly generated color
  // [by computer/game]
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // calling the playSound function which creates a sound
  // based on the color,
  // that was generated in the variable randomChosenColour.
  // e.g. if blue was created, blue.mp3 will be played.
  playSound(randomChosenColour);
}

// This function is responsible for playing sound
// on either user click OR by game.
// Having the parameter 'name', what is does is that,
// whenever we call this function and
// write the color name/variable name
// in round brackets, the sound of that particular colour
// is searched by the function and played.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Creating an animation for the button
// pressed [by the player/user]
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // Removes the animation after 100ms of pressing the button.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Defining the logic due to which nextSequence will be executed,
// only once i.e. on first keypress only.
$(document).keypress(function () {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

// Checks the answers [proper color buttons]
// user has pressed.
function checkAnswer(currentLevel) {
  // Checks the most recent answer given by the user.
  // i.e. [recent color chosen]
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // Checks if the entire sequence is completed by the user
    // i.e. [sequence of colors]
    if (userClickedPattern.length === gamePattern.length) {
      // If both the if conditions come as true,
      // then a timeout is set.
      // If the user responds correctly,
      // the nextSequence is called in 1000ms.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else if (started) {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Once the game ends, if the user wishes to restart,
    // he/she can do so
    // by pressing any key. Once the key is pressed,
    // we remove the Game Over class and
    // call the startOver function.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // The startOver function will set the level as 0,
    // the game pattern again as empty array and
    // started value as true.
    // Setting the started value to false is the only reason,
    // due to which,
    // we are able to restart our game.
    // [as if condition gets satisfied in that function]
    // Remember: Game restart means nextSequence got executed.
    startOver();
    console.log("wrong");
  }
}

// Restarts the game setting level to 0,
// emptying the game pattern, and
// making the started variable value 'false', so as to be able to use it in then
// function where we use keypress.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
