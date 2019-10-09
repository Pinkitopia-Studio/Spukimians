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
    }

    create (level) {
        this.level = level;
        
        var x = 0, y = 0;
        this.world = undefined;

        if (level == 0){
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

        var myPlayer = new Character();
        this.addElement(myPlayer);

        var myEnemy = new Enemy();
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
        var key = new Key(levelsData.data[this.level].keyX, levelsData.data[this.level].keyY);
        this.addItem(key, key.tileX, key.tileY);

        //playSound("inGame");

        this.activeWorld = true;
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

    
        
        
        if (this.activeWorld){
            //If the world is active (Signifies that a level is being played)
            printWorld(this);
        } 
        
        
        
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
            if (this.items[position].name == "key"){
                this.deleteItem(tileX, tileY);
                alert("OPEN THE GATE a little");
                //Abrir puerta
            }
        }
        
    }

}










