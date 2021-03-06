window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("create-button");
    if (button) {
        button.addEventListener("click", () => {
            location.href = "/admin-game-create.html"
        })
    }
    const tbody = document.getElementById("tbody_content");
    requestGet("/games").then(r => r.json()).then(response => {
        response.forEach((game, index) => {
            let tr = "<tr>";
            tr += "<td>" + (index + 1) + "</td>";
            tr += "<td>" + game.name + "</td>";
            tr += "<td>" + (game.description || "").replace(/\n/g,"<br/>") + "</td>";
            tr += "<td>" + game.complexity + "</td>";
            tr += "<td>" + Object.keys(game.questions).length + "</td>";
            tr += '<td><button type="button" class="btn btn-primary" id="remove-game-' + game.id + '">Удалить</button></td>';
            tr += "</tr>";
            tbody.appendChild(createElementFromString(tr));
            const removeGameButton = document.getElementById("remove-game-" + game.id);
            removeGameButton.addEventListener("click", () => {
                requestPost("/game/delete", {id: game.id}).then(r => r.json()).then(response => {
                    if (response.ok) {
                        location.reload();
                    }
                })
            })
        })
    })
});
