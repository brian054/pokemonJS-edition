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
            hero: new GameObject({ 
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
                x: 7,
                y: 9,
                src: "/images/characters/people/npc1.png"
            })
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({ 
                x: 4,
                y: 8,
            }),
            npc1: new GameObject({
                x: 8,
                y: 12,
                src: "/images/characters/people/npc1.png"
            }),
            npc2: new GameObject({ // 10 x 12 works wtf
                x: 6,
                y: 9,
                src: "/images/characters/people/npc3.png"
            })
        }
    },
}