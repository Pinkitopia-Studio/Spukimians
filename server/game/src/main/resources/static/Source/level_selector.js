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

        this.source = "";
        switch(language){
            case 0:
                this.source = "selec_niv";
                break;
            case 1:
                this.source = "english/selec_niv_eng"
                break;
        }

        let level1 = new Button("nums/1_xl", 1240/4 - (300/2), 300, 300, 240, "");
        let level2 = new Button("nums/2_xl", 1240/2 - (300/2), 300, 300, 240, "");
        let back = new Button("volver_boton", (mapW * 0.25) - (204/2), mapH * 0.65, 204, 192, "");
        
        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(5);
        });
        
        level1.create();
        level1.assignFunction(function(){
            sceneManager.changeScenes(1, 1);
        });

        level2.create();
        level2.assignFunction(function(){
            sceneManager.changeScenes(1, 0);
        })
        
        
        this.addElement(level1);
        this.addElement(level2);
        this.addElement(back);

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

        printImage(this.source, [1240/2 - (908/2), 100], [908, 128]);

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
        mouseX = -1; //PARA QUE NO SE REPULSEN BOTONES EN LA SIGUIENTE PANTALLA
        mouseY = -1; 

        this.elements = [];
        this.active = false;
        this.ghosts = [];
    }
}