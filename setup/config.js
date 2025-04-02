const config = {
  prefix: "+",
  AutoWakeupJockie: false,
  allowedUsers: [
    "AllowedUsers1",
    "AllowedUsers99"
  ],
  VC: {
    channelId: "ChannelID",
    selfMute: false,
    selfDeaf: false,
    stream: false
  },
  levelingRole: {
    levelingspamSet: false,
    spamchannelId: "ChannelID",
    spamContent: "_ _",
    spamInterval: 45000,
    autoDeleteSpam: false,
    deleteInterval: 100
  }
};

module.exports = config;
