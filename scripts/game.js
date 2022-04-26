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

  // loadBackground() {
  //   this.ctx.fillStyle = "Black";
  //   this.ctx.fillRect(0, 0, cWidth, cHeight);
  // }

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
    //this.checkAdjacentBubble();
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
        this.checkAdjacentBubble2(bubble);
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

  // checkAdjacentBubble() {
  //   this.enemies.forEach((bubble) => {
  //     console.log("current bubble color is: " + bubble.color);
  //     for (let i = 0; i < this.enemies.length; i++) {
  //       console.log("current enemy color is: " + this.enemies[i].color);
  //       const isAdjacent = (bubble) =>
  //         this.bubble.x + this.bubble.width >= this.enemies[i].x &&
  //         this.bubble.x <= this.enemies[i].x + this.enemies[i].width &&
  //         this.bubble.y + this.bubble.height >= this.enemies[i].y &&
  //         this.bubble.y <= this.enemies[i].y + this.enemies[i].height;
  //       if (
  //         isAdjacent(bubble) &&
  //         bubble.color === this.enemies[i].color &&
  //         (this.enemies[i].behavior === "remove" ||
  //           bubble.behavior === "remove")
  //       ) {
  //         bubble.color = "Yellow";
  //       }
  //     }
  //   });
  // }

  //Working one:
  checkAdjacentBubble2(initialBubble) {
    this.enemies.forEach((enemy, i) => {
      const isAdjacent = (enemy) =>
        initialBubble.x + initialBubble.width >= enemy.x &&
        initialBubble.x <= enemy.x + enemy.width &&
        initialBubble.y + initialBubble.height >= enemy.y &&
        initialBubble.y <= enemy.y + enemy.height;
      if (
        isAdjacent(enemy) &&
        initialBubble.color === enemy.color &&
        (enemy.behavior === "remove" || initialBubble.behavior === "remove")
      ) {
        enemy.behavior = "remove";
      }
    });
  }

  checkFlyingBubble() {
    this.enemies.forEach((bubble) => {
      //console.log("current bubble color is: " + bubble.color);
      let isTouchingAnotherBubble = -1;
      let isTouchingBlackBubble = 0;
      for (let i = 0; i < this.enemies.length; i++) {
        if (
          bubble.x <= this.enemies[i].x + this.enemies[i].width &&
          bubble.x + bubble.width >= this.enemies[i].x &&
          bubble.y <= this.enemies[i].y + this.enemies[i].height &&
          bubble.y + bubble.height >= this.enemies[i].y
        ) {
          // collision detected:
          isTouchingAnotherBubble++;
        }
      }
      // console.log(
      //   `inside checkFlying Bubble for a ${bubble.color} bubble at y (${bubble.y}) which is touching ${isTouchingAnotherBubble} other bubbles`
      // );
      if (
        bubble.color !== "Black" &&
        bubble.y !== 0 &&
        isTouchingAnotherBubble === 0
      ) {
        // not touching canvas and no collision detected!
        bubble.color = "Black";
      }
    });
    // add a check if the only upper bubble is black then change your color to black.
    // order the enemy array by growing y
    // this.enemies.sort(function (a, b) {
    //   return a.y - b.y;
    // });
    // // if the bubble touches only one black bubble from the upper side then becomes black
    // this.enemies.forEach((bubble) => {
    //   console.log(`the current enemy has y: ${bubble.y}`);
    //   let upperBubble = -1;
    //   let upperBlackBubble = 0;
    //   if (bubble.color === "Black") {
    //     upperBlackBubble--;
    //   }
    //   for (let i = 0; i < this.enemies.length; i++) {
    //     if (
    //       bubble.x <= this.enemies[i].x + this.enemies[i].width &&
    //       bubble.x + bubble.width >= this.enemies[i].x &&
    //       bubble.y <= this.enemies[i].y + this.enemies[i].height
    //     ) {
    //       // collision detected:
    //       upperBubble++;
    //       if (this.enemies.color === "Black") {
    //         upperBlackBubble++;
    //       }
    //     }
    //   }
    //   console.log(`the current enemy has upper Bubble: ${upperBubble}`);
    //   if (upperBubble === upperBlackBubble) {
    //     bubble.color = "Black";
    //   }
    // });

    this.enemies = this.enemies.filter((item) => !(item.color === "Black"));
  }

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
      this.checkFlyingBubble();
      this.createPlayerBubble();
    } else if (this.playerBubble.behavior === "remove") {
      this.checkFlyingBubble();
      this.createPlayerBubble();
    } else if (this.playerBubble.behavior === "dynamic") {
      this.checkFlyingBubble();
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
      this.ctx.fillStyle = "Black";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.font = "18px Arial";
      this.ctx.fillStyle = "green";
      this.ctx.fillText(`Bravo 🥳`, this.width / 3, this.height / 2);
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
