const red = document.getElementById('red');
const start = document.getElementById('start');
const gameover = document.getElementById('gameover');
const greencircle = document.getElementById('greencircle');
const code = document.getElementById('code');

// Declare these variables globally so they're accessible in all functions
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

// Flag to track if game is still active
gameActive = false;

async function startgame() {
    gameActive = true;
    start.style.display = 'none';
    red.style.display = 'flex';
    await sleep(waitTime * 1000);
    
    // Only show green circle if game is still active (player hasn't clicked red)
    if (gameActive) {
        red.style.display = 'none'; // Hide red when green appears
        greencircle.style.display = 'flex';
        startTime = Date.now(); // Set startTime when green circle appears
    }
}

async function endgame() {
    gameActive = false;  // Mark game as inactive
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
    
    await sleep(1000); // Longer wait time to see the game over message
    window.location.reload();
}

function checkTime() {
    let reactionTime = Date.now() - startTime;
    if (reactionTime < 200) {
        // Player was super fast - show code
        red.style.display = 'none';
        start.style.display = 'none';
        gameover.style.display = 'none';
        greencircle.style.display = 'none';
        code.style.display = 'flex';
        document.body.style.overflow = 'scroll'
    } else {
        // Player was not fast enough
        lostByTime = true;
        endgame(); // Properly call the function with parentheses
    }
}
