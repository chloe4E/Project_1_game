class Bubble {
  constructor(game, x, y, color, behavior) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.color = color;
    this.behavior = behavior;
    this.speedX = 0;
    this.speedY = 0;
  }
  draw() {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.behavior === "dynamic") {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }
}

class Arrow extends Bubble {
  constructor(game) {
    super(game);
    this.x = 145;
    this.y = 400;
    this.width = 10;
    this.height = 100;
    this.color = "Brown";
  }

  tiltLeft() {
    if (this.x > 145 + 33) {
      this.x -= 50;
      this.y -= 33;
    } else {
      this.x -= 50;
      this.y += 33;
    }
  }

  tiltRight() {
    if (this.x < 145 - 33) {
      this.x += 50;
      this.y -= 33;
    } else {
      this.x += 50;
      this.y += 33;
    }
  }
  drawArrow() {
    this.game.ctx.beginPath();
    this.game.ctx.moveTo(this.x, this.y);
    this.game.ctx.lineTo(145, 500);
    this.game.ctx.lineWidth = 10;
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fill();
    this.game.ctx.stroke();
  }
}