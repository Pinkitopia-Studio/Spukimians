
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
        this.image.onmouseover = function(){
            this.image = this.sprites[1];
        }
    }

    update(){
        printImage(this.image, [this.posX, this.posY], [this.sizeX, this.sizeY]);
    }
}