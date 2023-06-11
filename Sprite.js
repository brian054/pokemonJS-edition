class Sprite {
    constructor(config) {

        // Set up image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Shadow
        this.shadow = new Image();
        this.useShadow = true; // config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
        

        // Configure Animation and Initial State
        this.animations = config.animations || {
            idleDown: [ // 2d array of frames
                [0,0]
            ],
            walkDown: [
                [0,0], [1,0], [2,0], [3,0]
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // Ref the game object
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8; // - 8
        const y = this.gameObject.x * 16 - 18   ; // - 18

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        // Make sure image loaded into memory before draw
        this.isLoaded && ctx.drawImage(this.image,
            0, 0,
            32, 32, 
            x, y,
            32, 32)
    }
}