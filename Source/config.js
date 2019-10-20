//PANTALLA DE CONFIG

class Config {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];

        this.velFloor = 3;
        this.xFloor = 0;
    }

    create(){
        this.active = true;

        //buttons
        let volumeMax = new Button("volumenMax", (mapW * 0.25) - (204 / 2), mapH * 0.3, 204, 192, "", true, "volumenMaxSelected");
        let volumeLow = new Button("volumenMin", (mapW * 0.5) - (204 / 2), mapH * 0.3, 204, 192, "", true, "volumenMinSelected");
        let volumeNO = new Button("volumenNO", (mapW * 0.75) - (204 / 2), mapH * 0.3, 204, 192, "", true, "volumenNOSelected");

        volumeMax.create();
        volumeMax.assignFunction(function(){
            volumeLow.pushed = false;
            volumeNO.pushed = false;
            sceneManager.audio.volume = 1;
            volume = 1;
        });

        volumeLow.create();
        volumeLow.assignFunction(function(){
            volumeMax.pushed = false;
            volumeNO.pushed = false;
            sceneManager.audio.volume = 0.5;
            volume = 0.5;
        });

        volumeNO.create();
        volumeNO.assignFunction(function(){
            volumeMax.pushed = false;
            volumeLow.pushed = false;
            sceneManager.audio.volume = 0;
            volume = 0;
        });
        switch(volume){
            case 1:
                volumeMax.pushed = true;
            break;
            case 0.5:
                volumeLow.pushed = true;
            break;
            case 0:
                volumeNO.pushed = true;
            break;
        }
        
        this.addElement(volumeMax);
        this.addElement(volumeLow);
        this.addElement(volumeNO);

        let spanish = new Button("esp", (mapW * 0.37) - (204 / 2), mapH * 0.55, 204, 192, "", true, "espSelected");
        let english = new Button("eng", (mapW * 0.62) - (204 / 2), mapH * 0.55, 204, 192, "", true, "engSelected");

        spanish.create();
        spanish.assignFunction(function(){
            language = 0;
            english.pushed = false;
        });

        english.create();
        english.assignFunction(function(){
            language = 1;
            spanish.pushed = false;
        });

        switch(language){
            case 0:
                spanish.pushed = true;
                break;
            case 1:
                english.pushed = true;
                break;
        }
        
        this.addElement(spanish);
        this.addElement(english);

        let back = new Button("volver_boton", (1240 * 0.9) - (204/2), 600, 204, 192, "");
        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(0);
        });

        this.addElement(back);

        this.createGhost();
    }

    addElement(element){
        this.elements.push(element);
    }

    createGhost(){
        for(var i = 1; i <= 5; i++){
            var yPos = 300*i % 860;
            
            var spuki = new Spuki(1250 + 10*i, yPos, i*3, i/2, yPos + 200, yPos - 200, "ghostMenu");
            this.ghosts.push(spuki);
        }
        
        
        
    }

    update(){
        
        clearCanvas();

        
        if(this.active)
            printBackground("backgroundMenu");


        if(this.xFloor <= -1088){
            this.xFloor = 0;
        }else{
            this.xFloor = this.xFloor - (1 * this.velFloor);
        }
        
        printImage("floor", [this.xFloor, 0], [2432, 860]);
        
        this.ghosts.forEach(element => {
            element.update();
        });
        this.elements.forEach(element => {
            element.update();
        });

        

       
        for(var i = 0; i < this.ghosts.length; i++){
            if(this.ghosts[i].x < -64){
                this.ghosts[i].x = 1304;
            }
        }
        if(language == 0){
            printImage("letras_config", [mapW / 2 - (1104 / 2), mapH * 0.15 - (192 / 2)], [1104, 192]);
        }else if(language == 1){
            printImage("english/letras_config_eng", [mapW / 2 - (1104 / 2), mapH * 0.15 - (192 / 2)], [1104, 192]);
        }
        
    }

    destroy(){
        mouseX = -1; //PARA QUE NO SE REPULSEN BOTONES EN LA SIGUIENTE PANTALLA
        mouseY = -1; 

        this.elements = [];
        this.active = false;
        this.ghosts = [];
    }
}