class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // tiles

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; // above characters (ex. rooftops, treetops)

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage, 
            utils.withGrid(10.5) - cameraPerson.x, 
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            utils.withGrid(10.5) - cameraPerson.x, 
            utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction);    
        return this.walls[`${x}, ${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            
            let object = this.gameObjects[key];
            object.id = key;

            // ToDo: determine if object should actually mount
            object.mount(this);
        })
    }

    addWall(x, y) {
        this.walls[`${x}, ${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x}, ${y}`];
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}

// All the maps 
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true, 
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800},
                    { type: "stand", direction: "up", time: 800},
                    { type: "stand", direction: "right", time: 1200},
                    { type: "stand", direction: "up", time: 300},
                ]
            }),
            npcB: new Person({   
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "/images/characters/people/npc2.png",
                behaviorLoop: [
                    { type: "walk", direction: "left"},
                    //{ type: "stand", direction: "up", time: 800},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "down"}
                ]
            }),
        },
        // Don't store the walls data in an array
        // This would iterate over every index of every wall, every frame.
        // We need an object so we have a clean lookup on any given space
        // to determine if it is a wall space or not.
        walls: {
            // Brackets = dynamic key
            [utils.asGridCoord(7, 6)] : true,
            [utils.asGridCoord(8, 6)] : true,
            [utils.asGridCoord(7, 7)] : true,
            [utils.asGridCoord(8, 7)] : true
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({ 
                x: utils.withGrid(4),
                y: utils.withGrid(8),
            }),
            npc1: new GameObject({
                x: utils.withGrid(8),
                y: utils.withGrid(12),
                src: "/images/characters/people/npc1.png"
            }),
            npc2: new GameObject({ 
                x: utils.withGrid(6),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc3.png"
            })
        }
    },
}