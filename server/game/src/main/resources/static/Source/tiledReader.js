

function parseTiledLevel(file){
    readTextFile(file);
}

function processData (text) {
    let splittedArray = text.split("\n");
    let x = splittedArray.length;
    let y = splittedArray[0].length;
    var newWorld = new Array(x);
        for (var i = 0; i < x; i++){
            newWorld[i] = new Array(y);
            for (var j = 0; j < y; j++){
                newWorld[i][j] = 0;
            }
        }
    for (var i = 0; i < x; i++){
        let splitted = splittedArray[i].split(", ");
        for (var j = 0; j < y; j++){
            newWorld[i][j] = parseInt(splitted[j]);
        }
    }

    sceneManager.scenes[1].finishCreate([x, y, newWorld]);
}