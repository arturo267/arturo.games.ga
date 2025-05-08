class NoGunEnemy extends MovableObject {

    IMAGES_ENEMY_Walk = [
        'img/Gangsters_2/Walk/Walk_1.png',
        'img/Gangsters_2/Walk/Walk_2.png',
        'img/Gangsters_2/Walk/Walk_3.png',
        'img/Gangsters_2/Walk/Walk_4.png',
        'img/Gangsters_2/Walk/Walk_5.png',
        'img/Gangsters_2/Walk/Walk_6.png',
        'img/Gangsters_2/Walk/Walk_7.png',
        'img/Gangsters_2/Walk/Walk_8.png',
        'img/Gangsters_2/Walk/Walk_9.png',
        'img/Gangsters_2/Walk/Walk_10.png',
    ];

    IMAGES_ATTACK = [
        'img/Gangsters_2/attack/1.png',
        'img/Gangsters_2/attack/2.png',
        'img/Gangsters_2/attack/3.png',
        'img/Gangsters_2/attack/4.png',
        'img/Gangsters_2/attack/5.png',
        'img/Gangsters_2/attack/6.png',
        'img/Gangsters_2/attack/Attack_2.1.png',
        'img/Gangsters_2/attack/Attack_2.2.png',
        'img/Gangsters_2/attack/Attack_2.3.png',
        'img/Gangsters_2/attack/Attack_2.4.png',
    ];

    IMAGES_RUN = [
        'img/Gangsters_2/run/1.png',
        'img/Gangsters_2/run/2.png',
        'img/Gangsters_2/run/3.png',
        'img/Gangsters_2/run/4.png',
        'img/Gangsters_2/run/5.png',
        'img/Gangsters_2/run/6.png',
        'img/Gangsters_2/run/7.png',
        'img/Gangsters_2/run/8.png',
        'img/Gangsters_2/run/9.png',
        'img/Gangsters_2/run/10.png',

    ];

    IMAGES_DEAD = [
        'img/Gangsters_2/dead/1.png',
        'img/Gangsters_2/dead/2.png',
        'img/Gangsters_2/dead/3.png',
        'img/Gangsters_2/dead/4.png',
        'img/Gangsters_2/dead/5.png',
    ];

    y = 310;
    height = 165;
    width = 150;
    hit = true;

    /**
    * Initializes an instance of the class with image loading and animation setup.
    * 
    * - Loads the initial image for the enemy.
    * - Loads images for attack and death states.
    * - Configures the enemy's position and speed.
    * - Chooses animation based on the speed of the enemy.
    * - If `this.hit` is true, sets up the enemy as dead, positions it, and determines the animation.
    */
    constructor() {
        super().loadImg(this.IMAGES_ENEMY_Walk[0]);
        this.loadImges(this.IMAGES_ATTACK);
        this.loadImges(this.IMAGES_DEAD);
        if (this.hit) {
            this.Dead();
            this.x = 700 + Math.random() * 2000;
            this.speed = 0.25 + Math.random() * 1.8;
            this.enemyWalkOrRun();
        }
    }

    /**
     * If the Random Speed is over the 1.2 than Run but if not Walk.
     */
    enemyWalkOrRun() {
        if (this.speed > 1.2) {
            this.loadImges(this.IMAGES_RUN);
            this.animate(this.IMAGES_RUN);
        } else {
            this.animate(this.IMAGES_ENEMY_Walk);
            this.loadImges(this.IMAGES_ENEMY_Walk);
        }
    }
    
    /**
    * Plays the death animation and updates the image sequence.
    * 
    * - Continuously plays the death animation frames if `this.hit` is `false`.
    * - When the last frame of the death animation is reached, it ensures that only the last frame is shown.
    */
    Dead() {
        let i = 0;
        setInterval(() => {
            if (this.hit == false) {
                this.playanimat(this.IMAGES_DEAD);
                if (this.newImg == this.IMAGES_DEAD.length - 1) {
                    this.IMAGES_DEAD = [this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
                }
            }
        }, 100);
    }


    /**
    * Starts animations and movements based on the hit state.
    * 
    * - Continuously moves the object left if `this.hit` is `true`, with a frame rate of 60 FPS.
    * - Continuously plays the specified animation frames with a delay of 150 milliseconds between frames if `this.hit` is `true`.
    * 
    * @param {string[]} arr - An array of image paths or frames for the animation.
    */
    animate(arr) {
        setInterval(() => {
            if (this.hit) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.hit) {
                this.playAnimation(arr);
            }
        }, 150);
    }
}