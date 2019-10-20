class Score {

    constructor () {

        this.stars = new Array (3); //stars got in the level
        this.movements = 0; //Movements used
        this.bestMovements = 0; //Best Score in the level
        this.level = 0;


    }

    create (level, movements, ghosts) {
        this.active = true;

        //BACKGROUND
        this.elements = [];
        this.ghosts = [];
        this.active = true;
        this.xFloor = 0;
        this.velFloor = 3;

        this.level = level;

        this.movements = movements;
        
        this.stars = [true, false, false];
        this.bestMovements = JSON.parse(window.localStorage.getItem("spukimiansMemoryLevel"+level));

        if (this.bestMovements == null || this.bestMovements == undefined){
            this.bestScore = false;
        } else {
            this.bestScore = (this.bestMovements.scores[0] > movements);
        }
        

        this.setBestScores();
        if (levelsData.data[this.level].ghosts == ghosts){
            this.stars[1] = true;
            if (levelsData.data[this.level].minMovements >= this.movements){
                this.stars[2] = true;
            }
        }

        
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

    setBestScores () {
        let previous = undefined;
        if (this.bestMovements == null || this.bestMovements == undefined){
            previous = [];
        } else {
            previous = this.bestMovements.scores;
        }
        
        previous.push(this.movements);
        previous.sort();
        let saveScores = {};
        saveScores.scores = previous;
        window.localStorage.setItem("spukimiansMemoryLevel"+this.level, JSON.stringify(saveScores));
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

        printImage("score", [210, 210], [800, 464]);
        let unidades = this.movements%10;
        let decenas = (this.movements-unidades)/10;
        var printeanumero = new Image();
        printeanumero.src = "Assets/nums/nums.png";
        if (this.bestScore){
            printSpriteImg(printeanumero, [decenas*32,32], [554, 365], [32, 32]);
            printSpriteImg(printeanumero, [unidades*32,32], [584, 365], [32, 32]);
        }else{
            printSpriteImg(printeanumero, [decenas*32,0], [554, 365], [32, 32]);
            printSpriteImg(printeanumero, [unidades*32,0], [584, 365], [32, 32]);
        }
        printImage("pasos", [626, 349], [32, 32]);

        if (this.bestScore){
            //Print "NEW" bestScore
            if(language==0){
                printImage("mejorPuntuacion", [430, 398], [367, 32]); 
            }else{
                printImage("newBestScore", [470, 398], [288, 32]);
            }
        }

        for (var i = 0; i < 3; i++){
            printImage("estrellaPlaceHolder", [500+(75*i), 235], [64, 64])
            if (this.stars[i]){
                printImage("estrella", [500+(75*i), 235], [64, 64])
            }
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

        this.stars = new Array (3); //stars got in the level
        this.movements = 0; //Movements used
        this.bestMovements = 0; //Best Score in the level
        this.level = 0;
    }



}