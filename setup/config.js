// Configuration object containing various settings for the application
const config = {
  // Setting your prefix for commands
  prefix: "-",  // Prefix for commands
  // Allowing only specific users to use the bot
  AutoWakeupJockie: false, // Enable auto wakeup functionality

  allowedUsers: [
    "ownerID_1", // Replace with your Discord user ID 
    "ownerID_99"  // You can add more user IDs here
  ],
  // Setting the voice channel ID to connect to
  VC: {
    channelId: "channelId", // Replace with your voice channel ID
    selfMute: false,   // Mute the bot in the voice channel
    selfDeaf: false,    // Deaf the bot in the voice channel
    stream: false   // Stream audio from the voice channel
  },
 // Setting leveling system roles (like Probot)
  levelingRole: {
    levelingspamSet: false,     // Enable leveling spam
    spamchannelId: "1347790044567437373",       // Replace with your spam channel ID
    spamContent: "_ _",        // Content to be sent in the spam channel 
    spamInterval: 50000        // Interval for sending spam messages (in milliseconds)
  }
};

// Export the configuration object
module.exports = config;
