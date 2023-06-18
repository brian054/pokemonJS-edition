class GameObject {
    constructor (config) {
        this.id = null; // currently gets set in OverworldMap.js
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/people/hero.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        console.log("mounting...");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // if we have a behavior, kick it off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }), 10;
    }

    update() {

    }

    // await tells the code that init() will take a bit to resolve (asynchronous code),
    // so nothing below the await will execute until init() finishes
    async doBehaviorEvent(map) {
        // Don't do anything if there is a more important cutscene 
        // or I don't have a behaviorLoop to do anything anyway
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
        }

        // Set event up with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // Create event instance out of our next event config
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init(); 

        // Setting next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        // Do it again
        this.doBehaviorEvent(map);

    }
}