class AmmoPackage extends MovableObject {
y = 435;

/**
 * Load and givs the Ammopackage infos
 * 
 * @param {img.src} img 
 * @param {number} x 
 */
    constructor(img, x) {
        super().loadImg(img);
        this.x = x;
        this.width = 55;
        this.height = 50;
    }
}