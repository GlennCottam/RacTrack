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
const key = require('./config').key;
const request = require('request');

var methods = {}
// Put your code below, but before module.exports = methods
// Use this file to grab information from YouTube etc...

methods.search_youtube = function(term)
{

	// Get Request From YouTube

	var headers = 
	{
		'User-Agent': 'Super Agent/0.0.1',
		'Content-Type': 'applications/x-www-form-urlencoded'
	}

	var options =
	{
		url: "https://www.googleapis.com/youtube/v3/search",
		method: 'GET',
		headers: headers,
		qs: 
		{
			'part': 'snippet',
			'maxrResults': 1,
			'key': key,
			'q': term
		}
	}


	// Test response for an example
	var response = 
	{
		url: "https://www.youtube.com/watch?v=szby7ZHLnkA",
		title: term,
		likes: func.random_int(0, 10000),
		dislikes: func.random_int(0, 10000),
		duration: func.random_int(0, 100000),
	}

	return response;
}

module.exports = methods;