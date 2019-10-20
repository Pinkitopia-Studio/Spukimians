class LevelSelector {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];

        this.velFloor = 3;
        this.xFloor = 0;
    }

    create(){
        this.active = true;

        this.source = "";
        switch(language){
            case 0:
                this.source = "selec_niv";
                break;
            case 1:
                this.source = "english/selec_niv_eng"
                break;
        }

        let level1 = new Button("nums/1_xl", 1240/4 - (300/2), 300, 300, 240, "", true,"nums/1_xl");
        let level2 = new Button("nums/2_xl", 1240/2 - (300/2), 300, 300, 240, "", true, "nums/2_xl");
        let level3 = new Button("nums/3_xl", 790, 300, 300, 240, "", true, "nums/3_xl");
        let back = new Button("volver_boton", (mapW * 0.25) - (204/2), mapH * 0.65, 204, 192, "");
        
        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(5);
        });
        
        level1.create();
        level1.assignFunction(function(){
            sceneManager.changeScenes(1, 0);
        });

        level2.create();
        level2.assignFunction(function(){
            sceneManager.changeScenes(1, 1);
        })

        level3.create();
        level3.assignFunction(function(){
            sceneManager.changeScenes(1, 2);
        })

        //Bloquear level 2
        let scores;
        let starsArray;

        //Bloquear level 2
        scores = JSON.parse(window.localStorage.getItem("spukimiansMemoryLevel"+0));
        console.log(scores);
        if(scores==null || scores == undefined || scores.stars==null || scores.stars == undefined){
            starsArray = [false,false,false];
        }else{
            starsArray = scores.stars;
        }
        if(starsArray[0]==true){
            level2.pushed = false;
        }else{
            level2.pushed = true;
        }

        //Bloquear level 3
        scores = JSON.parse(window.localStorage.getItem("spukimiansMemoryLevel"+1));
        if(scores==null || scores == undefined || scores.stars==null || scores.stars == undefined){
            starsArray = [false,false,false];
        }else{
            starsArray = scores.stars;
        }
        if(starsArray[0]==true){
            level3.pushed = false;
        }else{
            level3.pushed = true;
        }
        
        
        this.addElement(level1);
        this.addElement(level2);
        this.addElement(level3);
        this.addElement(back);

        this.createGhost();

    }

    addElement(element){
        this.elements.push(element);
    }

    createGhost(){
        for(var i = 1; i <= 5; i++){
            var yPos = 300*i % 860;
            
            var spuki = new Spuki(1250 + 10*i , yPos, i*3, i/2, yPos + 200, yPos - 200, "ghostMenu");
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

        printImage(this.source, [1240/2 - (908/2), 100], [908, 128]);


        //Poner estrellas en los niveles
        let scores;
        let starsArray;

        //Nivel 1 Siempre accesible
        scores = JSON.parse(window.localStorage.getItem("spukimiansMemoryLevel"+0));
        if(scores==null || scores == undefined || scores.stars==null || scores.stars == undefined){
            starsArray = [false,false,false];
        }else{
            starsArray = scores.stars;
        }
        for (var i = 0; i<3; i++){
            if(starsArray[i]){
                printImage("estrella", [210+(i*64), 230], [64, 64]);
            }else{
                printImage("estrellaPlaceHolder", [210+(i*64), 230], [64, 64]);
            }
        }

        //Nivel 2
        if(starsArray[0]==true){
            scores = JSON.parse(window.localStorage.getItem("spukimiansMemoryLevel"+1));
            if(scores==null || scores == undefined || scores.stars==null || scores.stars == undefined){
                starsArray = [false,false,false];
            }else{
                starsArray = scores.stars;
            }
            for (var i = 0; i<3; i++){
                if(starsArray[i]){
                    printImage("estrella", [520+(i*64), 230], [64, 64]);
                }else{
                    printImage("estrellaPlaceHolder", [520+(i*64), 230], [64, 64]);
                }
            }
        }else{
            printImage("scaryLocker", [505+(1*64), 220], [96, 96]);
        }

        //Nivel 3
        if(starsArray[0]==true){
            scores = JSON.parse(window.localStorage.getItem("spukimiansMemoryLevel"+2));
            if(scores==null || scores == undefined || scores.stars==null || scores.stars == undefined){
                starsArray = [false,false,false];
            }else{
                starsArray = scores.stars;
            }
            for (var i = 0; i<3; i++){
                if(starsArray[i]){
                    printImage("estrella", [840+(i*64), 230], [64, 64]);
                }else{
                    printImage("estrellaPlaceHolder", [840+(i*64), 230], [64, 64]);
                }
            }
        }else{
            printImage("scaryLocker", [825+(1*64), 220], [96, 96]);
        }

        this.elements.forEach(element => {
            element.update();
        });
        
            
        for(var i = 0; i < this.ghosts.length; i++){
            if(this.ghosts[i].x < -64){
                this.ghosts[i].x = 1304;
            }
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