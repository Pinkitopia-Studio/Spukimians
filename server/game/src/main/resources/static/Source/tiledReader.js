

function parseTiledLevel(file){
    readTextFile(file);
}

function processData (text) {
    let splittedArray = text.split("\n");
    let x = splittedArray[0].length / 2; //COGE LAS COMAS POR LO TANDO DIVIDIMOS ENTRE 2
    let y = splittedArray.length;
    
    var newWorld = new Array(x);
        for (var i = 0; i < x; i++){
            newWorld[i] = new Array(y);
            for (var j = 0; j < y; j++){
                newWorld[i][j] = 0;
            }
        }
    for (var i = 0; i < x; i++){
        let splitted = splittedArray[i].split(",");
        for (var j = 0; j < y; j++){
            newWorld[i][j] = parseInt(splitted[j]);
        }
    }
    var newMatrix = new Array(x);
    //Colocación correcta
    for (var i = 0; i < x; i++){
        newMatrix[i] = new Array(y);
        for (var j = 0; j < y; j++){
            newMatrix[i][j] = newWorld[j][i];
        }
    }

    console.log(newMatrix);

    sceneManager.scenes[1].finishCreate([x, y, newMatrix]);
}