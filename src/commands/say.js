 const config = require("../../setup/config.js");

module.exports = {
    name: "say",
    description: "Send a message to a specified channel.",
    async execute(client, message, args) {
        if (!message.content.startsWith(config.prefix)) return;
        if (!config.allowedUsers.includes(message.author.id)) {
            return; 
        }

        const sayMessage = args.join(" ");
        const channelId = message.channel.id; 
        const msgContent = args.slice(1).join(" ");

        try {
            await message.reply(sayMessage); 
        } catch (error) {
            console.error(error);
        }
    }
};
