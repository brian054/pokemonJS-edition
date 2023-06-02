class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        console.log("Hello from the Overworld.", this);

        // Load image into browser memory (under the hood)
        const image = new Image();
        image.onload = () => { 
            this.ctx.drawImage(image, 0, 0) 
        };
        image.src = "/images/maps/DemoLower.png";


        const x = 5;
        const y = 6;
        // Shadow under Sprite 'hero' feet
        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow, 
                0, // left cut 
                0, // top cut
                32, // 32 x 32 cuts (width)
                32, // height
                x * 16 - 8,
                y * 16 - 18,
                32,
                32
            )
        }
        shadow.src = "/images/characters/shadow.png";

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero, 
                0, // left cut 
                0, // top cut
                32, // 32 x 32 cuts (width)
                32, // height
                x * 16 - 8,
                y * 16 - 18,
                32,
                32
            )
        }
        hero.src = "/images/characters/people/hero.png"

    }
}