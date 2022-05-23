window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        requestPost('/register', values).then(response => response.json()).then(response => {
            showAlert(response.message);
            if (response.ok) {
                showAlert("Вы будете перенаправлены на страницу авторизации!");
                setTimeout(() => {
                    window.location = "/";
                }, 3500)
            }
        })
    });
});
