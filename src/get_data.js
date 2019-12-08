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
const key = require('./tokens').youtube_api;
const https = require('https');
var methods = {}

// Put your code below, but before module.exports = methods
// Use this file to grab information from YouTube etc...
methods.search_youtube = async function(term)
{
	var response = null;
	var data = await pre_search(term);

	if(data.pageInfo.totalResults < 1)
	{
		console.log(config.terminal.error + "No results Found for \"" + term + "\",");
		response = 
		{
			results: null
		};
	}
	else
	{
		data = data.items[0];			// Moving JSON object up to information we need

		// Below code will deliver the proper response depending on what the person searched for
		if(data.id.kind === 'youtube#channel')
		{
			data = await search_channel(data.id.channelId);
			data = data.items[0];
			response = 
			{
				kind: 'channel',
				title: data.snippet.title,
				desc: data.snippet.description,
				url: 'https://www.youtube.com/user/' + data.snippet.customUrl,
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
	}
	
	return new Promise(resolve => {resolve(response)});
}

// Gets original Data
async function pre_search(term)
{

	return new Promise(resolve =>
	{
		var data = null;
		
		// Url for Searching
		var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=" + key + "&q=" + term;

		https.get(url, res =>
		{
			res.on('data', body =>
			{
				data = body;
			});
			
			res.on('end', () =>
			{
				data = JSON.parse(data);
				resolve(data);
			});
		}).on('error', (e) =>
		{
			console.log(config.terminal.error + "Error getting data:\n" + e);
			resolve(null);
		});

	});
}

// Searches for Channel Information using ID of channel.
async function search_channel(id)
{
	return new Promise(resolve =>
	{
		var data = null;
		var url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&maxResults=1&id=" + id + "&key=" + key;
	
		https.get(url, res =>
		{
			res.on('data', body =>
			{
				data = body;
			});
			res.on('end', () =>
			{
				data = JSON.parse(data);
				resolve(data);
			});
		}).on('error', (e) =>
		{
			console.log(config.terminal.error + "Error getting data:\n" + e);
			resolve(null);
		});
	});
}

module.exports = methods;
