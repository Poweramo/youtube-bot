// GOAL: Publish the video with youtube api
// ! change thumbnails to the ones that FB CREATIONS made (for long compilations)

import { google } from "googleapis";
import config from "../../config.json" assert { type: "json" };
import createUrlReadStream from "./createUrlReadStream.js";
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.clientId, config.clientSecret, config.redirectUrl);

export default async function (videoFile, title, description, tags) {
	oauth2Client.setCredentials({ refresh_token: config.youtubeToken });

	const youtube = google.youtube({
		version: "v3",
		auth: oauth2Client,
	});

	youtube.videos.insert({
		part: "snippet,status",
		requestBody: {
			snippet: {
				title: title,
				description: description,
				tags: tags,
				categoryId: 24,
				defaultLanguage: "en",
				defaultAudioLanguage: "en",
			},
			status: {
				privacyStatus: "public",
			},
		},
		media: {
			body: createUrlReadStream(videoFile),
		},
	});
}
