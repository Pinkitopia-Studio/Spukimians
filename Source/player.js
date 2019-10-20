class Player {

    constructor () {
       this.spriteSheet = new Image();   
       
       this.lastSprite = 0;
       
       this.velocity = 2;
       this.lastMoved = 0;
       /*
       Attribute "lastMoved" indicates how many pixels has the player moved since it started moving.
       */
       

       this.nextIdle = 0; //Velocidad en que cambian los sprites de la animación de idle
       this.nextWalk = 0; //Velocidad en que cambian los sprites de la animación de andar

       this.lastDirection = 1; //1S, 2E, 3N, 4W

       this.dead = false;
       this.nextDead = 0;
       this.posSpriteDead = 0;
        this.canMove = true;
       
    }
    

    move (direction) {
        let change = false;
        switch(direction){
            case 1:
                change = sceneManager.scenes[1].checkTile(this.tileX, this.tileY+1);
                sceneManager.scenes[1].checkActivable(this.tileX, this.tileY+1);
            break;
            case 2:
                change = sceneManager.scenes[1].checkTile(this.tileX+1, this.tileY);
                sceneManager.scenes[1].checkActivable(this.tileX+1, this.tileY);
            break;
            case 3:
                change = sceneManager.scenes[1].checkTile(this.tileX, this.tileY-1);
                sceneManager.scenes[1].checkActivable(this.tileX, this.tileY-1);
            break;
            case 4:
                change = sceneManager.scenes[1].checkTile(this.tileX-1, this.tileY);
                sceneManager.scenes[1].checkActivable(this.tileX-1, this.tileY);
            break;
        }
        if (change) this.nextMove = direction;
        this.facing = direction;
        return change;
    }

    //

    update (myboard) {
        if(!myboard.activePause){
            this.lastSprite = (this.lastSprite) % 4; //cambiado para los nuevos sprites
            this.spritePos = [0, 0];
            
            if(!this.dead){ //SI NO ESTA MUERTO HACE ANIMACIONES HABITUALES
                if(this.moving > 0){
                
                    switch(this.moving) {
                        case 1:
                            this.y+=this.velocity;
                            this.spritePos = [(this.lastSprite+4)*64, 0];
                            this.lastDirection = 1;
                        break;
                        case 2:
                            this.x+=this.velocity;
                            this.spritePos = [(this.lastSprite+4)*64, 64];
                            this.lastDirection = 2;
                        break;
                        case 3:
                            this.y-=this.velocity;
                            this.spritePos = [(this.lastSprite+4)*64, 128];
                            this.lastDirection = 3;
                        break;
                        case 4:
                            this.x-=this.velocity;
                            this.spritePos = [(this.lastSprite+4)*64, 192];
                            this.lastDirection = 4;
                        break;
                        
                    }
    
                    this.nextWalk++;
                }else{
                    switch(this.facing){
                        case 1:
                            this.spritePos = [this.lastSprite * 64, 0];
                            break;
                        case 2:
                            this.spritePos = [this.lastSprite * 64, 64];
                            break;
                        case 3:
                            this.spritePos = [this.lastSprite * 64, 128];
                            break;
                        case 4:
                            this.spritePos = [this.lastSprite * 64, 192];
                            break;
                    }
                    
    
                    this.nextIdle++;
                }
            }else{ //ANIMACION DE MUERTE
                if(this.posSpriteDead < 4){
                    this.spritePos = [this.posSpriteDead * 64, 256];
                    this.nextDead++;
                }else{
                    
                    this.spritePos = [4 * 64, 320]; //Sprite vacio de la hoja
                }
                
            }

            if(this.nextDead == 8){
                this.posSpriteDead = this.posSpriteDead + 1;
                this.nextDead = 0;
            }
            
            
            if(this.nextWalk == 3){ //determinación de la velocidad de la animación de andar
                this.lastSprite = this.lastSprite + 1;
                this.nextWalk = 0;
            }

            if(this.nextIdle == 6){
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
                var instance = this instanceof Enemy; //True si es enemigo, false si es personaje
                //The player stops moving, so send a signal to all ghosts in board to move
                if (!instance){ //Personaje
                    sceneManager.scenes[1].elements[0].canMove = false;
                    sceneManager.scenes[1].elements[0].movements = sceneManager.scenes[1].elements[0].movements + 1;
                    //console.log(sceneManager.scenes[1].elements[0].movements);

                    sceneManager.scenes[1].sendEnemySignal();
                    sceneManager.scenes[1].interactCharacter(this.tileX, this.tileY);

                    //PONEMOS DE NUEVO EL TIEMPO
                    sceneManager.scenes[1].timeTurnD = 2;
                    sceneManager.scenes[1].timeTurnU = 9;

                    
                } else { //Enemy
                    sceneManager.scenes[1].elements[0].canMove = true;
                    if (sceneManager.scenes[1].interactEnemy(this.tileX, this.tileY) == 0){
                        this.killFantasma();
                    }
                }
                
            }
            if ((this.lastMoved == 0 && this.nextMove != 0 && this.canMove) ||
                (this.lastMoved == 0 && this.nextMove != 0 && sceneManager.scenes[1].elements.length == 1)){
                //If the player is stopped and has a next move available, start moving in
                //That direction.
                
                this.moving = this.nextMove;
                this.nextMove = 0;
                this.lastSprite = 0;
                this.velocity = 2;
            }

            //PINTADO DEL PERSONAJE
            printSprite(this.spriteSheet, this.spritePos, [this.x, this.y]);    
            

            
            
        }
        
        
    }




}