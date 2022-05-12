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
        console.log(values);
    });

    const addQuestionButton = document.getElementById("add-question");
    const questionsWrapper = document.getElementById("questions");
    if (addQuestionButton) {
        addQuestionButton.addEventListener("click", () => {
            const id = makeId();
            let card = '<div class="card" id="card-' + id + '"><div class="card-body">';
            card += '<input name="question.name.' + id + '" class="form-control" placeholder="Вопрос" required>'
            card += '<div class="form-group"><label>Тип вопроса<select class="form-control" name="question.type.' + id + '">'
            card += '<option value="YESNO" selected>Да/Нет</option>'
            card += '<option value="SINGLE">Один из списка</option>'
            card += '<option value="MULTIPLE">Несколько из списка</option>'
            card += '<option value="COMMENT">Комментарий</option>'
            card += '</select></label></div>';
            card += '<div class="element-wrapper" id="container-' + id + '"></div>'
            card += '<div><button type="button" class="btn btn-default" id="remove-question-' + id + '">Удалить вопрос</button></div>'
            card += "</div></div>"
            questionsWrapper.appendChild(createElementFromString(card));
            const cardElement = document.getElementById("card-" + id);
            const removeQuestionButton = document.getElementById("remove-question-" + id);
            removeQuestionButton.addEventListener("click", () => {
                cardElement.remove();
            })
            const select = document.getElementsByName("question.type." + id)[0];
            const container = document.getElementById('container-' + id);
            select.addEventListener("change", (event) => {
                container.innerHTML = "";
                if (event.target.value === "SINGLE" || event.target.value === "MULTIPLE") {
                    let answers = '<label class="answers-container">Ответы<div class="card"><div class="card-body" id="answers-' + id + '">';
                    answers += '<input name="question.answer.' + id + '.' + makeId() + '" class="form-control" placeholder="Ответ" required>'
                    answers += '<input name="question.answer.' + id + '.' + makeId() + '" class="form-control" placeholder="Ответ" required>'
                    answers += '</div><button type="button" class="btn btn-default" id="add-question">Добавить ответ</button></div></label>';
                    container.appendChild(createElementFromString(answers));
                    const answersContainer = document.getElementById("answers-" + id);
                    console.log(answersContainer)
                }
            })
        })
    }
});
