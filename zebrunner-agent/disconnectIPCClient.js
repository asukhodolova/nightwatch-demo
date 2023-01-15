const ipc = require('node-ipc').default;

const disconnectIPCClient = () => {
    ipc.log('disconnect from reportportal');
    ipc.disconnect('reportportal');
};

module.exports = disconnectIPCClient
