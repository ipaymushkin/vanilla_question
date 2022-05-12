window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        if (values.email !== 'admin@admin.ru' || values.password !== 'admin') {
            showAlert("Неверная связка логин/пароль для выхода в административную панель!")
        } else {

        }
    });
});
