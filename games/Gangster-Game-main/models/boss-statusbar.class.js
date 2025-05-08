class BossStatusbar extends DrawableObject {

    IMAGES = [
        'img/interface/Kopf_Endboss_0.png',
        'img/interface/Kopf_Endboss_1.png',
        'img/interface/Kopf_Endboss_2.png',
        'img/interface/Kopf_Endboss_3.png',
        'img/interface/Kopf_Endboss_4.png',
        'img/interface/Kopf_Endboss_5.png',
    ];

    percentag = 5;

    /**
     * Load and Give The Bosstatus infos
     */
    constructor() {
        super();
        this.loadImges(this.IMAGES);
        this.x = 500;
        this.y = 100;
        this.width = 200;
        this.height = 35;
        this.setPercentage(5);
    }

    /**
    * Sets the percentage value and updates the corresponding image.
    * 
    * - Updates the internal percentage to the given value.
    * - Determines the appropriate image based on the updated percentage.
    * - Sets the current image to the resolved image from the cache.
    * 
    * @param {number} percentag - The new percentage value to be set.
    */
    setPercentage(percentag) {
        this.percentag = percentag;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imagesCache[path];
    }

    /**
    * Resolves the image index based on the current percentage value.
    * 
    * - Determines the appropriate image index by comparing the percentage value.
    * - Returns an index corresponding to the range of the percentage.
    * 
    * @returns {number} The resolved image index based on the percentage value.
    */
    resolveImageIndex() {
        if (this.percentag == 5) {
            return 5
        } else if (this.percentag == 4) {
            return 4
        } else if (this.percentag == 3) {
            return 3
        } else if (this.percentag >= 2) {
            return 2
        } else if (this.percentag >= 1) {
            return 1
        } else if (this.percentag >= 0) {
            return 0
        }

    }
}