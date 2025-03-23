const config = require("../setup/config.js");
const say = require("./commands/say.js"); // Importing the say command
const autoWakeup = require("./utils/autoWakeup.js"); // Importing the autoWakeup function


// Function to handle commands
function handleCommands(client, clients) {
    const { prefix, jockieIds } = config;

    client.on('messageCreate', message => {
        const isAllowed = jockieIds && jockieIds.includes(message.author.id);

    // Call the autoWakeup function
    autoWakeup(client, message); // Invoking the autoWakeup function

    // Handle the say command

        if (message.content.startsWith(`${prefix}say `)) {
            const args = message.content.split(' ').slice(1);
            say.execute(client, message, args); // Calling the execute method of say
        }
    });
}

module.exports = handleCommands;
