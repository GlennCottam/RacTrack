var methods = {};

//      Function to search a message for a specific term
// at the beginning of the string.
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

methods.get_YouTube_Buddy = function()
{
	var length = (Math.random() * 10) + 1;
	// console.log("Someone got a small thingy: " + length);
	var message = "8";
	console.log(username + " has a " + length + " penis");
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
