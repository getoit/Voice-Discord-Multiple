const config = {
  prefix: "-",
  AutoWakeupJockie: false,
  allowedUsers: [
    "ownerID_1",
    "ownerID_99"
  ],
  VC: {
    channelId: "VoiceChannelID",
    selfMute: false,
    selfDeaf: false,
    stream: false
  },
  levelingRole: {
    levelingspamSet: false,
    spamchannelId: "SpamChannelID",
    spamContent: "_ _",
    spamInterval: 50000
  }
};

module.exports = config;
