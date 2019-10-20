//CLASE PADRE QUE LLEVA TODAS LAS ESCENAS DEL JUEGO.
class SceneManager {
    constructor(){
        this.scenes = [];
    }

    create(){
        this.actualScene = -1;

        //SCENES
        var menu, game, levelSelector, scoreScene, gameOverScene, characterSelector, credits, config;
        var carga = new Loading();
        
        
        carga.create();
        
        

        this.scenes = [menu, game, levelSelector, scoreScene, gameOverScene, characterSelector, credits, config, carga];
        

        
        this.actualScene = 8;

        this.audio = new Audio("Assets/sounds/con_violin.mp3");
        this.audio.play();
        this.audio.volume = 0.5;
        this.audio.loop = true;
    }  
    
    update(){
        this.scenes[this.actualScene].update();
    }

    changeScenes(index, level, ghosts, movements){
        
        switch(index){
            case 0:
                this.audio.play();
                this.scenes[0] = new Menu();
                break;
            case 1:
                this.audio.pause();
                this.scenes[1] = new Game();
                break;
            case 2:
                this.audio.play();
                this.scenes[2] = new LevelSelector();
                break;
            case 3:
                this.audio.pause();
                this.scenes[3] = new Score();
                break;
            case 4:
                this.audio.pause();
                this.scenes[4] = new GameOver();
                break;
            case 5:
                this.audio.play();
                this.scenes[5] = new CharacterSelector();
                break;
            case 6:
                this.audio.pause();
                this.scenes[6] = new Credits();
                break;
            case 7:
                this.audio.play();
                this.scenes[7] = new Config();
                break;

        }
        let pos = this.actualScene;
        if (index != 1 && this.scenes[1] != undefined){
            this.scenes[1].audio.pause();
        }
        if (index == 1){
            //If next scene is a level of the game or score of the game
            this.scenes[pos].destroy();
            this.actualScene = index;
            this.scenes[index].create(level);
        } else if (index == 3){
            this.scenes[pos].destroy();
            this.actualScene = index;
            this.scenes[index].create(level, movements, ghosts);
        } else {
            this.scenes[pos].destroy();
            this.actualScene = index;
            this.scenes[index].create();
        }
        
        
    }
}


//screen.orientation = "landscape";

//CHARACTER
var character = 0; //0 = chica, 1 = robot, 2 = serpiente, 3 = gato
var language = 0; //0 = spanish, 1 = english
var volume = 0.5; //volume (1/0.5/0)

//MAP PARAMETERS
var tileW = 64;
var tileH = 64;

var mapW = 1240;
var mapH = 860;

var mobileScaleFactor = 0.5;

var sceneManager = new SceneManager();
create();
sceneManager.create();

var sceneInterval = setInterval(function () {sceneManager.update()}, 30);

//LOCK ORIENTATION OF SCREEN

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
/*
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    /*elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    /*elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    /*elem.msRequestFullscreen();
  }
}

$(document).ready(function () {
    openFullscreen();
});*/ //NO FUNCIONA


var GAME = {
    WIDTH: 1240,
    HEIGHT: 860,

    RATIO: null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,

    init: function() {
        GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;

        GAME.currentWidth = GAME.WIDTH;
        GAME.currentHeight = GAME.HEIGHT;

        GAME.canvas = document.getElementById("game");

        GAME.canvas.width = GAME.WIDTH;
        GAME.canvas.height = GAME.HEIGHT;

        GAME.ctx = GAME.canvas.getContext('2d');

        // we need to sniff out Android and iOS
        // so that we can hide the address bar in
        // our resize function
        GAME.ua = navigator.userAgent.toLowerCase();
        GAME.android = GAME.ua.indexOf('android') > -1 ? true : false;
        GAME.ios = ( GAME.ua.indexOf('iphone') > -1 || GAME.ua.indexOf('ipad') > -1  ) ? 
            true : false;

        
        
        GAME.resize();
    },

    resize: function(){
        

        // set the new canvas style width and height
        // note: our canvas is still 320 x 480, but
        // we're essentially scaling it with CSS
        

        console.log(screen.orientation);

        
        GAME.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        GAME.currentWidth = GAME.currentHeight * GAME.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll past
        // the address bar, thus hiding it.
        if (GAME.android || GAME.ios) {
            document.body.style.height = window.innerHeight + 'px';
        }
        
        GAME.canvas.style.width = GAME.currentWidth + 'px';
        GAME.canvas.style.height = GAME.currentHeight + 'px';
        
        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }

    

};

/*function orientChange(){
    screen.orientation.lock("landscape");
}*/

window.addEventListener('load', GAME.init, false);
window.addEventListener('resize', GAME.resize, false);



window.ontouchstart = touchStart;
window.ontouchend = touchRelease;

window.onmousemove = mouseOver;
window.onmousedown = mouseMovement;
window.onmouseup = mouseRelease;
window.onkeydown = press;
window.onkeyup = release;



var inicial = false;

//CAMARA
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

