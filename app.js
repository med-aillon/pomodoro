let workTime = 5;
let restTime = 3;

function formatTime(time) {
  return `${Math.floor(time / 60)}:${
    time % 60 < 10 ? `0${time % 60}` : time % 60
  }`;
}

const displayWork = document.querySelector(".work-display-time");
const displayRest = document.querySelector(".rest-display-time");

displayWork.textContent = formatTime(workTime);
displayRest.textContent = formatTime(restTime);

const togglePlayBtn = document.querySelector(".toggle-btn");
togglePlayBtn.addEventListener("click", togglePomodoro);

let currentInterval = false;

let pause = true;
let timerId;

function togglePomodoro() {
  handlePlayPause();
  if (currentInterval) return;

  workTime--;
  currentInterval = true;
  displayWork.textContent = formatTime(workTime);
  timerId = setInterval(() => {
    handleTick();
  }, 1000);
}

function handlePlayPause() {
  if (togglePlayBtn.getAttribute("data-toggle") === "play") {
    pause = false;
    togglePlayBtn.firstElementChild.src = "/ressources/pause.svg";
    togglePlayBtn.setAttribute("data-toggle", "pause");
  } else {
    pause = true;
    togglePlayBtn.firstElementChild.src = "/ressources/play.svg";
    togglePlayBtn.setAttribute("data-toggle", "play");
  }
}

const cycles = document.querySelector(".cycle");
let cycleNumber = 0;

function handleTick() {
  if (!pause && workTime > 0) {
    workTime--;
    displayWork.textContent = formatTime(workTime);
  } else if (!pause && !workTime && restTime > 0) {
    restTime--;
    displayRest.textContent = formatTime(restTime);
  } else if (!pause && !workTime && !restTime) {
    workTime = 4;
    restTime = 3;
    displayWork.textContent = formatTime(workTime);
    displayRest.textContent = formatTime(restTime);
    cycleNumber++;
    cycles.textContent = `Cycle(s) : ${cycleNumber}`;
  }
}
