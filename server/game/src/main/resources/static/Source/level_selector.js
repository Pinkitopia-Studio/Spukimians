class LevelSelector {
    constructor(){
        this.elements = [];
        this.active = false;
    }

    create(){
        this.active = true;

        let level1 = new Button("ui/heart", 1240/3 - (65/2), 400, 65, 65, "");
        let level2 = new Button("ui/heart", 1240/2 - (65/2), 400, 65, 65, "");
        let volver = new Button("ui/back", 660 - (410/2), 550, 410, 155, "");
        

        level1.create();
        level1.assignFunction(function(){
            sceneManager.changeScenes(1, 1);
        });

        level2.create();
        level2.assignFunction(function(){
            sceneManager.changeScenes(1, 2);
        })
        
        volver.create();
        volver.assignFunction(function(){
            sceneManager.changeScenes(0);
        })

        this.addElement(level1);
        this.addElement(level2);
        this.addElement(volver);

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