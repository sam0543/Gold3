// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };

        //My code
        this.inputHandler = new InputHandler(this);
        this.sceneManager = null;

    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;

        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
            //Input Handler
            this.inputHandler.mouseHover(this.mouse.x, this.mouse.y);
        });

        this.ctx.canvas.addEventListener("mousedown", e => {
            if (this.options.debugging) {
                console.log("MOUSE_DOWN", getXandY(e));
            }
            this.mouse = getXandY(e);
            //Input Handler
            this.inputHandler.mouseDown(this.mouse.x, this.mouse.y);
        });

        this.ctx.canvas.addEventListener("mouseup", e => {
            if (this.options.debugging) {
                console.log("MOUSE_DOWN", getXandY(e));
            }
            this.mouse = getXandY(e);
            //Input Handler
            this.inputHandler.mouseUp(this.mouse.x, this.mouse.y);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        window.addEventListener("keydown", event => {
            this.keys[event.key] = true
            //Input Handler
            this.inputHandler.keyDown(event.key);
        });
        window.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = 0; i < this.entities.length; i++) {
            //console.log("Hi" + this.entities[i]);
            this.entities[i].draw(this.ctx);
            
        }
        
        this.camera.draw(this.ctx);
        
    };

    update() {
        // Update Entities
        this.entities.forEach(entity => entity.update(this));

        // Remove dead things
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);
        
        this.camera.update();
        
        // Add new things
        this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];
        
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    get["deltaTime"]() { return this.clockTick; }
    get["width"]() { return this.ctx?.canvas?.width || 0; }
    get["height"]() { return this.ctx?.canvas?.height || 0; }
};