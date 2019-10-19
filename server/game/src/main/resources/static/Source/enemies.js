/*
In this file all enemy-related code can be found.
*/

class Enemy extends Player {

        constructor (x, y) {
            super();
            this.spriteSheet.src = "Assets/ghostSpriteSheet.png";
            this.x = x*64;
            this.y = y*64;
            this.moving = 0;
            this.tileX = x;
            this.tileY = y;
            this.previousMove = 0;
            this.nextMove = 0;
        }

        detectPlayer (ptileX, ptileY) {            
            return (Math.abs(ptileX-this.tileX) < 3 && Math.abs(ptileY-this.tileY) < 3);
        }

        automaticMove () {
            let myPlayer = sceneManager.scenes[1].elements[0];
            if (Math.abs(this.tileX - myPlayer.tileX)+Math.abs(this.tileY - myPlayer.tileY) <= 1){
                this.killPlayer(myPlayer);
            }else if(this.detectPlayer (myPlayer.tileX, myPlayer.tileY)){
                this.nextMove = this.selectMove();
                let path = findPath(sceneManager.scenes[1].world, [this.tileX, this.tileY], [myPlayer.tileX, myPlayer.tileY]);
                let nextMoveInPath = path[1];
                 if (nextMoveInPath[0] < this.tileX){
                    this.nextMove = 4;
                    this.previousMove = 2;
                } else if (nextMoveInPath[0] > this.tileX){
                    this.nextMove = 2;
                    this.previousMove = 4;
                } else if (nextMoveInPath[1] < this.tileY){
                    this.nextMove = 3;
                    this.previousMove = 1;
                } else {
                    this.nextMove = 1;
                    this.previousMove = 3;
                }
            } else {
                this.randomMove();
            }
            
            
        }

        randomMove () {
            //Received a signal for an automatic move.
            let possibleMovements = [1, 2, 3, 4];
            shuffleArray(possibleMovements); //Randomizes the 4 possible directions
            let i = 0;
            let changed = false;
            while (i < 4 && !changed){ //Iterates over randomized directions, trying to move
                if (this.previousMove != possibleMovements[i]){
                    changed = this.move(possibleMovements[i]);
                }
                i++;
            }
            if (i == 4 && !changed){
                //If the enemy can't move, tries to move to previous direction
                if (!this.move(this.previousMove)){
                    this.previousMove = 0;
                    //If it can't even move to previous direction, it stops moving for this turn
                }
            } else {
                //Notes the previous move for selecting next move
                this.previousMove = possibleMovements[i-1];
                this.calculatePreviousMove();
            }
        }

        calculatePreviousMove () {
            switch (this.previousMove){
                case 1:
                    this.previousMove = 3;
                break;
                case 2:
                    this.previousMove = 4;
                break;
                case 3:
                    this.previousMove = 1;
                break;
                case 4:
                    this.previousMove = 2;
                break;
            }
        }

        selectMove () {
            return 1;

        }
        
        killPlayer (myPlayer) {
            if (myPlayer.tileX < this.tileX){
                this.nextMove = 4;
            } else if (myPlayer.tileX > this.tileX) {
                this.nextMove = 2;
            } else if (myPlayer.tileY < this.tileY) {
                this.nextMove = 3;
            } else {
                this.nextMove = 1;
            }
            myPlayer.dead = true; //Matamos al player
            myPlayer.lastSprite = 0; //ponemos la pos del sprite a 0 para hacer la animacion de muerte

            //Player CAUGHT, end level.
            setTimeout(function(){
                sceneManager.changeScenes(4);
            }, 2000);
            

        }

        killFantasma(){
            
            this.dead = true;
            this.createSoul(this.tileX, this.tileY);
        }

        createSoul(tileX, tileY) {
            let soul = new Item(tileX, tileY, "Assets/alma.png", 5);
            sceneManager.scenes[1].addItem(soul, tileX, tileY, 5);
        }

        update (myboard){
            super.update(myboard);
            if (this.posSpriteDead >= 4){
                sceneManager.scenes[1].searchRemoveElement(this);
            }
        }


}