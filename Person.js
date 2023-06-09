class Person extends GameObject {
    constructor(config) {
        super(config); // runs GameObject constructor
        this.movingProgressRemaining = 0; // can't stop characters in the middle of a tile

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            // More cases for starting to walk come here
            //
            //

            // In this case we're keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }

    }

    startBehavior(state, behavior) {
        // Set character dir to whatever behavior has
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            // Stop here if space not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }

            // Ready to walk
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            // Finished walk
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        // movingProgress = have we made it to the next tile completely
        // !state.arrow = no arrow key pressed
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}