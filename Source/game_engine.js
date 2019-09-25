/*

In this file, all game engine functions are located.

*/
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
    It's called 50 times per second.
    */
    let context = document.getElementById("game").getContext("2d");
    context.clearRect(0, 0, 640, 640);

    myboard.elements.array.forEach(element => {
        element.update();
    });
}

function printImage(image, ){
    let context = document.getElementById("game").getContext("2d");

}