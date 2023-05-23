import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  //   datetimePickerEl: document.getElementById('datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  timer: document.getElementsByClassName('timer'),
  field: document.getElementsByClassName('field'),
  value: document.getElementsByClassName('value'),
  label: document.getElementsByClassName('label'),
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
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    console.log(selectedDate);
    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      return;
    } else {
      startButton.removeAttribute('disabled');
      startButton.addEventListener('click', () => {
        startButton.setAttribute('disabled', 'true');
        setInterval(() => {
          const currentDate = new Date();

          console.log(convertMs(selectedDate - currentDate));
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
