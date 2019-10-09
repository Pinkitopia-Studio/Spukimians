////////////CODIGO DEL MENU


class Menu {
    constructor(){
        this.elements = [];
        this.active = false;
        this.ghosts = [];

    }

    create(){
        this.active = true;

        let play = new Button("ui/play", 1240/2 - (390/2), 100, 390, 192, "");
        let options = new Button("ui/volver", 1240/2 - (420/2), 350, 420, 192, "");
        let exit = new Button("ui/salir", 1240/2 - (390/2), 600, 390, 192, "");

        play.create();
        play.assignFunction(function(){
            sceneManager.changeScenes(2);
        });

        options.create();
        options.assignFunction(function(){
            //sceneManager.changeScenes(3);
        })
        
        exit.create();
        exit.assignFunction(function(){
            //sceneManager.changeScenes(3);
        })

        this.addElement(play);
        this.addElement(options);
        this.addElement(exit);

        

    }
        

    addElement(element){
        this.elements.push(element);
    }

    update(){
        
        let context = document.getElementById("game").getContext("2d");
        context.clearRect(0, 0, 1240, 840);

        
        if(this.active)
            printBackground("backgroundMenu");
        

        this.elements.forEach(element => {
            element.update();
        });
        
        

    }

    destroy(){
        this.elements = [];
        this.active = false;
    }
}