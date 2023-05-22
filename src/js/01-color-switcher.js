const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

console.log(startBtn);
console.log(stopBtn);
stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', () => {
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', 'true');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
});
