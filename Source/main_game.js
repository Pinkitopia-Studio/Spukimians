/*
MAIN GAME JAVASCRIPT. This file calls all functions and contains the MAIN GAME.
*/

class Game {

    create (x, y) {
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

        this.world[3][4] = 2;
        this.world[3][6] = 2;
        this.world[5][4] = 2;
        this.world[8][7] = 2;
        //Attribute "world" of Game:
        //Consists of an array with the information of all the board. 

        this.elements = [];
        //Attribute "elements" of Game:
        //Consists of an array with all the active elements in scene.
        //Used for rendering and other options.

        this.tileSheet = new Image();
        this.tileSheet.src = "Assets/exampleTileset.png";
        
    }

    addElement(element){
        /*
        FUNCTION addElement:
        - Adds an element to the world
        */
        this.elements.push(element);
    }


}

var unnamed = new Game();
create();
unnamed.create(10, 10);
setInterval(function () {update(unnamed)}, 50);
var myPlayer = new Player();
unnamed.addElement(myPlayer);
