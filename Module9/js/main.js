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
    this.isActive = false,
    this.laps =[]
    this.onTick = onTick,
    this.onPush = onPush,
    this.onLap =onLap 
}
    start() {
        if(!this.isActive) {
            this.isActive = true;
            this.startTime = new Date();
            this.startTime = new Date() - this.deltaTime;

            this.timerId = setInterval(() => {
                this.deltaTime = new Date() - this.startTime;
                let time = new Date(this.deltaTime);
                this.onTick( time )
            }, 100)
            startBtn.textContent = 'Pause';
        } else {
            this.isActive = false;
            clearInterval(this.timerId);
            startBtn.textContent = 'Continue';
        } 
    }
    reset() {
        clearInterval(this.timerId);
        this.isActive = false;
        this.startTime = 0;
        this.timerId = null;
        this.deltaTime = null;
        this.onTick(this.startTime);
        startBtn.textContent = 'Start';
        this.laps = [];
    }
    lap() {
        const lapTime = this.onPush(this.deltaTime);
        this.laps.push(lapTime);
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
