import getMusic from "./getMusic.js";
import linksMusicUsed from "./musicUsed.json" assert { type: "json" };
import resetMusics from "./resetMusics.js";

export default async function () {
	const musicLinks = await getMusic();
	let musicToUse = musicLinks[Math.floor(Math.random() * musicLinks.length + 1)];

	const isMusicUsed = () => {
		if (musicLinks.length === linksMusicUsed.length) {
			resetMusics();
		}
		for (let i = 0; i < linksMusicUsed.length; i++) {
			if (musicToUse === linksMusicUsed[i] || !musicToUse) {
				musicToUse = musicLinks[Math.floor(Math.random() * musicLinks.length)];
				isMusicUsed();
			}
		}
	};

	isMusicUsed();
	return musicToUse;
}
