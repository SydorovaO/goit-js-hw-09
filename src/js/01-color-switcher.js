const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

console.log(startBtn);
console.log(stopBtn);
stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    console.log('ggggggggggggg');
    document.body.style.backgroundColor = getRandomHexColor();

    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', 'true');
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');
  console.log(`Interval with id ${timerId} has stopped!`);
});
