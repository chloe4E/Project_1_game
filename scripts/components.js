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
    } else {
      this.speedX = 0;
      this.speedY = 0;
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

  crashWith(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }
}
class Arrow extends Bubble {
  constructor(game) {
    super(game);
    this.x = 145;
    this.y = 400;
    this.width = 10;
    this.height = 100;
    this.color = "SaddleBrown";
  }

  tiltLeft() {
    if (this.x > 145) {
      this.x -= 25;
      this.y -= 25;
    } else {
      this.x -= 25;
      this.y += 25;
    }
  }

  tiltRight() {
    if (this.x < 145) {
      this.x += 25;
      this.y -= 25;
    } else {
      this.x += 25;
      this.y += 25;
    }
  }
  drawArrow() {
    this.game.ctx.beginPath();
    this.game.ctx.moveTo(this.x, this.y);
    this.game.ctx.lineTo(145, 510);
    this.game.ctx.lineWidth = 10;
    this.game.ctx.strokeStyle = "SaddleBrown";
    //this.game.ctx.fill();
    this.game.ctx.stroke();
  }
}
