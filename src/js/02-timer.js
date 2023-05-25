import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  datetimeInput: document.getElementById('datetime-picker'),
};
const { startButton, daysEl, hoursEl, minutesEl, secondsEl, datetimeInput } =
  refs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleClose,
};
const datePicker = flatpickr('#datetime-picker', options);

startButton.disabled = true;

function handleClose(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate < options.defaultDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  } else {
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', () => {
  handleButtonClick();
});

function handleButtonClick() {
  startButton.disabled = true;
  datetimeInput.disabled = true;
  const selectedDateOnClick = datePicker.selectedDates[0];
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = selectedDateOnClick - currentDate;
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      // console.log('Timer stopped');
      datetimeInput.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    // console.log(`${days}:${hours}:${minutes}:${seconds}`);
    updateClockface({ days, hours, minutes, seconds });
  }, 1000);
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
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
