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
	ident: ";",
	version:
	{
		type: "ALPHA",
		id: "1.1.0",
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
	help:	"```yaml\n"
			+ ";help 				# Display This Message\n"
			+ ";search 			  # Search for sounds / music\n"
			+ ";RacPlay				# Search term, and play result!\n"
			+ ";stop				# Stops current playback\n"
			+ ";version 			 # Sends version information\n"
			+ ";uptime 			  # Show uptime of Bot in seconds.\n"
			+ ";status {0-10} 	   # Sets status of bot\n"
			+ ";thanks 			  # thank the bot\n"
			+ ";ping 				# Ping the bot\n"
			+ ";freakout 			# Bot will freakout\n"
			+ "```"
}
