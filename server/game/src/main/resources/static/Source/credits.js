class Credits {

    

    constructor(){
        this.posImage = 860;
        this.elements = [];
        this.active = false;
    }

    create(){
        this.active = true;
        let back = new Button("volver_boton", (mapW * 0.9) - (204/2), 600, 204, 192, "");
        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(0);
        });

        this.elements.push(back);

        this.twiter = new Button("boton_twitter", (mapW * 0.2) - 32, 300, 64, 64, "");
        this.twiter.create();
        this.twiter.isSprite = false;
        this.twiter.assignFunction(function(){
            let win = window.open("http://twitter.com/pinkitopia", '_blank');
            win.focus();
        });

        this.elements.push(this.twiter);


        this.instagram = new Button("boton_instagram", (mapW * 0.2) - 32, 400, 64, 64, "");
        this.instagram.create();
        this.instagram.isSprite = false;
        this.instagram.assignFunction(function(){
            let win = window.open("http://instagram.com/pinkitopia", '_blank');
            win.focus();
        });

        this.elements.push(this.instagram);


        this.webpage = new Button("boton_web", (mapW * 0.2) - 32, 500, 64, 64, "");
        this.webpage.create();
        this.webpage.isSprite = false;
        this.webpage.assignFunction(function(){
            let win = window.open("https://pinkitopia-studio.github.io/", '_blank');
            win.focus();
        });

        this.elements.push(this.webpage);



        
    }

    update(){
        if (this.posImage > -1500){
            this.posImage-=2;
        }

        

        printBackground("blackBack");

        printImage("credits", [mapW/2 - (576/2), this.posImage], [576, 1920]);

        printImage("contact", [175, 250], [144, 15]);

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