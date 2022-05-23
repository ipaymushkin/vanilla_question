window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    requestGet('/statistics').then(res => res.json()).then(statistics => {
        requestGet('/games').then(r => r.json()).then(response => {
            const games = Object.values(response);
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
                        // location.href = "/admin-game-charts?gameId=" + game.id;
                        location.href = "/admin-game-charts.html?gameId=" + game.id;
                    })
                }

            })
        })
    })
});
