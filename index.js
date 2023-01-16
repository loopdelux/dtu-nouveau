const discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the keys as the command name and the value of the exported module
  client.commands.set(command.name, command);
}

// bot ready
client.once("ready", () => {
  console.log("Ready!");

  client.user.setPresence({
    status: "dnd",
    activity: {
      type: "WATCHING",
      name: "for ;;",
    },
  });
});

client.on("message", (message) => {
  // command exec log
  console.log(
    `Author: ${message.author.tag}\n` +
      `Date: ${message.createdAt}\n` +
      `Content: ${message.content}\n`
  );

  // latinx blacklist
  if (message.content.toLowerCase().includes("latinx")) message.react("🖕");

  // primitive command handler
  if (message.author.bot || message.webhookId) return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const taggedUser = message.mentions.users.first();

  if (!client.commands.has(command)) return;

  try {
    client.commands
      .get(command)
      .execute(message, args, taggedUser);
  } catch (error) {
    console.error(error);
    message.reply(
      `there was an error trying to execute that command:\`\`\`js\n${error}\n\`\`\``
    );
  }
});

// token
client.login(config.token);
