let start = document.querySelector("#start");
let game = document.querySelector("#game");
let score = 0;
let time = document.querySelector("#time");
let isGameStarted = false;
let timeHeader = document.querySelector("#time-header");
let resultHeader = document.querySelector("#result-header");
let result = document.querySelector("#result");
let gameTime = document.querySelector("#game-time");

start.addEventListener('click', startGame);
game.addEventListener('click', handlerBoxClick);
gameTime.addEventListener('input', setGameTime);

function setGameTime(){
    let tm = +gameTime.value;
    time.textContent = tm.toFixed(1);
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');
}

function startGame(){
    score = 0;
    setGameTime();
    gameTime.setAttribute('disabled', 'true'); 
    isGameStarted = true;
    console.log("Start");
    start.classList.add('hide');
    game.style.background = "#fff";

    let interval = setInterval(function(){
        let t = time.textContent;
        // console.log(t);
        if(t <= 0){
            clearInterval(interval);
            endGame();
        }
        else{
            time.textContent = (t - 0.1).toFixed(1);
        }
    }, 100);

    renderBox()
}

function setGameScore(){
    result.textContent = score; 
}

function endGame(){
    isGameStarted = false;
    setGameScore();
    gameTime.removeAttribute('disabled');
    start.classList.remove('hide');
    game.innerHTML = "";
    game.style.background = "#9be8fb";
    timeHeader.classList.add('hide');
    resultHeader.classList.remove('hide');
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function createColor(){
    let r = Math.floor(Math.random() * 256);
    return r;
}

function renderBox(){
    game.innerHTML = "";
    let box = document.createElement('div');
    let boxSize = getRandom(30, 100);
    let gameSize = game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    // console.log(gameSize);

    box.style.width = box.style.height = boxSize + "px";
    box.style.background = "rgb(" + createColor() + "," + createColor() + "," + createColor() + ")";
    box.style.cursor = "pointer";
    box.style.position = "absolute";
    box.style.top = getRandom(0, maxTop) + "px";
    box.style.left = getRandom(0, maxLeft) + "px";
    box.style.cursor = "pointer";
    box.setAttribute('data-box', 'true');
    game.insertAdjacentElement("afterbegin", box);
}

function handlerBoxClick(event){
    if(!isGameStarted){
        return;
    }
    if(event.target.dataset.box){
        score++;
        renderBox();
    }
}