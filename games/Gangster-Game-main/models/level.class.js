class Level {

    enemies;
    backgroundObject;
    skys;
    ammoPackages;
    moneybundle;
    parallaxBackground;
    level_end_x = 2100;
    level_start_x = 0;

    /**
     * Creat The Game Material
     * 
     * @param {Array} enemies 
     * @param {Array} skys 
     * @param {Array} backgroundObject 
     * @param {Array} parallaxBackground 
     * @param {Array} ammoPackages 
     */
    constructor(enemies, skys, backgroundObject, parallaxBackground, ammoPackages) {
        this.enemies = enemies;
        this.skys = skys;
        this.backgroundObject = backgroundObject;
        this.parallaxBackground = parallaxBackground;
        this.ammoPackages = ammoPackages;
        this.moneybundle = moneybundle;
    }
}