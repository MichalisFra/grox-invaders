//board
let tileSize = 32;
let rows = 16;
let columns =16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context;


//ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize; //position on x-axis
let shipY = tileSize * rows - tileSize*2; //position on y-axis

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImg;
let shipvelocityX = tileSize; //ship moving speed


//aliens
let alienArray = [2];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; // number of aliens
let alienVelocityX = 1; //alien moving speed


window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); //used for drawing on the board

    // // draw initial ship
    // context.fillStyle="green";
    // context.fillRect(ship.x, ship.y, ship.width, ship.height);

    //load images
    shipImg = new Image();
    shipImg.src = "./ship.png"
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)

    }

    alienImg = new Image();
    alienImg.src = "./alien.png"

    createAliens(); // initial Alien spawn

    requestAnimationFrame(update)
    document.addEventListener('keydown', moveShip)
}

function update() {
    requestAnimationFrame(update)
     context.clearRect(0, 0, board.width, board.height)

    //ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    //alien
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;
            

            //if alien touches the border 
            if(alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX*2;
                
                //move all aliens up by one row
                for(let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alienHeight;
                }
            }


            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height)
        }
    }
}

function moveShip(e) {
    if (e.code == "ArrowLeft" && ship.x - shipvelocityX >= 0) {
        ship.x -= shipvelocityX; //move left +1
    }
    else if (e.code == "ArrowRight" && ship.x + shipvelocityX +ship.width <= board.width) {
        ship.x += shipvelocityX; //move right +1
    }
}

function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img : alienImg,
                x : alienX + c*alienWidth,
                y : alienY + r*alienHeight,
                width : alienWidth,
                height : alienHeight,
                alive : true

            }

            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}


