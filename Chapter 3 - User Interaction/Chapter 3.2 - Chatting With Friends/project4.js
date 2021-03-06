const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const config = require('./config.json');

const client = new SteamUser();

const logOnOptions = {
  accountName: config.username,
  password: config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
  console.log('Logged into Steam');

  client.setPersona(SteamUser.Steam.EPersonaState.Online);
  client.gamesPlayed(440);
});

client.on('friendRelationship', (steamid, relationship) => {
  if (relationship === 2) {
    client.addFriend(steamid);
    client.chatMessage(steamid, 'Hello there! Thanks for adding me!');
  }
});
client.on('friendMessage', (steamid, message) => {
  if (message === "Hello") {
    client.chatMessage(steamid,"Hello There !");
  } else if (message === "Hey") {
    client.chatMessage(steamid,"Hey There !")
  } else {
    client.chatMessage(steamid,"I failed to understand you :/")
  }
});
