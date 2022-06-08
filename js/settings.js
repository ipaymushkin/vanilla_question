window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    requestPost('/user/current', {login: CurrentUser.getUserLogin()}).then(r => r.json())
        .then(user => {
            if (!user) {
                location.href = "/"
            }
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const values = getValues(form);
                requestPost('/user/change', {login: CurrentUser.getUserLogin(), ...values}).then(r => r.json()).then(response => {
                    if (response.ok) {
                        showAlert("Данные успешно изменены!")
                    }
                })
            })
            const lastName = '<input id="lastName" name="lastName" class="form-control element-wrapper" placeholder="Фамилия" required autofocus value="' + user.lastName + '">';
            form.appendChild(createElementFromString(lastName));
            const firstName = '<input id="firstName" name="firstName" class="form-control element-wrapper" placeholder="Имя" required value="' + user.firstName + '">';
            form.appendChild(createElementFromString(firstName));
            const button = '<button class="btn btn-lg btn-primary btnblock" type="submit">Сохранить</button>';
            form.appendChild(createElementFromString(button));
        })
        .catch(() => location.href = "/")
});
