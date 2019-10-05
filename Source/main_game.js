/*
MAIN GAME JAVASCRIPT. This file calls all functions and contains the MAIN GAME.
*/

class Game {
    
    constructor () {
        this.activeWorld = true;
        this.menu = 0;
        this.activeMenu = false;
        this.activePause = false;
        this.activeLevelSelector = false;

        this.elements = [];
        //Attribute "elements" of Game:
        //Consists of an array with all the active elements in scene.
        //Used for rendering and other options.
    }

    create (x, y) {

        
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
        
    }

    addElement(element){
        /*
        FUNCTION addElement:
        - Adds an element to the world
        - While an element is in this array, it's rendered in scene.
        */
        this.elements.push(element);
    }

    eraseElements(){
        this.elements = [];
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


}

var unnamed = new Game();
create();
unnamed.create(10, 10);
setInterval(function () {update(unnamed)}, 50);
var myPlayer = new Player();
unnamed.addElement(myPlayer);

var canvas = getCanvas();
window.onmousemove = mouseOver;
window.onmousedown = mouseMovement;
window.onmouseup = mouseRelease;
window.onkeydown = press;
window.onkeyup = release;


var myEnemy = new Enemy();
unnamed.addElement(myEnemy);

var play = new Button("ui/PlayOFF", 0, 0, 292, 292, "ui/PlayON");

play.create();
unnamed.addElement(play);
