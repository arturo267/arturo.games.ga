class MoneyBar extends MovableObject {

    MONEYBAR_IMG = [
        'img/interface/moneybar/0_dollar.png',
        'img/interface/moneybar/500_dollar.png',
        'img/interface/moneybar/1000_dollar.png',
        'img/interface/moneybar/1500_dollar.png',
        'img/interface/moneybar/2000_dollar.png',
    ];

    percentag = 0;

    /**
     * Load and Givs The Monebar Infos
     */
    constructor() {
        super().loadImg(this.MONEYBAR_IMG[0]);;
        this.x = 35;
        this.y = 100;
        this.width = 100;
        this.height = 35;
        this.loadImges(this.MONEYBAR_IMG);
        this.setPercentagemoney();
    }

    /**
    * Sets the percentage of money and updates the image.
    * 
    * @param {number} [percentag=0] - The percentage of money to set.
    */
    setPercentagemoney(percentag) {
        if (percentag == undefined) {
            percentag = 0;
        }
        this.percentag = percentag;
        let path = this.MONEYBAR_IMG[this.resolveImageIndex()]
        this.img = this.imagesCache[path];
    }
    
    /**
    * Resolves the image index based on the current percentage.
    *
    * @returns {number} The image index corresponding to the current percentage.
    */
    resolveImageIndex() {
        if (this.percentag == 4) {
            return 4
        } else if (this.percentag == 3) {
            return 3
        } else if (this.percentag == 2) {
            return 2
        } else if (this.percentag == 1) {
            return 1
        } else if (this.percentag == 0) {
            return 0
        }
    }

}