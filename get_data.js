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

/*
	Example response from YouTube where [data] is the response:
	data.items[]							// Array of results
	data.items[0].snippet.title				// Title for video
	data.items[0].snippet.description		// Description of video
	data.items[0].id.videoID				// Video ID, used as video URL

	Video Url: https://youtube.com/watch?v= + data.items[0].id.videoID
*/

const config = require('./config');
const key = config.key;
const request = require('request');

var methods = {}

// Put your code below, but before module.exports = methods
// Use this file to grab information from YouTube etc...
methods.search_youtube = function(term)
{
	var response = null;

	return new Promise(resolve => 
	{
		// Get Request From YouTube
		// Headers to be sent to YouTube
		var headers = 
		{
			'User-Agent': 'Super Agent/0.0.1',
			'Content-Type': 'applications/x-www-form-urlencoded'
		}

		// Search query
		var search = "?part=snippet&maxrResults=1&key=" + key  + "&q=" + term;

		// Options to be sent in the GET request to YouTube
		var options =
		{
			url: "https://www.googleapis.com/youtube/v3/search" + search,
			method: 'GET',
			headers: headers,
		}

		// Sending GET request to YouTube
		request(options, function(err, res, body)
		{	
			// On error (no response / invalid response)
			if(err)
			{
				console.log(config.terminal.error + "Error getting data: " + err);
				resolve(null);
			}
			else
			{
				var data = JSON.parse(body);		// Parses to JSON object
				data = data.items[0];				// Removes garbage we don't want.

				// Below code will deliver the proper response depending on what the person searched for
				if(data.id.kind === 'youtube#channel')
				{
					// Parse for YouTube Channel
					response = 
					{
						kind: 'channel',
						title: data.snippet.title,
						desc: data.snippet.description,
						url: 'https://youtube.com/user/' + data.channelTitle,
						thumb: data.snippet.thumbnails.default.url
					}
				}
				else if(data.id.kind === 'youtube#video')
				{
					// Parses for YouTube Video
					response =
					{
						kind: 'video',
						title: data.snippet.title,
						desc: data.snippet.description,
						url: 'https://www.youtube.com/watch?v=' + data.id.videoId,
						thumb: data.snippet.thumbnails.default.url
					}
				}

				resolve(response);
			}	
		});
	});
}

module.exports = methods;
