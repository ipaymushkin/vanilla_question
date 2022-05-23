window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        requestPost("/auth", values).then(response => response.json()).then(response => {
            if (response.ok) {
                CurrentUser.setCurrentUser(values.login);
                location.href = "/games.html";
            } else {
                showAlert(response.message);
            }
        })
    });
});
