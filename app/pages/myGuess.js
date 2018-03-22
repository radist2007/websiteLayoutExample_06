document.addEventListener('DOMContentLoaded', function() {

  var btn = document.getElementById('btn'),
      info = document.getElementById('info__text')
      gameStep = 0,
      rundomNumber = 0;

  var stepInfoWords = [
    "Загадай число від 0 до 5!",
    "Додай таке саме",
    "Помнож на ",
    "Поділи на загадане",
    "Твій результат ",
    "Спробувати ще?"
  ];
  var stepBtnWords = [
    'Загадав!',
    'Додав!',
    'Помножив!',
    'Поділив!',
    'Хм..!)',
    'Так!',
  ];

  function getStepInfoWord(val) {
    if(val == 2) {
      return stepInfoWords[val] + rundomNumber;
    }else if(val == 4){
      return stepInfoWords[val] + rundomNumber * 2;
    }else{
      return stepInfoWords[val];
    }
  }
  function steps() {
    //console.log(gameStep);
    console.log('result: ' + rundomNumber * 2);
    gameStep++;
    info.innerHTML = getStepInfoWord(gameStep);
    btn.innerHTML = stepBtnWords[gameStep]
    if(gameStep > 4) {
      btn.removeEventListener('click', steps, false)
      gameStep = -1;
      gamePlay();
    }
  }
  function gamePlay() {
    // rundomNumber = Math.floor(Math.random() * 10);
    rundomNumber = Math.floor(Math.random()*(6-1)) + 1;
    //console.log("gamePlay: " + rundomNumber);
    btn.addEventListener('click', steps, false)
  }
  gamePlay();
});
