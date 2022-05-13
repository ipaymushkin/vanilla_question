window.addEventListener('DOMContentLoaded', () => {
    const statistics = Statistics.getStatistics();
    const games = Games.getGames();
    const tbody = document.getElementById("tbody_content");
    Object.keys(statistics).forEach(gameKey => {
        const stat = statistics[gameKey];
        const game = games.find(el => el.id === gameKey);
        if (game) {
            let tr = "<tr class='table-row-clickable' id='game-" + game.id + "'>";
            tr += "<td>" + game.name + "</td>";
            tr += "<td>" + game.complexity + "</td>";
            tr += "<td>" + Object.keys(game.questions).length + "</td>";
            tr += '<td>' + Object.keys(stat).length + '</td>';
            tr += "</tr>";
            tbody.appendChild(createElementFromString(tr));
            const gameTr = document.getElementById("game-" + game.id);
            gameTr.addEventListener("click", () => {
                location.href = "/admin-game-charts?gameId=" + game.id;
            })
        }

    })
});
