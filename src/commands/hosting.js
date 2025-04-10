const config = require("../../setup/config.js");

module.exports = {
    name: "hosting",
    description: "Show system metrics (memory usage, ping latency, uptime)",
    async execute(client, message, args) {
        if (!message.content.startsWith(config.prefix)) return;
        if (!config.allowedUsers.includes(message.author.id)) {
            return;
        }

        const memoryUsage = process.memoryUsage();
        const usedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;
        const totalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100;

        const startTime = Date.now();
        await message.channel.sendTyping();
        const ping = Date.now() - startTime;

        const uptimeSeconds = process.uptime();
        const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

        const response = `**Hosting & VPS Information**:
\`\`Memory Usage\`\`: ${usedMB}MB / ${totalMB}MB
\`\`Ping Latency\`\`: ${ping}ms
\`\`Uptime\u00A0\u00A0\u00A0\u00A0\u00A0 \`\`: ${uptime}`;

        try {
            await message.reply(response);
        } catch (error) {
            console.error("Error sending hosting metrics:", error);
        }
    }
};
