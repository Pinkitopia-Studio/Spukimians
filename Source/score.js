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

        if(!(this.bestMovements==null||this.bestMovements==undefined)){
            this.previousStars = this.bestMovements.stars;
        }else{
            this.previousStars = [false,false,false];
        }
        
        if (levelsData.data[this.level].ghosts == ghosts){
            this.stars[1] = true;
            if (levelsData.data[this.level].minMovements >= this.movements){
                this.stars[2] = true;
            }
        }
        
        var compareMoves = this.movements;
        if(!this.stars[1]){
            compareMoves = 100;
        }

        if (this.bestMovements == null || this.bestMovements == undefined){
            this.bestScore = true;
        } else {
            this.bestScore = (this.bestMovements.scores[0] > compareMoves);
        }

        this.setBestScores(compareMoves);
        
        
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

    setBestScores (compareMoves) {
        let previous = undefined;
        if (this.bestMovements == null || this.bestMovements == undefined){
            previous = [];
        } else {
            previous = this.bestMovements.scores;
        }
        
        if(compareMoves < 100){
            previous.push(this.movements);
        }
        
        previous.sort();
        while(previous.length > 10){
            previous.pop();
        }
        let saveScores = {};
        saveScores.scores = previous;

        if(this.previousStars == null || this.previousStars == undefined){
            saveScores.stars = this.stars;
        } else {
            if (this.previousStars[1] == true && this.previousStars[2] == true){
                saveScores.stars = this.previousStars;
            } else if (this.previousStars[1] == true){
                if(this.stars[2] == true){
                    saveScores.stars = this.stars;
                } else {
                    saveScores.stars = this.previousStars;
                }
            } else {
                saveScores.stars = this.stars;
            }
        }

        
        
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
        printImage("bestScoresFrame", [0, 20], [1240, 860]);

        var printeanumero = new Image();
        printeanumero.src = "Assets/nums/nums.png";

        //Pintar los best scores
        let unidades = 0;
        let decenas = 0;
        let myScoreChecked = false; //Para comprobar si se ha marcado mi puntuacion en mis Best Scores
        if (!(this.bestMovements == null || this.bestMovements == undefined)){
            for(var i=0; i<10; i++){
                unidades = this.bestMovements.scores[i]%10;
                decenas = (this.bestMovements.scores[i]-unidades)/10;
                if(!myScoreChecked && this.bestMovements.scores[i] == this.movements){ //Si es mi score
                    printSpriteImg(printeanumero, [decenas*32,32], [1192-64, 261+(i*(32+10))], [32, 32]);
                    printSpriteImg(printeanumero, [unidades*32,32], [1224-64, 261+(i*(32+10))], [32, 32]);
                    myScoreChecked = true;
                }else{
                    printSpriteImg(printeanumero, [decenas*32,0], [1192-64, 261+(i*(32+10))], [32, 32]);
                    printSpriteImg(printeanumero, [unidades*32,0], [1224-64, 261+(i*(32+10))], [32, 32]);
                }
                printImage("pasos", [1224-32, 261-16+(i*(32+10))], [32, 32]);
            }
    
        }else{
            unidades = this.movements%10;
            decenas = (this.movements-unidades)/10;
            printSpriteImg(printeanumero, [decenas*32,32], [1192-64, 261+(0*(32+10))], [32, 32]);
            printSpriteImg(printeanumero, [unidades*32,32], [1224-64, 261+(0*(32+10))], [32, 32]);
            printImage("pasos", [1224-32, 261-16+(0*(32+10))], [32, 32]);
        }
        
        //Pintar los pasos que has dado y si es o no best score
        unidades = this.movements%10;
        decenas = (this.movements-unidades)/10;
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