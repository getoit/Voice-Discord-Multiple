const config = require("../setup/config.js");
const say = require("./commands/say.js"); 
const hosting = require("./commands/hosting.js");
const autoWakeup = require("./utils/autoWakeup.js"); 

function handleCommands(client, clients) {
    const { prefix, jockieIds } = config;

    client.on('messageCreate', message => {
        const isAllowed = jockieIds && jockieIds.includes(message.author.id);

    autoWakeup(client, message); 

        if (message.content.startsWith(`${prefix}say `)) {
            const args = message.content.split(' ').slice(1);
            say.execute(client, message, args); 
        }
        else if (message.content.startsWith(`${prefix}hosting`)) {
            hosting.execute(client, message, []); 
        }
    });
}

module.exports = handleCommands;
