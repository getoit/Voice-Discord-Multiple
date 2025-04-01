const { Client, Options } = require("discord.js-selfbot-v13");
require("colors");
const fs = require('fs');
const { secretbox } = require('tweetnacl');

const config = require("./setup/config.js");
const handleCommands = require("./src/handleCommands"); 
const autoSendMessage = require('./src/utils/autoSendMessage'); 

class ModClient extends Client {
    constructor(token, config, info) {
        super({
            partials: [],
            makeCache: Options.cacheWithLimits({ MessageManager: 0 })
        });
        this.TOKEN = token;
        this.config = config;
        this.info = info;
        this.intervals = new Set();
    }

    maskToken(token) {
        const parts = token.split('.');
        if (parts.length < 2) return token;
        const maskedPart = '#'.repeat(10);
        return `${parts[0]}.${maskedPart}`;
    }

    startInterval(callback, interval) {
        const intervalId = setInterval(callback, interval);
        this.intervals.add(intervalId);
        return intervalId;
    }

    stopAllIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals.clear();
    }

    _encrypt(buffer, secret_key) {
        const encryptedMessage = secretbox(buffer, this._nonceBuffer, secret_key);
        return [encryptedMessage, this._nonceBuffer.slice(0, 4)];
    }

    async connect(channelId, selfMute = true, selfDeaf = true, createStream = false) {
        try {
            const connectionOptions = { selfMute, selfDeaf, selfVideo: false };
            const channel = this.channels.cache.get(channelId);
            if (!channel) throw new Error("Channel not found");

            let connection = await this.voice.joinChannel(channel, connectionOptions).catch(err => {
                console.error(`Connection error: ${err.message}`);
                throw err;
            });

            if (createStream && connection && typeof connection.createStreamConnection === 'function') {
                await connection.createStreamConnection().catch(() => {});
            }

            this.startInterval(async () => {
                connection = await this.voice.joinChannel(channel, connectionOptions);
                if (createStream && connection && typeof connection.createStreamConnection === 'function') {
                    await connection.createStreamConnection().catch(() => {});
                }
            }, 60000); // Increased timeout to 60 seconds

            return connection;
        } catch (error) {
            console.error(`Failed to connect to channel ${channelId}: ${error.message}`);
            throw error;
        }
    }

    async start(connectedClients) { // Pass connectedClients as a parameter
        try {
            console.log(`[*] Attempting to login with token: ${this.maskToken(this.TOKEN)}`.yellow);
            await this.login(this.TOKEN);
            const { channelId, selfMute, selfDeaf, stream } = this.config.VC;

            if (!channelId) {
                throw new Error("Channel ID not provided in config");
            }

            const { tag } = this.user;
            const result = { success: true, tag };

            await this.connect(channelId, selfMute, selfDeaf, stream).then(connection => {
                const { name, id } = connection.channel;
                console.log(`[+] Connected ${tag} to ${name} (${id})`.green);
            }).catch(error => {
                console.log(`[!] Failed to connect ${tag} to channel: ${error.message}`.yellow);
            });

            handleCommands(this, connectedClients);
            autoSendMessage.startAutoSendMessage(this); 

            return result;
        } catch (error) {
            this.destroy();
            const errorMessage = error.message.toUpperCase().replace(/\./g, '');
            const result = { success: false, error: errorMessage };
            console.log(`[-] Failed login: ${this.maskToken(this.TOKEN)} : ${errorMessage}`.red);
            return result;
        }
    }
}

const wait = seconds => new Promise(resolve => setTimeout(resolve, 1000 * seconds));

(async () => {
    const modInfo = {
        name: "Voice Discord Multiple",
        version: "1.0.0",
        update: "2/3/2025",
        limitToken: 5
    };

    const users = require("./setup/starter");
    const config = require("./setup/config.js");
    const connectedClients = new Map();

    await wait(3);
    console.clear();
    console.log(`[+] ${modInfo.name} : ${modInfo.version} - ${modInfo.update}`.blue);
    console.log(`[+] Loading ${users.length} tokens...`.blue);
    
    const loginResults = await Promise.allSettled(users.map(async (user) => {
        const client = new ModClient(user.tk, user.config, modInfo);
        return client.start(connectedClients).then(result => ({client, result})); // Pass connectedClients
    }));

    loginResults.forEach(({status, value}) => {
        if (status === 'fulfilled' && value.result.success) {
            connectedClients.set(`ID:${value.client.user.id}`, value.client);
        }
    });

    console.log(`[+] Successfully connected: ${connectedClients.size}/${users.length}`.magenta);

    if (!connectedClients.size) {
        console.log('');
        console.log("[-] No successful connections, closing...".red);
        setTimeout(() => process.exit(), 3000);
    }
})();
