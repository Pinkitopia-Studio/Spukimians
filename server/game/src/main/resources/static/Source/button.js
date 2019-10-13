
//CLASE BOTON UI

class Button{

    constructor(img, x, y, sX, sY, imgHover){
        this.posX = x;
        this.posY = y;
        this.sizeX = sX;
        this.sizeY = sY;
        this.sprites = [img, imgHover];
        this.isSprite = (sX == 64) && (sY == 64);
    }

    create(){
        this.hover = false;
        this.active = false;
        this.image = this.sprites[0];
        this.x = this.posX;
        this.y = this.posY;
        this.width = this.sizeX;
        this.height = this.sizeY;
        
        //SI EL BOTON CONTIENE UNA IMAGEN SE CREA UNA IMAGEN
        this.sprite = new Image();
        this.sprite.src = "Assets/"+this.image+".png";
        
    }
    assignFunction(fn){
        this.fn = fn;
    }
    update(){
        
        if(this.isSprite){ //SPRITE ANADIDO PARA CAMARA
            if((mousePosX - 20 >= viewport.offset[0]+this.posX && mousePosX - 20 <= viewport.offset[0]+this.posX+this.sizeX) && (mousePosY - 20 >= viewport.offset[1]+this.posY - 16 && mousePosY - 20 <= viewport.offset[1]+this.posY + this.sizeY - 16)){
                if(this.sprites[1] !== ""){
                    this.image = this.sprites[1];
                }else{
                    
                    this.posX = this.x - (this.width/20);
                    this.posY = this.y - (this.height/20);
                    this.sizeX = this.width + (this.width/20*2);
                    this.sizeY = this.height + (this.height/20*2);
                    
                }
                
            }
            else{
                this.image = this.sprites[0];
    
                this.posX = this.x;
                this.posY = this.y;
                this.sizeX = this.width;
                this.sizeY = this.height;
            }

            if((mouseX- 20 >= viewport.offset[0]+this.posX && mouseX - 20 <= viewport.offset[0]+this.posX+this.sizeX) && (mouseY - 20 >= viewport.offset[1]+this.posY && mouseY - 20 <= viewport.offset[1]+this.posY + this.sizeY) && !this.active){
                if(!this.active){
                    console.log("he sido pulsado");
                    
                    this.onClick(this.fn);
                    this.active = true;
                    
                }
                
            }
        }else{
            if((mousePosX - 20 >= this.posX && mousePosX - 20 <= this.posX+this.sizeX) && (mousePosY - 20 >= this.posY && mousePosY - 20 <= this.posY + this.sizeY)){
                if(this.sprites[1] !== ""){
                    this.image = this.sprites[1];
                }else{
                    
                    this.posX = this.x - (this.width/20);
                    this.posY = this.y - (this.height/20);
                    this.sizeX = this.width + (this.width/20*2);
                    this.sizeY = this.height + (this.height/20*2);
                }
                
            }
            else{
                this.image = this.sprites[0];
    
                this.posX = this.x;
                this.posY = this.y;
                this.sizeX = this.width;
                this.sizeY = this.height;
            }

            if((mouseX- 20 >= this.posX && mouseX - 20 <= this.posX+this.sizeX) && (mouseY - 20 >= this.posY && mouseY - 20 <= this.posY + this.sizeY) && !this.active){
                if(!this.active){
                    console.log("he sido pulsado");
                    
                    this.onClick(this.fn);
                    this.active = true;
                    
                }
                
            }
    
        }
        
        
        if(this.isSprite){ //Sprite
            this.button = printSprite(this.sprite, [0, 0], [this.posX, this.posY], true, [this.sizeX, this.sizeY]);
        }else{
            this.button = printImage(this.image, [this.posX, this.posY], [this.sizeX, this.sizeY]);
        }
        
        
        

        
        
        
    }

    onClick(callback){ //se debe meter una función.
        callback();
    }

    
        
    

}
