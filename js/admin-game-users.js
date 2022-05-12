window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    const users = Users.getUsers();
    Object.keys(users).forEach((userLogin, index) => {
        let tr = "<tr>";
        tr += "<td>" + (index + 1) + "</td>";
        tr += "<td>" + userLogin + "</td>";
        tr += "<td>" + users[userLogin].lastName + "</td>";
        tr += "<td>" + users[userLogin].firstName + "</td>";
        tr += "</tr>";
        tbody.appendChild(createElementFromString(tr));
    })
});