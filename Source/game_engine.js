/*

In this file, all game engine functions are located.

*/


var mouseX, mouseY;
var prevX, prevY;

var cornerX = 1240/2 - 640/2; //ESQUINA IZQUIERDA
var cornerY = 840/2 - 640/2;

var mousePosX, mousePosY;
//TECLAS DE TECLADO
var up = false,
    down = false,
    right = false,
    left = false;

var esc = false;

function create () {
    /*
    Function CREATE:
    - Creates a canvas, size 640*640 in the document
    - Appends the canvas to the document
    */
    let canvas = document.createElement("CANVAS");
    canvas.id = "game";
    canvas.setAttribute("width",mapW);
    canvas.setAttribute("height",mapH);
    canvas.setAttribute("x", 0);
    canvas.setAttribute("y", 0);
    canvas.setAttribute('style', "background-color: black; left: 0px; top: 0px; position: relative");
    document.body.appendChild(canvas);
    $("body > canvas").css("width", window.screen.availWidth);
    $("body > canvas").css("height", window.screen.availHeight);
}

function printWorld(myboard){
    let x = myboard.world.length;
    let y = myboard.world[0].length;
    let image = myboard.tileSheet;
    for (var i = 0; i < x; i++){
        for (var j = 0; j < y; j++){
            //printTile(myboard.tileSheet, myboard.world[i][j], [cornerX+(i*64),cornerY+(j*64)]); LINEA ANTIGUA
            printTile(myboard.tileSheet, myboard.world[i][j], [(i*64),(j*64)]); //CON CAMARA
        }
    }
    
    
}

function printTile(image, type, position){
    let context = document.getElementById("game").getContext("2d");
    let sprite = [0, 0];
    switch(type){
        
        case -1:
            sprite = [192, 128];
            break;
        case 0:
            //Floor tile
            sprite = [0, 0];
        break;
        case 1:
            //Wall tile
            sprite = [64, 0];
        break;
        case 2:
            //Wall tile
            sprite = [128, 0];
        break;
        case 3:
            //Wall tile
            sprite = [192, 0];
        break;
        case 4:
            //Hole tile
            sprite = [0, 64];
            break;
        case 5:
            sprite = [64, 64];
            break;
        case 6:
            //Wall tile
            sprite = [128, 64];
            break;
        case 7:
            //Wall tile
            sprite = [192, 64];
            break;
        case 8:
            sprite = [0, 128];
            break;
        case 9:
            sprite = [64, 128];
            break;
        case 10:
            sprite = [128, 128];
            break;

        
    }
    
    //context.drawImage(image, sprite[0], sprite[1], 64, 64, position[0], position[1], 64, 64); LINEA ANTIGUA
    context.drawImage(image, sprite[0], sprite[1], 64, 64, viewport.offset[0] + position[0], viewport.offset[1]+position[1], 64, 64); //CON CAMARA
    
}

function printSprite(image, sprite, printPosition, isButton, size){
    let context = document.getElementById("game").getContext("2d");
    //context.drawImage(image, sprite[0], sprite[1], 64, 64, cornerX + printPosition[0], cornerY + printPosition[1] - 16, 64, 64); LINEA ANTIGUA
    if(isButton){
        context.drawImage(image, viewport.offset[0] + printPosition[0], viewport.offset[1] + printPosition[1] - 16, size[0], size[1]);
    }else{
        context.drawImage(image, sprite[0], sprite[1], 64, 64, viewport.offset[0] + printPosition[0], viewport.offset[1] + printPosition[1] - 16, 64, 64); //CON CAMARA
    }
    
}

function printSpriteImg(image, sprite, printPosition, size){
    let context = document.getElementById("game").getContext("2d");
    
    context.drawImage(image, sprite[0], sprite[1], size[0], size[1], printPosition[0], printPosition[1] - 16, size[0], size[1]); //CON CAMARA
}

