


/* ==========================================================
   BUTTON BINDING
========================================================== */

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("startBtn")
        ?.addEventListener("click", () => GameController.startGame());

    document.getElementById("attackBtn")
        ?.addEventListener("click", () => GameController.playerAttack());

    document.getElementById("submitResultBtn")
        ?.addEventListener("click", () => GameController.submitComputerResult());

});
document.addEventListener("DOMContentLoaded", function () {

    const startBtn = document.getElementById("startGame");
function startGame() {

    const status = document.getElementById("gameStatus");

    status.textContent = "Status: Select Difficulty";

    showDifficultyMenu();
}
    if (startBtn) {
        startBtn.addEventListener("click", startGame);
function showFloatingCode(code) {

    const floating = document.createElement("div");
    floating.className = "floating-code";
    floating.textContent = code;

    document.body.appendChild(floating);
}
