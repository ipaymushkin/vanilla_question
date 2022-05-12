window.addEventListener('DOMContentLoaded', () => {
    const gameId = getParameterByName("gameId");
    console.log(gameId);
    const games = Games.getGames();
    const gameDetails = games.find(el => el.id === gameId);
    if (gameDetails) {
        console.log('ok', gameDetails);
        const title = document.getElementById("title");
        title.innerText = gameDetails.name;
    } else {
        location.href = "/games.html";
    }
});
