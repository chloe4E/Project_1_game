const cWidth = canvas.width;
const cHeight = canvas.height;

window.onload = () => {
  const game = new Game();
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
