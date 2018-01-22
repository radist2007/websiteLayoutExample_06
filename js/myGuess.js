document.addEventListener("DOMContentLoaded", function(event) { 

    var mysteryNumber = Math.floor(Math.random() * 100);
    var playersGuess = 0;
    const guessRemainingOnStart = 3;
    var guessesRemaining = guessRemainingOnStart;  //guess = Угадай
    var guessesMade = 0;
    var gameState = "";
    var gameWon = false;

    var input = document.querySelector('#input');
    var output = document.querySelector('#output')
    var button = document.querySelector("#btn");


    function playStart() {
        button.removeEventListener('click', playStart, false);

        console.log('playStart()');
        console.log("guessRemaining on start: " + guessesRemaining)
        console.log("playrGuess on start: " + playersGuess)

        guessesRemaining = guessRemainingOnStart;
        playersGuess = 0;
        guessesMade = 0;
        gameState = "";
        gameWon = false;

        window.addEventListener("keydown", keydownHandler, false);
        button.addEventListener("click", clickHandler, false);

        input.disabled = false;
        input.disabled = false;

    }

    playStart();

    function keydownHandler(even){
        if(even.keyCode === 13){
            validateInput();
        }
    }

    function clickHandler(){
        validateInput();
    }

    function validateInput(){
        playersGuess = parseInt(input.value);
        if(isNaN(playersGuess)){
            output.innerHTML = "Please enter a number.";
            input.value = "";
        }else{
            playGame();
        }
    }


    function playGame(){
        console.log("==============================================")
        guessesRemaining = guessesRemaining - 1;
        guessesMade = guessesMade + 1;
        gameState = " Guess: " + guessesMade + ", Reamining: " + guessesRemaining;
        console.log("guesserRemining: " + guessesRemaining)
        console.log("playersGuess: " + playersGuess)

        playersGuess = parseInt(input.value);

        if(playersGuess > mysteryNumber){
            output.innerHTML = "That's too high. " + gameState;
            input.value = "";

            if(guessesRemaining === 0){
                endGame();
            }
        }else if(playersGuess < mysteryNumber){
            output.innerHTML = "That's too low. " + gameState;
            input.value = "";

            if(guessesRemaining === 0){
                endGame();
            }
        }else if(playersGuess === mysteryNumber){
            gameWon = true;
            endGame();
        }

        // render();
    }

    // function render() {
    //     console.log("render");
    // }

    function endGame(){
        console.log('endGame()');
        if(gameWon){
            console.log('endGame() => gameWon');
            output.innerHTML = "Yes, it's " + mysteryNumber + '!' + "<br>"
            + "It only took you " + guessesMade + " guesses."; // took = взял
            button.innerHTML = "Play again";
        }else{
            console.log('endGame() => !gameWon');
            output.innerHTML = "No more guesses left!" + "<br>"
            + "The number was: " + mysteryNumber + ".";
            button.innerHTML = "Play again";
        }

        button.removeEventListener("keydown", keydownHandler, false);
        // button.disabled = true;

        window.removeEventListener("keydown", keydownHandler, false);
        input.disabled = true;

        button.addEventListener('click', playStart, false);
    }
});