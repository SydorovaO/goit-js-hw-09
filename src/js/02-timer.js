const refs = {
  timer: document.getElementsByClassName('timer'),
  field: document.getElementsByClassName('field'),
  value: document.getElementsByClassName('value'),
  label: document.getElementsByClassName('label'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const { timer, hours, minutes, seconds } = refs;
