const FORM = document.querySelector('.mail-container');
const INPUT = document.querySelector('.input-email');
const FORM_BTN = document.querySelector('.mailing-button');
const FORM_DATA = {};
const number = '';
const url = '';
let sendingStatus = false;

INPUT.addEventListener('input', function(evt) {
    FORM_DATA[evt.target.type] = evt.target.value;

})


FORM_BTN.addEventListener('click', function() {
    sendForm(url, 'POST');

    if (sendingStatus) FORM.classList.add('success');
    
    setTimeout(() => {
        if (FORM.classList.contains('succes'))FORM.classList.remove('succes');
        if (FORM.classList.contains('error'))FORM.classList.remove('error');
        sendingStatus = false;
    }, 3000)
})

function sendForm(url, method, body = null) {
    // const headers = {
        
    // }

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers,
    }).then(response => {
        console.log(response);
        sendingStatus = response.ok;
    })
}