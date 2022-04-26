class Game {
  constructor() {
    this.canvas = document.getElementById("game-board");
    this.ctx = canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.intervalId = null;
    this.enemies = [];
    this.playerBubble = null;
    this.arrow = null;
    this.controls = null;
    this.isRunning = false;
  }

  //start
  start() {
    this.isRunning = true;
    this.createPlayerBubble();
    this.arrow = new Arrow(this);
    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.createEnemies();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    //this.frames++;
    //this.drawBackground();
    // this.drawScores();
    //this.createEnemies(); push it to the beginning as we do not want to run this every time as we want to append some enemies
    this.playerBubble.move();
    this.playerBubble.draw();
    this.arrow.drawArrow();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.detectCollision();
    this.detectCanvasCollision();
    this.detectBubbleCollision();
    this.removeBubble();
    this.checkAliveBubble();
    this.checkGameWon();
    this.checkGameOver();
  }

  createEnemies() {
    // fill in with array of static bubbles
    this.enemies.push(new Bubble(this, 0, 0, "Pink", "static"));
    this.enemies.push(new Bubble(this, 30, 0, "Pink", "static"));
    this.enemies.push(new Bubble(this, 60, 0, "Blue", "static"));
    this.enemies.push(new Bubble(this, 90, 0, "Blue", "static"));
    this.enemies.push(new Bubble(this, 120, 0, "Green", "static"));
    this.enemies.push(new Bubble(this, 150, 0, "Green", "static"));
  }

  createPlayerBubble() {
    let colorArray = ["Pink", "Blue", "Green"];
    let randomNum = Math.floor(Math.random() * 3);
    let randomColor = colorArray[randomNum];
    this.playerBubble = new Bubble(this, 135, 470, randomColor, "dynamic");
  }

  detectCollision() {
    if (
      this.playerBubble.x + this.playerBubble.width > canvas.width ||
      this.playerBubble.x < 0
    ) {
      this.playerBubble.speedX = -this.playerBubble.speedX;
    }
  }

  detectBubbleCollision() {
    const isPlayerTouchingBubble = (bubble) =>
      this.playerBubble.x + this.playerBubble.width > bubble.x &&
      this.playerBubble.x < bubble.x + bubble.width &&
      this.playerBubble.y + this.playerBubble.height >= bubble.y &&
      this.playerBubble.y <= bubble.y + bubble.height;

    this.enemies.forEach((bubble) => {
      if (
        isPlayerTouchingBubble(bubble) &&
        bubble.color === this.playerBubble.color
      ) {
        this.playerBubble.behavior = "static";
        bubble.behavior = "remove";
      } else if (
        isPlayerTouchingBubble(bubble) &&
        bubble.color !== this.playerBubble.color
      ) {
        this.playerBubble.behavior = "static";
      }
    });
  }

  detectCanvasCollision() {
    if (this.playerBubble.y <= 0) {
      this.playerBubble.behavior = "static";
    }
  }

  checkAdjacentBubble() {}

  removeBubble() {
    this.enemies.forEach((bubble) => {
      //console.log(bubble.behavior);
      if (bubble.behavior === "remove") {
        bubble.color = "Yellow";
      }
    });
  }

  checkAliveBubble() {
    if (this.playerBubble.behavior === "static") {
      this.enemies.push(this.playerBubble);
      let yellowCounter = this.enemies.filter(
        (item) => item.color === "Yellow"
      ).length;
      //console.log(`The yellow counter is: ` + yellowCounter);
      this.enemies = this.enemies.filter((item) => !(item.color === "Yellow"));
      if (yellowCounter) {
        this.enemies.pop();
      }

      this.createPlayerBubble();
    } else if (this.playerBubble.behavior === "remove") {
      this.createPlayerBubble();
    } else if (this.playerBubble.behavior === "dynamic") {
      this.detectBubbleCollision();
    }
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  checkGameWon() {
    if (this.enemies.length === 0) {
      this.stop();
    }
  }

  checkGameOver() {
    let maxY = Math.max.apply(
      Math,
      this.enemies.map(function (o) {
        return o.y;
      })
    );
    if (maxY + 30 > 400) {
      this.stop();
      this.ctx.fillStyle = "Black";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.font = "18px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`😭 GAME OVER`, this.width / 6, this.height / 2);
    }
  }
}
