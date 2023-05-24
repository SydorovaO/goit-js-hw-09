import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// ==============
const refs = {
  //   datetimePickerEl: document.getElementById('datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  // timer: document.getElementsByClassName('timer'),
  // field: document.getElementsByClassName('field'),
  // value: document.getElementsByClassName('value'),
  // label: document.getElementsByClassName('label'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const { datetimePickerEl, startButton, timer, hours, minutes, seconds } = refs;
startButton.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleClose,
};
flatpickr('#datetime-picker', options);
function handleClose(selectedDates) {
  const selectedDate = selectedDates[0];
  console.log(selectedDate);
  if (selectedDate <= new Date()) {
    window.alert('Please choose a date in the future');
    return;
  } else {
    startButton.removeAttribute('disabled');
    startButton.addEventListener('click', () => {
      handleButtonClick(selectedDate);
    });
  }
}

function handleButtonClick(selectedDate) {
  startButton.setAttribute('disabled', 'true');
  const IntervalId = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = selectedDate - currentDate;
    if (deltaTime <= 0) {
      clearInterval(IntervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
    updateClockface({ days, hours, minutes, seconds });
  }, 1000);

  // function stopTime() {
  //   clearInterval(IntervalId);
  // }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
