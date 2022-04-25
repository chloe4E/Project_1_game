class Controls {
  constructor(game) {
    this.game = game;
    this.arrow = this.game.arrow;
  }

  keyboardEvents() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (this.arrow.y <= 466 && this.arrow.x < 200) {
            this.arrow.tiltRight();
          }
          break;
        case "ArrowLeft":
          if (this.arrow.y <= 466 && this.arrow.x > 45) {
            this.arrow.tiltLeft();
          }
          break;
        case "Space":
          if (this.arrow.x === 145 && this.arrow.y === 400) {
            this.game.playerBubble.speedX = 0;
            this.game.playerBubble.speedY = -5;
          } else if (this.arrow.x === 145 - 50) {
            this.game.playerBubble.speedX = -3;
            this.game.playerBubble.speedY = -5;
          } else if (this.arrow.x === 145 - 100) {
            this.game.playerBubble.speedX = -5;
            this.game.playerBubble.speedY = -5;
          } else if (this.arrow.x === 145 + 50) {
            this.game.playerBubble.speedX = +3;
            this.game.playerBubble.speedY = -5;
          } else if (this.arrow.x === 145 + 100) {
            this.game.playerBubble.speedX = +5;
            this.game.playerBubble.speedY = -5;
          }
      }
    });
  }
}
