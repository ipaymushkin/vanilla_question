window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        console.log(values);
        if (values.login !== 'admin' || values.password !== 'admin') {
            showAlert("Неверная связка логин/пароль для выхода в административную панель!")
        } else {
            location.href = '/admin-game-list.html'
        }
    });
});
