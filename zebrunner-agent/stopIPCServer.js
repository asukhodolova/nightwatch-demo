const ipc = require("node-ipc").default;

const stopIPCServer = (unsubscribeServerEvents) => {
  if (!ipc.server) {
    return;
  }

  unsubscribeServerEvents(ipc.server);

  // node-ipc
  ipc.server.stop();
};

module.exports = stopIPCServer
