import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const delay = parseInt(formData.get('delay'));
    const state = formData.get('state');

    if (isNaN(delay) || delay < 0) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a valid positive number for delay',
            position: 'topRight'
        });
        return;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') { 
                reject(delay);
            } else {
                console.error("Помилка: Не вибрано стан.");
                return;
            }
        }, delay);
    });

    promise
        .then(delay => {
            iziToast.success({
                title: '',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .catch(delay => {
            iziToast.error({
                title: '',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        });

    event.target.reset();
}

