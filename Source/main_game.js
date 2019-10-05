/*
MAIN GAME JAVASCRIPT. This file calls all functions and contains the MAIN GAME.
*/

class Game {
    
    constructor () {
        this.activeWorld = false;
        this.activePause = false;
        this.activeLevelSelector = false;

        this.elements = [];
        this.pauseElements = [];
        //Attribute "elements" of Game:
        //Consists of an array with all the active elements in scene.
        //Used for rendering and other options.
    }

    create () {
        var x = 10, y = 10;
        
        this.activeWorld = true;
        /*
        FUNCTION create:
        */
        this.world = new Array(x);
        for (var i = 0; i < x; i++){
            this.world[i] = new Array(y);
            for (var j = 0; j < y; j++){
                this.world[i][j] = 0;
            }
        }
        for (var i = 0; i < x; i++){
            //Wall creation in borders.
            this.world[i][0] = 1;
            this.world[0][i] = 1;
            this.world[x-1][i] = 1;
            this.world[i][y-1] = 1;
        }

        this.world[4][4] = 2;
        this.world[3][6] = 2;
        this.world[5][4] = 2;
        this.world[8][7] = 2;
        this.world[3][5] = 2;
        this.world[5][5] = 2;
        //Attribute "world" of Game:
        //Consists of an array with the information of all the board. 

        this.tileSheet = new Image();
        this.tileSheet.src = "Assets/exampleTileset.png";

        var myPlayer = new Player();
        this.addElement(myPlayer);

        var myEnemy = new Enemy();
        this.addElement(myEnemy);

        playSound("inGame");
        
    }

    addElement(element, arrayIndex){
        if(arrayIndex === 1){
            this.pauseElements.push(element);
        }else{
            this.elements.push(element);
        }
        
    }

    removeElement(index, arrayIndex){
        if(arrayIndex === 1){
            this.pauseElements.splice(index, 1);
        }else{
            this.elements.splice(index, 1);
        }
        
    }

    eraseElements(arrayIndex){
        if(arrayIndex === 1){
            this.pauseElements = [];
        }else{
            this.elements = [];
        }
        
    }

    checkTile(x, y){
        return (this.world[x][y] == 0);
    }

    sendEnemySignal () {
        this.elements.forEach(element => {
            if (element instanceof Enemy){
                element.automaticMove();
            }
        });
    }

    destroy(interval){
        this.elements = []
        this.pauseElements = []
        this.world = [];
        this.activePause = false;
        this.activeWorld = false;

        //clearInterval(interval);
    }


    update() {
        /*
        FUNCTION UPDATE:
        - Clears canvas context.
        - Calls update of every active object in the game
        - Prints new canvas with updated information of each object
        It's called 20 times per second.
        */
        let context = document.getElementById("game").getContext("2d");
        context.clearRect(0, 0, 640, 640);
    
        
        
        if (this.activeWorld){
            //If the world is active (Signifies that a level is being played)
            printWorld(this);
        } 
        
        if(this.activePause){
            printPause(this);
        }else{
            this.eraseElements(1); //borra todos los elementos del pause
        }
        
    
        this.elements.forEach(element => {
            element.update(this);
        });
    
        this.pauseElements.forEach(element => {
            element.update(this);
        })
    
        if(esc){ 
            this.activePause = true;
            
        }else{
            this.activePause = false;
            
        }
    
       
    }

}










