// GOAL: Generate video with assets and returns an mp4 link of the video
// TODO: Make a better and well made style for the video

import { Movie, Scene } from "json2video-sdk";
import config from "../../config.json" assert { type: "json" };
import deleteMusic from "../music/deleteMusic.js";
import getMp3Link from "../music/getMp3Link.js";

export default async function (quote, quoteAuthor, music, background) {
	const musicDrive = await getMp3Link(music);
	let videoLink;
	let movie = new Movie();

	movie.setAPIKey(config.videoApiKey);
	movie.set("cache", false);
	movie.set("draft", false);
	movie.set("height", 1920);
	movie.set("width", 1080);
	movie.set("quality", "high");

	let scene = new Scene();

	scene.set("cache", false);
	scene.set("duration", 15);
	scene.addElement({
		type: "image",
		src: background,
		cache: false,
	});

	scene.addElement({
		type: "audio",
		src: musicDrive.link,
		cache: false,
	});

	scene.addElement({
		type: "component",
		component: "basic/000",
		settings: {
			headline: {
				text: [quote],
				color: "white",
				"font-family": "EB Garamond",
				"text-align": "center",
				"font-size": "8vw",
				padding: "3vw 0",
			},
			body: {
				color: "white",
				text: [`- ${quoteAuthor}`],
				"text-align": "center",
				"font-family": "EB Garamond",
				"font-size": "5vw",
			},
			card: {
				"vertical-align": "bottom",
				margin: "5vw",
				"background-color": "rgba(0,0,0,0.5)",
				"border-radius": "2vw",
			},
		},
		width: 1080,
		height: 1800,
		x: 0,
		y: 0,
		comment: "Simple card",
		position: "custom",
	});
	movie.addScene(scene);

	await movie.render();

	await movie
		.then((status) => {
			videoLink = status.movie.url;
		})
		.catch((err) => {
			console.log("Error: ", err);
		});

	deleteMusic(musicDrive.id);

	return videoLink;
}
