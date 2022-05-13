window.addEventListener('DOMContentLoaded', () => {
    const gameId = getParameterByName("gameId");
    const game = Games.getGames().find(el => el.id === gameId);
    const stat = Statistics.getStatistics()[gameId];
    const cardsWrapper = document.getElementById('cards-wrapper');
    Object.keys(game.questions).forEach((key, index) => {
        const question = game.questions[key];
        let card = '<div class="card"><div class="card-body">';
        card += 'Вопрос №' + (index + 1) + '. ' + question.name;
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
});
