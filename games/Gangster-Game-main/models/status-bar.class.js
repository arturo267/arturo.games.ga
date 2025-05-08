class StatusBar extends DrawableObject {

    IMAGES = [
        'img/interface/Energybar_full.png',
        'img/interface/lebensbalken_2.png',
        'img/interface/Lebensbalken_1.png',
        'img/interface/Energybar_empty.png',
    ];

    percentag = 100;

    /**
     * Load and Givs The Statusbar infos
     */
    constructor() {
        super();
        this.loadImges(this.IMAGES);
        this.x = 40;
        this.y = 30;
        this.width = 200;
        this.height = 25;
        this.setPercentage(100);
    }

    /**
    * Updates the percentage and the corresponding image.
    * 
    * @param {number} percentag - The percentage value to set.
    */
    setPercentage(percentag) {
        this.percentag = percentag;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imagesCache[path];
    }

    /**
    * Resolves the index of the image based on the current percentage value.
    * 
    * @returns {number} The index of the image corresponding to the percentage.
    */
    resolveImageIndex() {
        if (this.percentag == 100) {
            return 0
        } else if (this.percentag == 66) {
            return 1
        } else if (this.percentag == 32) {
            return 2
        } else if (this.percentag >= 0) {
            return 3
        } {
        }
    }
}