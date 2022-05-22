window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    const games = Games.getGames();
    const statistics = Statistics.getStatistics();
    const login = CurrentUser.getUserLogin();
    games.forEach((game, index) => {
        const values = statistics[game.id] && statistics[game.id][login];
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
            tr += getRightAnswersCount(values, game);
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
                // location.href = "/game?gameId=" + game.id;
                location.href = "/game.html?gameId=" + game.id;
            } else {
                showAlert("Вы уже ответили на вопросы этой игры!")
            }
        })
    })
});
