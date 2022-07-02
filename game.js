var color=["green","red","blue","yellow"];
var randomColors=[];
var randomcolor;
var userChosenColors=[];
var level;
var clickCounter;

function initialize()
{
   randomColors=[];
   randomcolor;
   userChosenColors=[];
   level=0;
   clickCounter=0;
}

function animateButton(userChosenColor)
{
  userChosenColor="#"+userChosenColor;

  $(userChosenColor).addClass("pressed");

  setTimeout(function () {
    $(userChosenColor).removeClass("pressed");
  }, 100);

}

//Gives random animation to buttons
function animate(randomColor)
{
  $("#"+randomColor).fadeOut(100).fadeIn(100);
}

//Produce sounds
function makeSound(randomColor)
{
  var audio=new Audio("sounds/"+randomColor+".mp3");
  audio.play();
}

//produce next Sequence
function nextSequence()
{
  level++;
  $("#level-title").text("Level "+level);

  randomColor=color[Math.floor(Math.random()*4)];
  randomColors.push(randomColor);

  animate(randomColor);
  makeSound(randomColor);

  clickCounter=0;
  userChosenColors=[];
}

//when user Sequence is wrong
function gameOver()
{
  //Chnages heading
  $("#level-title").text("Game over, Press any key to start New Game.");
  //reset Level
  level=0;
  randomColors=[];

  //Play sound on game over
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();

  //background change
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);

  //attach back event listener to document
  $(document).on("keydown",game);
}

//When game starts
function game()
{
  //Remove event listener from document
  $(document).off();
  initialize();
  nextSequence();
}

//attach event listener to document
$(document).on("keydown",game);

//attach event listener to colors
$("[type='button']").click(function(){
  var userChosenColor=$(this).attr("id");

  animateButton(userChosenColor);

  userChosenColors.push(userChosenColor);

  var sizeUserColor=userChosenColors.length;
  var sizeRandomColor=randomColors.length;

  if(randomColors[clickCounter]==userChosenColors[sizeUserColor-1] && sizeRandomColor-1==clickCounter)
  {
    setTimeout(function () {
      nextSequence();
    }, 500);
  }
  else if(randomColors[clickCounter]!=userChosenColors[sizeUserColor-1])
  gameOver();
  else
  clickCounter++;
});
