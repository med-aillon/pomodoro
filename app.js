let workTime = 1800;
let restTime = 300;

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
  currentInterval = true;

  workTime--;
  displayWork.textContent = formatTime(workTime);
  timerId = setInterval(handleTick, 1000);
}

function handlePlayPause() {
  if (togglePlayBtn.getAttribute("data-toggle") === "play") {
    pause = false;
    togglePlayBtn.firstElementChild.src = "/ressources/pause.svg";
    togglePlayBtn.setAttribute("data-toggle", "pause");
    if (workTime) {
      handleGetAnimation({ work: true, rest: false });
    } else {
      handleGetAnimation({ work: false, rest: true });
    }
  } else {
    pause = true;
    togglePlayBtn.firstElementChild.src = "/ressources/play.svg";
    togglePlayBtn.setAttribute("data-toggle", "play");
    handleGetAnimation({ work: false, rest: false });
  }
}

const cycles = document.querySelector(".cycle");
let cycleNumber = 0;

function handleTick() {
  if (!pause && workTime > 0) {
    workTime--;
    displayWork.textContent = formatTime(workTime);
    handleGetAnimation({ work: true, rest: false });
  } else if (!pause && !workTime && restTime > 0) {
    restTime--;
    displayRest.textContent = formatTime(restTime);
    handleGetAnimation({ work: false, rest: true });
  } else if (!pause && !workTime && !restTime) {
    workTime = 4;
    restTime = 3;
    displayWork.textContent = formatTime(workTime);
    displayRest.textContent = formatTime(restTime);
    cycleNumber++;
    cycles.textContent = `Cycle(s) : ${cycleNumber}`;
    handleGetAnimation({ work: true, rest: false });
  }
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function reset() {
  workTime = 1799;
  restTime = 300;

  displayWork.textContent = formatTime(workTime);
  displayRest.textContent = formatTime(restTime);

  pause = false;
  currentInterval = false;

  togglePlayBtn.firstElementChild.src = "/ressources/play.svg";
  togglePlayBtn.setAttribute("data-toggle", "play");

  cycleNumber = 0;
  cycles.textContent = `Cycle(s) : ${cycleNumber}`;

  clearInterval(timerId);
  handleGetAnimation({ work: false, rest: false });
}

function handleGetAnimation(itemState) {
  for (const item in itemState) {
    if (itemState[item]) {
      document.querySelector(`.${item}`).classList.add("active");
    } else {
      document.querySelector(`.${item}`).classList.remove("active");
    }
  }
}
