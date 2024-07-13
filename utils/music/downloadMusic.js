// GOAL: Download the music after getting the youtube link

import ytdl from "@distube/ytdl-core";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

export default async function (link) {
	const musicPath = path.resolve("./assets/music/music.mp3");
	ffmpeg.setFfmpegPath(ffmpegInstaller.path);

	const stream = ytdl(link, { quality: "highestaudio" });
	ffmpeg(stream)
		.audioBitrate(128)
		.save(musicPath)
		.on("end", () => {
			console.log(`Music downloaded succesfully!`);
		});
}
