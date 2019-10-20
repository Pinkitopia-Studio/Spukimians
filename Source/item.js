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
        this.posSprite = [0, 0]
        this.active = true;
        this.id = id; //ID = 1 TRAMPA, 2 = LLAVE, 3 = PALANCA, 4 = CAJA, 5 = ALMA
        this.velocitySprite = 0;
    }

    update(){
        if(this.active){
            printSprite(this.sprite, this.posSprite, [this.x, this.y + 16]);

            if(this.id == 2 || this.id == 5){ //ANIMACION LLAVE O ALMA
                if(this.velocitySprite == 8){
                    this.posSprite = [(this.posSprite[0] + 64) % 256, 0];
                    this.velocitySprite = 0;
                }
                this.velocitySprite = this.velocitySprite + 1;
            }
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