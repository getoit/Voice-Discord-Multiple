const config = require('../../setup/config.js');

let intervalId;

function startAutoSendMessage(client) {
    if (config.levelingRole.levelingspamSet) {
        intervalId = setInterval(() => {
            const channel = client.channels.cache.get(config.levelingRole.spamchannelId);

            if (channel) {
                channel.send(config.levelingRole.spamContent).then(message => {
                    if (config.levelingRole.autoDeleteSpam) {
                        setTimeout(() => {
                            message.delete().catch(console.error);
                        }, config.levelingRole.deleteInterval);
                    }
                });
            }
        }, config.levelingRole.spamInterval);
    }
}

function stopAutoSendMessage() {
    clearInterval(intervalId);
}

module.exports = {
    startAutoSendMessage,
    stopAutoSendMessage
};
