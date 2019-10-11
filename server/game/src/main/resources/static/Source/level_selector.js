class LevelSelector {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];

        this.velFloor = 3;
        this.xFloor = 0;
    }

    create(){
        this.active = true;

        let level1 = new Button("nums/1", 1240/3 - (65/2), 400, 65, 65, "");
        let level2 = new Button("nums/2", 1240/2 - (65/2), 400, 65, 65, "");
        let volver = new Button("ui/volver", 660 - (420/2), 550, 420, 192, "");
        

        level1.create();
        level1.assignFunction(function(){
            sceneManager.changeScenes(1, 0);
        });

        level2.create();
        level2.assignFunction(function(){
            sceneManager.changeScenes(1, 2);
        })
        
        volver.create();
        volver.assignFunction(function(){
            sceneManager.changeScenes(0);
        })

        this.addElement(level1);
        this.addElement(level2);
        this.addElement(volver);

        this.createGhost();

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

        this.elements.forEach(element => {
            element.update();
        });
        
            
        for(var i = 0; i < this.ghosts.length; i++){
            if(this.ghosts[i].x < -64){
                this.ghosts[i].x = 1304;
            }
        }
        

    }

    destroy(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];
    }
}