class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    // Function to start game loop
    startGameLoop() {
        // ToDo: Timestep stuff so app doesn't run differently on different machines
        const step = () => {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx);

            // Draw Game Objects
            Object.values(this.map.gameObjects).forEach(object => {
                //object.x += 0.02;
                //object.x += 1;
                object.update({
                    arrow: this.directionInput.direction
                });
                object.sprite.draw(this.ctx);
            })

            //Draw Upper Layers
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => { // step calls itself when a new frame starts
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

        this.directionInput = new DirectionInput(); // 'static' property here
        this.directionInput.init();

        this.startGameLoop();


    }
}