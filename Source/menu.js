////////////CODIGO DEL MENU


class Menu {
    constructor(){
        this.elements = [];
        this.active = false;

    }

    create(){
        this.active = true;

        let play = new Button("ui/play", 320 - (365/2), 50, 365, 155, "");
        let options = new Button("ui/back", 320 - (410/2), 250, 410, 155, "");
        let exit = new Button("ui/salir", 320 - (365/2), 450, 365, 155, "");

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
        context.clearRect(0, 0, 640, 640);

        if(this.active)
            printBackground("menuBackground");

        this.elements.forEach(element => {
            element.update();
        });
        
        

    }

    destroy(){
        this.elements = [];
        this.active = false;
    }
}