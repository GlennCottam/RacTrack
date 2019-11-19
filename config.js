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
	key: "",
	ident: ";",
	version:
	{
		type: "ALPHA",
		id: "1.0.8",
		diff: 
		"```diff\n"
		+ "+ Basic search functionally added.\n"
		+ "+ Changed message replies to embeds to better looking responses \n"
		+ "+ Typing indicator with REAL HUMAN delay.\n"
		+ "+ Squashed some bugs\n"
		+ "- When searching, only grabs first result."
		+ "```"

	},
	tts: false,
	terminal: {
		success: "✅ ",
		info: "ℹ️ ",
		out: "📩 node> ",
		type: "💬 ",
		log: "📝 ",
		error: "🆘 ",
		warn: "🔶 ",
		dead: "💀 "
	},
	status: [
		{
			status: 'online',
			text: "1.0.8 - ALPHA"
		}
	],
	help:	"```yaml\n"
			+ ";help 				# Display This Message\n"
			+ ";search 			  # Search for sounds / music\n"
			+ ";version 			 # Sends version information\n"
			+ ";uptime 			  # Show uptime of Bot in seconds.\n"
			+ ";status {0-10} 	   # Sets status of bot\n"
			+ ";thanks 			  # thank the bot\n"
			+ ";ping 				# Ping the bot\n"
			+ "```"
}
