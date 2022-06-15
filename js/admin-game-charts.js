window.addEventListener('DOMContentLoaded', () => {
    const cardsWrapper = document.getElementById('cards-wrapper');
    const commonWrapper = document.getElementById("common-wrapper");
    const gameId = getParameterByName("gameId");
    requestPost('/statistic/get', {id: gameId}).then(r => r.json()).then(stat => {
        requestPost('/game/get', {id: gameId}).then(r => r.json()).then(game => {
            requestGet('/users').then(r => r.json()).then(users => {
                console.log(stat);
                const count = stat.length;
                const common = {};
                Object.keys(game.questions).forEach((key, index) => {
                    const question = game.questions[key];
                    if (!common[index]) {
                        common[index] = 0;
                    }
                    stat.forEach(el => {
                        if (question.response === el.meta[key]) {
                            common[index] = common[index] + 1;
                        }
                    })
                })
                let commonCard = '<div class="card"><div class="card-body">';
                commonCard += '<div id="common-chart" class="chart-wrapper' + (window.innerWidth < 768 ? ' chart-wrapper-mobile' : '') + '"></div>';
                commonCard += '</div></div>';
                commonWrapper.appendChild(createElementFromString(commonCard));
                Highcharts.chart('common-chart', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: Object.keys(common).map((_, idx) => (idx + 1) + " Вопрос")
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: ( // theme
                                    Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style.color
                                ) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Всего: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'Неверные ответы',
                        data: Object.values(common).map(el => count - el),
                        color: "red"
                    }, {
                        name: 'Верные ответы',
                        data: Object.values(common),
                        color: "green"
                    }, ]
                });
                Object.keys(game.questions).forEach((key, index) => {
                    const question = game.questions[key];
                    let card = '<div class="card"><div class="card-body">';
                    card += '<h5 class="header-style">Вопрос №' + (index + 1) + '. ' + question.name + " (Правильный ответ: ";
                    if (question.type === "YESNO") {
                        card += question.response === 'yes' ? "Да" : "Нет";
                    } else if (question.type === "COMMENT") {
                        card += question.response;
                    } else if (question.type === "SINGLE") {
                        card += question.answers[question.response];
                    }
                    card += ')</h5>';
                    if (question.type === "SINGLE" || question.type === "YESNO") {
                        card += '<div id="' + key + '" class="chart-wrapper' + (window.innerWidth < 768 ? ' chart-wrapper-mobile' : '') + '"></div>'
                    } else if (question.type === 'COMMENT') {
                        card += '<div id="' + key + '"></div>'
                    }
                    card += '</div></div>';
                    cardsWrapper.appendChild(createElementFromString(card));
                    if (question.type === "SINGLE" || question.type === "YESNO") {
                        const keys = [];
                        Object.values(stat).forEach(element => {
                            keys.push(element.meta[key]);
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
                            comments.push(element.meta[key]);
                        })
                        comments.forEach(comment => {
                            const row = '<div class="card"><div class="card-body">' + comment + '</div></div>';
                            wrapper.appendChild(createElementFromString(row));
                        })
                    }
                })
                const cardsUsers = document.getElementById("cards-users");
                stat.forEach(userStat => {
                    const user = users.find(el => el.login === userStat.login);
                    let userCard = '<div class="card"><div class="card-body">';
                    userCard += '<h5 class="header-style">Пользователь: ';
                    if (user) {
                        userCard += user.lastName + " " + user.firstName + " (" + user.login + ")";
                    } else {
                        userCard += "Аноним";
                    }
                    userCard += '<h5>';
                    Object.keys(userStat.meta).forEach((key, index) => {
                        const question = game.questions[key];
                        const userMeta = userStat.meta[key];
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
                    userCard += '</div></div>';
                    cardsUsers.appendChild(createElementFromString(userCard));
                })
            })
        })
    })

});
