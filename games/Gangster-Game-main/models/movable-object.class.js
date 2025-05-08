class MovableObject extends DrawableObject {
    speed = 0.8;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    ammobar = 1;
    hitCooldown = true;

    /**
    * Applies gravity to an object, adjusting its vertical position over time.
    * Continuously updates the object's position and speed at a set interval.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAbouveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Check if The Character Over The Ground
     * 
     * @returns if Character is over The Ground
     */
    isAbouveGround() {
        return this.y < 305;
    }

    /**
     * Moving Left with change the x coordinates
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moving Left with change the x coordinates
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Plays an animation by cycling through a list of images.
     *
     * @param {string[]} images - An array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let index = this.currentImg % images.length;
        let path = images[index];
        this.img = this.imagesCache[path];
        this.currentImg++;
        if (this.currentImg >= images.length) {
            this.currentImg = 0;
        }
    }

    /**
    * Cycles through an array of images to play an animation.
    *
    * @param {string[]} arr - An array of image paths for the animation.
    */
    playanimat(arr) {
        let i = this.newImg % arr.length;
        let path = arr[i];
        this.img = this.imagesCache[path];
        this.newImg++;
    }

    /**
    * Cycles through an array of images to play an animation.
    *
    * @param {string[]} arr - An array of image paths for the animation.
    */
    playanimatBoss(arr, test) {
        let i = test % arr.length;
        let path = arr[i];
        this.img = this.imagesCache[path];
    }

    /**
     * change the y coordinates to Jump
     */
    jump() {
        this.speedY = 20;
    }

    /**
    * Checks if this object is colliding with another object.
    *
    * @param {Object} obj - The object to check collision against.
    * @param {number} obj.x - The x-coordinate of the other object.
    * @param {number} obj.y - The y-coordinate of the other object.
    * @param {number} obj.width - The width of the other object.
    * @param {number} obj.height - The height of the other object.
    * @returns {boolean} `true` if the objects are colliding, otherwise `false`.
    */
    isColliding(obj) {
        return this.x + this.width - 70 > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
    }

    /**
    * Checks if this object is colliding with another object.
    *
    * @param {Object} obj - The object to check collision against.
    * @param {number} obj.x - The x-coordinate of the other object.
    * @param {number} obj.y - The y-coordinate of the other object.
    * @param {number} obj.width - The width of the other object.
    * @param {number} obj.height - The height of the other object.
    * @returns {boolean} `true` if the objects are colliding, otherwise `false`.
    */
    isCollidingForBullet(obj) {
        return this.x + this.width > obj.x +50 &&
            this.y + this.height > obj.y &&
            this.x < obj.x + obj.width &&
            this.y < obj.y + obj.height + 100
    }

    /**
    * Applies damage to the character and manages the hit cooldown.
    * Reduces the character's lifebar by 34 and ensures it does not drop below 0.
    * Implements a cooldown period of 2 seconds between hits.
    */
    hit() {
        setInterval(() => {
            this.hitCooldown = true;
        }, 2000);
        if (this.hitCooldown) {
            world.character.lifebar -= 34;
            if (world.character.lifebar < 0) {
                world.character.lifebar = 0;

            } else {
                this.lastHit = new Date().getTime();
            }
        }
        this.hitCooldown = false
    }
    /**
     * Check if Character lifebar is =
     * 
     * @returns Character Lifebar
     */
    isDaed() {
        return world.character.lifebar == 0;
    }

    /**
     * Check tha Character cant hit secondtime after under 0.8 sec
     * 
     * @returns time passed after 0.8 sec
     */
    itHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }
}