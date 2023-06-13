class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // tiles

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; // above characters (ex. rooftops, treetops)
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }
}

// All the maps 
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({ 
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            npc1: new GameObject({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png"
            })
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
            npc2: new GameObject({ // 10 x 12 works wtf
                x: utils.withGrid(6),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc3.png"
            })
        }
    },
}