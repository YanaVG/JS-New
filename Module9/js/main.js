// Создайте скрипт приложения-секундомера.

// Изначально в HTML есть разметка:

// 00:00.0

// Start Lap Reset
// Добавьте следующий функционал:

// При нажатии на кнопку button.js-start, запускается таймер, который считает время со старта и до текущего момента времени, обновляя содержимое элемента p.js-time новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).

// Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', а функционал при клике превращается в оставновку секундомера без сброса значений времени.

// Если секундомер находится в состоянии паузы, текст на кнопке button.js-start меняется на 'Continue'. При следующем клике в нее, таймер продолжает отсчет времени, как будто паузы небыло, а текст меняется на 'Pause'. 
//То есть если во время нажатия 'Pause' прошло 6 секунд со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени с 6 секунд и дальше, а не с 16.

// Если секундомер находится в активном состоянии или в состоянии паузы, кнопка button.js-reset должна быть активна (на нее можно кликнуть), в противном случае disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.

// Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x

// ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

// Выполните домашнее задание используя класс с полями и методами.

// На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет динамически создана вся разметка для секундомера.

// Должна быть возможность создать сколько угодно экземпляров секундоментов на странице и все они будут работать независимо.

// К примеру:

// new Stopwatch(parentA); new Stopwatch(parentB); new Stopwatch(parentC);

// Где parent* это существующий DOM-узел.
"use strict"

const stopwatch = document.querySelector('.stopwatch');
const laps = document.querySelector(".js-laps");

function createWatch() {
    const watch = 
    `
        <p class="clockface js-clockface">00:00.0</p>
        <button class="timer-btn js-timer-start">Start</button>
        <button class="timer-btn js-take-lap">Lap</button>
        <button class="timer-btn js-timer-reset">Reset</button>
    
    `;
    return watch;
};

stopwatch.innerHTML = createWatch();

const clockface = document.querySelector(".js-clockface");
const startBtn = document.querySelector(".js-timer-start");
const lapBtn = document.querySelector(".js-take-lap");
const resetBtn = document.querySelector(".js-timer-reset");

class Timer  {
constructor ({
    onTick = () => null,
    onPush = () => null, 
    onLap = () => null
    })
    {
    this.startTime = 0,
    this.deltaTime = null,
    this.timerId = null,
    this.pauseTime = null,
    this.isActive = false,
    this.laps =[]
    this.onTick = onTick,
    this.onPush = onPush,
    this.onLap =onLap 
}
    start() {
        if(!this.isActive) {
            console.log('start');
            this.isActive = true;
            this.startTime = new Date();
            this.pauseTime = 0;
            this.startTime = new Date() - this.pauseTime;

            this.timerId = setInterval(() => {
                let currantTime = new Date();
                this.deltaTime = currantTime - this.startTime;
                let time = new Date(this.deltaTime);
                this.onTick( time )
            }, 100)
            startBtn.textContent = 'Pause';
        } else {
            this.isActive = false;
            clearInterval(this.timerId);
            this.pauseTime = this.deltaTime;
            startBtn.textContent = 'Continue';
        } 
    }
    reset() {
        clearInterval(this.timerId);
        this.isActive = false;
        this.startTime = 0;
        this.timerId = null;
        this.pauseTime = null;
        this.deltaTime = null;
        this.onTick(this.startTime);
        startBtn.textContent = 'Start';
        this.laps = [];

    }
    lap() {
        const lapTime = this.onPush(this.deltaTime);
        this.laps.push(lapTime);
        console.log('this.laps', this.laps);
        this.onLap(lapTime);
    }

};

const timer = new Timer({
    onTick: updateClockface,
    onPush: getFormattedTime,
    onLap: updateLaps
});

function getFormattedTime(time) {
   let date = new Date(time);
    let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let ms = Math.floor(date.getMilliseconds() / 100)
    return `${min}:${sec}.${ms}`;  
  };
  
  function updateClockface(time) {
    clockface.textContent = getFormattedTime(time);
  };

  function createLap(time) {
    return `<li class='lap js-lap'>${time}</li>`;
  };

  function updateLaps(time) {
    laps.innerHTML += createLap(time);
  }

  function setActiveBtn(target) {
    if(target.classList.contains('active')) {
      return;
    } 
    startBtn.classList.remove('active');
    stopBtn.classList.remove('active');
    
    target.classList.add('active');
  };

startBtn.addEventListener('click', timer.start.bind(timer));
resetBtn.addEventListener('click', timer.reset.bind(timer));
lapBtn.addEventListener('click', timer.lap.bind(timer));
