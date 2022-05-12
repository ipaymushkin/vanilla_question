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
