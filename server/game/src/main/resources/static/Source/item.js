class Item {
    constructor(x, y, src, id){
        this.x = x * 64;
        this.y = y * 64;
        this.tileX = x;
        this.tileY = y;
        this.sizeX = 64;
        this.sizeY = 64;
        this.sprite = new Image();
        this.sprite.src = src;
        this.active = true;
        this.id = id; //ID = 1 TRAMPA, 2 = LLAVE
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

    assignFunction(fn){
        this.fn = fn;
    }

    execute(){
        this.fn();
    }

    
}