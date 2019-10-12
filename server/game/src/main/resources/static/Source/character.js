class Character extends Player {

    constructor (x, y) {       
       super();
        
       this.spriteSheet.src = "Assets/girlSpriteSheet64.png";
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
       this.movements = 0;

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
            if(sceneManager.scenes[1].checkTile(this.tileX, this.tileY+1)){
                
                var button = new Button("square", this.tileX*64, (this.tileY+1)*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    that.createTrap(that.tileX, (that.tileY+1));
                });
                this.trapButtons.push(button);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX+1, this.tileY)){
                var button = new Button("square", (this.tileX+1)*64, this.tileY*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    that.createTrap((that.tileX+1), that.tileY);
                });
                this.trapButtons.push(button);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX, this.tileY-1)){
                var button = new Button("square", this.tileX*64, (this.tileY-1)*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    that.createTrap(that.tileX, (that.tileY-1));
                });
                this.trapButtons.push(button);
            }
            if(sceneManager.scenes[1].checkTile(this.tileX-1, this.tileY)){
                var button = new Button("square", (this.tileX-1)*64, this.tileY*64 + 16, 64, 64, "");
                button.create();
                var that = this;
                button.assignFunction(function(){
                    that.createTrap((that.tileX-1), that.tileY);
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
                    
                }
                else{
                    cont = cont + 1;
                }
            }
            if (cont === this.traps.length){
                var trap = new Item(x, y, "Assets/trap.png", 1);
                this.traps.push(trap);
                //playSound("");
            }
        }else{
            var trap = new Item(x, y, "Assets/trap.png", 1);
            this.traps.push(trap);
        }

        if(borrar !== -1){
            this.traps.splice(borrar, 1);
        }
        
        console.log(this.traps);
    }
        
        
}



