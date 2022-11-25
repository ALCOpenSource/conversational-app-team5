const crypto = require("crypto");

const { processMessage } = require('../services/messages');
const { InMemorySessionStore } = require("../store/sessionStore");

const randomId = () => crypto.randomBytes(8).toString("hex");

const sessionStore = new InMemorySessionStore();

const setupSocket = (io) => {
  io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      // find existing session
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        return next();
      }
    }
    console.log(socket.handshake.auth.user_uid)
    const userId = socket.handshake.auth.user_uid;
    if (!userId) {
      return next(new Error("invalid user"));
    }
    socket.sessionID = randomId();
    socket.userID = randomId();
    next();
  });
  
  io.sockets.on('connection', (socket) => {
    // persist session
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      connected: true,
    });
  
    socket.emit("session", {
      sessionID: socket.sessionID,
      userID: socket.userID,
    });
  
    socket.join(socket.userID);
  
    socket.on('chat-message', async ({message, action}) => {
      console.log('message: ' + message);
      console.log('action: ' + action);
      const data = await processMessage({message, action});
  
      console.log(data)
  
      socket.emit("chat-message", {
        data,
        from: socket.userID,
      });
  
      // socket.to(socket.userID).emit("chat-message", {
      //   outcome,
      //   from: socket.userID,
      // });
      // socket.to(to).to(socket.userID).emit("chat-message", {
      //   outcome,
      //   from: socket.userID,
      //   to
      // });
    });
  
  
    socket.on("disconnect", async () => {
      const matchingSockets = await io.in(socket.userID).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit("user disconnected", socket.userID);
        // update the connection status of the session
        sessionStore.saveSession(socket.sessionID, {
          userID: socket.userID,
          connected: false,
        });
      }
    });
  });
};

module.exports = { setupSocket }