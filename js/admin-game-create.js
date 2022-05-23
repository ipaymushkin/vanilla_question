window.addEventListener('DOMContentLoaded', () => {
    const complexity = document.getElementsByName('complexity');
    complexity.forEach(element => {
        element.addEventListener("click", event => {
            complexity.forEach(el => {
                el.parentElement.classList.remove("active")
            });
            event.target.parentElement.classList.add("active");
        })
    })

    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getValues(form);
        const meta = {
            id: makeId(),
            name: values.name,
            description: values.description,
            complexity: values.complexity,
        }
        const questions = {};
        Object.keys(values).forEach(key => {
            const keyArr = key.split('.');
            if (keyArr.length === 3) {
                const questionId = keyArr[2];
                if (!questions[questionId]) {
                    questions[questionId] = {};
                }
                questions[questionId][keyArr[1]] = values[key];
            }
        })
        Object.keys(values).forEach(key => {
            const keyArr = key.split('.');
            if (keyArr.length === 4) {
                const questionId = keyArr[2];
                const answerId = keyArr[3];
                if (questions[questionId]) {
                    if (!questions[questionId].answers) {
                        questions[questionId].answers = {};
                    }
                    questions[questionId].answers[answerId] = values[key];

                }
            }
        })
        Object.keys(questions).forEach(questionKey => {
            if (questionKey !== 'answers') {
                questions[questionKey] = {
                    ...questions[questionKey],
                    response: questions.answers[questionKey],
                }
            }
        })
        delete questions.answers;
        meta.questions = questions;
        requestPost("/game/save", meta).then(r => r.json()).then(response => {
            if (response.ok) {
                location.href = "/admin-game-list.html";
            }
        })
    });

    const addYesNoBlock = (id) => {
        let answers = '<label class="answers-container" id="yesno-answers-' + id + '">Ответы<div class="card"><div class="card-body">';
        answers += '<div class="input-with-radio"><input required value="yes" type="radio" class="form-check-input" name="questions.' + id + '.answers" checked><input class="form-control" value="Да" disabled></div>';
        answers += '<div class="input-with-radio"><input required value="no" type="radio" class="form-check-input" name="questions.' + id + '.answers"><input class="form-control" value="Нет" disabled></div>';
        answers += '</div></div></label>';
        return answers;
    }

    const addQuestion = (notRemovable) => {
        const id = makeId();
        let card = '<div class="card" id="card-' + id + '"><div class="card-body">';
        card += '<input name="question.name.' + id + '" class="form-control" placeholder="Вопрос" required>';
        card += '<div class="form-group"><label>Тип вопроса<select class="form-control" name="question.type.' + id + '">';
        card += '<option value="YESNO" selected>Да/Нет</option>';
        card += '<option value="SINGLE">Один из списка</option>';
        card += '<option value="COMMENT">Комментарий</option>';
        card += '</select></label></div>';
        card += addYesNoBlock(id);
        card += '<div class="element-wrapper" id="container-' + id + '"></div>'
        if (!notRemovable) {
            card += '<div><button type="button" class="btn btn-default" id="remove-question-' + id + '">Удалить вопрос</button></div>'
        }
        card += "</div></div>"
        questionsWrapper.appendChild(createElementFromString(card));
        const cardElement = document.getElementById("card-" + id);
        const removeQuestionButton = document.getElementById("remove-question-" + id);
        if (removeQuestionButton) {
            removeQuestionButton.addEventListener("click", () => {
                cardElement.remove();
            })
        }
        const select = document.getElementsByName("question.type." + id)[0];
        const container = document.getElementById('container-' + id);
        select.addEventListener("change", (event) => {
            container.innerHTML = "";
            const yesNoAnswers = document.getElementById("yesno-answers-" + id);
            if (yesNoAnswers) yesNoAnswers.remove();
            if (event.target.value === "SINGLE") {
                let answers = '<label class="answers-container">Ответы<div class="card"><div class="card-body" id="answers-' + id + '">';
                const firstId = makeId();
                answers += '<div class="input-with-radio"><input required value="' + firstId + '" type="radio" class="form-check-input" name="questions.' + id + '.answers" checked><input name="question.answer.' + id + '.' + firstId + '" class="form-control" placeholder="Ответ" required></div>'
                const secondId = makeId();
                answers += '<div class="input-with-radio"><input required value="' + secondId + '" type="radio" class="form-check-input" name="questions.' + id + '.answers"><input name="question.answer.' + id + '.' + secondId + '" class="form-control" placeholder="Ответ" required></div>'
                answers += '</div><button type="button" class="btn btn-default" id="add-answer-' + id + '">Добавить ответ</button></div></label>';
                container.appendChild(createElementFromString(answers));
                const answersContainer = document.getElementById("answers-" + id);
                const addAnswerButton = document.getElementById("add-answer-" + id);
                addAnswerButton.addEventListener("click", () => {
                    const answerId = makeId();
                    let newAnswer = "<div class='answer-row' id='answer-" + answerId + "'>";
                    newAnswer += '<div class="input-with-radio"><input required value="' + answerId + '" type="radio" class="form-check-input" name="questions.' + id + '.answers"><input name="question.answer.' + id + '.' + answerId + '" class="form-control" placeholder="Ответ" required></div>'
                    newAnswer += '<button type="button" class="btn btn-default remove-button" id="remove-answer-' + answerId + '">Удалить ответ</button>'
                    newAnswer += "</div>";
                    answersContainer.appendChild(createElementFromString(newAnswer));
                    const answerRemoveButton = document.getElementById("remove-answer-" + answerId);
                    const answerContainer = document.getElementById("answer-" + answerId)
                    answerRemoveButton.addEventListener("click", () => {
                        answerContainer.remove();
                    })
                })
            } else if (event.target.value === "YESNO") {
                const answers = addYesNoBlock(id);
                container.appendChild(createElementFromString(answers));
            } else if (event.target.value === "COMMENT") {
                let answers = '<label class="answers-container">Ответ<div class="card"><div class="card-body">';
                answers += '<input required class="form-control" placeholder="Ответ" name="questions.' + id + '.answers">'
                answers += '</div></div></label>';
                container.appendChild(createElementFromString(answers));
            }
        })
    }


    const addQuestionButton = document.getElementById("add-question");
    const questionsWrapper = document.getElementById("questions");
    if (addQuestionButton) {
        addQuestionButton.addEventListener("click", () => {
            addQuestion();
        })
    }

    addQuestion(true);
});
