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
//             if (FORM.classList.contains('success'))FORM.classList.remove('success');
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

