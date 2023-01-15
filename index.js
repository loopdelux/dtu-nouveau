const discord = require("discord.js");
const config = require("./config.json");

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
	if (message.author.bot || message.webhookId) return;
	if (!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const avatarOptions = { format: "png", dynamic: true, size: 1024 };

	// bolas
	const taggedUser = message.mentions.users.first();

	// command exec log
	console.log(
		`Author: ${message.author.tag}\n` +
		`Date: ${message.createdAt}\n` +
		`Content: ${message.content}`);

	if (command === "ping") { // ping command
		message.channel.send('your mother is full of portent juices');

	} else if (command === "args-info") { // args info command
		if (args.length === 0)
			return message.channel.send(`You didn't provide any arguments, ${message.author.username}`);

		message.channel.send(`Your arguments were "${args.join(", ")}"`);

	} else if (command === "avatar") {
		message.channel.send(
			(taggedUser ? taggedUser : message.author)
				.displayAvatarURL(avatarOptions));
	}

	// latinx blacklist
	if (message.content.toLowerCase().includes("latinx"))
		message.react("🖕");
});


// token
client.login(config.token);
