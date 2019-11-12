/*
File:		config.js
Type:		exports
Comments:	Exports various global - changeable variables.
			If the application needs a variable that can be used across 
			.js files, use this.
Note:		If you have problems displaying emoji's in the terminal, set the terminal
			descriptors to whatever you want!
			EG: [WARN] for warning
			[DEAD] for dead etc...
*/

module.exports =
{
	token: "",
	ident: ";",
	terminal: {
		success: "✅ ",
		info: "ℹ️ ",
		out: "📩 node> ",
		type: "💬 ",
		error: "🆘 ",
		warn: "🔶 ",
		dead: "💀 "
	},
	status: [
		{
			status: 'online',
			text: ''
		},
		{
			status: 'online',
			text: 'WITH YOUR MOM'
		},
		{
			status: 'dnd',
			text: 'Rainbow Six Siege'
		},
		{
			status: 'dnd',
			text: 'Minecraft'
		},
		{
			status: 'dnd',
			text: 'Fortnite'
		},
	],
	help:	"> Current Commands: \n"
			+ "```yaml\n"
			+ ";help   \t # Display This Message\n"
			+ ";search \t # Search for sounds / music\n"
			+ ";uptime \t # Show uptime of Bot in seconds.\n"
			+ ";thanks \t # thank the bot\n"
			+ ";ping   \t # Ping the bot\n"
			+ "```"
}
