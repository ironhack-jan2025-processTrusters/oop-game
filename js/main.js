

class Player {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.positionX = 10;
        this.positionY = 0;

        this.playerElm = document.getElementById("player");
        this.updateUI();
    }
    updateUI(){
        this.playerElm.style.width =  this.width + "vw";
        this.playerElm.style.height =  this.height + "vh";
        this.playerElm.style.left = this.positionX + "vw";
        this.playerElm.style.bottom = this.positionY + "vh";
    }
    moveLeft() {
        this.positionX--;
        this.updateUI();
    }
    moveRight() {
        this.positionX++;
        this.updateUI();
    }
}


class Obstacle {
    constructor(){
        this.width = 20;
        this.height = 20;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - width)        
        this.positionY = 100;

        this.createDomElement();
    }
    createDomElement () {
        // step1: create the element:
        this.obstacleElm = document.createElement("div");

        // step2: add content or modify
        this.obstacleElm.className = "obstacle";
        this.obstacleElm.style.width = this.width + "vw";
        this.obstacleElm.style.height = this.height + "vh";
        this.obstacleElm.style.left = this.positionX + "vw";
        this.obstacleElm.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.obstacleElm);
    }
    moveDown() {
        this.positionY--;
        this.obstacleElm.style.bottom = this.positionY + "vh";
    }
}



const player = new Player();

const obstaclesArr = []; // will store instances of the class Obstacle


// create obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
}, 3000);

// update obstacles
setInterval(() => {
    obstaclesArr.forEach((obstacleInstance, i, arr) => {

        // move
        obstacleInstance.moveDown();

        // detect collision
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {
            // Collision detected!
            console.log("game over...");
            location.href = "gameover.html";

        }
    });
}, 30);



document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (event.code === 'ArrowRight') {
        player.moveRight();
    }
});

