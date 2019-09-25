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
        }
        //Attribute "world" of Game:
        //Consists of an array with the information of all the board. 

        this.elements = [];
        //Attribute "elements" of Game:
        //Consists of an array with all the active elements in scene.
        //Used for rendering and other options.
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
