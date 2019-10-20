var levelsData = {
        data : [ //LEVEL 0
        {
            playerX: 2,
            playerY: 16,
            enemyX: 2,
            enemyY: 10,
            ghosts: 1,
            minMovements:0,
            keyX: 3,
            keyY: 4,
            barriers: [
                [2, 15]
            ],
            levers: [
                [3, 18, 0] //[posX, posY, idBarrier]
            ],
            boxes: [
                [2, 13]
            ]
        },
        { //LEVEL 1
            playerX: 4,
            playerY: 7,
            enemyX: 7,
            enemyY: 3,
            ghosts: 1,
            minMovements:20,
            keyX: 3,
            keyY: 4,
            barriers: [],
            levers: [],
            boxes: [
                [3, 3]
            ]
        },
        { //LEVEL 2
            ghosts:2,
            minMovements:15,
            keyX: 5,
            keyY: 2
        }]
};

//Levels data: In each array position there are two things:
// - ghosts: number of ghosts in that level
// - minMovements: minimum number of movements for getting the third star