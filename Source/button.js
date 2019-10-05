
//CLASE BOTON INTERACTUABLE

class Button{

    constructor(img, x, y, sX, sY, imgHover){
        this.posX = x;
        this.posY = y;
        this.sizeX = sX;
        this.sizeY = sY;
        this.sprites = [img, imgHover];

        this.hover = false;
        this.active = true;
        this.image = this.sprites[0];

        
    }
    
    
    create(){
        
            
        
    }

    

    update(){
        
        console.log(mousePosX - 410);

        if((mousePosX - 410 >= this.posX && mousePosX - 410 <= this.posX+this.sizeX) && (mousePosY - 100 >= this.posY && mousePosY - 100 <= this.posY + this.sizeY)){
            console.log("he entrao");
            this.image = this.sprites[1];
        }
        else{
            this.image = this.sprites[0];
        }

        this.button = printImage(this.image, [this.posX, this.posY], [this.sizeX, this.sizeY]);
    }
}