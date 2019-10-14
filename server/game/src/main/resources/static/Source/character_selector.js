class CharacterSelector {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];

        this.velFloor = 3;
        this.xFloor = 0;

        //NEW
        this.select = 0; //0 = chica, 1 = robot, 2 = serpiente, 3 = gato
    }

    create(){
        this.active = true;
        
        //NEW
        this.spriteGirl = new Image();
        this.spriteGirl.src = "Assets/girlSpriteSheet64.png";
        this.spriteRobot = new Image();
        this.spriteRobot.src = "Assets/robot_spritesheet.png";

        this.buttonGirl = new Button("girlIcon128", 200, 350, 128, 128, "", true, "girlIconSelected");
        this.buttonRobot = new Button("robotIcon128", 400, 350, 128, 128, "", true, "robotIconSelected");

        let that = this;

        this.buttonGirl.create();
        this.buttonGirl.assignFunction(function(){
            that.buttonRobot.pushed = false;
            character = 0;
            playSound("yourcute");
        });

        this.buttonGirl.pushed = true;

        this.buttonRobot.create();
        this.buttonRobot.assignFunction(function(){
            that.buttonGirl.pushed = false;
            character = 1;
            playSound("yourcute");
        });

        this.posSprite = [0, 0];
        this.nextSprite = 0;

        this.goButton = new Button("reanudar", 800, 600, 240, 192, "");
        this.goButton.create();
        this.goButton.assignFunction(function(){
            sceneManager.changeScenes(2);
        });

        this.createGhost();

        //Resets viewport offset camera, for printing correctly the sprites as the function that prints
        //them uses the viewport offset.
        viewport.offset[0] = 0;
        viewport.offset[1] = 0;
    }

    addElement(element){
        this.elements.push(element);
    }

    createGhost(){
        for(var i = 1; i <= 5; i++){
            var yPos = 300*i % 860;
            
            var spuki = new Spuki(1250 + 10*i , yPos, i*3, i/2, yPos + 200, yPos - 200, "ghostMenu");
            this.ghosts.push(spuki);
        }
        
        
        
    }

    update(){
        
        clearCanvas();

        if(this.active)
            printBackground("backgroundMenu");


        if(this.xFloor <= -1088){
            this.xFloor = 0;
        }else{
            this.xFloor = this.xFloor - (1 * this.velFloor);
        }
        
        
        printImage("floor", [this.xFloor, 0], [2432, 860]);

        this.ghosts.forEach(element => {
            element.update();
        });

        printImage("selec_pers", [1240/2 - (908/2), 100], [908, 128]);

        this.elements.forEach(element => {
            element.update();
        });
        
            
        for(var i = 0; i < this.ghosts.length; i++){
            if(this.ghosts[i].x < -64){
                this.ghosts[i].x = 1304;
            }
        }

        //NEW
        printImage("selectPlayer", [(mapW / 2) - (1024 / 2), (mapH / 2) - (512 / 4)], [1024, 512]);

        this.buttonGirl.update();
        this.buttonRobot.update();
        this.goButton.update();
        
        printSprite(this.spriteGirl, this.posSprite, [232, 500 + 16]);
        printSprite(this.spriteRobot, this.posSprite, [432, 500 + 16]);

        if(this.nextSprite == 8){
            this.posSprite = [0, (this.posSprite[1] + 64) % 256];
            this.nextSprite = 0;
        }

        this.nextSprite++;

        
    }

    destroy(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];

        
    }
}