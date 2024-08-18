const { Chess } = require("chess.js");
const { GAME_OVER, MOVE, INIT_GAME } = require("./messages");

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.moveCount = 0;

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  handleMove(socket, move) {
    if (moveCount % 2 === 0 && socket !== this.player1) {
      return;
    }

    if (moveCount % 2 === 1 && socket !== this.player2) {
      return;
    }

    try {
      this.board.moves(move);
    } catch (err) {
      console.log(err);
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : white,
          },
        })
      );
      return;
    }

    if (moveCount % 2 === 0) {
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }

    this.moveCount++;
  }
}

module.exports = { Game };
