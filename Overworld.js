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
            // Clear Canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Camera Person
            const cameraPerson = this.map.gameObjects.hero;

            // Update all objects (could be performance issue)
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,

                })
            })

            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw Game Objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            //Draw Upper Layers
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => { // step calls itself when a new frame starts
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.directionInput = new DirectionInput(); // 'static' property here
        this.directionInput.init();

        this.startGameLoop();


    }
}