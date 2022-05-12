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
            let card = '<div class="card"><div class="card-body">';
            card += '<input name="question.name.' + id + '" class="form-control" placeholder="Вопрос" required>'
            card += '<div class="form-group"><label>Тип вопроса<select class="form-control" name="question.type.' + id + '">'
            card += '<option value="YESNO" selected>Да/Нет</option>'
            card += '<option value="SINGLE">Один из списка</option>'
            card += '<option value="MULTIPLE">Несколько из списка</option>'
            card += '<option value="COMMENT">Комментарий</option>'
            card += '</select></label>';
            card += "</div></div>"
            questionsWrapper.appendChild(createElementFromString(card));
            const select = document.getElementsByName("question.type." + id)[0];
            console.log(select);
        })
    }
});