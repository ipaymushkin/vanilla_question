window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    requestGet("/users").then(r => r.json()).then(users => {
        users.forEach((user, index) => {
            let tr = "<tr>";
            tr += "<td>" + (index + 1) + "</td>";
            tr += "<td>" + user.login + "</td>";
            tr += "<td>" + user.lastName + "</td>";
            tr += "<td>" + user.firstName + "</td>";
            tr += '<td><button type="button" class="btn btn-primary" id="remove-user-' + user.login + '">Удалить</button></td>';
            tr += "</tr>";
            tbody.appendChild(createElementFromString(tr));
            const removeGameButton = document.getElementById("remove-user-" + user.login);
            removeGameButton.addEventListener("click", () => {
                requestPost("/user/delete", {login: user.login}).then(r => r.json()).then(response => {
                    if (response.ok) {
                        location.reload();
                    }
                })
            })
        })
    })
});
