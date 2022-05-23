window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    requestGet("/users").then(r => r.json()).then(users => {
        Object.keys(users).forEach((userLogin, index) => {
            let tr = "<tr>";
            tr += "<td>" + (index + 1) + "</td>";
            tr += "<td>" + userLogin + "</td>";
            tr += "<td>" + users[userLogin].lastName + "</td>";
            tr += "<td>" + users[userLogin].firstName + "</td>";
            tr += '<td><button type="button" class="btn btn-primary" id="remove-user-' + userLogin + '">Удалить</button></td>';
            tr += "</tr>";
            tbody.appendChild(createElementFromString(tr));
            const removeGameButton = document.getElementById("remove-user-" + userLogin);
            removeGameButton.addEventListener("click", () => {
                requestPost("/user/delete", {login: userLogin}).then(r => r.json()).then(response => {
                    if (response.ok) {
                        location.reload();
                    }
                })
            })
        })
    })
});
