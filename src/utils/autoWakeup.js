const jockieIds = [
    '353639776609632256',
    '411916947773587456',
    '412347257233604609',
    '412347553141751808',
    '412347780841865216'
];

module.exports = (client, message) => {
    const AutoWakeupJockie = client.config.AutoWakeupJockie;

    if (message.mentions.has(client.user) && message.content.includes('wake up') && AutoWakeupJockie) {
        if (jockieIds.includes(message.author.id)) {
            setTimeout(() => {
                message.channel.send('yes');
            }, 3000); // 3 seconds
        }
    }
};
