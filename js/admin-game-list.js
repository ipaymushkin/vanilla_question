window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("create-button");
    if (button) {
        console.log(button)
        button.addEventListener("click", () => {
            location.href = "/admin-game-create.html"
        })
    }
    const tbody = document.getElementById("tbody_content");
    console.log(tbody);
});
