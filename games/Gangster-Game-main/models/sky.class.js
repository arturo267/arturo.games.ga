class Sky extends MovableObject {

    y = 0;
    width = 300;
    height = 200;
    speed = 0.2;

    /**
     * Load an givs The Sky infos
     * 
     * @param {img.src} imgPath 
     * @param {number} x 
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x;
        this.animate();
    }

    /**
     * Move and Animate The sky with cange The x coordinates
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 50);
    }

}