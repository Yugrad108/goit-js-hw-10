//***************TODO 1-var Timer**************************** */
// импортируем библиотеку flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// импортируем библиотеку iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// получаем ссылки на DOM-элементы
const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// переменные для хранения даты, выбранной пользователем, и интервала таймера
let userSelectedDate;
let countdownInterval;

// настройки для flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // функция, которая будет вызвана, когда пользователь выберет дату
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            // если выбранная дата меньше текущей, то выводим ошибку
            iziToast.error({
                title: '',
                message: 'Please choose a date in the future',
                position: 'topRight'
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};

// инициализируем flatpickr
flatpickr(datetimePicker, options);

// отключаем кнопку "Старт", до тех пор, пока пользователь не выберет дату
startBtn.disabled = true;

// добавляем слушателя на кнопку "Старт"
startBtn.addEventListener('click', startCountdown);

// функция, которая будет вызвана, когда пользователь нажмет кнопку "Старт"
function startCountdown() {
    startBtn.disabled = true;
    datetimePicker.disabled = true;

    // запускаем таймер
    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            datetimePicker.disabled = false;
            updateTimer(0, 0, 0, 0);
            return;
        }

        // преобразуем разницу в днях, часах, минутах, секундах
        const { days, hours, minutes, seconds } = convertMs(diff);
        // обновляем таймер
        updateTimer(days, hours, minutes, seconds);
    }, 1000);
}

// функция, которая обновляет таймер
function updateTimer(days, hours, minutes, seconds) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
}

// функция, которая добавляет ведущие нули к цифре
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// функция, которая преобразует разницу в днях, часах, минутах, секундах
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

//***************TODO 2-var Timer**************************** */


// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// const DOM = {
//   datetimePicker: '#datetime-picker',
//   startBtn: '[data-start]',
//   days: '[data-days]',
//   hours: '[data-hours]',
//   minutes: '[data-minutes]',
//   seconds: '[data-seconds]'
// };

// const SECOND = 1000;
// const MINUTE = SECOND * 60;
// const HOUR = MINUTE * 60;
// const DAY = HOUR * 24;

// class Timer {
//   constructor() {
//     this.picker = document.querySelector(DOM.datetimePicker);
//     this.startBtn = document.querySelector(DOM.startBtn);
//     this.daysEl = document.querySelector(DOM.days);
//     this.hoursEl = document.querySelector(DOM.hours);
//     this.minutesEl = document.querySelector(DOM.minutes);
//     this.secondsEl = document.querySelector(DOM.seconds);
//     this.intervalId = null;
//     this.init();
//   }

//   init() {
//     this.setupFlatpickr();
//     this.startBtn.disabled = true;
//     this.startBtn.addEventListener('click', () => this.start());
//   }

//   setupFlatpickr() {
//     flatpickr(this.picker, {
//       enableTime: true,
//       time_24hr: true,
//       defaultDate: new Date(),
//       minuteIncrement: 1,
//       onClose: dates => this.validateDate(dates[0])
//     });
//   }

//   validateDate(date) {
//     if (date < Date.now()) {
//       iziToast.error({message: 'Please choose a date in the future', position: 'topRight'});
//       this.startBtn.disabled = true;
//     } else {
//       this.targetDate = date;
//       this.startBtn.disabled = false;
//     }
//   }

//   start() {
//     this.startBtn.disabled = true;
//     this.picker.disabled = true;
    
//     this.intervalId = setInterval(() => {
//       const diff = this.targetDate - Date.now();
      
//       if (diff <= 0) {
//         this.stop();
//         return;
//       }
      
//       this.updateDisplay(diff);
//     }, 1000);
//   }

//   stop() {
//     clearInterval(this.intervalId);
//     this.picker.disabled = false;
//     this.updateDisplay(0);
//   }

//   updateDisplay(ms) {
//     const {days, hours, minutes, seconds} = this.convertMs(ms);
//     this.daysEl.textContent = this.formatTime(days);
//     this.hoursEl.textContent = this.formatTime(hours);
//     this.minutesEl.textContent = this.formatTime(minutes);
//     this.secondsEl.textContent = this.formatTime(seconds);
//   }

//   convertMs(ms) {
//     return {
//       days: Math.floor(ms / DAY),
//       hours: Math.floor((ms % DAY) / HOUR),
//       minutes: Math.floor((ms % HOUR) / MINUTE),
//       seconds: Math.floor((ms % MINUTE) / SECOND)
//     };
//   }

//   formatTime(value) {
//     return String(value).padStart(2, '0');
//   }
// }

// new Timer();

//***************TODO 3-var Timer**************************** */


// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// const timeUnits = {
//   days: 86400000,
//   hours: 3600000,
//   minutes: 60000,
//   seconds: 1000
// };

// class AdvancedTimer {
//   #elements = {};
//   #intervalId = null;
//   #targetDate = null;

//   constructor(selectors) {
//     this.selectors = selectors;
//     this.initialize();
//   }

//   initialize() {
//     this.cacheDOM();
//     this.setupFlatpickr();
//     this.#elements.startBtn.disabled = true;
//     this.addEventListeners();
//   }

//   cacheDOM() {
//     for (const [key, selector] of Object.entries(this.selectors)) {
//       this.#elements[key] = document.querySelector(selector);
//     }
//   }

//   setupFlatpickr() {
//     this.flatpickr = flatpickr(this.#elements.datetimePicker, {
//       enableTime: true,
//       time_24hr: true,
//       defaultDate: new Date(),
//       minuteIncrement: 1,
//       onClose: dates => this.handleDateSelect(dates[0])
//     });
//   }

