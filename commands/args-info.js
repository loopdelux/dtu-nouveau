module.exports = {
    name: 'args-info',
    description: "DEBUG COMMAND.",
    execute(message, args) {
        if (args.length === 0)
			return message.channel.send(`You didn't provide any arguments, ${message.author.username}`);

		message.channel.send(`Your arguments were "${args.join(", ")}"`);
    }
}