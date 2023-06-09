class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    // stand(resolve), walk(resolve)
    // resolve signifies when event is done (fufills promise in 
    // GameObject.doBehaviorEvent)

    stand(resolve) {

    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
        })

        // Set up a handler to complete when correct person is done walking,
        // then resolve event.
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}