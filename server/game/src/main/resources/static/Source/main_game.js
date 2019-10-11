/*
MAIN GAME JAVASCRIPT. This file calls all functions and contains the MAIN GAME.
*/

class Game {
    
    constructor () {
        this.activeWorld = false;
        this.activePause = false; //INDICA SI SE ENCUENTRA EL JUEGO EN PAUSE O NO
        this.puttingTrap = false; //INDICA SI SE ENCUENTRA EL JUEGO EN FASE DE PONER TRAMPA O NO
        this.activeLevelSelector = false;

        this.elements = [];
        this.pauseElements = [];
        
        this.items = [];
        this.interactiveWorld = [];
        //Attribute "elements" of Game:
        //Consists of an array with all the active elements in scene.
        //Used for rendering and other options.
        this.level = -1;
        
        //ANIMACION DE ANTORCHAS
        this.torches = [];
        this.posSprite = 0;
        this.nextSprite = 0;
        this.spriteSheetTorches = new Image();
        this.spriteSheetTorches.src = "Assets/animacionTilesAntorcha.png"

        this.door = [];
    }

    create (level) {
        this.level = level;
        
        var x = 0, y = 0;
        this.world = undefined;

        if (level == -1){
            this.world = new Array(x);
            this.interactiveWorld = new Array(x);
            for (var i = 0; i < x; i++){
                this.world[i] = new Array(y);
                this.interactiveWorld[i] = new Array(y);
                for (var j = 0; j < y; j++){
                    this.world[i][j] = 0;
                    this.interactiveWorld[i][j] = 0;
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
            var key = new Key(levelsData.data[this.level].keyX, levelsData.data[this.level].keyY);
            this.addItem(key, key.tileX, key.tileY);
        } else {
            parseTiledLevel("Levels/level"+level+".txt");
            
        }

        
        

        
        
    }

    finishCreate (details) {
        this.x = details[0];
        this.y = details[1];
        this.world = details[2];

        this.tileSheet = new Image();
        this.tileSheet.src = "Assets/mazmorraTileset.png";

        var myPlayer = new Character(levelsData.data[this.level].playerX, levelsData.data[this.level].playerY);
        this.addElement(myPlayer);

        var myEnemy = new Enemy(levelsData.data[this.level].enemyX, levelsData.data[this.level].enemyY);
        this.addElement(myEnemy);

        this.trapButton = new Button("trap_botton", 20, 20, 240, 192, "");
        this.trapButton.create();
        var that = this;
        this.trapButton.assignFunction(function(){
            if(!that.puttingTrap && that.elements[0].moving === 0){
                that.puttingTrap = true;
                that.elements[0].createTrapButtons();
            }else{
                setTimeout(function(){
                    that.puttingTrap = false;
                    that.elements[0].eraseTrapButtons();
                }, 500);
            }
            
            console.log("boton pulsado");
           
        })
        var that = this;

        //CREACION DE MENU DE PAUSA INCORPORADO EN ESTA ESCENA
        var play = new Button("reanudar", 190, 510, 240, 192, "");
        play.create();
        play.assignFunction(function(){
            esc = false;
            that.activePause = false;
            play.active = false;
        });
        this.addElement(play, 1);
        var replay = new Button("reiniciar", 500, 510, 240, 192, "");
        replay.create();
        replay.assignFunction(function(){
            esc = false;
            that.activePause = false;
            sceneManager.changeScenes(1, that.level);
        });
        this.addElement(replay, 1);
        var options = new Button("options", 810, 510, 240, 192, "");
        options.create();
        options.assignFunction(function(){

        });
        this.addElement(options, 1);

        
        this.interactiveWorld = new Array(this.world.length);
            for (var i = 0; i < this.world.length; i++){
                this.interactiveWorld[i] = new Array(this.world[0].length);
                for (var j = 0; j < this.world[0].length; j++){
                    this.interactiveWorld[i][j] = 0;
                }
            }
        var key = new Item(levelsData.data[this.level].keyX, levelsData.data[this.level].keyY, "Assets/llave.png", 2);
        this.addItem(key, key.tileX, key.tileY);

        //playSound("inGame");

        this.activeWorld = true;

        //ANIMACION ANTORCHAS: DETECTAMOS LAS POSICIONES EN LAS QUE SE ENCUENTRAN LOS TILE DE ANTORCHA 
        //LECTURA DE TILES ESPECIALES
        for (var i = 0; i < this.world.length; i++){
            for(var j = 0; j < this.world[i].length; j++){
                if(this.world[i][j] === 3){ //CASILLA DE ANTORCHA
                    this.torches.push([i, j]);
                }
                if(this.world[i][j] === 6){
                    this.door = [i, j];
                }
            }
        }
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
    
    //COMPRUEBA SI EL SUELO ES TRASPASABLE (SUELO = 10)
    checkTile(x, y){
        return (this.world[x][y] == 4);
    }

    checkActivable(x, y){
        //COMPROBACIONES DE ACTIVABLES
        let that = this;

        if(this.world[x][y] == 6 && this.elements[0].items[1] >= 1){ // SI EL JUGADOR TIENE LA LLAVE
            this.world[x][y] = 7;
            setTimeout(function(){
                sceneManager.changeScenes(3, that.level, that.elements[0].items[2], that.elements[0].movements);
            }, 2000);
        }
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
        clearCanvas();
        
        updateCamera(this.elements[0].x, this.elements[0].y)
       

        
        
        
        if (this.activeWorld){
            //If the world is active (Signifies that a level is being played)
            printWorld(this);
        } 
        
        this.torches.forEach(element => {
            printSprite(this.spriteSheetTorches, [this.posSprite * 64, 0], [element[0] * 64, (element[1] *64) + 16]);
        });
        
        //ACTUALIZACION DE ELEMENTOS DE LA ESCENA
        this.elements.forEach(element => {
            element.update(this);
        });

        this.items.forEach(item => {
            item.update();
        });

        if(this.activePause){
            printBackground("shade50per");
            this.pauseElements.forEach(element => {
                element.update();
            });
        }else{
            this.trapButton.update();
            
        }

        
    
        
        if(esc){ 
            this.activePause = true;
            
        }else{
            this.activePause = false;
            
        }

        

        //ANIMACION ANTORCHAS
        if(this.nextSprite === 8){
            
            this.posSprite = (this.posSprite + 1) % 4
            this.nextSprite = 0;
        }

        
        this.nextSprite = this.nextSprite + 1;

        
       
    }

    addItem(item, tileX, tileY) {
        this.items.push(item);
        let position = this.items.length;
        if(this.interactiveWorld[tileX][tileY] == 0){
            this.interactiveWorld[tileX][tileY] = position;
        }
    }

    deleteItem(tileX, tileY){
        var position = -1;
        for (var i = 0; i < this.items.length; i++){
            if (this.items[i].tileX == tileX && this.items[i].tileY == tileY){
                position = i;
            }
        }

        if(position != -1){
            this.items.splice(position, 1);
        }

        for (var i = 0; i < this.interactiveWorld.length; i++){
            for (var j = 0; j < this.interactiveWorld[0].length; j++){
                if(this.interactiveWorld[i][j] > position){
                    this.interactiveWorld[i][j]--;
                } else if (this.interactiveWorld[i][j] == position){
                    this.interactiveWorld[i][j] = 0;
                }
            }
        }
    }

    interact(tileX, tileY){
        if(this.interactiveWorld[tileX][tileY] != 0){
            let position = this.interactiveWorld[tileX][tileY]-1;
            if (this.items[position].id === 2){
                this.deleteItem(tileX, tileY);
                this.elements[0].items[1] = 1;
                //Abrir puerta
            }
        }
        
    }

    

}










