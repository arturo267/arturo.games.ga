class Character extends MovableObject {
    IMAGES_STAY = [
        'img/Gangsters_1/stay.animation/Idle_1.png',
        'img/Gangsters_1/stay.animation/Idle_2.png',
        'img/Gangsters_1/stay.animation/Idle_3.png',
        'img/Gangsters_1/stay.animation/Idle_4.png',
        'img/Gangsters_1/stay.animation/Idle_5.png',
        'img/Gangsters_1/stay.animation/Idle_6.png',
    ];

    IMAGES_RUN_RIGHT = [
        'img/Gangsters_1/run-right/Run_1.png',
        'img/Gangsters_1/run-right/Run_2.png',
        'img/Gangsters_1/run-right/Run_3.png',
        'img/Gangsters_1/run-right/Run_4.png',
        'img/Gangsters_1/run-right/Run_5.png',
        'img/Gangsters_1/run-right/Run_6.png',
        'img/Gangsters_1/run-right/Run_7.png',
        'img/Gangsters_1/run-right/Run_8.png',
        'img/Gangsters_1/run-right/Run_9.png',
        'img/Gangsters_1/run-right/Run_10.png',

    ];

    IMAGES_JUMP = [
        'img/Gangsters_1/jump/1.png',
        'img/Gangsters_1/jump/2.png',
        'img/Gangsters_1/jump/3.png',
        'img/Gangsters_1/jump/4.png',
        'img/Gangsters_1/jump/5.png',
        'img/Gangsters_1/jump/6.png',
        'img/Gangsters_1/jump/7.png',
        'img/Gangsters_1/jump/8.png',
        'img/Gangsters_1/jump/9.png',
        'img/Gangsters_1/jump/10.png',
    ];

    IMAGES_RUN_LEFT = [
        'img/Gangsters_1/run-left/Run_1_nach_links.png',
        'img/Gangsters_1/run-left/Run_2_nach_links.png',
        'img/Gangsters_1/run-left/Run_3_nach_links.png',
        'img/Gangsters_1/run-left/Run_4_nach_links.png',
        'img/Gangsters_1/run-left/Run_5_nach_links.png',
        'img/Gangsters_1/run-left/Run_6_nach_links.png',
        'img/Gangsters_1/run-left/Run_7_nach_links.png',
        'img/Gangsters_1/run-left/Run_8_nach_links.png',
        'img/Gangsters_1/run-left/Run_9_nach_links.png',
        'img/Gangsters_1/run-left/Run_10_nach_links.png',

    ];

    IMAGES_DEAD = [
        'img/Gangsters_1/dead/Dead_1.png',
        'img/Gangsters_1/dead/Dead_2.png',
        'img/Gangsters_1/dead/Dead_3.png',
        'img/Gangsters_1/dead/Dead_4.png',
        'img/Gangsters_1/dead/Dead_5.png',
    ];

    IMAGES_HURT = [
        'img/Gangsters_1/hurt/Hurt_1.png',
        'img/Gangsters_1/hurt/Hurt_2.png',
        'img/Gangsters_1/hurt/Hurt_3.png',
        'img/Gangsters_1/hurt/Hurt_4.png',
        'img/Gangsters_1/hurt/Hurt_5.png',
    ];


    running_sound = new Audio('audio/running-6358.mp3');
    lifebar = 100;
    world;
    speed = 4;
    characterDeadInterval;
    i = 0;
    moneySound = new Audio('audio/cash-register-kaching-sound-effect-125042.mp3');


    /**
     * Load and givs The Charackter Infos
     */
    constructor() {
        super().loadImg(this.IMAGES_STAY[0]);
        this.height = 170;
        this.width = 150;
        this.y = 305;
        this.loadImges(this.IMAGES_STAY);
        this.loadImges(this.IMAGES_JUMP);
        this.loadImges(this.IMAGES_DEAD);
        this.loadImges(this.IMAGES_HURT);
        this.loadImges(this.IMAGES_RUN_RIGHT);
        this.loadImges(this.IMAGES_RUN_LEFT);
        this.applyGravity();
        this.animate();
        this.checkCollisionMoney();
    }

    /**
     * Start All Animation, Logic and Function
     */
    animate() {

        /**
         * Makes the Character Move (Move Left, Move right, Jump).
         * If the keyboard key is pressed, it moves in the specified direction
         * and than the x coordinate is moving.
         */
        setInterval(() => {
            this.runningSound();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.characterMoveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.characterMoveLeft();
            }
            if (this.world.keyboard.SPACE && this.y == 305) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 70);

        /**
         * The logic and Animation if The Character gets Hurt or is Daed.
         * If He is Dead play the Dead Animation.
         * When he was Hit play The Hit Animation.
         */
        let characterDeadInterval = setInterval(() => {
            if (this.isDaed()) {
                this.ifCharacterDie(characterDeadInterval);
            } else if (this.itHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else {
                if (this.y < 305) {
                    this.playAnimation(this.IMAGES_JUMP);
                } else {
                    this.leftRightAnimation();
                }
            }
        }, 130);
    }

    /**
     * Configures and pauses the running sound.
     */
    runningSound() {
        this.running_sound.volume = 0.03;
        this.running_sound.playbackRate = 0.5;
        this.running_sound.pause();
    }

    /**
     * Play The Move Left and Right Animation
     */
    leftRightAnimation() {
        if (this.world.keyboard.RIGHT) {
            this.width = 140;
            this.playAnimation(this.IMAGES_RUN_RIGHT);
        } else {
            if (this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_RUN_LEFT);
            } else {
                this.playAnimation(this.IMAGES_STAY);
            }
        }
    }

    /**
     * If The Character is Dead its play The Dead Animation.
     * Givs Keyboard on false to stop Moving.
     * Dispalay The Losing Screen
     * 
     * @param {interval} characterDeadInterval 
     */
    ifCharacterDie(characterDeadInterval) {
        this.characterPlayDeadAnimation();
        this.world.keyboard = false;
        setTimeOut('img/extra/Game_over.png');
        this.i++
        if (this.i > 4) {
            clearInterval(characterDeadInterval);
        }
    }

    /**
     * Configures and pauses the running sound.
     */
    characterMoveRight() {
        this.moveRight();
        if (mute) {
            this.running_sound.pause();
        } else {
            this.running_sound.play();
        }
    }

    /**
     * Configures and pauses the running sound.
     */
    characterMoveLeft() {
        this.moveLeft();
        if (mute) {
            this.running_sound.pause();
        } else {
            this.running_sound.play();
        }
    }

    /**
    * Plays the death animation for the character.
    * 
    * - Initiates the dead animation sequence using the `playanimat` method with the `IMAGES_DEAD` array.
    * - If the last frame of the death animation is reached:
    *   - Sets the `IMAGES_DEAD` array to contain only the final frame, keeping the character in the dead state.
    */
    characterPlayDeadAnimation() {
        this.playanimat(this.IMAGES_DEAD);
        if (this.newImg == this.IMAGES_DEAD.length - 1) {
            this.IMAGES_DEAD = [this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        }
    }

    /**
    * Checks for collisions between the character and money bundles.
    * 
    * - Periodically checks if the character collides with any money bundles.
    * - If a collision is detected:
    *   - Plays a sound effect for collecting money.
    *   - Removes the collected money bundle from the `moneybundle` array.
    *   - Increases the money bar's percentage.
    *   - Updates the money bar display.
    *   - Plays an additional sound effect for the money collection.
    * 
    * Runs the collision check every 100 milliseconds.
    */
    checkCollisionMoney() {
        setInterval(() => {
            this.world.level.moneybundle.forEach((money) => {
                if (this.world.character.isColliding(money)) {
                    this.moneySound.volume = 0.1;
                    let index = this.world.level.moneybundle.indexOf(money);
                    this.world.level.moneybundle.splice(index, 1);
                    this.world.moneybar.percentag++
                    this.world.moneybar.setPercentagemoney(this.world.moneybar.percentag);
                    this.moneySoundCeck();
                }
            });
        }, 100);
    }

    /**
    * Checks if an enemy bullet hits the character.
    * - If the bullet collides with the character:
    *   - Removes the bullet from the `shootingEnemy` array.
    *   - Applies damage to the character by calling the `hit` method.
    *   - Updates the status bar with the character's current lifebar percentage.
    * @param {Object} bullet - The bullet object to check for collision with the character.
    */
    checkBullethitCharacter(bullet) {
        if (this.world.character.isColliding(bullet)) {
            let index = this.world.shootingEnemy.indexOf(bullet);
            this.world.shootingEnemy.splice(index, 1);
            this.world.character.hit();
            this.world.statusbar.setPercentage(this.world.character.lifebar);
            this.world.checkHitSound();
        }
    }

    /**
    * Checks if a bullet has exceeded its range and removes it if so.
    * - Periodically checks if the bullet's x-coordinate has moved beyond a specified distance from the character's x-coordinate.
    * - If the bullet is out of range (more than 350 units away from the character), it removes the bullet from the `shootAmmo` array.
    * Runs the range check every 50 milliseconds.
    */
    checkBulletRange() {
        setInterval(() => {
            if (this.world.bullet !== undefined) {
                if (this.world.bullet.x > this.x + 450) {
                    let index = this.world.shootAmmo.indexOf(this.world.bullet);
                    this.world.shootAmmo.splice(index, 1)
                }
            }
        }, 50)
    }

    /**
     * Play and Pause the Audio 
     */
    moneySoundCeck() {
        if (mute) {
            this.moneySound.pause();
        } else {
            this.moneySound.play();
        }
    }

    /**
    * Creat a New Bullet if Character shoot
    */
    shootTheBullet() {
        this.world.bullet = new ShootingAmmo(this.x + 85, this.y + 105);
        this.world.shootAmmo.push(this.world.bullet);
    }
}