const getValues = (form) => {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

const showAlert = (text) => {
    Toastify({
        text: text,
        duration: 3000
    }).showToast();
}

const makeId = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createElementFromString(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getRightAnswersCount(values, gameDetails) {
    let rightAnswers = 0;
    Object.keys(values).forEach(questionId => {
        const answer = values[questionId];
        if (gameDetails.questions[questionId].response === answer) rightAnswers += 1;
    })
    return rightAnswers;
}

function requestGet(url) {
    return fetch("http://localhost:5050" + url, {method: "GET"});
}

function requestPost(url, body = {}) {
    return fetch("http://localhost:5050" + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
