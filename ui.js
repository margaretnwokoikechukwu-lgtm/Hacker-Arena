/* ==========================================================
   HACKER ARENA UI SYSTEM
   Handles Visual Updates Only
========================================================== */

const UI = {

    /* ===============================
       SHOW GAME PANEL
    =============================== */
    showGamePanel() {
        document.getElementById("setupPanel").classList.add("hidden");
        document.getElementById("gamePanel").classList.remove("hidden");
    },

    /* ===============================
       UPDATE DASHBOARD
    =============================== */
    updateDashboard(state) {

        document.getElementById("roundNumber").innerText = state.round;
        document.getElementById("playerScore").innerText = state.playerScore;
        document.getElementById("computerScore").innerText = state.computerScore;
    },

    /* ===============================
       SET TURN
    =============================== */
    setTurn(player) {
        document.getElementById("turnIndicator").innerText = player;
    },

    /* ===============================
       LOG MESSAGE
    =============================== */
    log(message) {

        const logBox = document.getElementById("gameLog");

        const line = document.createElement("div");
        line.className = "log-line";
        line.innerText = message;

        logBox.appendChild(line);
        logBox.scrollTop = logBox.scrollHeight;
    },

    /* ===============================
       DISPLAY COMPUTER GUESS
    =============================== */
    displayComputerGuess(guess) {
        document.getElementById("computerGuessDisplay").innerText = guess;
    },

    /* ===============================
       SHOW WIN OVERLAY
    =============================== */
    showWinOverlay(message) {

        document.getElementById("winMessage").innerText = message;
        document.getElementById("winOverlay").classList.remove("hidden");
    },

    /* ===============================
       HIDE WIN OVERLAY
    =============================== */
    hideWinOverlay() {
        document.getElementById("winOverlay").classList.add("hidden");
    }

};

console.log("UI Loaded");