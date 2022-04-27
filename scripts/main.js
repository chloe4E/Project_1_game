const cWidth = canvas.width;
const cHeight = canvas.height;

window.onload = () => {
  const game = new Game();
  // game.ctx.fillStyle = "paleturquoise";
  // game.ctx.fillRect(0, 0, cWidth, cHeight);

  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    if (game.isRunning === false) {
      game.start();
    }
    console.log("start");
  }
};
