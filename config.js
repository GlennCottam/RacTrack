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
	version:
	{
		type: "ALPHA",
		id: "1.0.3",
		diff: 
		"+ \`;version\` Command added\n"
		+ "+ \`;uptime`\ Command working\n"
		+ "+ Built in command inside terminal\n"
		+ "+ TTS working (enable / disable in global config)\n"
		+ "+ Totally Human Delay\n"
		+ "+ Console icons!"
	},
	tts: false,
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
			status: 'online',
			text: 'NNN'
		},
		{
			status: 'online',
			text: 'Music'
		},
		{
			status: 'online',
			text: 'Node.js'
		},
		{
			status: 'online',
			text: "Daddy?"
		},
		{
			status: 'online',
			text: 'UwU'
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
