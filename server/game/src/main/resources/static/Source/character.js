class Character extends Player {

    constructor () {       
       super();
        
       this.spriteSheet.src = "Assets/girlSpriteSheet64.png";
       this.moving = 1;
       this.x = 128;
       this.y = 128;

       this.nextMove = 0;
       this.tileX = 2;
       this.tileY = 2;
        /*
        Attribute "moving": 0 = idle
        1 - 4 = moving to a direction (1S, 2E, 3N, 4W)
        */

       this.squareRed = new Image();
       this.squareRed.src = "Assets/square.png";
       this.squarePositions = [];
    }
    
    //

    update (myboard) {

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

            this.squarePositions.forEach(element => {
                printSprite(this.squareRed, [0, 0], [element[0], element[1]]);
            });    

        }
        
        super.update(myboard);
       
        this.squarePositions = [];       
        
        
    }
        
        
}



