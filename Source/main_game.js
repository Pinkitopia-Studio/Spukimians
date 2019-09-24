/*
MAIN GAME JAVASCRIPT. This file calls all functions and contains the MAIN GAME.
*/

class Game {

    constructor () {
        /*
        Constructor of class GAME:
        - Creates a canvas, size 640*640 in the document
        - Appends the canvas to the document
        */
        var canvas = document.createElement("CANVAS");
        canvas.id = "game";
        canvas.setAttribute("width",640);
        canvas.setAttribute("height",640);
        canvas.style="border:1px solid #000000";
        canvas.setAttribute('style', "position: absolute;  left: 30%; top: 10%; border:2px");
        document.body.appendChild(canvas);

        
    }

    create (x, y) {
        /*
        FUNCTION create: Creates a world in the canvas. Prints it.
        */
        this.world = new Array(x);
        for (var i = 0; i < x; i++){
            this.world[i] = new Array(y);
        }
    }


}

var unnamed = new Game();
unnamed.create(20, 10);