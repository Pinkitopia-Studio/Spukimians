var levelsData = {
        data : [ //LEVEL 0
        {
            playerX: 2,
            playerY: 16,
            enemyX: 2,
            enemyY: 10,
            ghosts: 1,
            minMovements:25,
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
            minMovements:15,
            keyX: 3,
            keyY: 4,
            barriers: [],
            levers: [],
            boxes: [
                [3, 3]
            ]
        },
        { //LEVEL 2
            playerX: 1,
            playerY: 5,
            ghosts:1,
            minMovements:15,
            keyX: 5,
            keyY: 2,
            barriers: [],
            levers: [],
            enemyX: 5,
            enemyY: 1
        }]
};

//Levels data: In each array position there are two things:
// - ghosts: number of ghosts in that level
// - minMovements: minimum number of movements for getting the third star