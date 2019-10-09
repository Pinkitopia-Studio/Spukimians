class Score {

    constructor () {

        this.stars = new Array (3); //stars got in the level
        this.movements = 0; //Movements used
        this.bestMovements = 0; //Best Score in the level
        this.level = 0;


    }

    create (level, movements, ghosts) {
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
        let context = document.getElementById("game").getContext("2d");
        context.clearRect(0, 0, 1240, 840); //Clears canvas for printing
        
        printImage("score", [310, 210], [620, 420]);

        if (this.bestScore){
            //Print "NEW" bestScore
        }

        for (var i = 0; i < 3; i++){
            if (this.stars[i]){
                printImage("star", [450+(125*i), 365], [64, 64])
            }
        }



    }



}