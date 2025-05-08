class BackgroundObject extends MovableObject {

width = 720;
height = 480;

/**
 * Load and givs The Background Infos
 * 
 * @param {img.src} imagePath 
 * @param {number} x 
 */
    constructor(imagePath, x) {
        super().loadImg(imagePath);
        this.y = 480 - this.height;
        this.x = x;
        
    }
}