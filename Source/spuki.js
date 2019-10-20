class Spuki {
    constructor(x, y, velX, velY, maxY, minY, src){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.maxY = maxY;
        this.minY = minY;
        this.src = src;
        this.dir = "up";
    }

    update(){
        this.x = this.x - (1 * this.velX);
        
        if(this.y <= this.minY ){
            this.dir = "down";
        }else if(this.y >= this.maxY){
            this.dir = "up";
        }

        if(this.dir === "up"){
            this.y = this.y - (1 * this.velY);
        }else{
            this.y = this.y + (1 * this.velY);
        }

        printImage(this.src, [this.x, this.y], [64, 64]);
    }
}