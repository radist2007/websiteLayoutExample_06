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
        info.innerHTML = "загадай <span>своє</span> число від 1 to 5"
        btn.removeEventListener('click', startPlay, false);
        btn.addEventListener('click', play, false);
    }


    function play() {
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
            info.innerHTML = "додай таке саме <span>своє</span> число"
        }else{
            calback()
        }
    }
    function stepTwo(obj, calback){
        if(obj.step === 1){
            obj.step += 1;
            info.innerHTML = "результат помнож на " + randomNumber;
        }else{
            calback()
        }
    }
    function stepThree(obj, calback){
        if(obj.step === 2){
            obj.step += 1;
            info.innerHTML = "тепер поділи на <span>своє перше</span> загадане число";
        }else{
            calback()
        }
    }
    function stepFour(obj) {
        document.querySelector('#info span').style.color = "red";
        info.innerHTML = "твій <span id='result'>результат</span> це число <span class='result'>" + secretNumber + "</span>!";
        endGame()
    }
    function endGame(){
        btn.removeEventListener('click', play, false);
        btn.innerHTML = "Грати ще?"
        btn.addEventListener('click', startPlay, false);
    }
});