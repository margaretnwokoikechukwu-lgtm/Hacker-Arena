/* ==========================================================
   HACKER ARENA SOUND SYSTEM
   Safe Audio Controller
========================================================== */

const Sound = {

    clickAudio: null,
    winAudio: null,

    init() {
        this.clickAudio = document.getElementById("clickSound");
        this.winAudio = document.getElementById("winSound");
    },

    playClick() {
        if (!this.clickAudio) return;
        this.clickAudio.currentTime = 0;
        this.clickAudio.play().catch(() => {});
    },

    playWin() {
        if (!this.winAudio) return;
        this.winAudio.currentTime = 0;
        this.winAudio.play().catch(() => {});
    }
};

window.addEventListener("DOMContentLoaded", () => {
    Sound.init();
});

console.log("Sound Loaded");