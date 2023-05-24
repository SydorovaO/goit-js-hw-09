const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

stopBtn.disabled = true;
const body = document.body;
startBtn.addEventListener('click', () => {
  stopBtn.disabled = false;
  startBtn.disabled = true;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtn.addEventListener('click', () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
});
