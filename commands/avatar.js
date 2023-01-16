module.exports = {
    name: 'avatar',
    description: 'Sends a requested user\'s avatar or your own.',
    execute(message, args, taggedUser, avatarOptions) {
        message.channel.send(
			(taggedUser ? taggedUser : message.author)
				.avatarURL(avatarOptions));
    }
}