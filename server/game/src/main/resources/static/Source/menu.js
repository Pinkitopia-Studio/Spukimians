////////////CODIGO DEL MENU


class Menu {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];
        
        
        
        this.velFloor = 3;
        this.xFloor = 0;
    }

    create(){
        this.active = true;

        this.title = printImage("big_spukii", [1240/2 - (1024/2), 0], [1024, 512]);
        let play = new Button("ui/play", 1240/2 - (390/2), 500, 390, 192, "");
        let options = new Button("options", (1240 * 0.9) - (240/2), 600, 240, 192, "");
        let credits = new Button("creditos", 1240*0.1 - (240/2), 600, 240, 192, "");

        play.create();
        play.assignFunction(function(){
            sceneManager.changeScenes(5);
        });

        options.create();
        options.assignFunction(function(){
            //sceneManager.changeScenes(3);
        })
        
        credits.create();
        credits.assignFunction(function(){
            sceneManager.changeScenes(6);
        })

        this.addElement(play);
        this.addElement(options);
        this.addElement(credits);

        this.createGhost();

    }
        

    addElement(element){
        this.elements.push(element);
    }

    createGhost(){
        for(var i = 1; i <= 5; i++){
            var yPos = 300*i % 860;
            
            var spuki = new Spuki(1250 + 10*i, yPos, i*3, i/2, yPos + 200, yPos - 200, "ghostMenu");
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

        this.title = printImage("big_spukii", [1240/2 - (1024/2), 0], [1024, 512]);
        

    }

    destroy(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];
    }
}