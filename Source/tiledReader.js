function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function parseTiledLevel(file){
    let text = readTextFile(file);
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

    return [x, y, newWorld];
}