'use strict'
const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
const deleteLink = document.querySelector('a');

// Функция реализации окончания слов
const setTimeUnitEnding = (value, unit) => {
  const lastNumber = value % 10
  switch(unit) {
    case 'hours':
      if(lastNumber === 1 && value % 100 !== 11) {
        return 'час'
      }
      if(lastNumber > 1 && lastNumber < 5) {
        return 'часа'
      }
      else {
        return 'часов'
      };
      case 'minutes':
        if(lastNumber === 1 && value !== 11) {
          return 'минута'
        }
        if(lastNumber > 1 && lastNumber < 5) {
          return 'минуты'
        }
        return 'минут';
      case 'seconds':
        if(lastNumber === 1 && value !== 11) {
          return 'секунда'
        }
        if(lastNumber > 1 && lastNumber < 5) {
          return 'секунды'
        }
        return 'секунд';
  }
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
let isTimeGoObserver = false;
const createTimerAnimator = () => {
  return (seconds) => {
     const timerRealize = setInterval(() => {
      let timerHours = Math.trunc(seconds / 3600);
      let timerMinutes = Math.trunc((seconds % 3600) / 60);
      let timerSeconds = (seconds % 3600) % 60;
      if(seconds <= 0) {
        clearInterval(timerRealize)
      }
      timerEl.innerHTML = `${timerHours} ${setTimeUnitEnding(timerHours, 'hours')} 
        ${timerMinutes} ${setTimeUnitEnding(timerMinutes, 'minutes')} 
        ${timerSeconds} ${setTimeUnitEnding(timerSeconds, 'seconds')}`
      seconds -= 1
     }, 1000);
  };
};


const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/[^0-9\.]/g, "");
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = '';
});