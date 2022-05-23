window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const gameId = getParameterByName("gameId");
    requestPost('/game/get', {id: gameId}).then(r => r.json()).then(gameDetails => {
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
            requestPost('/statistic/add', {login: CurrentUser.getUserLogin(), meta: values, gameId}).then(r => r.json()).then(response => {
                if (response.ok) {
                    const rightAnswers = getRightAnswersCount(values, gameDetails);
                    showAlert("Количество правильных ответов: " + rightAnswers + " из " + Object.keys(values).length);
                    showAlert("Вы будете перенаправлены на страницу 'Список игр'");
                    setTimeout(() => {
                        location.href = "/games.html";
                    }, 3000);
                }
            })
        })
    }).catch(e => location.href = "/games.html")
});
