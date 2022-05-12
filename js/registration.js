window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        const users = Users.getUsers();
        if (users[values.login]) {
            showAlert("Пользователь с тами логином уже существует!")
        } else {
            Users.setUser(values);
            showAlert("Вы будете перенаправлены на страницу авторизации!");
            showAlert("Вы успешно зарегистированы!");
            setTimeout(() => {
                window.location = "/";
            }, 5000)
        }
    });
});
