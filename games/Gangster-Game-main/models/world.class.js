class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    enemyStatusbar = new BossStatusbar();
    moneybar = new MoneyBar();
    shootAmmo = [];
    shootingEnemy = [];
    ammobar = new Ammo();
    shootSound = new Audio('audio/machine-gun-burst-43670.mp3');
    reloadSound = new Audio('audio/reload.mp3');
    backgroundSound = new Audio('audio/akk-driving-techno-198984.mp3');
    hitSound = new Audio('audio/blocking-arm-with-hand-6941.mp3');
    hurtSound = new Audio('audio/male_hurt7-48124.mp3');
    emptyAmmoSound = new Audio('audio/empty-gun-shot-6209.mp3');
    bullet;
    enemyBullet;
    pause = false;

    /**
     * Load and givs The Wold Infos
     * @param {*} canvas 
     * @param {boolean} keyboard 
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.reloadSound.pause();
        this.draw();
        this.setWorld();
        this.checkCollisionPackage();
        this.run();
        this.checkCollisionWithAmmo();
        this.level.enemies[5].enemyShootingBullet();
        this.checkCollisionWithEnemyAmmo();
        this.checkSoundShoot();
        this.level.enemies[5].shootEnemySound.volume = 0.00;
    }

    /**
     * Givs The every parallaxBackground the World Class
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies[5].world = this;
        for (let i = 0; i < this.level.parallaxBackground.length; i++) {
            this.level.parallaxBackground[i].world = this;
        }
        this.checkCollisionClass = this;
    }

    /**
     * Add and Draw The Wold Material
     */
    draw() {
        if (!this.pause) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.drawBackground();
            this.ctx.translate(-this.camera_x, 0);
            this.addStatusBar();
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.material();
            this.ctx.translate(-this.camera_x, 0);
            this.reqestFrame();
        }
    }

    /**
     * Add Statusbar infos
     */
    addStatusBar() {
        this.addToMap(this.statusbar);
        this.loadEnemyStatusbar();
        this.addToMap(this.ammobar);
        this.addToMap(this.moneybar);
    }

    loadEnemyStatusbar() {
        if (this.character.x >= 700) {
            this.addToMap(this.enemyStatusbar);
        }
    }

    /**
    * Requests an animation frame to call the `draw` method.
    * Utilizes `requestAnimationFrame` to schedule the `draw` method for the next frame.
    */
    reqestFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Add Background Material
     */
    drawBackground() {
        this.addObjectToMap(this.level.skys);
        this.addObjectToMap(this.level.parallaxBackground);
        this.addObjectToMap(this.level.backgroundObject);
    }

    /**
     * Add Level Material
     */
    material() {
        this.addObjectToMap(this.level.ammoPackages);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.moneybundle);
        this.addObjectToMap(this.shootAmmo);
        this.addObjectToMap(this.shootingEnemy);
    }

    /**
     * Check if Character over 700 x coordinate then play enemy shoot Sound
     */
    checkSoundShoot() {
        setInterval(() => {
            if (this.character.x >= 700) {
                this.level.enemies[5].shootEnemySound.volume = 0.03;
            }
        }, 500)
    }

    /**
    * Periodically executes game logic.
    * - Calls `checkCollision` to detect collisions.
    * - Calls `checkShootingObject` to handle shooting objects.
    * - Calls `playBackgroundMusic` to play or manage background music.
    * Executes these tasks every 200 milliseconds.
    */
    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkShootingObject();
            this.playBackgroundMusic();
        }, 130)

    }

    /**
    * Handles shooting logic based on keyboard input and ammunition status.
    * - Checks if the SHOOT key is pressed.
    * - If ammunition is depleted (percentag is 0), it plays a sound and stops shooting.
    * - If ammunition is available, it:
    *   - Executes the shooting action.
    *   - Checks the bullet's range.
    *   - Updates the current ammunition count.
    *   - Plays a shooting sound if not muted.
    */
    checkShootingObject() {
        if (this.keyboard.SHOOT) {
            if (this.ammobar.percentag == 0) {
                this.checkBulletSound();
                this.keyboard.SHOOT = false;
            } else {
                this.character.shootTheBullet();
                this.character.checkBulletRange();
                this.ammobar.currentAmo()
                if (!mute) {
                    this.checkBulletSoundMute();
                }
            }
        }
    }

    /**
     * Play and Pause the Audio 
     */
    checkBulletSoundMute() {
        this.shootSound.volume = 0.1;
        this.shootSound.play();
        setTimeout(() => {
            this.shootSound.pause();
        }, 500);
    }

    /**
     * Play and Pause the Audio 
     */
    checkBulletSound() {
        if (mute) {
            this.emptyAmmoSound.pause();
        } else {
            this.emptyAmmoSound.volume = 0.12;
            this.emptyAmmoSound.play();
        }
    }

    /**
     * Play and Pause the Audio 
     */
    playBackgroundMusic() {
        if (mute) {
            this.backgroundSound.pause();
        } else {
            this.backgroundSound.volume = 0.02;
            this.backgroundSound.play();
        }
    }

    /**
    * Checks for collisions between the character and enemies.
    * - Iterates over each enemy in the level.
    * - If the character collides with an enemy that has been hit:
    *   - Calls the character's `hit` method.
    *   - Plays the attack animation for the enemy.
    *   - Updates the status bar with the character's current lifebar percentage.
    *   - Plays a sound effect for the hit.
    */
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.hit == true) {
                this.character.hit();
                if (enemy !== this.level.enemies[5]) {
                    enemy.playAnimation(enemy.IMAGES_ATTACK);
                    this.statusbar.setPercentage(this.character.lifebar);
                    this.checkHitSound();
                }
            }
        });
    }

    /**
     * Play and Pause the Audio 
     */
    checkHitSound() {
        if (!mute) {
            this.hitSound.volume = 0.4;
            this.hitSound.play();
            this.hurtSound.volume = 0.2;
            this.hurtSound.play();
        }
    }

    /**
    * Checks for collisions between bullets and enemies.
    * - Periodically checks for collisions between all bullets and enemies.
    * - If an enemy is not hit, it is skipped.
    * - If an enemy is hit, the `hitTheEnemie` method is called to handle the collision.
    * Runs the collision check every 10 milliseconds.
    */
    checkCollisionWithAmmo() {
        setInterval(() => {
            if (this.shootAmmo.length !== 0) {
                this.level.enemies.forEach((enemy) => {
                    this.shootAmmo.forEach((bullet) => {
                        if (enemy.hit == false) {
                        } else {
                            this.hitTheEnemie(bullet, enemy)
                        }
                    })
                })
            }
        }, 10)
    }

    /**
    * Handles the collision between a bullet and an enemy.
    * - Checks if the bullet collides with the enemy.
    * - Removes the bullet from the `shootAmmo` array if a collision occurs.
    * - Marks the enemy as not hit.
    * - For a specific enemy (at index 5), updates its life and hit state if it has remaining life.
    * @param {Object} bullet - The bullet object involved in the collision.
    * @param {Object} enemy - The enemy object that may be hit by the bullet.
    */
    hitTheEnemie(bullet, enemy) {
        if (bullet.isCollidingForBullet(enemy)) {
            let index = this.shootAmmo.indexOf(bullet);
            this.shootAmmo.splice(index, 1);
            enemy.hit = false;
            if (enemy == this.level.enemies[5]) {
                enemy.hit = true;
                this.hitEnemyFunction(enemy);
            }
        }
    }

    /**
     * IF the Enemy was hit then deduct from life.
     * Givs hit1 the next Function on true;
     * deduct from Enemy Life. 
     * @param {class} enemy 
     */
    hitEnemyFunction(enemy) {
        if (enemy.life > 0) {
            enemy.life--
            enemy.hit1 = true;
            this.enemyStatusbar.percentag--;
            this.enemyStatusbar.setPercentage(this.enemyStatusbar.percentag)
        }
    }

    /**
    * Checks for collisions between enemy bullets and the character.
    * - Periodically checks if any bullets from enemy shooters collide with the character.
    * - Calls `checkBullethitCharacter` to handle each bullet's collision with the character.
    * Runs the collision check every 100 milliseconds.
    */
    checkCollisionWithEnemyAmmo() {
        setInterval(() => {
            if (this.shootingEnemy.length !== 0) {
                this.shootingEnemy.forEach((bullet) => {
                    this.character.checkBullethitCharacter(bullet)
                })
            }
        }, 100)
    }

    /**
    * Checks for collisions between the character and ammo packages.
    * - Periodically checks if the character collides with any ammo packages.
    * - If a collision is detected:
    *   - Removes the collided ammo package from the `ammoPackages` array.
    *   - Plays a sound effect for picking up the ammo package.
    *   - Increases the ammo bar percentage and updates its display.
    * Runs the collision check every 100 milliseconds.
    */
    checkCollisionPackage() {
        setInterval(() => {
            this.reloadSound.volume = 0.02;
            this.level.ammoPackages.forEach((ammo) => {
                if (this.character.isColliding(ammo)) {
                    let index = this.level.ammoPackages.indexOf(ammo);
                    this.level.ammoPackages.splice(index, 1);
                    this.ammoPackagesSound();
                    this.ammobar.percentag = 5;
                    this.ammobar.setPercentageAmmo(this.ammobar.percentag);
                }
            });
        }, 100);
    }

    /**
     * Play and Pause the Audio 
     */
    ammoPackagesSound() {
        if (mute) {
            this.reloadSound.pause();
        } else {
            this.reloadSound.play();
        }
    }

    /**
     * Adds multiple objects to the map.
     * - Iterates over the array of objects and adds each object to the map using the `addToMap` method.
     * @param {Object[]} objects - An array of objects to be added to the map.
     */
    addObjectToMap(objects) {
        objects.forEach(ob => {
            this.addToMap(ob);
        });
    }

    /**
    * Draws an object onto the map.
    * - Calls the `draw` method of the provided object to render it on the map.
    * @param {Object} mo - The object to be drawn on the map. It must have a `draw` method.
    */
    addToMap(mo) {
        mo.draw(this.ctx);
    }
    clearWorld() { }

    /**
    * Clears the canvas and resets the camera position.
    * - Gets the 2D rendering context of the canvas.
    * - Clears the entire canvas area.
    * - Resets the camera's x-coordinate to 0.
    */
    clearCanvas() {
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.camera_x = 0;
    }

    /**
    * Resets the background sound to its start position and pauses it.
    * - Sets the playback time of the `backgroundSound` to the beginning (0 seconds).
    * - Pauses the `backgroundSound`.
    */
    resetAudios() {
        this.backgroundSound.currentTime = 0;
        this.backgroundSound.pause();
    }
}