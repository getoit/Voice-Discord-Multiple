const config = require('../../setup/config.json');

let intervalId;

function startAutoSendMessage(client) {
    if (config.levelingRole.levelingspamSet) {
        intervalId = setInterval(() => {
            const channel = client.channels.cache.get(config.levelingRole.spamchannelId);

            if (channel) {
                channel.send(config.levelingRole.spamContent).then(message => {
                    // Delete the message based on autoDeleteSpam configuration
                    if (config.levelingRole.autoDeleteSpam) {
                        setTimeout(() => {
                            message.delete().catch(console.error);
                        }, config.levelingRole.deleteInterval); // Use deleteInterval from config
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
