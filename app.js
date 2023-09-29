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

let pause = true;
function togglePomodoro() {
  handlePlayPause();
}

function handlePlayPause() {
  if (togglePlayBtn.getAttribute("data-toggle") === "play") {
    pause = false;
    togglePlayBtn.firstElementChild.src = "/ressources/pause.svg";
    togglePlayBtn.setAttribute("data-toggle", "pause");
  } else {
    togglePlayBtn.firstElementChild.src = "/ressources/play.svg";
    togglePlayBtn.setAttribute("data-toggle", "play");
  }
}
