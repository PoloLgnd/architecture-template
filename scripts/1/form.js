// const FORM = document.querySelector('.mail-container');
// const INPUT = document.querySelector('.input-email');
// const FORM_BTN = document.querySelector('.mailing-button');
// let form_data = {};
// const url = 'https://jsonplaceholder.typicode.com/posts';
// let sendingStatus = false;

// INPUT.addEventListener('input', function(evt) {
//     form_data[evt.target.type] = evt.target.value;
// })


// FORM_BTN.addEventListener('click', function() {
//     sendForm(url, 'POST', form_data).then(data => {
//         // sendingStatus = response.ok;
//         if (sendingStatus) FORM.classList.add('success');
    
//         setTimeout(() => {
//             if (FORM.classList.contains('succes'))FORM.classList.remove('succes');
//             if (FORM.classList.contains('error'))FORM.classList.remove('error');
//             sendingStatus = false;
//         }, 3000)
//     });

//     INPUT.value = '';
//     form_data = {};
// })

// function sendForm(url, method, body = null) {
//     const headers = {
//         'Content-type': 'application/json; charset=UTF-8',
//     }

//     return fetch(url, {
//         method: method,
//         body: JSON.stringify(body),
//         headers: headers,
//     }).then(response => {
//         sendingStatus = response.ok;
//         return response.json();
//     })
// }

// новый код

const FORM = document.querySelector('.mail-container');
const INPUT = document.querySelector('.input-email');
const FORM_BTN = document.querySelector('.mailing-button');

// URL вашего Python-сервера (локально обычно 127.0.0.1)
const url = '/save_email'; 

FORM_BTN.addEventListener('click', async function() {
    const emailValue = INPUT.value.trim();
    
    if (!emailValue) {
        alert("Поле не может быть пустым");
        return;
    }

    const dataToSend = { email: emailValue };

    try {
        const response = await sendForm(url, 'POST', dataToSend);
        
        if (response.ok) {
            FORM.classList.add('success');
            INPUT.value = ''; // Очищаем поле только при успехе
        } else {
            FORM.classList.add('error');
        }
    } catch (error) {
        FORM.classList.add('error');
        console.error("Ошибка сети:", error);
    }

    // Убираем статус через 3 секунды
    setTimeout(() => {
        FORM.classList.remove('success', 'error');
    }, 3000);
});

async function sendForm(url, method, body = null) {
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    return response; // Возвращаем сам объект ответа, чтобы проверить response.ok
}
