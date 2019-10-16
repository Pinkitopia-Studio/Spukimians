class Credits {
    constructor(){
        this.posImage = 860;
        this.elements = [];
        this.active = false;
    }

    create(){
        this.active = true;
        let back = new Button("creditos", (mapW * 0.9) - (240/2), 600, 240, 192, "");
        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(0);
        });

        this.elements.push(back);


        
    }

    update(){
        this.posImage--;

        printBackground("blackBack");

        printImage("credits", [mapW/2 - (576/2), this.posImage], [576, 1920]);

        printImage("creditsShade", [0, 0], [mapW, mapH]);

        this.elements.forEach(element => {
            element.update();
        });

    }

    destroy(){
        mouseX = -1; //PARA QUE NO SE REPULSEN BOTONES EN LA SIGUIENTE PANTALLA
        mouseY = -1; 

        this.elements = [];
        this.active = false;
        this.posImage = 860;
    }

}