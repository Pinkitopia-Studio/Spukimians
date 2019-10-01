/*
In this file all enemy-related code can be found.
*/

class Enemy extends Player {

        constructor () {
            super();
            this.spriteSheet.src = "Assets/exampleSpriteSheet_Enemy.png";
            this.x = 256;
            this.y = 384;
            this.moving = 0;
            this.tileX = 4;
            this.tileY = 6;
            this.previousMove = 0;
        }

        automaticMove () {
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



}