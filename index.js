// screens[0].classList.add('up');

// There are 3 screens (i.e. pages)
const screens = document.querySelectorAll('.screen');
// selected from 4 of them
const insectSelected = document.querySelectorAll('.choose-insect-btn');
// First click to start the game 
const startBtn = document.getElementById('start-btn');
// Gaming Zone (i.e. 3rd screen)
const gameContainer = document.getElementById('game-containers');

// Time, score, message
const timeEle = document.getElementById('time');
const scoreEle = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let insect = {};    // selected insect


// Initial click on button: so screens[0] --> first screen (i.e. 1st page Catch the Insect)
startBtn.addEventListener('click', () => screens[0].classList.add('up'))

insectSelected.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        // Used img element to get it's attribute.
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        insect = {src, alt};
        screens[1].classList.add('up');
        // Now 1st call will be to startGame then wait for 1s to call createInsect
        setTimeout(createInsect, 1000);
        startGame();
    })
})

// For incrementing the time.
function startGame() {
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    // if m < 10 --> 0(1to9), eg. 07
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    timeEle.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

// Creates a insect on the window 
function createInsect() {
   const currentInsect = document.createElement('div');
   currentInsect.classList.add('insect');

   // We want the random location in our window (i.e. within the window)
   const {x, y} = getRandomLocation(); 
   // Since the position of game-container is relative w.r.t. the insect(which is absolute)
   currentInsect.style.top = `${y}px`;
   currentInsect.style.left = `${x}px`;

   const rot = Math.random() * 360;
   currentInsect.innerHTML = `<img src="${insect.src}" alt="${insect.alt}" style="transform: rotate(${rot}deg)" />`

   // If the insect get caught 
   currentInsect.addEventListener('click', catchInsect);
   gameContainer.appendChild(currentInsect);
}

// Random location for the insect within the window..
function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Why -200, +100 ? 
    // Since we don't want our index to be present at the edges, but somewhere in the middle
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return {x, y};
}


function catchInsect() {
    incrementScore();
    // this --> the insect which we've selected..
    this.classList.add('caught');   // making invisible
    setTimeout(() => this.remove(), 2000);  // remove from dom
    addInsect();
    console.log(score);
}

// On a single click 2 insects will be created..
function addInsect() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function incrementScore() {
    score++;
    console.log(score);
    scoreEle.innerHTML = `Score: ${score}`;
    if(score > 19) {
        // the warning message
        message.classList.add('visible');
    }
}




