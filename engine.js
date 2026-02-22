/* ==========================================================
   HACKER ARENA GAME ENGINE
   Pure Logic Layer - No UI
========================================================== */

(function(){

"use strict";

if(!window.HackerArena){
    console.error("Core not loaded before engine.");
    return;
}

/* ==========================================================
   BASE GAME CLASS
========================================================== */

class Game {

    constructor(){
        this.started = false;
        this.finished = false;
        this.winner = null;
    }

    start(){
        this.started = true;
        this.finished = false;
        this.winner = null;
    }

    end(winner){
        this.finished = true;
        this.winner = winner;
    }

    reset(){
        this.started = false;
        this.finished = false;
        this.winner = null;
    }

}


/* ==========================================================
   CODE WAR ENGINE
========================================================== */

class CodeWarEngine extends Game {

    constructor(){
        super();
        this.secret = "";
        this.history = [];
        this.maxLength = 4;
    }

    setSecret(code){
        if(!this.validateSecret(code)){
            return false;
        }

        this.secret = code;
        return true;
    }

    validateSecret(code){

        if(typeof code !== "string") return false;
        if(code.length !== this.maxLength) return false;
        if(!/^\d+$/.test(code)) return false;

        // No duplicate digits allowed in secret
        let unique = new Set(code.split(""));
        return unique.size === this.maxLength;
    }

    validateGuess(guess){

        if(typeof guess !== "string") return false;
        if(guess.length !== this.maxLength) return false;
        if(!/^\d+$/.test(guess)) return false;

        // Guess CAN have duplicates
        return true;
    }

    evaluateGuess(guess){

        if(!this.validateGuess(guess)){
            return null;
        }

        let dead = 0;
        let injured = 0;

        for(let i=0; i<this.maxLength; i++){

            if(guess[i] === this.secret[i]){
                dead++;
            }
            else if(this.secret.includes(guess[i])){
                injured++;
            }
        }

        const result = {
            guess: guess,
            dead: dead,
            injured: injured
        };

        this.history.push(result);

        if(dead === this.maxLength){
            this.end("player");
        }

        return result;
    }

    getHistory(){
        return this.history;
    }

}


/* ==========================================================
   REGISTER ENGINE INTO PLATFORM
========================================================== */

HackerArena.Engine = {
    Game: Game,
    CodeWar: CodeWarEngine
};

console.log("Game Engine Loaded");

})();