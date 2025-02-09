//********TODO 1-var Snackbar*****************************/

// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// const form = document.querySelector('.form');

// form.addEventListener('submit', handleSubmit);

// function handleSubmit(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const delay = parseInt(formData.get('delay'));
//     const state = formData.get('state');

//     if (isNaN(delay) || delay < 0) {
//         iziToast.warning({
//             title: 'Warning',
//             message: 'Please enter a valid positive number for delay',
//             position: 'topRight'
//         });
//         return;
//     }

//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (state === 'fulfilled') {
//                 resolve(delay);
//             } else {
//                 reject(delay);
//             }
//         }, delay);
//     });

//     promise
//         .then(delay => {
//             iziToast.success({
//                 title: 'Success',
//                 message: `✅ Fulfilled promise in ${delay}ms`,
//                 position: 'topRight'
//             });
//         })
//         .catch(delay => {
//             iziToast.error({
//                 title: 'Error',
//                 message: `❌ Rejected promise in ${delay}ms`,
//                 position: 'topRight'
//             });
//         });

//     event.target.reset();
// }

//********TODO 2-var Snackbar*****************************/

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// отримуємо посилання на елемент форми
const form = document.querySelector('.form');

// додаємо слухача на подію submit
form.addEventListener('submit', handleSubmit);

// функція обробки події submit
function handleSubmit(event) {
    // скасуємо перезавантаження сторінки
    event.preventDefault();

    // отримуємо дані з форми
    const formData = new FormData(event.target);
    const delay = parseInt(formData.get('delay'));
    const state = formData.get('state');

    // перевірка на валідність вводу
    if (isNaN(delay) || delay < 0) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a valid positive number for delay',
            position: 'topRight'
        });
        return;
    }

    // створення промісу
    const promise = new Promise((resolve, reject) => {
        // запускаємо таймер на заданий час
        setTimeout(() => {
            // якщо вибрано "fulfilled" то виконується resolve
            if (state === 'fulfilled') {
                resolve(delay);
            // якщо вибрано "rejected" то виконується reject
            } else if (state === 'rejected') { 
                reject(delay);
            } else {
                // якщо не вибрано нічого то виводимо помилку
                console.error("Помилка: Не вибрано стан.");
                return;
            }
        }, delay);
    });

    // обробка результату промісу
    promise
        .then(delay => {
            // виводимо успішне повідомлення
            iziToast.success({
                title: '',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .catch(delay => {
            // виводимо помилку
            iziToast.error({
                title: '',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        });

    // очищуємо форму
    event.target.reset();
}



//********TODO 3-var Snackbar*****************************/

// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const refs = {
//   form: document.querySelector('.form'),
//   delayInput: document.querySelector("input[name='delay']"),
//   stateInputs: document.querySelectorAll("input[name='state']"),
// };

// refs.form.addEventListener('submit', evt => {
//   evt.preventDefault();

//   const delay = refs.delayInput.value;

//   const selectedState = [...refs.stateInputs].find(
//     input => input.checked
//   )?.value;

//   if (!selectedState) return;

//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (selectedState === 'fulfilled') {
//         resolve(delay);
//       } else {
//         reject(delay);
//       }
//     }, delay);
//   });

//   promise
//     .then(delay => {
//       iziToast.success({
//         title: 'Success',
//         message: `✅ Fulfilled promise in ${delay}ms`,
//         position: 'topRight',
//       });
//     })
//     .catch(delay => {
//          iziToast.error({
//         title: 'Error',
//         message: `❌ Rejected promise in ${delay}ms`,
//         position: 'topRight',
//       });
//     });
// });