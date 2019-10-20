class Loading {
    constructor(){
        this.video = undefined;
        this.context = undefined;
        var canvas;
        canvas = getCanvas();
        this.context = canvas.getContext("2d");
        this.xStart = 0;
        this.yStart = 0;
        this.xEnd = mapW;
        this.yEnd = mapH;
        this.active = false;
        this.loaded = false;
        this.firstTime = false;
    }

    create(){
        this.active = true;

        this.video = document.getElementById("mivideo");
        this.video.src = "Assets/carga.mp4";
        this.video.autoplay = false;
        this.video.muted="muted"
        let that = this;
        this.video.addEventListener('loadeddata', function() {
            that.loaded = true;
            that.firstTime = true;
        });
    }

    update(){
        if(this.firstTime){
            this.firstTime = false;
            this.video.play();
        }
        if(this.loaded){
            if (this.video && !this.video.ended) {
                this.context.drawImage(this.video, this.xStart, this.yStart, this.xEnd - this.xStart, this.yEnd - this.yStart);
            }else{
                this.video.remove();
                sceneManager.changeScenes(0);
            }
        }
    }

    destroy(){
        mouseX = -1; //PARA QUE NO SE REPULSEN BOTONES EN LA SIGUIENTE PANTALLA
        mouseY = -1; 

        this.elements = [];
        this.active = false;
    }

}