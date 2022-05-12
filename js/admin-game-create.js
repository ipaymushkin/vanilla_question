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
});
