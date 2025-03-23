# Project Title 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  <!-- Badge for license -->

## Description
This project is designed to provide a voice command interface for Discord, allowing users to interact with the Discord server through various commands. The key features of this project include:

- **Voice Commands**: Users can send voice commands to perform actions within the Discord server.
- **Auto Send Messages**: The bot can automatically send predefined messages at specified intervals.
- **Auto Wakeup**: The bot can wake up and respond to specific triggers or commands.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)  <!-- Badge for version -->

## Installation
To install the project, run the following command:
```
npm install
```

## Usage
To use the project, execute the following command:
```
node index.js
```
Once the bot is running, you can use the following commands:

### Configuration
Here is the configuration object from `setup/config.js` that you can customize:

```javascript
const config = {
  prefix: "-",                                  // Prefix for commands
  AutoWakeupJockie: false,                      // Enable auto wakeup functionality
  allowedUsers: [
    "ownerID_1",                                // Replace with your Discord user ID 
    "ownerID_99"                                // You can add more user IDs here
  ],
  VC: {
    channelId: "channelId",                     // Replace with your voice channel ID
    selfMute: false,                            // Mute the bot in the voice channel
    selfDeaf: false,                            // Deaf the bot in the voice channel
    stream: false                               // Stream audio from the voice channel
  },
  levelingRole: {
    levelingspamSet: false,                     // Enable leveling spam
    spamchannelId: "1347790044567437373",       // Replace with your spam channel ID
    spamContent: "_ _",                         // Content to be sent in the spam channel 
    spamInterval: 50000                         // Interval for sending spam messages (in milliseconds)
  }
};
module.exports = config;
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
