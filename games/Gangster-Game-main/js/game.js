let canvas;
let world;
let keyboard = new Keyboard();
let mute = true;


/**
 * Start The Game if click on The Start Button
 */
function start() {
    let content = document.getElementById('loseOrWinScreen');
    addAndRemoceClasslist();
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    content.classList.add('d-none');
    world.character.lifebar = 100;
    world.level.enemies[3].life = 5;
    checkMobileButton();
    startup();
}


/**
 * Add and Remove css for Start the Game
 */
function addAndRemoceClasslist() {
    document.getElementById('top-hud').classList.remove('d-none');
    document.getElementById('bottom-hud').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('impressum-content').classList.add('d-none');
}


/**
 * Load the Site, add and removed The css
 */
function init() {
    document.getElementById('impressum-content').classList.remove('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('top-hud').classList.add('d-none');
    document.getElementById('bottom-hud').classList.add('d-none');
    document.getElementById('loseOrWinScreen').classList.add('d-none');
}

/**
 * Switch to Unmute
 */
function switchToUnmute() {
    let content = document.getElementById('controll-sound');
    content.innerHTML = `<img onclick="switchToMute()" class="hud-controll cursor" src="img/HUD/Prinbles_GUI_Asset_Silent (1.0.0)/Prinbles_GUI_Asset_Silent (1.0.0)/2058599.png" alt="">`;
    mute = false;
    world.backgroundSound.play();
}


/**
 * Switch to Mute
 */
function switchToMute() {
    let content = document.getElementById('controll-sound');
    content.innerHTML = `<img onclick="switchToUnmute()" id="controll-sound_mute" class="hud-controll cursor" src="img/HUD/Prinbles_GUI_Asset_Silent (1.0.0)/Prinbles_GUI_Asset_Silent (1.0.0)/Mute_Icon.svg.png" alt=""></img>`;
    mute = true;
    world.backgroundSound.pause();
}

/**
 *  SWitch to Fullscreen
 */
function switchToFullscreen() {
    let screen = document.getElementById('fullscreen');
    let content = document.getElementById('controll-fullscreen');
    content.innerHTML = `<img onclick="exitFullscreenModus()" class="hud-controll-fullscreen cursor" src="img/HUD/Prinbles_GUI_Asset_Silent (1.0.0)/Prinbles_GUI_Asset_Silent (1.0.0)/6398940.png" alt="">`;
    element = document.querySelector('.loseOrWinScreen');
    element.style.top = "200px";
    enterFullscreen(screen);
}


/**
 * Exit from the Fullscreen
 */
function exitFullscreenModus() {
    let screen = document.getElementById('fullscreen');
    let content = document.getElementById('controll-fullscreen');
    content.innerHTML = `<img onclick="switchToFullscreen()" class="hud-controll-fullscreen cursor" src="img/HUD/Prinbles_GUI_Asset_Silent (1.0.0)/Prinbles_GUI_Asset_Silent (1.0.0)/6398940.png" alt="">`;
    element = document.querySelector('.loseOrWinScreen');
    element.style.top = "136px";
    exitFullscreen(screen);
}

/**
 * The Function to go in the Fullscreen
 * 
 * @param {id} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exit The fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * deafault the Mobile HUD to pop up 
 */
function checkMobileButton() {
    body = document.getElementById('top-hud');
    body.oncontextmenu = function () { return false; };
}

/**
 * Eventlistener for if press a Button than my Character is moving
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 87) {
        keyboard.UP = true
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true
    }
    if (e.keyCode == 70) {
        keyboard.SHOOT = true
    }
});

/**
 * Eventlistener for If don't press enymore the button anymore The Character stop moving 
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 87) {
        keyboard.UP = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 70) {
        keyboard.SHOOT = false;
    }
});

/**
 * Touchbuttons for Mobileversion to move The Character
 */
function startup() {
    handyContollLeft();
    handyContollRight();
    handyContollShoot();
    handyContollJump();
}

/**
 * Sets up touch event listeners for the jump control button on a mobile device.
 * 
 * - Adds a `touchstart` event listener to the jump control button to activate jumping.
 * - Adds a `touchend` event listener to the jump control button to deactivate jumping.
 * 
 * The event listeners use passive mode to improve scrolling performance.
 */
function handyContollJump() {
    document.getElementById('controll-jump').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    }, { passive: true });
    document.getElementById('controll-jump').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}

/**
 * Sets up touch event listeners for the Shoot control button on a mobile device.
 * 
 * - Adds a `touchstart` event listener to the jump control button to activate jumping.
 * - Adds a `touchend` event listener to the jump control button to deactivate jumping.
 * 
 * The event listeners use passive mode to improve scrolling performance.
 */
function handyContollShoot() {
    document.getElementById('controll-shoot').addEventListener('touchstart', () => {
        keyboard.SHOOT = true;
    }, { passive: true });
    document.getElementById('controll-shoot').addEventListener('touchend', () => {
        keyboard.SHOOT = false;
    });
}

/**
 * Sets up touch event listeners for the LEft control button on a mobile device.
 * 
 * - Adds a `touchstart` event listener to the jump control button to activate jumping.
 * - Adds a `touchend` event listener to the jump control button to deactivate jumping.
 * 
 * The event listeners use passive mode to improve scrolling performance.
 */
function handyContollLeft() {
    document.getElementById('controll-left').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    }, { passive: true });
    document.getElementById('controll-left').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
}

/**
 * Sets up touch event listeners for the Right control button on a mobile device.
 * 
 * - Adds a `touchstart` event listener to the jump control button to activate jumping.
 * - Adds a `touchend` event listener to the jump control button to deactivate jumping.
 * 
 * The event listeners use passive mode to improve scrolling performance.
 */
function handyContollRight() {
    document.getElementById('controll-right').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    }, { passive: true });
    document.getElementById('controll-right').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
}

/**
 * After a Win or Lose givs the funtion a Lose or Win Screen
 * 
 * @param {img.src} img 
 */
function setTimeOut(img) {
    let content = document.getElementById('loseOrWinScreen');
    setTimeout(() => {
        if (world.character.lifebar == 0 || world.level.enemies[5].life == 0) {
            world.pause = true;
            content.classList.remove('d-none');
            content.innerHTML = endScreenHtml(img);
        }
        clearAllIntervals();
    }, 1500);
    world.level.enemies[5].shootEnemySound.pause();
    world.hitSound.pause();
}

/**
 * render HTML for the Endscreen
 * 
 * @param {img.src} img 
 * @returns HTML
 */
function endScreenHtml(img) {
    return /*HTML*/ `
    <div class="wlcontent">
              <img class="youLoseYouWin" src="${img}" alt="">
              <div>
                <button onclick="clearWorld()" class="btn cursor">Try Again</button>
                <button onclick="backToMenu()" class="btn cursor">Back To Menu</button>
              </div>
            </div>
            `
}

/**
 * Clear The Wold and canvas go back to Menu
 */
function backToMenu() {
    init();
    world.clearWorld();
    world.clearCanvas();
    world.resetAudios();
    clearAllIntervals();
}

/**
 * Clear the World and Canvas  
 */
function clearWorld() {
    world.clearWorld();
    world.clearCanvas();
    world.resetAudios();
    clearAllIntervals();
    start();
}

/**
 * cleans All Intervals
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}






