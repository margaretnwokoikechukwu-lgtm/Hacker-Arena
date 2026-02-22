/* ==========================================================
   HACKER ARENA ENGINE
   Pure Game Logic (No UI)
========================================================== */

const Engine = {

    candidates: [],

    /* ===============================
       VALIDATE SECRET (NO REPEATS)
    =============================== */
    validateSecret(code) {
        if (!/^\d{4}$/.test(code)) return false;

        const unique = new Set(code.split(""));
        return unique.size === 4;
    },

    /* ===============================
       VALIDATE GUESS (REPEATS OK)
    =============================== */
    validateGuess(code) {
        return /^\d{4}$/.test(code);
    },

    /* ===============================
       GENERATE SECRET (NO REPEAT)
    =============================== */
    generateSecret() {
        let digits = "0123456789";
        let result = "";

        while (result.length < 4) {
            let r = digits[Math.floor(Math.random() * 10)];
            if (!result.includes(r)) {
                result += r;
            }
        }

        return result;
    },

    /* ===============================
       CALCULATE RESULT
    =============================== */
    calculateResult(secret, guess) {

        let dead = 0;
        let injured = 0;

        for (let i = 0; i < 4; i++) {
            if (guess[i] === secret[i]) {
                dead++;
            } else if (secret.includes(guess[i])) {
                injured++;
            }
        }

        return { dead, injured };
    },

    /* ===============================
       GENERATE ALL POSSIBLE CODES
    =============================== */
    generateCandidates() {

        this.candidates = [];

        for (let i = 0; i < 10000; i++) {

            let code = i.toString().padStart(4, "0");

            if (this.validateSecret(code)) {
                this.candidates.push(code);
            }
        }
    },

    /* ===============================
       SMART GUESS (AI)
    =============================== */
    getSmartGuess() {

        if (this.candidates.length === 0) {
            this.generateCandidates();
        }

        return this.candidates[
            Math.floor(Math.random() * this.candidates.length)
        ];
    },

    /* ===============================
       FILTER POSSIBILITIES
    =============================== */
    filterCandidates(guess, dead, injured) {

        this.candidates = this.candidates.filter(code => {
            const result = this.calculateResult(code, guess);
            return result.dead === dead && result.injured === injured;
        });
    }
};

console.log("Engine Loaded");