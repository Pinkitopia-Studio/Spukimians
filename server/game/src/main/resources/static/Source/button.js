
//CLASE BOTON INTERACTUABLE

class Button{

    constructor(img, x, y, sX, sY, imgHover, ){
        this.posX = x;
        this.posY = y;
        this.sizeX = sX;
        this.sizeY = sY;
        
        this.sprites = [img, imgHover];
        
        
        

    }
    
    
    create(){
        this.hover = false;
        this.active = false;
        
        this.image = this.sprites[0];

        this.x = this.posX;
        this.y = this.posY;
        this.width = this.sizeX;
        this.height = this.sizeY;
        
        
        
    }

    assignFunction(fn){
        this.fn = fn;
    }

    update(){

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
        
        this.button = printImage(this.image, [this.posX, this.posY], [this.sizeX, this.sizeY]);
        

        
        
        
    }

    onClick(callback){ //se debe meter una función.
        callback();
    }

    
        
    

}
