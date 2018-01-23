document.addEventListener("DOMContentLoaded", function(event) { 

    var data = locals; // locals frmo data.js
    const stepStart = 0;
    var obj = {};
    var randomNumber;
    var secretNumber;
    var languege = "ua";
    var lang = 0;

    var imgLang = document.querySelector('#imgLang');
    var info = document.querySelector('#info');
    var btn = document.querySelector('#btn');
    var toYourGuess = document.querySelector('#toYourGuess');
    var toMyGuess = document.querySelector('#toMyGuess');
    var linkToBook = document.querySelector('#linkToBook')

    imgLang.addEventListener('click', getLanguage, false);


    startPlay();

    function getLanguage() {
        if (languege === "ua") {
            languege = "uk";
            lang = 1
            document.querySelector('#imgLang').src = data.index.header.flagSrc[0];
            toYourGuess.innerHTML = data.common.YourGuess[lang];
            toMyGuess.innerHTML = data.common.MyGuess[lang];
            linkToBook.innerHTML = data.common.footer.linkToBook[lang];
            chengeLanguage();
        }else if (languege === "uk") {
            languege = "ua";
            lang = 0;
            document.querySelector('#imgLang').src = data.index.header.flagSrc[1];
            toYourGuess.innerHTML = data.common.YourGuess[lang];
            toMyGuess.innerHTML = data.common.MyGuess[lang];
            linkToBook.innerHTML = data.common.footer.linkToBook[lang];
            chengeLanguage();
        }
    }

    function chengeLanguage() {
        switch (obj.step) {
            case 0:
                info.innerHTML = data.yourGuess.main.step0[lang];
                btn.innerHTML = data.common.ok[lang];
                linkToBook.innerHTML = data.common.footer.linkToBook[lang];
                break;
            case 1:
                info.innerHTML = data.yourGuess.main.step1[lang];
                btn.innerHTML = data.common.ok[lang];
                linkToBook.innerHTML = data.common.footer.linkToBook[lang];
                break;
            case 2:
                info.innerHTML = data.yourGuess.main.step2[lang] + randomNumber;
                btn.innerHTML = data.common.ok[lang];
                linkToBook.innerHTML = data.common.footer.linkToBook[lang];
                break;
            case 3:
                info.innerHTML = data.yourGuess.main.step3[lang];
                btn.innerHTML = data.common.ok[lang];
                linkToBook.innerHTML = data.common.footer.linkToBook[lang];
                break;
            case 4: 
                info.innerHTML = data.yourGuess.main.step4[lang] + secretNumber + "</span>!";
                btn.innerHTML = data.common.playAgain[lang];
                linkToBook.innerHTML = data.common.footer.linkToBook[lang];
                break;
            default:

                break;
        }
    }

    function getRandomNumber(){
        var temp = Math.floor(Math.random()*(6-1)) + 1;
        return temp;
    }

    function startPlay(){
        randomNumber = getRandomNumber();

        obj = {
            randomNumber: randomNumber,
            step: stepStart,
        }

        secretNumber = randomNumber * 2;
        obj.step = stepStart;
        btn.innerHTML = data.common.ok[lang];
        info.innerHTML = data.yourGuess.main.step0[lang],
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
            info.innerHTML = data.yourGuess.main.step1[lang];
        }else{
            calback()
        }
    }
    function stepTwo(obj, calback){
        if(obj.step === 1){
            obj.step += 1;
            info.innerHTML = data.yourGuess.main.step2[lang] + randomNumber;
        }else{
            calback()
        }
    }
    function stepThree(obj, calback){
        if(obj.step === 2){
            obj.step += 1;
            info.innerHTML = data.yourGuess.main.step3[lang];
        }else{
            calback()
        }
    }
    function stepFour(obj) {
        document.querySelector('#info span').style.color = "red";
        info.innerHTML = data.yourGuess.main.step4[lang] + secretNumber + "</span>!";
        endGame()
    }
    function endGame(){
        btn.removeEventListener('click', play, false);
        btn.innerHTML = data.common.playAgain[lang];
        btn.addEventListener('click', startPlay, false);
    }
});