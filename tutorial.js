/* ======================================================
   HACKER ARENA - FULL TUTORIAL ENGINE
====================================================== */

let currentSlide = 0;

/* ==========================================
   SLIDES DATA
========================================== */

const slides = [

{
    title: "Welcome To Hacker Arena",
    content: `
        This platform hosts multiple logic games.<br><br>
        Today you will learn how <b>Code War</b> works.<br><br>
        Navigate using Next and Back.
    `
},

{
    title: "Objective of Code War",
    content: `
        Each player selects a <b>4-digit secret code</b>.<br><br>
        The secret cannot contain repeated digits.<br><br>
        First player to guess correctly wins the round.
    `
},

{
    title: "Dead vs Injured",
    content: `
        <b>Dead</b> = Correct number in correct position.<br><br>
        <b>Injured</b> = Correct number but wrong position.<br><br>
        Example:<br>
        Secret: 1234<br>
        Guess: 1243<br><br>
        Result: 2 Dead, 2 Injured
    `
},

{
    title: "Important Rule",
    content: `
        Your SECRET cannot repeat numbers.<br><br>
        But your GUESS can repeat numbers.<br><br>
        This increases strategy depth.
    `
},

{
    title: "Difficulty Levels",
    content: `
        Easy → Random AI<br><br>
        Normal → Semi-logical AI<br><br>
        Hard → Strategic AI (smart filtering system)
    `
},

{
    title: "Quick Quiz",
    content: `
        If secret = 5678<br>
        Guess = 5698<br><br>
        How many Dead?
    `,
    quiz: true,
    answer: "3"
},

{
    title: "You're Ready",
    content: `
        You now understand the rules.<br><br>
        Enter the arena and start hacking.<br><br>
        Good luck.
    `
}

];


/* ==========================================
   INITIAL LOAD
========================================== */

window.onload = function(){
    renderSlide();
};


/* ==========================================
   RENDER SLIDE
========================================== */

function renderSlide(){

    let slide = slides[currentSlide];

    document.getElementById("slideTitle").innerHTML = slide.title;
    document.getElementById("slideContent").innerHTML = slide.content;

    updateProgress();

    if(slide.quiz){
        addQuizOptions();
    }
}


/* ==========================================
   NAVIGATION
========================================== */

function nextSlide(){
    if(currentSlide < slides.length - 1){
        currentSlide++;
        renderSlide();
    }
}

function prevSlide(){
    if(currentSlide > 0){
        currentSlide--;
        renderSlide();
    }
}


/* ==========================================
   PROGRESS BAR
========================================== */

function updateProgress(){
    let percentage = ((currentSlide + 1) / slides.length) * 100;
    document.getElementById("progressBar").style.width = percentage + "%";
}


/* ==========================================
   QUIZ SYSTEM
========================================== */

function addQuizOptions(){

    let container = document.getElementById("slideContent");

    let options = ["1","2","3","4"];

    options.forEach(option => {
        let btn = document.createElement("button");
        btn.className = "optionBtn";
        btn.innerText = option;
        btn.onclick = function(){
            checkAnswer(option);
        };
        container.appendChild(btn);
    });
}

function checkAnswer(selected){

    let correct = slides[currentSlide].answer;

    if(selected === correct){
        alert("Correct. 3 Dead.");
    } else {
        alert("Wrong. Think about position carefully.");
    }
}


/* ==========================================
   EXIT TUTORIAL
========================================== */

function exitTutorial(){
    window.location.href = "dashboard.html";
}