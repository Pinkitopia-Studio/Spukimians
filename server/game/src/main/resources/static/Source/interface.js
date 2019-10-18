class Interface {
    constructor(player){
        this.player = player;
        this.key = player.items[1];
        this.souls = player.items[2];
        this.traps = player.items[0];
        this.points = 0;
        this.movements = 0;
        this.srcCharacter = "";
        switch(character){
            case 0:
                this.srcCharacter = "girlIcon128";
                break;
            case 1:
                this.srcCharacter = "robotIcon128";
                break;
        }
    }

    update(player, level){
        //Actualizacion de elementos
        this.player = player;
        this.key = player.items[1];
        this.souls = player.items[2];
        this.traps = player.items[0];

        //Pintado
        printImage(this.srcCharacter, [16, 716], [128, 128]);    
        
        printBackground("interface3");

        for (var i = 0; i < this.traps; i++){
            printImage("trap", [160 + (i*80), 796], [64, 64]); 
        }

        for (var i = 0; i < levelsData.data[level].ghosts; i++){
            printImage("almaPlaceholder", [mapW - 320 + (i*64), 0], [64, 64]); 
        }

        for (var i = 0; i < this.souls; i++){
            printImage("almaIcon", [mapW - 320 + (i*64), 0], [64, 64]); 
        }

        if(this.key >= 1){
            printImage("llaveIcon", [mapW-64, 0], [64, 64]);
        }else{
            printImage("llavePlaceHolder", [mapW-64, 0], [64, 64]);
        }

    }
}