function printImage(src, pos, size){
    let image = new Image();
    image.src = "Assets/"+src+".png";
    let context = document.getElementById("game").getContext("2d");
    var img = context.drawImage(image, pos[0], pos[1], size[0], size[1]);
    return img;
}

function printMenu (myboard) {
    //This function prints the background and the buttons of the menu
    printBackground("menuBackground"); 
}



function printBackground(background){
    let context = document.getElementById("game").getContext("2d");
    let backgroundImage = new Image();
    backgroundImage.src = "Assets/"+background+".png";
    context.drawImage(backgroundImage, 0, 0, 1240, 860, 0, 0, 1240, 860);
}

function getCanvas(){
    var canvas = document.getElementById("game");
    return canvas;
}

function printLevelSelector(){
    //TODO LO DEL LEVEL SELECTOR AQUI.
}

function mouseMovement(event) {
    let canvas = getCanvas();
    prevX = event.offsetX * canvas.width / canvas.clientWidth | 0;
    prevY = event.offsetY * canvas.height / canvas.clientHeight | 0;
        
    
    if(sceneManager.actualScene == 1){
        if (sceneManager.scenes[1].activeWorld && !sceneManager.scenes[1].activePause){
            if(sceneManager.scenes[1].trapButton.active)
                sceneManager.scenes[1].trapButton.active = false; 
            
        
            
            sceneManager.scenes[1].elements[0].trapButtons.forEach(element =>{
                element.active = false;
            })
        }
        
        if(sceneManager.scenes[1].activeWorld && sceneManager.scenes[1].activePause){
            if(sceneManager.scenes[1].pauseElements[0].active || sceneManager.scenes[1].pauseElements[1].active || sceneManager.scenes[1].pauseElements[2].active){
                sceneManager.scenes[1].pauseElements.forEach(element =>{
                    console.log("hola");
                    element.active = false;
                });
            }
        }
    }
    
        
}

function mouseOver(event){
    var offset = $('#game').offset();

    
    /*mousePosX = event.pageX - offset.left + $(window).scrollLeft();
    mousePosY = event.pageY - offset.top + $(window).scrollTop();*/
    //RATON ANTES DEL BUG

    let canvas = document.getElementById("game");
    mousePosX = event.offsetX * canvas.width / canvas.clientWidth | 0;
    mousePosY = event.offsetY * canvas.height / canvas.clientHeight | 0;

    
}

function mouseRelease (event) {
    var offset = $('#game').offset();

    let canvas = getCanvas();
    
    if(sceneManager.actualScene == 1 && !sceneManager.scenes[1].activePause){ //ARREGLAR ESTO 
        let newX = event.offsetX * canvas.width / canvas.clientWidth | 0;
        let newY = event.offsetY * canvas.height / canvas.clientHeight | 0;
        console.log("Miau: " + mouseX + " " + mouseY);
        
        if(mouseX != -1 && newX < GAME.currentWidth * 0.8) //ZONA DE BOTONES) 
            movePlayer(newX, newY);
    }
    
    mouseX = event.offsetX * canvas.width / canvas.clientWidth | 0;
    mouseY = event.offsetY * canvas.height / canvas.clientHeight | 0;
       
    /* else {
        menuClick(newX, newY);
    }*/
    
}

function touchStart (event) {
    let touchX = event.changedTouches[0].clientX;
    let touchY = event.changedTouches[0].clientY;

    prevX = touchX;
    prevY = touchY;
}

function touchRelease (event) {
    let touchX = event.changedTouches[0].clientX;
    let touchY = event.changedTouches[0].clientY;
    
    if(sceneManager.actualScene == 1 && !sceneManager.scenes[1].activePause){ //ARREGLAR ESTO 
        if(touchX < GAME.currentWidth * 0.8) //ZONA DE BOTONES
            movePlayer(touchX, touchY);
    }
    
    mouseX = touchX;
    mouseY = touchY;    
}

