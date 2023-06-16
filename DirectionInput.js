class DirectionInput {
    constructor() {
        this.heldDirections = []; // try different ways

        // Map of KeyCodes we care about
        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right"
        }
    }

    // for external things to ask for direction
    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir); // insert at start 
            }
        });
        // if the key lifted up was in array, take it out
        document.addEventListener("keyup", e=> {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) { // in array
                this.heldDirections.splice(index, 1); // remove 
            }
        })
    }
}