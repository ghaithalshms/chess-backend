const { WebSocketServer } = require("ws");
const { GameManager } = require("./gameManager");

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  gameManager.addUser(ws);

  ws.on("disconnect", () => gameManager.removeUser(ws));
});