function press(e){
    if(e.keyCode === 40 /*up*/ || e.keyCode === 83 /*w*/ || e.keyCode === 90 /*z*/ ){
        up = true;
    }
    if(e.keyCode === 39 /*right*/ || e.keyCode === 68 /*d*/){
        right = true;
    }
    if(e.keyCode === 38 /*down*/ || e.keyCode === 87 /*s*/){
        down = true;
    }
    if(e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/ || e.keyCode === 81 /*q*/ ){
        left = true;
    }

    //Escape
    if(e.keyCode === 27){
        console.log("Escape pulsado");
        if(esc){
            esc = false;
            
        }else{
            esc = true;
            
        }

    }
    
}

function release(e){
    if(e.keyCode === 40 /*up*/ || e.keyCode === 83 /*w*/ || e.keyCode === 90 /*z*/ ){
        up = false;
        movePlayerKeys(1);
    }
    if(e.keyCode === 39 /*right*/ || e.keyCode === 68 /*d*/){
        right = false;
        movePlayerKeys(2);
    }
    if(e.keyCode === 38 /*down*/ || e.keyCode === 87 /*s*/){
        down = false;
        movePlayerKeys(3);
    }
    if(e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/ || e.keyCode === 81 /*q*/ ){
        left = false;
        movePlayerKeys(4);
    }
    
}

function movePlayerKeys(k){
    if(sceneManager.actualScene == 1){
        if(!sceneManager.scenes[1].activePause && sceneManager.scenes[1].activeWorld && !sceneManager.scenes[1].puttingTrap){ //pausa del game (escena 1)
            switch(k){
                case 1:
                    sceneManager.scenes[1].elements[0].move(1); //Player del game (escena1)
                    break;
                case 2:
                    sceneManager.scenes[1].elements[0].move(2);
                    break;
                case 3:
                    sceneManager.scenes[1].elements[0].move(3);
                    break;
                case 4:
                    sceneManager.scenes[1].elements[0].move(4);
                    break;
            }
        }
    }
    
    
}

function movePlayer (newX, newY) {
    if(sceneManager.actualScene == 1){
        if(!sceneManager.scenes[1].activePause && sceneManager.scenes[1].activeWorld && !sceneManager.scenes[1].puttingTrap){
            let diffX = prevX-newX;
            let diffY = prevY-newY;
    
            if (Math.abs(diffX) > Math.abs(diffY)) {
                //If the swipe was larger on X axis, move Left or Right
                if (diffX > 0){
                    sceneManager.scenes[1].elements[0].move(4); //Move left
                } else {
                    sceneManager.scenes[1].elements[0].move(2); //Move Right
                }
            } else {
                //Else, the swipe was larger on Y axis, so move Up or Down
                if (diffY > 0){
                    sceneManager.scenes[1].elements[0].move(3); //Move down
                } else {
                    sceneManager.scenes[1].elements[0].move(1); //Move up
                }
            }
        }
    }
    
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function menuClick (x, y) {
    //This function receives the position where user has clicked
}

function playSound(sound){
    var s = new Audio("Assets/sounds/"+sound+".wav");
    s.play();
}

function playMusic(audio){
    audio.play();
}

function clearCanvas () {
    let context = document.getElementById("game").getContext("2d");
    context.clearRect(0, 0, 1240, 860); //Clears canvas for printing
}

function updateCamera(px, py){
    viewport.update(px + (64/2), py + (64/2));

    let context = document.getElementById("game").getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
        
}

function resize(scaleFactor) {

    let canvas = document.getElementById("game");

    let ctx = document.getElementById("game").getContext("2d");

    // save the canvas content as imageURL
    var data = canvas.toDataURL();

    canvas.width*=scaleFactor;
    canvas.height*=scaleFactor;


    // scale and redraw the canvas content
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    }
    img.src = data;

}

function unsize (scaleFactor){
    let canvas = document.getElementById("game");

    canvas.width*=2;
    canvas.height*=2;
}