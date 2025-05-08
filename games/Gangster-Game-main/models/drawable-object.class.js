class DrawableObject {

    img;
    x = 120;
    y = 340;
    height = 150;
    width = 100;
    imagesCache = {};
    currentImg = 0;
    newImg = 0;
    bossimg = 0;

    /**
     * Loads a single image from the specified path.
     * 
     * - Creates a new `Image` object.
     * - Sets the image source to the provided path.
     * 
     * @param {string} path - The path of the image to be loaded.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    *  Draws the current image onto the provided canvas context.
    * 
    * - Uses the `drawImage` method to render the image at the specified position and size.
    * 
    * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas on which to draw the image.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads an array of image paths into the cache.
    * 
    * - Iterates over the provided array of image paths.
    * - For each path:
    *   - Creates a new `Image` object and sets its `src` attribute to the path.
    *   - Caches the image object in `imagesCache` using the path as the key.
    * 
    * @param {string[]} arr - An array of image paths to be loaded into the cache.
    */
    loadImges(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imagesCache[path] = img;
        });
    }
}