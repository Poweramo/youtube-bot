// ! setinterval 24 hours with the necessary functions

import makeMusicUsed from "./utils/music/makeMusicUsed.js";
import useMusic from "./utils/music/useMusic.js";
import changeCounter from "./utils/others/changeCounter.js";
import counterObject from "./utils/others/counter.json" assert { type: "json" };
import getQuote from "./utils/quote/getQuote.js";
import makeQuoteUsed from "./utils/quote/makeQuoteUsed.js";
import generateVideo from "./utils/video/generateVideo.js";
import publishVideo from "./utils/video/publishVideo.js";

(async function () {
	const data = await getQuote();
	const musicLink = await useMusic();
	let { quote, author } = data;
	const background = "https://picsum.photos/1080/1920";
	const description = `Hi everyone!
		\n
		This channel is made to improve your knowledge with practical quotes from the most popular and famous personalities.
		\n
		We hope you enjoy our videos!`;
	const videoLink = await generateVideo(quote, author, musicLink, background);

	makeQuoteUsed(data);
	makeMusicUsed(musicLink);

	publishVideo(videoLink, `Quote ${counterObject.counter}`, description, [
		"motivation",
		"inspirational",
		"quotes",
		"education",
	]);
	changeCounter();
})();
