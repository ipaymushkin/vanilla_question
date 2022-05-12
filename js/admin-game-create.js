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
        meta.questions = questions;
        Games.setGame(meta);
        location.href = "/admin-game-list.html";
    });

    const addQuestion = (notRemovable) => {
        const id = makeId();
        let card = '<div class="card" id="card-' + id + '"><div class="card-body">';
        card += '<input name="question.name.' + id + '" class="form-control" placeholder="Вопрос" required>'
        card += '<div class="form-group"><label>Тип вопроса<select class="form-control" name="question.type.' + id + '">'
        card += '<option value="YESNO" selected>Да/Нет</option>'
        card += '<option value="SINGLE">Один из списка</option>'
        card += '<option value="COMMENT">Комментарий</option>'
        card += '</select></label></div>';
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
            if (event.target.value === "SINGLE") {
                let answers = '<label class="answers-container">Ответы<div class="card"><div class="card-body" id="answers-' + id + '">';
                answers += '<input name="question.answer.' + id + '.' + makeId() + '" class="form-control" placeholder="Ответ" required>'
                answers += '<input name="question.answer.' + id + '.' + makeId() + '" class="form-control" placeholder="Ответ" required>'
                answers += '</div><button type="button" class="btn btn-default" id="add-answer-' + id + '">Добавить ответ</button></div></label>';
                container.appendChild(createElementFromString(answers));
                const answersContainer = document.getElementById("answers-" + id);
                const addAnswerButton = document.getElementById("add-answer-" + id);
                addAnswerButton.addEventListener("click", () => {
                    const answerId = makeId();
                    let newAnswer = "<div class='answer-row' id='answer-" + answerId + "'>";
                    newAnswer += '<input name="question.answer.' + id + '.' + answerId + '" class="form-control" placeholder="Ответ" required>'
                    newAnswer += '<button type="button" class="btn btn-default remove-button" id="remove-answer-' + answerId + '">Удалить ответ</button>'
                    newAnswer += "</div>";
                    answersContainer.appendChild(createElementFromString(newAnswer));
                    const answerRemoveButton = document.getElementById("remove-answer-" + answerId);
                    const answerContainer = document.getElementById("answer-" + answerId)
                    answerRemoveButton.addEventListener("click", () => {
                        answerContainer.remove();
                    })
                })
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
