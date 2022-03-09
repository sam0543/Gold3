// class Background extends Entity {
//     constructor(game, images) {
//         super(game, 0, 0);
//     }
// }

class Scene extends Entity {

    constructor(game) {
        super(game, 0, 0);
        this.game.camera = this;
        this.x = 0;
        this.gameOver = false;
        this.title = true;
        this.gameOver = false;

        this.menuSelect = {
            newGame: false,
            credits: false,
        }

        //UI Panels
        // this.game.addEntity(new ProgressBar(game, 100, 200, 400, 30, rgb(160,38,37)));
        //this.playerHealthBar = new PlayerHealthBar(game, 10, 10, 1);
        //this.game.addEntity(this.playerHealthBar);

        //Player
        this.player = new Player(game, 400, 300);
        //this.game.addEntity(this.player);
        


        //Entity Counter
        this.entityCounter = new TextElement(game, 470, 55, "Entities: " + game.entities.length);
        //this.game.addEntity(this.entityCounter);


        //Test Stuff
        //this.testDummy = new Dummy(game, 850, 700);
        //this.game.addEntity(this.testDummy);

        //this.testItem = new Item(game, 350, 600);
        //this.game.addEntity(this.testItem);
        this.transition = new TransitionScreen(this.game, 400, 300, this.title);
        this.loadLevel(400, 300, false, true);
        

    };

    clearEntities() {
        this.game.entites.forEach(function(entity) {
            entity.removeFromWorld = true;
        });
    };

    enemyWave() {

        //generate 5 zombies
        
        for (var i = 0.99; i < Math.round(Math.random() * 20 )  ; i++) {
            this.zombie = new Zombie(this.game, i * 800 + i, 200);
            this.game.addEntity(this.zombie);
            this.zombie = new Zombie(this.game, i * 800 + i*60, 200);
            this.game.addEntity(this.zombie);
            this.zombie = new Zombie(this.game, i * 800 + i*40, 200);
            this.game.addEntity(this.zombie);
            this.zombie = new Zombie(this.game, i * 800 + 90, 200);
            this.game.addEntity(this.zombie);
        }
    }

