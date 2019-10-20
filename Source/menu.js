////////////CODIGO DEL MENU


class Menu {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];
        
        this.velFloor = 3;
        this.xFloor = 0;

        this.posTitle = [0, 0];

        this.titleImg = new Image();
        this.titleImg.src = "Assets/big_spukii_anim.png";
        this.velSprite = 0;
    }

    create(){
        this.active = true;

        this.source = "";
        switch(language){
            case 0:
                this.source = "ui/play";
                break;
            case 1:
                this.source = "english/jugar_eng"
                break;
        }

        //this.title = printImage("big_spukii", [1240/2 - (1024/2), 0], [1024, 512]);
        let play = new Button(this.source, 1240/2 - (390/2), 500, 390, 192, "");
        let options = new Button("options", (1240 * 0.9) - (204/2), 600, 204, 192, "");
        let credits = new Button("creditos", 1240*0.1 - (204/2), 600, 204, 192, "");
        
        play.create();
        play.assignFunction(function(){
            sceneManager.changeScenes(5);
        });

        options.create();
        options.assignFunction(function(){
            sceneManager.changeScenes(7);
        })
        
        credits.create();
        credits.assignFunction(function(){
            sceneManager.changeScenes(6);
        })

        this.addElement(play);
        this.addElement(options);
        this.addElement(credits);

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

        //ACTUALIZACION DEL TITLE
        if(this.velSprite == 8){
            this.posTitle = [0, (this.posTitle[1] + 512) % 2048];
            this.velSprite = 0;
        }
        

        this.title = printSpriteImg(this.titleImg, this.posTitle, [1240/2 - (1024/2), 20], [1024, 512]);
        
        this.velSprite = this.velSprite + 1;
    }

    destroy(){
        mouseX = -1; //PARA QUE NO SE REPULSEN BOTONES EN LA SIGUIENTE PANTALLA
        mouseY = -1; 

        this.elements = [];
        this.active = false;
        this.ghosts = [];
        this.posTitle = 0;
    }
}