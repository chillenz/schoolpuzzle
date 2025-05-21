const red = document.getElementById('red');
const start = document.getElementById('start');
const gameover = document.getElementById('gameover');
const greencircle = document.getElementById('greencircle');
const code = document.getElementById('code');

let startTime;
let lostByTime = false;
let waitTime = Math.floor(Math.random() * 5 + 1);
let gameActive = false;

start.addEventListener('click', startgame);
red.addEventListener('click', endgame);
greencircle.addEventListener('click', checkTime);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

gameActive = false;

async function startgame() {
    gameActive = true;
    start.style.display = 'none';
    red.style.display = 'flex';
    await sleep(waitTime * 1000);
    
    if (gameActive) {
        red.style.display = 'none';
        greencircle.style.display = 'flex';
        startTime = Date.now();
    }
}

async function endgame() {
    gameActive = false;
    red.style.display = 'none';
    greencircle.style.display = 'none';
    code.style.display = 'none';
    start.style.display = 'none';
    gameover.style.display = 'flex';
    
    if (lostByTime === true) {
        gameover.innerHTML = 'Too slow';
    } else {
        gameover.innerHTML = 'Clicked red';
    }
    
    await sleep(1000);
    window.location.reload();
}

function checkTime() {
    let reactionTime = Date.now() - startTime;
    if (reactionTime < 200) {
        red.style.display = 'none';
        start.style.display = 'none';
        gameover.style.display = 'none';
        greencircle.style.display = 'none';
        code.style.display = 'flex';
        document.body.style.overflow = 'scroll'
    } else {
        lostByTime = true;
        endgame();
    }
}
