// Configuration object containing various settings for the application
const config = {
  // Setting your prefix for commands
  prefix: "-",
  // Allowing only specific users to use the bot
  AutoWakeupJockie: true, // Enable auto wakeup functionality

  allowedUsers: [
    "353639776609632256",
    "385857821964501003"
  ],
  // Setting the voice channel ID to connect to
  VC: {
    channelId: "1353096384970231820",
    selfMute: true,
    selfDeaf: false,
    stream: false
  },
  levelingRole: {
    levelingspamSet: true,
    spamchannelId: "1353096384970231820",
    spamContent: "_ _",
    spamInterval: 10000
  }
};

// Export the configuration object
module.exports = config;
