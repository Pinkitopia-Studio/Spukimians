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

        menu.create();

        this.menu = menu;
        this.game = game;

        this.scenes = [menu, game, levelSelector];
        console.log(this.game);
    }  
    
    update(){
        this.scenes[this.actualScene].update();
    }

    changeScenes(index, level){
        let pos = this.actualScene;

        if (index == 1){
            //If next scene is a level of the game
            this.scenes[index].create(level);
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

/*var game = new Game();
create();
game.create(10, 10);
setInterval(function () {update(game)}, 50);
var myPlayer = new Player();
game.addElement(myPlayer);

window.onmousemove = mouseOver;




var myEnemy = new Enemy();
game.addElement(myEnemy);*/