const timeDisplay = document.querySelector(".time-display");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");

let timeBegan = null,
  timeStopped = null,
  stoppedDuration = 0,
  started = null;

function start() {
  if (timeBegan === null) {
    timeBegan = new Date();
  }

  if (timeStopped !== null) {
    stoppedDuration += new Date() - timeStopped;
  }
  console.log(stoppedDuration);
  started = setInterval(clockRunning, 10);
}

function stop() {
  timeStopped = new Date();
  clearInterval(started);
}

function reset() {
  clearInterval(started);
  stoppedDuration = 0;
  timeBegan = null;
  timeStopped = null;
  timeDisplay.textContent = "00:00:00.000";
}

function clockRunning() {
  let currentTime = new Date(),
    timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
    hour = timeElapsed.getUTCHours(),
    min = timeElapsed.getUTCMinutes(),
    sec = timeElapsed.getUTCSeconds(),
    ms = timeElapsed.getUTCMilliseconds();
  timeDisplay.textContent = 
  `${hour > 9 ? hour : "0" + hour}:
   ${min > 9 ? min : "0" + min}:
   ${sec > 9? sec: "0" + sec}:
   ${ms > 99 ? ms : ms > 9 ? "0" + ms: "00" +ms}
  `;
}
startBtn.addEventListener("click", () => {
  start();
});

stopBtn.addEventListener("click", () => {
  stop();
});

resetBtn.addEventListener("click", () => {
  reset();
});
