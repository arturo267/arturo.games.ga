class ParallaxBackground extends MovableObject {

    width = 720;
    height = 480;
    speed = 0.10;
    world;

    /**
     * Load and Givs The ParallaxBackground infos 
     * 
     * @param {img.src} imagePath 
     * @param {number} x 
     */
    constructor(imagePath, x) {
        super().loadImg(imagePath);
        this.y = 480 - this.height;
        this.x = x;
        this.animate();
    }


    /**
    *  Updates the object's position and movement based on keyboard input.
    * 
    * - Continuously checks keyboard input to move the object left or right.
    * - Adjusts the movement speed and direction based on the current input and position within the world boundaries.
    * - Moves the object right when the RIGHT key is pressed, if within the level's end boundary.
    * - Moves the object left when the LEFT key is pressed, if within the level's start boundary.
    * 
    * @memberof YourClassName
    */
    animate() {
        setInterval(() => {
            if (world !== undefined) {
                this.movingBackground();
                this.movingBackground2()
            }
        }, 1000 / 70)
    }

    /**
     * Background is moving by character walking
     */
    movingBackground() {
        if (this.world.keyboard.RIGHT && this.world.character.x < this.world.level.level_end_x) {
            if (this.world.keyboard.RIGHT) {
                this.x -= this.speed + 0.20;
                this.moveRight();
            } else {
                if (this.world.keyboard.LEFT) {
                    this.x -= this.speed - 0.20;
                    this.moveLeft();
                }
            }
        }
    }

    /**
     * Background is moving by character walking
     */
    movingBackground2() {
        if (this.world.keyboard.LEFT && this.world.character.x > this.world.level.level_start_x) {
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed - 0.50;
                this.moveLeft();
            } else {
                if (this.world.keyboard.RIGHT) {
                    this.x += this.speed + 0.20;
                    this.moveRight();
                }
            }
        }
    }
}
