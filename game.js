var buttoncolors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){

    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});


$(".btn").click(function(){

    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playsound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel])
    {
        if(gamePattern.length=== userClickedPattern.length)
        setTimeout(function(){
            nextSequence();
            }, 1000);
    }
    else
    {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER, Press Any Key To Restart");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}


function nextSequence()
{
    userClickedPattern=[];
    level++; 
    $("#level-title").text( "Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor=buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playsound(randomChosenColor);

}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
        }, 100);
           
}


function playsound(name)
{
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();

}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
