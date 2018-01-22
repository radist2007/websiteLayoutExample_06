document.addEventListener("DOMContentLoaded", function(event) { 

    const stepStart = 0;
    var obj = {};
    var randomNumber;
    var secretNumber;
    // var gameOver = false;

    var info = document.querySelector('#info');
    var btn = document.querySelector('#btn');


    startPlay();

    function randNumFun(){
        var temp = Math.floor(Math.random()*(6-1)) + 1;
        return temp;
    }

    function startPlay(){
        randomNumber = randNumFun();

        obj = {
            randomNumber: randomNumber,
            step: stepStart,
        }

        secretNumber = randomNumber * 2;
        obj.step = stepStart;
        info.innerHTML = "guess a <span>secret</span> number from 1 to 5"
        btn.removeEventListener('click', startPlay, false);
        btn.addEventListener('click', play, false);
        console.log("rendNum: " + randomNumber);
    }


    function play() {
        console.log("play() => obj.step: " + obj.step);
        console.log("play() => obj.randomNumber: " + obj.randomNumber);
        console.log("===============================================");
        stepOne(obj, function(r){
            stepTwo(obj, function(r){
                stepThree(obj, function(r){
                    stepFour(obj)
                })
            })
        })
    }


    function stepOne(obj, calback){
        if(obj.step === 0){
            obj.step += 1;
            info.innerHTML = "add the same <span>secret</span> number"
        }else{
            calback()
        }
    }
    function stepTwo(obj, calback){
        if(obj.step === 1){
            obj.step += 1;
            info.innerHTML = "multiply by " + randomNumber;
        }else{
            calback()
        }
    }
    function stepThree(obj, calback){
        if(obj.step === 2){
            obj.step += 1;
            info.innerHTML = "divide by Your <span>secret</span> number";
        }else{
            calback()
        }
    }
    function stepFour(obj) {
        document.querySelector('#info span').style.color = "red";
        info.innerHTML = "your <span id='result'>result</span> number is <span class='result'>" + secretNumber + "</span>!";
        endGame()
    }
    function endGame(){
        btn.removeEventListener('click', play, false);
        btn.innerHTML = "Play again?"
        btn.addEventListener('click', startPlay, false);
    }
});