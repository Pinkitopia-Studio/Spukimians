
//CLASE BOTON UI

class Button{

    constructor(img, x, y, sX, sY, imgHover, isPushable, imgPushed){
        this.posX = x;
        this.posY = y;
        this.sizeX = sX;
        this.sizeY = sY;
        this.sprites = [img, imgHover, imgPushed];
        this.isSprite = (sX == 64) && (sY == 64);
        this.pushed = false; //SI ESTA PULSADO YA NO SE LE PUEDE HACER HOVER NI VOLVER A SER PULSADO
        this.isPushable = isPushable;
    }

    create(){
        this.hover = false;
        this.active = false;
        this.image = this.sprites[0];
        this.x = this.posX;
        this.y = this.posY;
        this.width = this.sizeX;
        this.height = this.sizeY;
        
        //SI EL BOTON CONTIENE UN SPRITE IMAGEN SE CREA UNA IMAGEN
        this.sprite = new Image();
        this.sprite.src = "Assets/"+this.image+".png";
        
        //PARA LOS NUEVOS BOTONES CON RESIZE
        this.relativeX = this.x;
        this.relativeY = this.y;
        
    }
    assignFunction(fn){
        this.fn = fn;
    }
    update(){
        var ratioX = GAME.currentWidth / mapW;
        var ratioY = GAME.currentHeight / mapH;
        
        
        if(this.isSprite){ //SPRITE ANADIDO PARA CAMARA
            
                if((mousePosX >= viewport.offset[0]+this.posX && mousePosX <= viewport.offset[0]+this.posX+this.sizeX) && (mousePosY >= viewport.offset[1]+this.posY - 16 && mousePosY - 20 <= viewport.offset[1]+this.posY + this.sizeY - 16)){
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
            
            

                if((mouseX >= viewport.offset[0]+this.posX && mouseX <= viewport.offset[0]+this.posX+this.sizeX) && (mouseY >= viewport.offset[1]+this.posY && mouseY <= viewport.offset[1]+this.posY + this.sizeY) && !this.active){
                    if(!this.active){
                        console.log("he sido pulsado");
                        
                        this.onClick(this.fn);
                        this.active = true;
                    }
                    
                }
            
        }else{
            if(!this.pushed){
                if((mousePosX >= this.posX && mousePosX <= this.posX+this.sizeX) && (mousePosY >= this.posY && mousePosY <= this.posY + this.sizeY)){
                    if(this.sprites[1] !== ""){
                        this.image = this.sprites[1];
                    }else{
                        this.posX = (this.x - (this.width/20));
                        this.posY = (this.y - (this.height/20));
                        this.sizeX = (this.width + (this.width/20*2));
                        this.sizeY = (this.height + (this.height/20*2));
                    }
                    
                }
                else{
                    this.image = this.sprites[0];

                    this.posX = this.x;
                    this.posY = this.y;
                    this.sizeX = this.width;
                    this.sizeY = this.height;
                }

                if(
                    (mouseX >= this.posX && mouseX <= this.posX+this.sizeX) && (mouseY  >= this.posY && mouseY  <= this.posY + this.sizeY) && !this.active){
                    if(!this.active){
                        console.log(mouseX, mouseY);
                        console.log("he sido pulsado");
                        
                        this.onClick(this.fn);
                        this.active = true;

                        if(this.isPushable){
                            this.pushed = true;

                            this.posX = this.x;
                            this.posY = this.y;
                            this.sizeX = this.width;
                            this.sizeY = this.height;

                            this.active = false;
                        }
                        
                    }
                    
                }
            }
    
        }
        
        
        if(this.isSprite){ //Sprite
            this.button = printSprite(this.sprite, [0, 0], [this.posX, this.posY], true, [this.sizeX, this.sizeY]);
        }else{
            if(this.pushed){
                this.image = this.sprites[2];
            }
            this.button = printImage(this.image, [this.posX, this.posY], [this.sizeX, this.sizeY]);
        }
        
        
        
        

        
        
        
    }

    onClick(callback){ //se debe meter una función.
        callback();
    }

    
        
    

}
