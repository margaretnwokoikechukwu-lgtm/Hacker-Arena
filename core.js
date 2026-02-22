/* ==========================================================
   HACKER ARENA CORE SYSTEM
   Global Platform Controller
   Made for scalable multi-game architecture
========================================================== */

(function(){

"use strict";

/* ==========================================================
   GLOBAL PLATFORM OBJECT
========================================================== */

window.HackerArena = {

    version: "1.0.0",
    currentPage: "",
    initialized: false,

    init(){
        this.detectPage();
        this.injectBadge();
        this.prepareNavigation();
        this.prepareComingSoon();
        this.initialized = true;
        console.log("HackerArena Core Initialized");
    },

    detectPage(){
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf("/") + 1);
        this.currentPage = file || "index.html";
    }

};


/* ==========================================================
   SHINY BADGE SYSTEM
========================================================== */

function injectBadge(){

    const badge = document.createElement("div");
    badge.id = "covenant-badge";
    badge.innerText = "Made by Covenant";

    badge.style.position = "fixed";
    badge.style.bottom = "10px";
    badge.style.right = "10px";
    badge.style.padding = "6px 14px";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "bold";
    badge.style.borderRadius = "20px";
    badge.style.background = "linear-gradient(90deg,#00f5d4,#00bbf9)";
    badge.style.color = "#000";
    badge.style.boxShadow = "0 0 15px #00f5d4";
    badge.style.zIndex = "9999";
    badge.style.animation = "pulseGlow 2s infinite";

    document.body.appendChild(badge);

}

HackerArena.injectBadge = injectBadge;


/* ==========================================================
   NAVIGATION SYSTEM
========================================================== */

function prepareNavigation(){

    const navButtons = document.querySelectorAll("[data-nav]");

    navButtons.forEach(btn=>{
        btn.addEventListener("click", function(){
            const target = this.getAttribute("data-nav");
            if(target){
                window.location.href = target;
            }
        });
    });

}

HackerArena.prepareNavigation = prepareNavigation;


/* ==========================================================
   COMING SOON HANDLER
========================================================== */

function prepareComingSoon(){

    const comingSoonBtns = document.querySelectorAll("[data-coming]");

    comingSoonBtns.forEach(btn=>{
        btn.addEventListener("click", function(){
            alert("🚀 Feature coming soon...\nNetworking over Local WiFi will be added later.");
        });
    });

}

HackerArena.prepareComingSoon = prepareComingSoon;


/* ==========================================================
   MODAL SYSTEM (Reusable)
========================================================== */

HackerArena.showModal = function(title, message){

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    const box = document.createElement("div");
    box.style.background = "#001d3d";
    box.style.padding = "30px";
    box.style.borderRadius = "12px";
    box.style.border = "1px solid #00f5d4";
    box.style.color = "#00f5d4";
    box.style.textAlign = "center";
    box.style.boxShadow = "0 0 20px #00f5d4";

    const h2 = document.createElement("h2");
    h2.innerText = title;

    const p = document.createElement("p");
    p.innerText = message;

    const btn = document.createElement("button");
    btn.innerText = "Close";
    btn.style.marginTop = "15px";
    btn.onclick = function(){
        document.body.removeChild(overlay);
    };

    box.appendChild(h2);
    box.appendChild(p);
    box.appendChild(btn);

    overlay.appendChild(box);
    document.body.appendChild(overlay);

};


/* ==========================================================
   SOUND SYSTEM PLACEHOLDER
========================================================== */

HackerArena.sound = {

    enabled: true,

    play(type){
        if(!this.enabled) return;

        console.log("Playing sound:", type);
        // Real sounds will be added in sound.js
    }

};


/* ==========================================================
   NETWORKING PLACEHOLDER
========================================================== */

HackerArena.network = {

    mode: "local-wifi",
    status: "coming-soon",

    connect(){
        alert("Local WiFi networking will be enabled in future update.");
    }

};


/* ==========================================================
   AUTO INITIALIZE WHEN DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", function(){
    HackerArena.init();
});


})();