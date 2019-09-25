class Player {

    constructor () {
        this.spriteSheet = new Image();
        this.spriteSheet.src = "Assets/exampleSpriteSheet_Sans.png";
        this.moving = 1;
        /*
        Attribute "moving": 0 = idle
        1 - 4 = moving to a direction (1N, 2E, 3S, 4W)
        */
       this.lastSprite = 0;
       this.x = 0;
       this.y = 0;
       this.velocity = 0;
       this.lastMoved = 0;
       this.nextMove = 0;
    }

    move (direction) {
        this.nextMove = direction;
    }

    update () {
        this.lastSprite = (this.lastSprite+1)%9;
        let spritePos = [0, 0];
        switch(this.moving) {
            case 1:
                this.x+=this.velocity;
                spritePos = [this.lastSprite*64, 192];
            break;
            case 2:

            break;
            case 3:

            break;
            case 4:

            break;
            
        }
        this.lastMoved+=this.velocity;
        if (this.lastMoved >= 64){
            this.lastMoved = 0;
            this.moving = 0;
            this.velocity = 0;
        }
        if (this.lastMoved = 0 && this.nextMove != 0){
            this.moving = this.nextMove;
            this.nextMove = 0;
            this.lastSprite = 0;
        }
        printSprite(this.spriteSheet, spritePos);
    }




}