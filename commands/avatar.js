module.exports = {
    name: 'avatar',
    description: 'Sends a requested user\'s avatar or your own.',
    execute(message, args, taggedUser) {
        const avatarOptions = { format: "png", dynamic: true, size: 1024 };
        message.channel.send(
			(taggedUser ? taggedUser : message.author)
				.avatarURL(avatarOptions));
    }
}