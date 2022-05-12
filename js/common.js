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
