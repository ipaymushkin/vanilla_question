window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        const users = Users.getUsers();
        if (!users[values.login] || users[values.login].password !== values.password) {
            showAlert("Пользователя с такими данными не существует!")
        } else {
            CurrentUser.setCurrentUser(values.login);
            location.href = "/games.html";
        }
    });
});
