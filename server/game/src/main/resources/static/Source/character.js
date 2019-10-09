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
        //CUADRITOS PARA LAS TRAMPAS
        this.squarePositions = [[this.tileX*64, (this.tileY+1) * 64 + 16], [(this.tileX+1) * 64, this.tileY*64 + 16], [this.tileX*64, (this.tileY-1)*64 + 16], [(this.tileX-1)*64, this.tileY*64 + 16]];

        this.squarePositions.forEach(element => {
            printSprite(this.squareRed, [0, 0], [element[0], element[1]]);
        });    

        super.update(myboard);
       
               
        
        
    }
        
        
}



