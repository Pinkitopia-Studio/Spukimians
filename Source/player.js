class Player {

    constructor () {
        this.spriteSheet = new Image();
        this.spriteSheet.src = "Assets/girlSpriteSheet64.png";
        this.moving = 1;
        /*
        Attribute "moving": 0 = idle
        1 - 4 = moving to a direction (1S, 2E, 3N, 4W)
        */
       this.lastSprite = 0;
       this.x = 128;
       this.y = 128;
       this.velocity = 2;
       this.lastMoved = 0;
       /*
       Attribute "lastMoved" indicates how many pixels has the player moved since it started moving.
       */
       this.nextMove = 0;
       this.tileX = 2;
       this.tileY = 2;

       this.nextIdle = 0; //Velocidad en que cambian los sprites de la animación de idle
       this.nextWalk = 0; //Velocidad en que cambian los sprites de la animación de andar

       this.lastDirection = 1; //1S, 2E, 3N, 4W
    }
    

    move (direction) {
        let change = false;
        switch(direction){
            case 1:
                change = unnamed.checkTile(this.tileX, this.tileY+1);
            break;
            case 2:
                change = unnamed.checkTile(this.tileX+1, this.tileY);
            break;
            case 3:
                change = unnamed.checkTile(this.tileX, this.tileY-1);
            break;
            case 4:
                change = unnamed.checkTile(this.tileX-1, this.tileY);
            break;
        }
        if (change) this.nextMove = direction;
        return change;
    }

    update (myboard) {
        if(!myboard.activePause){
            this.lastSprite = (this.lastSprite) % 4; //cambiado para los nuevos sprites
            let spritePos = [0, 0];
            
            if(this.moving > 0){
                
                switch(this.moving) {
                    case 1:
                        this.y+=this.velocity;
                        spritePos = [(this.lastSprite+4)*64, 0];
                        this.lastDirection = 1;
                    break;
                    case 2:
                        this.x+=this.velocity;
                        spritePos = [(this.lastSprite+4)*64, 64];
                        this.lastDirection = 2;
                    break;
                    case 3:
                        this.y-=this.velocity;
                        spritePos = [(this.lastSprite+4)*64, 128];
                        this.lastDirection = 3;
                    break;
                    case 4:
                        this.x-=this.velocity;
                        spritePos = [(this.lastSprite+4)*64, 192];
                        this.lastDirection = 4;
                    break;
                    
                }

                this.nextWalk++;
            }else{
                switch(this.lastDirection){
                    case 1:
                        spritePos = [this.lastSprite * 64, 0];
                        break;
                    case 2:
                        spritePos = [this.lastSprite * 64, 64];
                        break;
                    case 3:
                        spritePos = [this.lastSprite * 64, 128];
                        break;
                    case 4:
                        spritePos = [this.lastSprite * 64, 192];
                        break;
                }
                

                this.nextIdle++;
            }
            
            if(this.nextWalk == 2){ //determinación de la velocidad de la animación de andar
                this.lastSprite = this.lastSprite + 1;
                this.nextWalk = 0;
            }

            if(this.nextIdle == 4){
                this.lastSprite = this.lastSprite + 1;
                this.nextIdle = 0;
            }

            
            
            
                
            
            if (this.lastMoved == 0 && this.moving > 0){
                //When starting a new movement to a new tile, reflect it in player's data
                //It's starting a new movement when it's moving and it does not have a previous
                //Pixel moved.
                switch(this.moving) {
                    case 1:
                        this.tileY++;
                    break;
                    case 2:
                        this.tileX++;
                    break;
                    case 3:
                        this.tileY--;
                    break;
                    case 4:
                        this.tileX--;
                    break;
                    
                }
            }
            
            this.lastMoved+=this.velocity; //Add that the player has moved
            if (this.lastMoved >= 64){
                //If it has moved 64 pixels, its a tile, so stop.
                this.lastMoved = 0;
                this.moving = 0;
                this.velocity = 0;
                //The player stops moving, so send a signal to all ghosts in board to move
                if (!(this instanceof Enemy)) unnamed.sendEnemySignal();
                
            }
            if (this.lastMoved == 0 && this.nextMove != 0){
                //If the player is stopped and has a next move available, start moving in
                //That direction.
                this.moving = this.nextMove;
                this.nextMove = 0;
                this.lastSprite = 0;
                this.velocity = 2;
            }

        
            printSprite(this.spriteSheet, spritePos, [this.x, this.y]);
            
        }
        
        
    }




}