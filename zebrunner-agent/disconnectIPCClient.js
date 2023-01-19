const ipc = require('node-ipc').default;

const disconnectIPCClient = () => {
    ipc.log('disconnect from zebrunneragent');
    ipc.disconnect('zebrunneragent');
};

module.exports = disconnectIPCClient
