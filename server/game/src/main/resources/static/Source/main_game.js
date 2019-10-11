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
        
        this.items = []; //[llave, ]
        this.interactiveWorld = []; //[1 = trampa, 2 = llave, 3 = palanca, 4 = caja]
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

        //Barreras
        this.barriers = [];
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

        for(var i = 0; i < levelsData.data[this.level].ghosts; i++){
            var myEnemy = new Enemy(levelsData.data[this.level].enemyX, levelsData.data[this.level].enemyY);
            this.addElement(myEnemy);
        }
        

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
        this.addItem(key, key.tileX, key.tileY, 2);

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

        //BARRERAS
        if(levelsData.data[this.level].barriers != []){
            levelsData.data[this.level].barriers.forEach(element => {
                var barr = new Barrier(element[0], element[1]);
                that.barriers.push(barr);
                that.world[element[0]][element[1]] = 10; //SE VUELVE CASILLA NO TRANSITABLE
            });
        }

        //PALANCAS
        if(levelsData.data[this.level].levers != []){
            levelsData.data[this.level].levers.forEach(element => {
                var lever = new Item(element[0], element[1], "Assets/lever.png", 3);
                lever.assignFunction(id => { //METERLE UN 0 al llamarla
                    id = element[2]; //Aqui se asigna el id
                    lever.posSprite = [64, 0];
                    that.barriers[id].unlock();
                });
                that.addItem(lever, lever.tileX, lever.tileY, 3)
                that.world[element[0]][element[1]] = 10;
            });

        }
        
        //CAJAS (4)
        if(levelsData.data[this.level].boxes != []){
            levelsData.data[this.level].boxes.forEach(element => {
                var box = new Item(element[0], element[1], "Assets/trap.png", 4);
                that.addItem(box, box.tileX, box.tileY, 4);

                box.assignFunction(relativePosition => { 
                    let dir = that.elements[0].facing; //1 SUR 2 ESTE 3 NORTE 4 OESTE
                    switch(dir){
                        case 1:
                            //COMPROBAR SI HAY ESPACIO AL SUR
                            if(that.checkTile(box.tileX, box.tileY + 1)){
                                
                                box.tileY++;
                                //MOVER CAJA ABAJO
                            }
                            break;
                        case 2:
                        //COMPROBAR SI HAY ESPACIO AL ESTE
                            if(that.checkTile(box.tileX + 1, box.tileY)){
                                //MOVER CAJA DERECHA
                                box.tileX++;
                            }
                            break;
                        case 3:
                            //COMPROBAR SI HAY ESPACIO AL NORTE
                            if(that.checkTile(box.tileX, box.tileY - 1)){
                                //MOVER CAJA ARRIBA
                                box.tileY--;
                            }
                            break;
                        case 4:
                            //COMPROBAR SI HAY ESPACIO AL OESTE
                            if(that.checkTile(box.tileX - 1, box.tileY)){
                                //MOVER CAJA IZQUIERDA
                                box.tileX--;
                            }
                            break;
                    }

                });
            });
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

        if(this.interactiveWorld[x][y] == 3){
            this.items.forEach(element => {
                if(x == element.tileX && y == element.tileY){
                    element.execute();
                }
            });
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
        this.barriers.forEach(element => {
            element.update();
        });

        this.elements.forEach(element => {
            element.update(this);
        });

        this.items.forEach(item => {
            item.update();
        });

        if(this.activePause){
            printBackground("shade50per");
            printImage("pausa", [1240/2 - (294/2), 100], [294, 128]);
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

    addItem(item, tileX, tileY, position) {
        this.items.push(item);
        
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
            if(this.interactiveWorld[tileX][tileY] == 2){ //CASO LLAVE
                let position = 0;
                if (this.items[position].id === 2){
                    this.deleteItem(tileX, tileY);
                    this.elements[0].items[1] = 1;
                    //Abrir puerta
                }
            }
            /*if(this.interactiveWorld[tileX][tileY] == 4){ //CASO CAJA
                let position = this.interactiveWorld[tileX][tileY];
                if(this.items[position].id === )
            }*/
            
        }
        
    }

    openBarrier(x, y){
        this.world[x][y] = 4;
    }

    

}










