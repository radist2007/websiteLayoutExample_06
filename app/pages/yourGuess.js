document.addEventListener('DOMContentLoaded', function() {

  var btn = document.getElementById('btn'),
      input = document.getElementById('input__input'),
      info = document.getElementById('info__text'),
      randomNumber = 0,
      guess = false;

  function getRundomNumber(){
    randomNumber = Math.floor(Math.random()*(101 - 1));
  }

  function checkInput (){
    var t = input.value;
    console.log("checkInput: ->" + t + '<- number!');
    if(t === ''){
      console.log("input = ''")
      info.innerHTML = 'Число не вказане!'
      input.focus()
    }else if(t > randomNumber) {
      console.log("input > " + randomNumber);
      info.innerHTML = 'За багато';
      input.focus();
      input.value = "";
      input.placeholder='Ви ввели ' + t;
    }else if(t < randomNumber){
      console.log("input < " + randomNumber);
      info.innerHTML = 'За мало'
      input.focus()
      input.value = "";
      input.placeholder='Ви ввели ' + t;
    }else if(t == randomNumber){
      console.log('input = ' + randomNumber)
      info.innerHTML = 'Вгадав! \n Спробувати ще?'
      btn.innerHTML = 'Так!'
      btn.removeEventListener('click', checkInput, false);
      btn.addEventListener('click', gamePlay, false);
    }
  }

  function keydownHandler(even){
    console.log('Enter')
    if(even.keyCode === 13){
        checkInput();
    }
  }

  function gamePlay() {
    input.value = "";
    btn.removeEventListener('click', gamePlay, false);
    btn.innerHTML = 'Ok'
    info.innerHTML = 'Я загада число від 1 до 100';
    input.focus();
    getRundomNumber();
    console.log(randomNumber);
    input.addEventListener('keydown', keydownHandler, false);
    btn.addEventListener('click', checkInput, false);
  }

  gamePlay();
});
