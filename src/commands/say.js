 const config = require("../../setup/config.js");

// Command to send a message to a specified channel
module.exports = {
    name: "say",
    description: "Send a message to a specified channel.",
    async execute(client, message, args) {
        // Check if the message starts with the prefix
        if (!message.content.startsWith(config.prefix)) return;

        // Check if the user is allowed to use this command
        if (!config.allowedUsers.includes(message.author.id)) {
            return; // No reply for disallowed users
        }


        // Send the message directly
        const sayMessage = args.join(" ");
        const channelId = message.channel.id; // Use the current channel ID

        const msgContent = args.slice(1).join(" ");

        try {
            await message.reply(sayMessage); // Reply with the message without mentioning


        } catch (error) {
            console.error(error);
        }

    }
};
