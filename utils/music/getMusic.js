// GOAL: Purpose: gets one video from the channel nocopyrightmusic https://www.youtube.com/@NoCopyrightSounds

import config from "../../config.json" assert { type: "json" };
import getMusicLength from "./getMusicLength.js";

export default async function () {
	const res = await fetch(
		`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${config.uploadsId}&key=${config.youtubeApiKey}`,
	);
	const data = await res.json();
	let videos = data.items;
	let links = [];

	for (let i = 0; i < videos.length; i++) {
		const video = videos[i];
		const id = video.snippet.resourceId.videoId;
		const duration = await getMusicLength(id);

		if (duration > 61 && duration < 240) {
			links.push("https://www.youtube.com/watch?v=" + id);
		}
	}

	return links;
}
