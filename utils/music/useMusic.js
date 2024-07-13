import getMusic from "./getMusic.js";
import musicJson from "./musicUsed.json" assert { type: "json" };
import resetMusics from "./resetMusics.js";

export default async function () {
	const musicLinks = await getMusic();
	let musicToUse = musicLinks[Math.floor(Math.random() * musicLinks.length + 1)];

	const isMusicUsed = () => {
		if (musicLinks.length === musicJson.linksMusicUsed.length) {
			resetMusics();
		}
		for (let i = 0; i < musicJson.linksMusicUsed.length; i++) {
			if (musicToUse === musicJson.linksMusicUsed[i] || !musicToUse) {
				musicToUse = musicLinks[Math.floor(Math.random() * musicLinks.length)];
				isMusicUsed();
			}
		}
	};

	isMusicUsed();
	return musicToUse;
}
