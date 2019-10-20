

function parseTiledLevel(level){
    processData(levelTiles.data[level]);

    
}

function processData (text) {
    let splittedArray = text.split("\n");
    let auxArray = splittedArray[0].split(",");
    let x = auxArray.length; //COGE LAS COMAS POR LO TANDO DIVIDIMOS ENTRE 2
    let y = splittedArray.length - 1;
    
    
    var newWorld = new Array(y);
        for (var i = 0; i < y; i++){
            newWorld[i] = new Array(x);
            for (var j = 0; j < x; j++){
                newWorld[i][j] = 0;
            }
        }
    for (var i = 0; i < y; i++){
        let splitted = splittedArray[i].split(",");
        for (var j = 0; j < x; j++){
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

  

    sceneManager.scenes[1].finishCreate([x, y, newMatrix]);
}