import config from "../../config.json" assert { type: "json" };
import changeTimeToSeconds from "../others/changeTimeToSeconds.js";

export default async function (id) {
	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${config.youtubeApiKey}`,
	);
	const data = await res.json();
	const musicLength = changeTimeToSeconds(data.items[0].contentDetails.duration);
	return musicLength;
}
