class GameOver {

    create() {
        this.elements = [];
        this.ghosts = [];
        this.active = true;
        this.xFloor = 0;
        this.velFloor = 3;

        let back = new Button("ui/salir", 1240/2 - (365/2)-10, 465, 365, 155, "");

        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(0);
        });
        this.elements.push(back);

        this.createGhost();
    }

    createGhost(){
        for(var i = 1; i <= 5; i++){
            var yPos = 300*i % 860;
            
            var spuki = new Spuki(1250 + 10*i , yPos, i*3, i/2, yPos + 200, yPos - 200, "ghostMenu");
            this.ghosts.push(spuki);
        }
    }

    update () {
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

        for(var i = 0; i < this.ghosts.length; i++){
            if(this.ghosts[i].x < -64){
                this.ghosts[i].x = 1304;
            }
        }

        printImage("gameover", [210, 210], [800, 464]);
        
        for (var i = 0; i < 3; i++){
            printImage("estrellaPlaceHolder", [500+(75*i), 235], [64, 64])
        }
        
        this.elements.forEach(element => {
            element.update();
        });
    }

    destroy(){
        mouseX = -1; //PARA QUE NO SE REPULSEN BOTONES EN LA SIGUIENTE PANTALLA
        mouseY = -1; 

        this.elements = [];
        this.active = false;
        this.ghosts = [];
    }

}