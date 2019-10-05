/*

In this file, all game engine functions are located.

*/

var mouseX, mouseY;

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
    canvas.setAttribute("width",640);
    canvas.setAttribute("height",640);
    canvas.setAttribute("x", 410);
    canvas.setAttribute("y", 100);
    canvas.setAttribute('style', "position: absolute;  left: 410px; top: 100px; border:2px");
    document.body.appendChild(canvas);

    
}
//MAIN LOOP
function update(myboard) {
    /*
    FUNCTION UPDATE:
    - Clears canvas context.
    - Calls update of every active object in the game
    - Prints new canvas with updated information of each object
    It's called 20 times per second.
    */
    let context = document.getElementById("game").getContext("2d");
    context.clearRect(0, 0, 640, 640);

    
    
    if (myboard.activeWorld){
        //If the world is active (Signifies that a level is being played)
        printWorld(myboard);
    } 
    else if (myboard.activeMenu) {
        printMenu(myboard);
    }
    

    myboard.elements.forEach(element => {
        element.update(myboard);
    });

    if(esc){ 
        myboard.activePause = true;
        
    }else{
        myboard.activePause = false;
        
    }

   
}

function printWorld(myboard){
    let x = myboard.world.length;
    let y = myboard.world[0].length;
    let image = myboard.tileSheet;
    for (var i = 0; i < x; i++){
        for (var j = 0; j < y; j++){
            printTile(myboard.tileSheet, myboard.world[i][j], [i*64, j*64]);
        }
    }
    if(myboard.activePause){
        printBackground("pause");
    }
}

function printTile(image, type, position){
    let context = document.getElementById("game").getContext("2d");
    let sprite = [0, 0];
    switch(type){
        case 0:
            //Floor tile
            sprite = [0, 186];
        break;
        case 1:
            //Wall tile
            sprite = [0, 0];
        break;
        case 2:
            //Hole tile
            sprite = [558, 186];
        break;
    }
    context.drawImage(image, sprite[0], sprite[1], 62, 62, position[0], position[1], 64, 64);
}

function printSprite(image, sprite, printPosition){
    let context = document.getElementById("game").getContext("2d");
    context.drawImage(image, sprite[0], sprite[1], 64, 64, printPosition[0], printPosition[1] - 16, 64, 64);
}

function printImage(src, pos, size){
    let image = new Image();
    image.src = "Assets/"+src+".png";
    let context = document.getElementById("game").getContext("2d");
    var img = context.drawImage(image, pos[0], pos[1], size[0], size[1]);
    return img;
}

function printMenu () {
    //This function prints the background and the buttons of the menu
    printBackground("menuBackground"); 
}

function printBackground(background){
    let context = document.getElementById("game").getContext("2d");
    let backgroundImage = new Image();
    backgroundImage.src = "Assets/"+background+".png";
    context.drawImage(backgroundImage, 0, 0, 640, 640, 0, 0, 640, 640);
}

function getCanvas(){
    var canvas = document.getElementById("game");
    return canvas;
}

function printLevelSelector(){
    //TODO LO DEL LEVEL SELECTOR AQUI.
}

function mouseMovement(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function mouseOver(event){
    mousePosX = event.clientX;
    mousePosY = event.clientY;
}

function mouseRelease (event) {

    if (unnamed.activeWorld){
        let newX = event.clientX;
        let newY = event.clientY;
        movePlayer(newX, newY);
    } else {
        menuClick(newX, nexY);
    }
    
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
    switch(k){
        case 1:
            myPlayer.move(1);
            break;
        case 2:
            myPlayer.move(2);
            break;
        case 3:
            myPlayer.move(3);
            break;
        case 4:
            myPlayer.move(4);
            break;
    }
}

function movePlayer (newX, newY) {

    let diffX = mouseX-newX;
    let diffY = mouseY-newY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        //If the swipe was larger on X axis, move Left or Right
        if (diffX > 0){
            myPlayer.move(4); //Move left
        } else {
            myPlayer.move(2); //Move Right
        }
    } else {
        //Else, the swipe was larger on Y axis, so move Up or Down
        if (diffY > 0){
            myPlayer.move(3); //Move down
        } else {
            myPlayer.move(1); //Move up
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