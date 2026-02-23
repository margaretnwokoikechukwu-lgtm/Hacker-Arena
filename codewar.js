/* ==========================================================
   CODE WAR GAME CONTROLLER
   Controls gameplay flow and connects UI to engine
========================================================== */

let GameController = {

    state: {
        playerSecret: "",
        computerSecret: "",
        round: 1,
        playerScore: 0,
        computerScore: 0,
        difficulty: "easy",
        computerGuess: "",
        gameActive: false,
        playerTurn: true
    },

    /* =============================
       START GAME
    ============================= */
    startGame() {

        const secretInput = document.getElementById("secretInput").value;
        const difficultySelect = document.getElementById("difficultySelect").value;

        if (!Engine.validateSecret(secretInput)) {
            alert("Secret must be 4 UNIQUE digits.");
            return;
        }

        this.state.playerSecret = secretInput;
        this.state.difficulty = difficultySelect;
        this.state.computerSecret = Engine.generateSecret();

        Engine.generateCandidates();

        this.state.round = 1;
        this.state.playerScore = 0;
        this.state.computerScore = 0;
        this.state.gameActive = true;
        this.state.playerTurn = true;

        UI.showGamePanel();
        UI.updateDashboard(this.state);
        UI.setTurn("YOU");

        UI.log("Battle Started");
        UI.log("Difficulty: " + difficultySelect.toUpperCase());

        if (window.Sound) Sound.playClick();
    },

    /* =============================
       PLAYER ATTACK
    ============================= */
    playerAttack() {

        if (!this.state.gameActive || !this.state.playerTurn) return;

        const guess = document.getElementById("guessInput").value;

        if (!Engine.validateGuess(guess)) {
            alert("Guess must be exactly 4 digits.");
            return;
        }

        if (window.Sound) Sound.playClick();

        const result = Engine.calculateResult(
            this.state.computerSecret,
            guess
        );

        UI.log("YOU → " + guess + " | " + result.dead + "D " + result.injured + "I");

        if (result.dead === 4) {
            this.state.playerScore++;
            this.endRound("YOU WIN THIS ROUND!");
            return;
        }

        this.state.playerTurn = false;
        UI.setTurn("AI");

        setTimeout(() => this.computerAttack(), 800);
    },

    /* =============================
       COMPUTER ATTACK
    ============================= */
    computerAttack() {

        if (!this.state.gameActive) return;

        if (this.state.difficulty === "easy") {
            this.state.computerGuess = Engine.generateSecret();
        } else {
            this.state.computerGuess = Engine.getSmartGuess();
        }

        UI.displayComputerGuess("Computer attacks: " + this.state.computerGuess);
    },

    /* =============================
       COMPUTER RESULT SUBMIT
    ============================= */
    submitComputerResult() {

        if (!this.state.gameActive) return;

        const dead = parseInt(document.getElementById("deadInput").value);
        const injured = parseInt(document.getElementById("injuredInput").value);

        if (isNaN(dead) || isNaN(injured) || dead < 0 || injured < 0 || dead + injured > 4) {
            alert("Invalid numbers.");
            return;
        }

        if (window.Sound) Sound.playClick();

        UI.log("CPU → " + this.state.computerGuess + " | " + dead + "D " + injured + "I");

        if (dead === 4) {
            this.state.computerScore++;
            this.endRound("COMPUTER WINS THIS ROUND!");
            return;
        }

        Engine.filterCandidates(this.state.computerGuess, dead, injured);

        this.state.round++;
        this.state.playerTurn = true;

        UI.setTurn("YOU");
        UI.updateDashboard(this.state);

        document.getElementById("deadInput").value = "";
        document.getElementById("injuredInput").value = "";
    },

    /* =============================
       END ROUND
    ============================= */
    endRound(message) {

        this.state.gameActive = false;

        UI.updateDashboard(this.state);
        UI.showWinOverlay(message);

        if (window.Sound) Sound.playWin();
    }
};


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

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            alert("Start button clicked");
        });
    }

});