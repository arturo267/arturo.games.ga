class Endboss extends MovableObject {
    IMAGES_ENEMY_STAY = [
        'img/Gangsters_3/stay/1.png',
        'img/Gangsters_3/stay/2.png',
        'img/Gangsters_3/stay/3.png',
        'img/Gangsters_3/stay/4.png',
        'img/Gangsters_3/stay/5.png',
        'img/Gangsters_3/stay/6.png',
        'img/Gangsters_3/stay/7.png',
    ];

    IMAGES_DEAD = [
        'img/Gangsters_3/dead/1.png',
        'img/Gangsters_3/dead/2.png',
        'img/Gangsters_3/dead/3.png',
        'img/Gangsters_3/dead/4.png',
        'img/Gangsters_3/dead/5.png',
    ];

    IMAGES_HIT = [
        'img/Gangsters_3/hit/1.png',
        'img/Gangsters_3/hit/2.png',
        'img/Gangsters_3/hit/3.png',
        'img/Gangsters_3/hit/4.png',
    ];


    IMAGES_WALK_LEFT = [
        'img/Gangsters_3/walk-left/1.png',
        'img/Gangsters_3/walk-left/2.png',
        'img/Gangsters_3/walk-left/3.png',
        'img/Gangsters_3/walk-left/4.png',
        'img/Gangsters_3/walk-left/5.png',
        'img/Gangsters_3/walk-left/6.png',
        'img/Gangsters_3/walk-left/7.png',
        'img/Gangsters_3/walk-left/8.png',
        'img/Gangsters_3/walk-left/9.png',
        'img/Gangsters_3/walk-left/10.png',
    ];

    IMAGES_WALK_RIGHT = [
        'img/Gangsters_3/walk-right/1.png',
        'img/Gangsters_3/walk-right/2.png',
        'img/Gangsters_3/walk-right/3.png',
        'img/Gangsters_3/walk-right/4.png',
        'img/Gangsters_3/walk-right/5.png',
        'img/Gangsters_3/walk-right/6.png',
        'img/Gangsters_3/walk-right/7.png',
        'img/Gangsters_3/walk-right/8.png',
        'img/Gangsters_3/walk-right/9.png',
        'img/Gangsters_3/walk-right/10.png',
    ];

    IMAGES_JUMP = [
        'img/Gangsters_3/jump/1.png',
        'img/Gangsters_3/jump/2.png',
        'img/Gangsters_3/jump/3.png',
        'img/Gangsters_3/jump/4.png',
        'img/Gangsters_3/jump/5.png',
        'img/Gangsters_3/jump/6.png',
        'img/Gangsters_3/jump/7.png',
        'img/Gangsters_3/jump/8.png',
        'img/Gangsters_3/jump/9.png',
        'img/Gangsters_3/jump/10.png',
    ];

    IMAGES_SHOOT = [
        'img/Gangsters_3/shoot/1.png',
        'img/Gangsters_3/shoot/2.png',
        'img/Gangsters_3/shoot/3.png',
        'img/Gangsters_3/shoot/4.png',
        'img/Gangsters_3/shoot/5.png',
        'img/Gangsters_3/shoot/6.png',
        'img/Gangsters_3/shoot/7.png',
        'img/Gangsters_3/shoot/7.png',
        'img/Gangsters_3/shoot/8.png',
        'img/Gangsters_3/shoot/9.png',
        'img/Gangsters_3/shoot/10.png',
        'img/Gangsters_3/shoot/11.png',
        'img/Gangsters_3/shoot/12.png',
    ];

    y = 308;
    height = 170;
    width = 140;
    randomNumber = 0;
    animationInterval;
    coolDownInterval;
    life = 5;
    hit1 = false;
    shoot = false;
    i = 0;
    world;
    daedCounter = 0;
    shootCeck = false;
    deadInterval;
    shootEnemySound = new Audio('audio/pistol-168180.mp3');

    /**
     * Load and Givs The Boss Infos
     */
    constructor() {
        super().loadImg(this.IMAGES_ENEMY_STAY[0]);
        if (this.life > 0) {
            this.loadBossimg();
            this.x = 1900;
            this.applyGravity();
            this.animate();
            this.shootCoolDown();
            this.deadanimate();
            this.check();
            this.animateBoss();
        }
    }

    /**
     * Load the Imgs
     */
    loadBossimg() {
        this.loadImges(this.IMAGES_ENEMY_STAY);
        this.loadImges(this.IMAGES_SHOOT);
        this.loadImges(this.IMAGES_JUMP);
        this.loadImges(this.IMAGES_WALK_RIGHT);
        this.loadImges(this.IMAGES_WALK_LEFT);
        this.loadImges(this.IMAGES_HIT);
        this.loadImges(this.IMAGES_DEAD);
    }

    /**
     * Givs every Second a Random Number
     */
    animate() {
        setInterval(() => {
            if (this.life > 0 && this.hit1 == false) {
                this.randomNumber = Math.random();
                this.randomMovingLeftAndRight();
            }
            else {
                this.randomNumber = 0.1;
            }
        }, 1000);
    }

    /**
     * Clear The Interval for The Interval in the Interval
     * Check if endboss was Hit then play the Animation
     */
    randomMovingLeftAndRight() {
        if (this.hit1 == false) {
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
            }
            this.animationInterval = setInterval(() => {
                if (this.life > 0 && this.shoot == false) {
                    this.chekIfThanHitAnimation();
                }
            }, 100);
        }
    }

    /**
     * Check if The Boss was Hit than play Animation.
     * If not than Moving LEft and Right.
     */
    chekIfThanHitAnimation() {
        if (this.hit1) {
            this.i = 0;
            this.shoot = false;
            this.shootCeck = false;
            this.endbossHitAnimation();
        } else {
            this.moveLeftRight();
        }
    }

    /**
     * Logic for Move Left and Rigth and Play Animation.
     * If The Randomnumber hit The if query then play the Animation with Movin the Character.
     */
    moveLeftRight() {
        if (this.randomNumber > 0.1 && this.randomNumber < 0.4 && this.x < 2000) {
            this.x += 7;
            this.playAnimation(this.IMAGES_WALK_RIGHT);
        } else if (this.randomNumber > 0.4 && this.randomNumber < 0.85) {
            this.playAnimation(this.IMAGES_WALK_LEFT);
            this.x -= 7;
        } else {
            this.playAnimation(this.IMAGES_JUMP);
            if (this.y == 308) {
                this.jump();
            }
        }
    }

    /**
     * Set every 3 Seconds shoot on true
     */
    shootCoolDown() {
        this.coolDownInterval = setInterval(() => {
            if (this.life > 0) {
                this.shoot = true;
                this.hit1 = false;
                this.i = 0;
            }
        }, 3000);
    }

    /**
     * Play Daed Animation and Givs The Win Screen
     */
    deadanimate() {
        this.daedCounter = 0;
        let deadInterval = setInterval(() => {
            if (this.life == 0) {
                this.playanimat(this.IMAGES_DEAD);
                if (this.newImg == this.IMAGES_DEAD.length - 1) {
                    this.IMAGES_DEAD = [this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
                    setTimeOut('img/extra/you_win.png');
                    if (this.daedCounter > 4) {
                        clearInterval(deadInterval);
                    }
                }
            }
        }, 100)
    }

    /**
     * Check if The Endboss shoot or not
     */
    check() {
        setInterval(() => {
            if (this.life > 0 && this.shoot == true) {
                this.shootCeck = true;
                this.hit1 = false;
            }
        }, 10)
    }

    /**
     * Play The Shoot Animation and shoot The Bullet.
     * Set all Boolean on false. 
     * Clear Interval.
     * Play The Shoot Animation
     */
    animateBoss() {
        setInterval(() => {
            if (this.shootCeck && this.life > 0 && this.hit1 == false) {
                if (this.i > this.IMAGES_SHOOT.length - 1) {
                    this.enemyShootingBullet();
                    this.setAllFalse();
                    clearInterval(this.animationInterval);
                } else if (this.hit1 == false) {
                    this.playanimatBoss(this.IMAGES_SHOOT, this.i);
                    this.i++
                }
            }
        }, 50)
    }

    /**
     * Play Animation if the Endboss was hit
     */
    endbossHitAnimation() {
        this.shoot = false;
        this.shoot = true;
        this.playAnimation(this.IMAGES_HIT);
        setTimeout(() => {
            this.hit1 = false;
        }, 200)
    }

    /**
     * set All booleans on False
     */
    setAllFalse() {
        this.shoot = false;
        this.shootCeck = false;
        this.i = 0;
    }

    /**
    * Handles the boss enemy shooting a bullet.
    * 
    * - Checks if the boss enemy has remaining life.
    * - If the boss is alive:
    *   - Sets the boss's shooting state to `true`.
    *   - Creates a new bullet (`EnenmyAmmo`) at a specified position relative to the boss.
    *   - Adds the new bullet to the `shootingEnemy` array.
    *   - Starts checking the bullet's range with `checkBulletRangeEnemy`.
    *   - Plays a sound effect for the enemy's bullet.
    */
    enemyShootingBullet() {
        let boss = this;
        if (boss.life > 0) {
            boss.shoot = true;
            this.world.enemyBullet = new EnenmyAmmo(boss.x + 10, boss.y + 85);
            this.world.shootingEnemy.push(this.world.enemyBullet);
            this.checkBulletRangeEnemy();
            this.enemieBulletSound();
        }
    }

    /**
    * Checks if enemy bullets have exceeded their range and removes them if so.
    * 
    * - Periodically checks if enemy bullets have moved beyond a specified distance from the boss enemy's x-coordinate.
    * - If an enemy bullet is out of range (more than 450 units away from the boss), it removes the bullet from the `shootingEnemy` array.
    * 
    * Runs the range check every 50 milliseconds.
    */
    checkBulletRangeEnemy() {
        setInterval(() => {
            if (this.world.enemyBullet !== undefined) {
                if (this.world.enemyBullet.x < this.x - 450) {
                    let index = this.world.shootingEnemy.indexOf(this.world.bullet);
                    this.world.shootingEnemy.splice(index, 1)
                }
            }
        }, 50)
    }

    /**
     * Play and Pause the Audio 
     */
    enemieBulletSound() {
        if (!mute) {
            this.shootEnemySound.play();
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
            if (this.bullet !== undefined) {
                if (this.bullet.x > this.character.x + 350) {
                    let index = this.shootAmmo.indexOf(this.bullet);
                    this.shootAmmo.splice(index, 1)
                }
            }
        }, 50)
    }
}

