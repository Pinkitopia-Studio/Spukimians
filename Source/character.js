class Character extends Player {

    constructor (x, y) {       
       super();
        
       switch(character){ //Se crea el personaje segun el que se haya escogido
            case 0:
                this.spriteSheet.src = "Assets/girlSpriteSheet64.png";
                break;
            case 1:
                this.spriteSheet.src = "Assets/robot_spritesheet.png";
                break;
       }
       
       this.moving = 0;
       this.facing = 1;
       this.x = x*64;
       this.y = y*64;

       this.nextMove = 0;
       this.tileX = x;
       this.tileY = y;
        /*
        Attribute "moving": 0 = idle
        1 - 4 = moving to a direction (1S, 2E, 3N, 4W)
        */

       this.squareRed = new Image();
       this.squareRed.src = "Assets/square.png";
       this.squarePositions = [];

       this.trapButtons = [];
       this.traps = [];

       //ITEMS: [3 = numero de trampas restantes, 0 = numero de llaves en el bolsillo, 0 = numero de fantasmas capturados]
       this.items = [3, 0, 0];

       //MOVIMIENTOS
       this.movements = -1;

       //SPritesheet llave
       

    }
    
    //

    update (myboard) {
        if(this.traps !== []){
            this.traps.forEach(element => {
                
                element.update();
            });
        }
        
        this.trapButtons.forEach(element => {
            element.update();
        });
        

        if(sceneManager.scenes[1].puttingTrap){
            //CUADRITOS PARA LAS TRAMPAS (MIRA A VER SI NO ES UN TILE COLISIONABLE)
            if(sceneManager.scenes[1].checkTile(this.tileX, this.tileY+1)){
                this.squarePositions.push([this.tileX*64, (this.tileY+1)*64 + 16]);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX+1, this.tileY)){
                this.squarePositions.push([(this.tileX+1)*64, this.tileY*64 + 16]);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX, this.tileY-1)){
                this.squarePositions.push([this.tileX*64, (this.tileY-1)*64 + 16]);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX-1, this.tileY)){
                this.squarePositions.push([(this.tileX-1)*64, this.tileY*64 + 16]);
            }
            /*
            this.squarePositions.forEach(element => {
                printSprite(this.squareRed, [0, 0], [element[0], element[1]]);
            }); */   

        }
        
        super.update(myboard);
       
        this.squarePositions = [];  
    }

    createTrapButtons(){
        if(sceneManager.scenes[1].puttingTrap){
            //CUADRITOS PARA LAS TRAMPAS (MIRA A VER SI NO ES UN TILE COLISIONABLE)
            let positionghost = [-1, -1];
            if (sceneManager.scenes[1].elements[1] != undefined){
               positionghost = [sceneManager.scenes[1].elements[1].tileX, sceneManager.scenes[1].elements[1].tileY];
            }
            let positionllave = [-1, -1];
            if (this.items[1] != 1){
                positionllave = [levelsData.data[sceneManager.scenes[1].level].keyX, levelsData.data[sceneManager.scenes[1].level].keyY];
            }
            if(sceneManager.scenes[1].checkTile(this.tileX, this.tileY+1) && !(this.tileX == positionghost[0] && this.tileY+1 == positionghost[1]) && !(this.tileX == positionllave[0] && this.tileY+1 == positionllave[1])){
                var button = new Button("square", this.tileX*64, (this.tileY+1)*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    if(that.items[0] > 0){
                        that.createTrap(that.tileX, (that.tileY+1));
                        
                    }
                    
                });
                this.trapButtons.push(button);
            }
            
            if(sceneManager.scenes[1].checkTile(this.tileX+1, this.tileY) && !(this.tileX+1 == positionghost[0] && this.tileY== positionghost[1]) && !(this.tileX+1 == positionllave[0] && this.tileY == positionllave[1])){
                var button = new Button("square", (this.tileX+1)*64, this.tileY*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    if(that.items[0] > 0){
                        that.createTrap((that.tileX+1), that.tileY);
                        
                    }
                    
                });
                this.trapButtons.push(button);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX, this.tileY-1) && !(this.tileX == positionghost[0] && this.tileY-1== positionghost[1]) && !(this.tileX == positionllave[0] && this.tileY-1 == positionllave[1])){
                var button = new Button("square", this.tileX*64, (this.tileY-1)*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    if(that.items[0] > 0){
                        that.createTrap(that.tileX, (that.tileY-1));
                        
                    }
                    
                });
                this.trapButtons.push(button);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX-1, this.tileY) && !(this.tileX-1 == positionghost[0] && this.tileY== positionghost[1]) && !(this.tileX-1 == positionllave[0] && this.tileY == positionllave[1])){
                var button = new Button("square", (this.tileX-1)*64, this.tileY*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    if(that.items[0] > 0){
                        that.createTrap((that.tileX-1), that.tileY);
                        
                    }
                    
                });
                this.trapButtons.push(button);
            }
            
        }
    }

    eraseTrapButtons(){
        this.trapButtons = [];
        
    }

    createTrap(x, y){
        console.log(this.traps);
        var cont = 0;
        var borrar = -1;
        if(this.traps != []){
            for(var i = 0; i < this.traps.length; i++){
                if (this.traps[i].tileX === x && this.traps[i].tileY === y){
                    console.log("borrando trampa");
                    this.traps[i].destroy();
                    borrar = i;
                    //borrar trampa
                    sceneManager.scenes[1].interactiveWorld[x][y] = 0;
                    this.items[0]++;
                }
                else{
                    cont++;
                }
            }
            if (cont === this.traps.length){
                var trap = new Item(x, y, "Assets/trap.png", 1);
                this.traps.push(trap);
                //playSound("");
                playSound("palanca");
                //dibujar trampa
                sceneManager.scenes[1].interactiveWorld[x][y] = 1;
                this.items[0]--;
            }
        }else{
            var trap = new Item(x, y, "Assets/trap.png", 1);
            this.traps.push(trap);
            sceneManager.scenes[1].interactiveWorld[x][y] = 1;
            this.items[0]--;
        }

        if(borrar !== -1){
            this.traps.splice(borrar, 1);
        }
        
        console.log(this.traps);
    }
        
        
}