    loadLevel(x, y, transition, title) {
        this.title = title;
        
        this.game.entites = [];
        this.clearEntities();
        //this.x = 0;
        if(transition && title){
            this.game.addEntity(this.transition);
        }else{
            //console.log("Title");

        //  if(title==false){
        //     //this.game.camera = this;
        //     //this.playerHealthBar = new PlayerHealthBar(this.game, 10, 10, 1);
        //     //this.game.addEntity(this.playerHealthBar);
        //     //Player
        //     //this.player = new Player(this.game, 400, 400);
        //     this.player.x = x;
        //     this.player.y = y;
        //     this.game.addEntity(this.player);
            
    
        //    // console.log("Inside Title");

        //     //Entity Counter
        //     //this.entityCounter = new TextElement(this.game, 470, 55, "Entities: " + this.game.entities.length);
        //     this.game.addEntity(this.entityCounter);
            
        //  }
    
            // this.player = new Player(this.game, 400, 400);
             //this.game.addEntity(this.player);
            
            

            for (var i = 0; i < (5000%640); i++) {
                this.background = new Grass2(this.game, i * 100, 570, 100, 100);
                this.game.addEntity(this.background);
            }
            for (var i = 0; i < (5000%1240); i++) {
                this.background = new Sky(this.game, i * 1236, 0);
                this.game.addEntity(this.background);
            }
            for (var i = 0; i < (5000%1240); i++) {
                this.background = new Mountain(this.game, i * 1236, 280);
                this.game.addEntity(this.background);
            }
            this.background = new Sun(this.game, 900, 90);
            this.game.addEntity(this.background);

            for (var i = 0; i < (5000%1240); i++) {
                this.background = new Clouds(this.game, i * 1236, 0);
                this.game.addEntity(this.background);
            }
            for (var i = 0.5; i < (5000%200); i++) {
                this.background = new Palm(this.game, i * 620, 250);
                this.game.addEntity(this.background);
            }
             // further trees
             for (var i = 0; i < (5000%840); i++) {
                this.background = new Tree(this.game, -80 + i * 40, 500, 120, 170);
                this.game.addEntity(this.background);
            }
            //Big trees     
            for (var i = 0; i < (5000%380); i++) {
                if (Math.round(Math.random()) / 2 == 0) {
                    this.background = new Tree3(this.game, i * 380, 300, 400, 400);
                    this.game.addEntity(this.background);
                }
            }
            
            for (var i = 0; i < (5000%800); i++) {
                this.background = new River(this.game, -80 + i * 450, 700, 550, 70);
                this.game.addEntity(this.background);
            }
            for (var i = 0.2; i < (5000%250) ; i++) {
                if (Math.round(Math.random()) / 2 == 0) {
                    this.background = new mashroomTree(this.game, i * 1000, 420);
                    this.game.addEntity(this.background);
                }
            }
            for (var i = 1.5; i < (5000%640) ; i++) {
                if (Math.round(Math.random()) / 2 == 0) {
                    this.background = new Rock(this.game, i * 600, 505, 150, 200);
                    this.game.addEntity(this.background);
                }
            }
            for (var i = 0; i < (5000%120) ; i++) {
                if (Math.round(Math.random()) / 2 == 0) {
                    this.background = new PixalTree(this.game, i * 1300, 490);
                    this.game.addEntity(this.background);
                }
            }
            for (var i = 0; i < (5000%150) ; i++) {
                if (Math.round(Math.random()) / 2 == 0) {
                    this.background = new Bush(this.game, i * 400, 555);
                    this.game.addEntity(this.background);
                }
            }
            for (var i = 0; i < 5000/100; i++) {
                this.platform = new Platform(this.game, i * 100, 650, 100, 100);
                this.game.addEntity(this.platform);
            }
           
           
            //spawn teleporter at a random space from 600 but also within the bounds of the game
            
            if(title==false){
                //this.game.camera = this;
                this.playerHealthBar = new PlayerHealthBar(this.game, 10, 10, 1);
                this.game.addEntity(this.playerHealthBar);
                //Player
                //this.player = new Player(this.game, 400, 400);
                //this.player.x = x;
               // this.player.y = y;
                this.game.addEntity(this.player);
                
        
               // console.log("Inside Title");
    
                //Entity Counter
                //this.entityCounter = new TextElement(this.game, 470, 55, "Entities: " + this.game.entities.length);
                this.game.addEntity(this.entityCounter);
                this.enemyWave();
                
             }

           // console.log("LOL Title");

            // if (music && !this.title) {
            //     ASSET_MANAGER.pauseBackgroundMusic();
            //     ASSET_MANAGER.playAsset(music);
            // }
            //if(title == false){
                // this.playerHealthBar = new PlayerHealthBar(game, 10, 10, 1);
                // this.game.addEntity(this.playerHealthBar);
        
                //Player
                //this.player = new Player(game, 400, 400);
                //this.game.addEntity(this.player);
                //this.enemyWave();
        
        
                // //Entity Counter
                // this.entityCounter = new TextElement(game, 470, 55, "Entities: " + game.entities.length);
                // this.game.addEntity(this.entityCounter);
            //}

            this.teleporter = new Teleporter(this.game, (Math.round(Math.random()) * 600)%4000, 200);
            this.game.addEntity(this.background);
        }
        // for (var i = 0; i < 10; i++) {
        //     this.background = new Water(this.game, i * 390,640);
        //     this.game.addEntity(this.background);
        // }


    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    updateTitle(){

    };

    addEntity(entity) {
        this.game.addEntity(entity);
    }

    getHit(shootingVector) {
        let hitEntities = []
        this.game.entities.forEach(entity => {
            if (entity.shootable) {
                if (shootingVector.intersect(entity.hitVector)) {
                    hitEntities.push(entity);
                }
            }
        });
        return hitEntities;
    }

    update() {
        //camera follow forward movement
        let camF = this.game.width * 3 / 4;
        if (this.x < this.player.x - camF) this.x = this.player.x - camF;
        //camera follow backwards movement
        let camB = this.game.width * 1 / 8;
        if (this.x > this.player.x - camB) this.x = this.player.x - camB;


        let c = 0;
        this.game.entities.forEach(entity => {
            c += 1;
        });
        this.entityCounter.text = "Entities: " + c;

        // Shoot Detection
        this.player.hitVector.color = rgba(0, 0, 0, 1);
        this.game.entities.forEach(entity => {
            if (entity.shootable) {
                if (this.player.hitVector.intersect(entity.hitVector)) {
                    this.player.hitVector.color = rgba(255, 0, 0, 1);
                }
            }
        });

        // if (this.lineOne.intersect(this.player.hitVector))
        // {
        //     this.player.hitVector.color = rgba(255, 0, 0, 1);
        // }
        // else
        // {
        //     this.player.hitVector.color = rgba(0, 0, 0, 1);
        // }
        var that = this;
        var transition = false;

        if(this.title && this.game.click){
            if(this.game.mouse && this.game.mouse.y > 403 && this.game.mouse.y < 445
                 && this.game.mouse.x > 440 && this.game.mouse.x < 569){
                this.title = false;

                console.log("hi");
            }
                // this.game.entities.forEach(function(entity) {
                // if(entity instanceof TransitionScreen)
                //     entity.removeFromWorld = true;
                // });
                //this.loadLevel(400, 300, true, false);


            
            this.loadLevel(400, 300, true, false);



        } 
        if(this.gameOver){
            this.gameOver = false;
            this.player = new Player(game, 400, 400);
            this.clearEntities();
            this.game.addEntity(new TransitionScreen(this.game, x, y, true));

        }


    };

    draw(ctx){
        ctx.font = 50  + "px " + "robotoCondensed"
        ctx.fillStyle = "White"
        if(this.title){
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 403 && this.game.mouse.y < 445 && this.game.mouse.x > 440 && this.game.mouse.x < 569 ? "White" : "Black";
            //ctx.fillRect(569, 435, 1, 5);
            ctx.fillText("START", 440, 440)

        }

    };

}
