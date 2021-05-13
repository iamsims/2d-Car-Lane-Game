const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = 1000;

let score = 0;
let speed = 10;
let possibleXPositions = [60, 410, 760];
let playerCarPositionX = 1;
let playerCarPositionY = canvas.height-160;
let gamePaused = true;

function drawRoad() {
    const road = new Image();
    road.src = 'images/road.png';
  
    road.onload = () => {
      let y = 0;
      const moveRoad = () => {
        ctx.drawImage(
          road,
          0,
          y - canvas.height,
          canvas.width,
          canvas.height * 2
        );
        y += speed;
        if (y >= canvas.height) y = 0;
  
  
        if (gamePaused) return;
        requestAnimationFrame(moveRoad);
      };
      moveRoad();
    };
  }

  function drawPlayer() {
    const playerCar = new Image();
    playerCar.src = 'images/audi.png';
  
    const drawCar = () => {
      ctx.drawImage(playerCar, possibleXPositions[playerCarPositionX], playerCarPositionY);
  
      if (gamePaused) return;
      requestAnimationFrame(drawCar);
    };
  
    playerCar.onload = () => {
      drawCar();
    };
  }

  function drawRoadAndPlayer() {
    drawRoad();
    drawPlayer();
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' && playerCarPositionX !=0)
      playerCarPositionX --;
  
    if (e.code === 'ArrowRight' && playerCarPositionX !=2)
      playerCarPositionX ++;
  
  });

  class Obstacle {
    constructor(y) {
      this.x = getRandomElement(possibleXPositions);
      this.y = y;
      this.prevY = this.y;
      this.speed = speed / 2;
    }
  
    detectCollision = () => {
      if (
        this.x === possibleXPositions[playerCarPositionX] &&
        Math.abs(playerCarPositionY - this.y) <= 179
      ) {
        gameOver();
        gamePaused = true;
        return;
      }
    };
  
    drawObstacle = () => {
      const obstacle = new Image();
      obstacle.src = 'images/car.png';
      obstacle.onload = () => {
        const moveObstacle = () => {
          ctx.drawImage(obstacle, this.x, this.y);
          this.y += speed;
  
          if (this.y > canvas.height + 10) {
            this.y = -400;
            this.x = getRandomElement(possibleXPositions);
            score++;
            _('.game-score h4').innerText = score;
            if (speed < 50) {
              speed += 0.1;
              this.speed = speed / 2;
            }
          }
          this.detectCollision();
  
          if (gamePaused) return;
          requestAnimationFrame(moveObstacle);
        };
  
        moveObstacle();
      };
    };
  }


