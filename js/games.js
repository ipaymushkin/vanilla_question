window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    const login = CurrentUser.getUserLogin();
    requestPost('/user-statistics', {login}).then(res => res.json()).then(statistics => {
        requestGet('/games').then(r => r.json()).then(response => {
            Object.values(response).forEach((game, index) => {
                const values = statistics.find(el => game.id === el.gameId);
                const isComplete = !!values;
                let tr = "<tr class='table-row-clickable";
                if (isComplete) {
                    tr += " table-row-complete";
                }
                tr += "' ";
                tr += "id='game-" + game.id + "'>"
                tr += "<td>" + (index + 1) + "</td>";
                tr += "<td>" + game.name + "</td>";
                tr += "<td>" + (game.description || "").replace(/\n/g, "<br/>") + "</td>";
                tr += "<td>" + game.complexity + "</td>";
                tr += "<td>";
                if (isComplete) {
                    tr += getRightAnswersCount(values.meta, game);
                } else {
                    tr += "Нет данных";
                }
                tr += "</td>";
                tr += "<td>" + Object.keys(game.questions).length + "</td>";
                tr += "</tr>";
                tbody.appendChild(createElementFromString(tr));
                const gameTr = document.getElementById("game-" + game.id);
                gameTr.addEventListener("click", () => {
                    if (!isComplete) {
                        location.href = "/game.html?gameId=" + game.id;
                    } else {
                        showAlert("Вы уже ответили на вопросы этой игры!")
                    }
                })
            })
        })
    })
});
