//CLASE PADRE QUE LLEVA TODAS LAS ESCENAS DEL JUEGO.
class SceneManager {
    constructor(){
        this.scenes = [];
    }

    create(){
        this.actualScene = 0;

        //SCENES
        var menu = new Menu();
        var game = new Game();
        var levelSelector = new LevelSelector();
        var scoreScene = new Score();
        var gameOverScene = new GameOver();

        menu.create();

        this.menu = menu;
        this.game = game;

        this.scenes = [menu, game, levelSelector, scoreScene, gameOverScene];
        console.log(this.game);
    }  
    
    update(){
        this.scenes[this.actualScene].update();
    }

    changeScenes(index, level, ghosts, movements){
        let pos = this.actualScene;

        if (index == 1){
            //If next scene is a level of the game or score of the game
            this.scenes[index].create(level);
            this.actualScene = index;
            this.scenes[pos].destroy();
        } else if (index == 3){
            this.scenes[index].create(level, movements, ghosts);
            this.actualScene = index;
            this.scenes[pos].destroy();
        } else {
            this.scenes[index].create();
            this.actualScene = index;
            this.scenes[pos].destroy();
        }
        
        
    }
}

var sceneManager = new SceneManager();
create();
sceneManager.create();
var sceneInterval = setInterval(function () {sceneManager.update()}, 30);

window.onmousemove = mouseOver;
window.onmousedown = mouseMovement;
window.onmouseup = mouseRelease;
window.onkeydown = press;
window.onkeyup = release;

//MAP PARAMETERS
var tileW = 64;
var tileH = 64;
var mapW = 1240;
var mapH = 860;

var viewport = {
    screen		: [0,0],
    startTile   : [0,0],
    endTile     : [0,0],
    offset      : [0,0],
    update      : function(px, py)
    {
        this.offset[0] = Math.floor((this.screen[0]/2 - px));
        this.offset[1] = Math.floor((this.screen[1]/2 - py));

        var tile = [
            Math.floor(px/tileW),
            Math.floor(py/tileH)
        ];

        this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
        this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

        if(this.startTile[0] < 0) {this.startTile[0] = 0};
        if(this.startTile[1] < 0) {this.startTile[1] = 0};

        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / tileW);
        this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / tileH);

        if(this.endTile[0] >= mapW) { this.endTile[0] = mapW - 1;}
        if(this.endTile[1] >= mapH) { this.endTile[1] = mapH - 1;}
    }
    
    
};

window.onload = function(){
    viewport.screen = [
        document.getElementById("game").width,
        document.getElementById("game").height
    ]
}

/*var game = new Game();
create();
game.create(10, 10);
setInterval(function () {update(game)}, 50);
var myPlayer = new Player();
game.addElement(myPlayer);

window.onmousemove = mouseOver;




var myEnemy = new Enemy();
game.addElement(myEnemy);*/