class Person extends GameObject {
    constructor(config) {
        super(config); // runs GameObject constructor
        this.movingProgressRemaining = 16; // can't stop characters in the middle of a tile

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        this.updatePosition();
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}