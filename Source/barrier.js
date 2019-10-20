//NO SE LO QUE ES ESTO
class Barrier {
    constructor(x, y){
        this.tileX = x;
        this.tileY = y;
        this.x = this.tileX * 64;
        this.y = this.tileY * 64;
        this.spriteSheet = new Image();
        this.spriteSheet.src = "Assets/barrier.png";
        this.spritePos = [0, 0];
        this.spriteVelocity = 0;
        this.unlocked = false;
    }

    unlock(){
        this.unlocked = true;
        sceneManager.scenes[1].openBarrier(this.tileX, this.tileY);
    }

    update(){
        if(this.unlocked){
            
            if(this.spritePos[0] < 192){
                this.spriteVelocity = this.spriteVelocity + 1;
                if(this.spriteVelocity == 6){
                    this.spritePos = [this.spritePos[0]+64, 0];
                    this.spriteVelocity = 0;
                }
            }
        }
        

        printSprite(this.spriteSheet, this.spritePos, [this.x, this.y + 16]);
    }
}