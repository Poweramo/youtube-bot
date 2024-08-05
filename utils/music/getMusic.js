// GOAL: Purpose: gets one video from the channel nocopyrightmusic https://www.youtube.com/@NoCopyrightSounds

import config from "../../config.json" assert { type: "json" };

export default async function () {
	const res = await fetch(
		`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${config.uploadsId}&key=${config.youtubeApiKey}`,
	);
	const data = await res.json();
	let videos = data.items;
	let links = [];

	for (let i = 0; i < videos.length; i++) {
		const video = videos[i];
		links.push("https://www.youtube.com/watch?v=" + video.snippet.resourceId.videoId);
	}

	return links;
}
