window.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("tbody_content");
    const games = Games.getGames();
    games.forEach((game, index) => {
        let tr = "<tr class='table-row-clickable' id='game-" + game.id + "'>";
        tr += "<td>" + (index + 1) + "</td>";
        tr += "<td>" + game.name + "</td>";
        tr += "<td>" + (game.description || "").replace(/\n/g, "<br/>") + "</td>";
        tr += "<td>" + game.complexity + "</td>";
        tr += "<td>" + Object.keys(game.questions).length + "</td>";
        tr += "</tr>";
        tbody.appendChild(createElementFromString(tr));
        const gameTr = document.getElementById("game-" + game.id);
        gameTr.addEventListener("click", () => {
            console.log(game.id);
        })
    })
});
