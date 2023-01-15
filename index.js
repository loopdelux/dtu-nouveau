const discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new discord.Client();

// bot ready
client.once("ready", () => {
    console.log("Ready!");

    client.user.setPresence({
        status: "dnd",
        activity: {
            type: "WATCHING",
            name: "for ;;"
        },
    });
});

client.on("message", (message) => {
    // primitive command handler
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	// bolas
	const taggedUser = message.mentions.users.first();

    // command exec log
    console.log(`Author: ${message.author.username}#${message.author.discriminator}` +
        `Date: ${message.createdAt}\nContent: ${message.content}`);

    if (command === "ping") { // ping command
        message.channel.send('your mother is full of portent juices');

    } else if (command === "args-info") { // args info command
        if (args.length === 0)
            return message.channel.send(`You didn't provide any arguments, ${message.author.username}`);

        message.channel.send(`Your arguments were "${args}"`);

    } else if (command === "avatar") {
        if (message.mentions.users.size === 0)
            return message.channel.send(message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}));
        message.channel.send(taggedUser.displayAvatarURL({format: "png", dynamic: true, size: 1024}));

    }

    // latinx blacklist
    if (message.content.toLowerCase().includes("latinx"))
        message.react("🖕");
});


// token
client.login(token);