class GameOver {

    create() {
        this.elements = [];
        this.active = true;
    }

    update () {
        clearCanvas();
        printImage("gameover", [310, 210], [620, 420]);
        let back = new Button("ui/volver", 1240/2 - (365/2), 550, 365, 155, "");

        back.create();
        back.assignFunction(function(){
            sceneManager.changeScenes(2);
        });
        this.elements.push(back);

        this.elements.forEach(element => {
            element.update();
        });
    }

    destroy(){
        this.elements = [];
        this.active = false;
    }

}