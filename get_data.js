/*
File:		get_data.js
Type:		exports
Comments:	File that is meant to be used to access various API's to search though.
			The API's should be integrated into this file only. All searching and algorithms used should be located here.
			Suggestion: Various functions should return response code, feel free to use some sort of JSON object with various information in it.

			EG: 
			response: 
			{
				url: "https://youtube.com",
				title: "YouTube",
				likes: 100,
				dislikes: 2,
				duration: 256,
			}
*/

const func = require('./functions');
const config = require('./config');
const key = config.key;
const request = require('request');

var methods = {}
// Put your code below, but before module.exports = methods
// Use this file to grab information from YouTube etc...

methods.response = null;

methods.search_youtube = function(term)
{
	return new Promise(resolve => 
	{
		// Get Request From YouTube

		var headers = 
		{
			'User-Agent': 'Super Agent/0.0.1',
			'Content-Type': 'applications/x-www-form-urlencoded'
		}

		var search = "?part=snippet&maxrResults=1&key=" + key  + "&; q=" + term;

		var options =
		{
			url: "https://www.googleapis.com/youtube/v3/search" + search,
			method: 'GET',
			headers: headers,
		}


		request(options, function(err, res, body)
		{
			if(err)
			{
				console.log(config.terminal.error + "Error getting data: " + err)
			}
			else
			{
				console.log("Retrieved Response");
				methods.response = JSON.parse(body);
				console.log("Parsed JSON");
			}
		});

		// Test response for an example
		// var response = 
		// {
		// 	url: "https://www.youtube.com/watch?v=szby7ZHLnkA",
		// 	title: term,
		// 	likes: func.random_int(0, 10000),
		// 	dislikes: func.random_int(0, 10000),
		// 	duration: func.random_int(0, 100000),
		// }

		resolve('resolved');
		});
}

module.exports = methods;