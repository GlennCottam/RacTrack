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
	ident: "!RT ",
	version:
	{
		type: "ALPHA",
		id: "1.1.3",
		diff: 
		"```diff\n"
		+ "+ RacPlay functionality added! Bot will now play music in current channel the user is in\n"
		+ "- Issues with RacTrack not delivering a response and continuously typing (try catch not implemented)\n"
		+ "+ Better optimization for other functions\n"
		+ "+ TTS support (global config.js file)\n"
		+ "- When searching, only grabs first result.\n"
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
			text: 'DDD'
		},
		{
			status: 'online',
			text: 'With Itself...'
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
			status: 'dnd',
			text: "Halo Reach"
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
			+ "help 				# Display This Message\n"
			+ "search 			  # Search for sounds / music\n"
			+ "RacPlay				# Search term, and play result!\n"
			+ "stop				# Stops current playback\n"
			+ "version 			 # Sends version information\n"
			+ "uptime 			  # Show uptime of Bot in seconds.\n"
			+ "status {0-10} 	   # Sets status of bot\n"
			+ "thanks 			  # thank the bot\n"
			+ "ping 				# Ping the bot\n"
			+ "freakout 			# Bot will freakout\n"
			+ "```"
}
