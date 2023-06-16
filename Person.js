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
        this.updatePosition();
        this.updateSprite(state);

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state) {
        // movingProgress = have we made it to the next tile completely
        // !state.arrow = no arrow key pressed
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}