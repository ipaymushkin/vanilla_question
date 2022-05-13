window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const gameId = getParameterByName("gameId");
    const games = Games.getGames();
    const gameDetails = games.find(el => el.id === gameId);
    if (gameDetails) {
        const title = document.getElementById("title");
        title.innerText = gameDetails.name;
        const description = document.getElementById("description");
        if (gameDetails.description) {
            description.innerText = gameDetails.description
        } else {
            description.remove();
        }
        Object.keys(gameDetails.questions).forEach((questionKey, index) => {
            const meta = gameDetails.questions[questionKey];
            let question = '<div class="card"><div class="card-body">';
            question += '<h6>Вопрос №' + (index + 1) + '. ' + meta.name + '</h6>';
            if (meta.type === 'YESNO') {
                question += '<div class="form-check-inline">';
                question += '<label class="form-check-label">';
                question += '<input required value="yes" type="radio" class="form-check-input" name="' + questionKey + '">Да';
                question += '</label>';
                question += '</div>';
                question += '<div class="form-check-inline">';
                question += '<label class="form-check-label">';
                question += '<input value="no" type="radio" class="form-check-input" name="' + questionKey + '">Нет';
                question += '</label>';
                question += '</div>';
            } else if (meta.type === 'SINGLE') {
                Object.keys(meta.answers).forEach(answerKey => {
                    const answer = meta.answers[answerKey];
                    question += '<div class="form-check-inline">';
                    question += '<label class="form-check-label">';
                    question += '<input required value="' + answerKey + '" type="radio" class="form-check-input" name="' + questionKey + '">' + answer;
                    question += '</label>';
                    question += '</div>';
                })
            } else if (meta.type === 'COMMENT') {
                question += '<textarea class="form-control" name="' + questionKey + '" id="' + questionKey + '" rows="3" placeholder="Введите ответ" required></textarea>';
            }
            question += '</div></div>';
            form.appendChild(createElementFromString(question));
        })
        const button = '<button class="btn btn-lg btn-primary btn-block" type="submit">Сохранить</button>';
        form.appendChild(createElementFromString(button));
    } else {
        location.href = "/games.html";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        Statistics.setStatistics(gameId, values);
        location.href = "/games.html";
    })
});
