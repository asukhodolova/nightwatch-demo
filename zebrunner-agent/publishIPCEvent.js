const ipc = require('node-ipc').default;

const publishIPCEvent = (event, message) => {
    ipc.log('send event to reportportal');

    ipc.of.zebrunneragent.emit(event, message);
};

module.exports = publishIPCEvent
