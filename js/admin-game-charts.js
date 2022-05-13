window.addEventListener('DOMContentLoaded', () => {
    const gameId = getParameterByName("gameId");
    const game = Games.getGames().find(el => el.id === gameId);
    const stat = Statistics.getStatistics()[gameId];
    const users = Users.getUsers();
    const cardsWrapper = document.getElementById('cards-wrapper');
    Object.keys(game.questions).forEach((key, index) => {
        const question = game.questions[key];
        let card = '<div class="card"><div class="card-body">';
        card += '<h5 class="header-style">Вопрос №' + (index + 1) + '. ' + question.name + '</h5>';
        if (question.type === "SINGLE" || question.type === "YESNO") {
            card += '<div id="' + key + '" class="chart-wrapper"></div>'
        } else if (question.type === 'COMMENT') {
            card += '<div id="' + key + '"></div>'
        }
        card += '</div></div>';
        cardsWrapper.appendChild(createElementFromString(card));
        if (question.type === "SINGLE" || question.type === "YESNO") {
            const keys = [];
            Object.values(stat).forEach(element => {
                keys.push(element[key]);
            })
            const counts = {};
            keys.forEach(function (x) {
                counts[x] = (counts[x] || 0) + 1;
            });
            const data = [];
            Object.keys(counts).forEach(answer => {
                if (question.type === "YESNO") {
                    data.push({
                        name: answer === 'yes' ? "Да" : "Нет",
                        y: counts[answer],
                    })
                } else if (question.type === "SINGLE") {
                    data.push({
                        name: game.questions[key].answers[answer],
                        y: counts[answer],
                    })
                }
            })
            Highcharts.chart(key, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}'
                        }
                    }
                },
                series: [{
                    name: 'Ответы',
                    colorByPoint: true,
                    data: data
                }]
            });
        } else if (question.type === 'COMMENT') {
            const wrapper = document.getElementById(key);
            const comments = [];
            Object.values(stat).forEach(element => {
                comments.push(element[key]);
            })
            comments.forEach(comment => {
                const row = '<div class="card"><div class="card-body">' + comment + '</div></div>';
                wrapper.appendChild(createElementFromString(row));
            })
        }
    })
    const cardsUsers = document.getElementById("cards-users");
    Object.keys(stat).forEach(login => {
        const userStat = stat[login];
        let userCard = '<div class="card"><div class="card-body">';
        userCard += '<h5 class="header-style">Пользователь: ';
        userCard += users[login].lastName + " " + users[login].firstName + " (" + login + ")";
        userCard += '<h5>';
        Object.keys(userStat).forEach((key, index) => {
            const question = game.questions[key];
            const userMeta = userStat[key];
            userCard += '<div class="card"><div class="card-body">';
            userCard += '<h6>Вопрос №' + (index + 1) + '. ' + question.name + '</h6>';
            userCard += '<h6>Ответ: ';
            if (question.type === 'YESNO') {
                userCard += userMeta === 'yes' ? "Да" : "Нет"
            } else if (question.type === 'SINGLE') {
                userCard += game.questions[key].answers[userMeta];
            } else if (question.type === 'COMMENT') {
                userCard += userMeta;
            }
            userCard += '</h6>';
            userCard += '</div></div>';
        })
        // userCard +=
        userCard += '</div></div>';
        cardsUsers.appendChild(createElementFromString(userCard));
    })
});
