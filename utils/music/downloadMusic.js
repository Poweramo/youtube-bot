// GOAL: Download the music after getting the youtube link

import path from "path";
import { Audio } from "yt-converter";

export default async function (link) {
	const musicPath = path.resolve("./assets/music");
	const data = await Audio({
		url: link,
		ffmpegPath: "./ffmpeg.exe",
		directory: musicPath,
		onDownloading: (d) => console.log(d),
	});

	return data.pathfile;
}
