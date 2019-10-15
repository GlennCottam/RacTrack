/*
File:		functions.js
Type:		methods
Comments:	Different functions that will be used for the discord bot itself.
			Use this to handle retrieving of YouTube / search requests.
*/

var methods = {};

// Function to search a message for a specific term
// 		at the beginning of the string.
methods.split_message = function(msg)
{
	var array = [1];
	var full_message;

	// Splits entire message into an array (divided by spaces)
	full_message = msg.content.split(' ');
	array[0] = full_message[0];
	full_message.shift();
	full_message = full_message.join(' ');
	array[1] = full_message;
	
	return array;
}

// Returns YouTube buddy
methods.get_YouTube_Buddy = function()
{
	var length = (Math.random() * 10) + 1;
	var message = "8";
	while(length > 0)
	{
		message += "="
		length --;
	}
	message += "D"

	return message;
}

// Exports functions to be used by other programs
// Check out require('./functions.js') under index.js
module.exports = methods;
