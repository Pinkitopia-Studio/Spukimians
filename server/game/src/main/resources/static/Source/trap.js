class Trap {
    constructor(x, y){
        this.x = x * 64;
        this.y = y * 64;
        this.tileX = x;
        this.tileY = y;
        this.sizeX = 64;
        this.sizeY = 64;
        this.sprite = new Image();
        this.sprite.src = "Assets/trap.png";
        this.active = true;
    }

    update(){
        if(this.active){
            printSprite(this.sprite, [0, 0], [this.x, this.y + 16]);
        }
        
    }

    destroy(){
        this.x = -1;
        this.y = -1;
        this.tileX = -1;
        this.tileY = -1;
        this.sprite.src = "";
        this.active = false;
    }

    
}