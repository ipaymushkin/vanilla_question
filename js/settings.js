window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const user = CurrentUser.getCurrentUser();

    if (!user) {
        location.href = "/games.js"
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        Users.updateUser(CurrentUser.getUserLogin(), values);
        showAlert("Данные успешно изменены!")
    })

    const lastName = '<input id="lastName" name="lastName" class="form-control element-wrapper" placeholder="Фамилия" required autofocus value="' + user.lastName + '">';
    form.appendChild(createElementFromString(lastName));
    const firstName = '<input id="firstName" name="firstName" class="form-control element-wrapper" placeholder="Имя" required value="' + user.firstName + '">';
    form.appendChild(createElementFromString(firstName));
    const button = '<button class="btn btn-lg btn-primary btn-block" type="submit">Сохранить</button>';
    form.appendChild(createElementFromString(button));
});
