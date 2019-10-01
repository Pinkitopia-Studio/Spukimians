/*

In this file, all game engine functions are located.

*/

var mouseX, mouseY;

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
    canvas.setAttribute('style', "position: absolute;  left: 30%; top: 10%; border:2px");
    document.body.appendChild(canvas);

}

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

    printWorld(myboard);

    myboard.elements.forEach(element => {
        element.update();
    });
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
    context.drawImage(image, sprite[0], sprite[1], 64, 64, printPosition[0], printPosition[1], 64, 64);
}

function mouseMovement(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function mouseRelease (event) {
    let newX = event.clientX;
    let newY = event.clientY;

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