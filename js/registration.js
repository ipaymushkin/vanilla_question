window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        const users = Users.getUsers();
        console.log(users, values);
    });
});