//   handleDateSelect(date) {
//     if (date < Date.now()) {
//       this.showError('Please choose a date in the future');
//       this.#elements.startBtn.disabled = true;
//       return;
//     }
//     this.#targetDate = date;
//     this.#elements.startBtn.disabled = false;
//   }

//   addEventListeners() {
//     this.#elements.startBtn.addEventListener('click', () => {
//       this.startCountdown();
//       this.#elements.startBtn.disabled = true;
//     });
    
//     this.#elements.datetimePicker.addEventListener('change', () => {
//       if (this.#intervalId) {
//         this.resetTimer();
//       }
//     });
//   }

//   startCountdown() {
//     this.#intervalId = setInterval(() => {
//       const diff = this.#targetDate - Date.now();
      
//       if (diff <= 0) {
//         this.resetTimer();
//         return;
//       }
      
//       this.updateUI(diff);
//     }, 1000);
//   }

//   resetTimer() {
//     clearInterval(this.#intervalId);
//     this.#intervalId = null;
//     this.#elements.datetimePicker.disabled = false;
//     this.updateUI(0);
//   }

//   updateUI(ms) {
//     Object.entries(this.calculateTime(ms)).forEach(([unit, value]) => {
//       this.#elements[unit].textContent = this.format(value);
//     });
//   }

//   calculateTime(ms) {
//     return Object.entries(timeUnits).reduce((acc, [unit, divisor]) => {
//       acc[unit] = Math.floor(ms / divisor);
//       ms %= divisor;
//       return acc;
//     }, {});
//   }

//   format(value) {
//     return String(value).padStart(2, '0');
//   }

//   showError(message) {
//     iziToast.error({message, position: 'topRight'});
//   }
// }

// new AdvancedTimer({
//   datetimePicker: '#datetime-picker',
//   startBtn: '[data-start]',
//   days: '[data-days]',
//   hours: '[data-hours]',
//   minutes: '[data-minutes]',
//   seconds: '[data-seconds]'
// });

//***************TODO 4-var Timer**************************** */


// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// const TIMER_UNITS = ['days', 'hours', 'minutes', 'seconds'];
// const UNIT_VALUES = [86400000, 3600000, 60000, 1000];

// class UltraTimer {
//   #state = {
//     targetDate: null,
//     intervalId: null,
//     elements: {}
//   };

//   constructor(selectors) {
//     this.selectors = selectors;
//     this.init();
//   }

//   init() {
//     this.cacheElements();
//     this.initFlatpickr();
//     this.initObservers();
//     this.setState('startBtn', 'disabled', true);
//   }

//   cacheElements() {
//     TIMER_UNITS.forEach(unit => {
//       this.#state.elements[unit] = document.querySelector(this.selectors[unit]);
//     });
//     this.#state.elements.datetimePicker = document.querySelector(this.selectors.datetimePicker);
//     this.#state.elements.startBtn = document.querySelector(this.selectors.startBtn);
//   }

//   initFlatpickr() {
//     this.flatpickr = flatpickr(this.#state.elements.datetimePicker, {
//       enableTime: true,
//       time_24hr: true,
//       defaultDate: new Date(),
//       minuteIncrement: 1,
//       onClose: dates => this.handleDateChange(dates[0])
//     });
//   }

//   initObservers() {
//     const handler = {
//       set: (target, property, value) => {
//         target[property] = value;
//         if (property === 'targetDate') this.validateDate(value);
//         return true;
//       }
//     };
    
//     this.stateProxy = new Proxy(this.#state, handler);
//     this.#state.elements.startBtn.addEventListener('click', () => this.start());
//   }

//   handleDateChange(date) {
//     this.stateProxy.targetDate = date;
//   }

//   validateDate(date) {
//     if (date < Date.now()) {
//       this.showError('Please choose a date in the future');
//       this.setState('startBtn', 'disabled', true);
//       return;
//     }
//     this.setState('startBtn', 'disabled', false);
//   }

//   start() {
//     this.setState('startBtn', 'disabled', true);
//     this.setState('datetimePicker', 'disabled', true);
    
//     this.stateProxy.intervalId = setInterval(() => {
//       const diff = this.#state.targetDate - Date.now();
      
//       if (diff <= 0) {
//         this.stop();
//         return;
//       }
      
//       this.animateTimer(diff);
//     }, 1000);
//   }

//   stop() {
//     clearInterval(this.#state.intervalId);
//     this.setState('datetimePicker', 'disabled', false);
//     this.animateTimer(0);
//   }

//   animateTimer(ms) {
//     const values = this.calculateTimeValues(ms);
//     TIMER_UNITS.forEach((unit, index) => {
//       const newValue = String(values[index]).padStart(2, '0');
//       if (this.#state.elements[unit].textContent !== newValue) {
//         this.#state.elements[unit].textContent = newValue;
//       }
//     });
//   }

//   calculateTimeValues(ms) {
//     return UNIT_VALUES.map(unit => {
//       const value = Math.floor(ms / unit);
//       ms %= unit;
//       return value;
//     });
//   }

//   setState(element, prop, value) {
//     this.#state.elements[element][prop] = value;
//   }

//   showError(message) {
//     iziToast.error({message, position: 'topRight'});
//   }
// }

// new UltraTimer({
//   datetimePicker: '#datetime-picker',
//   startBtn: '[data-start]',
//   days: '[data-days]',
//   hours: '[data-hours]',
//   minutes: '[data-minutes]',
//   seconds: '[data-seconds]'
// });