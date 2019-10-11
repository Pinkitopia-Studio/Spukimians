class GameOver {

    create() {
        this.elements = [];
        this.ghosts = [];
        this.active = true;
        this.xFloor = 0;
        this.velFloor = 3;

        let back = new Button("ui/salir", 1240/2 - (365/2), 550, 365, 155, "");

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

        printImage("gameover", [310, 210], [620, 420]);
        

        this.elements.forEach(element => {
            element.update();
        });
    }

    destroy(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];
    }

}