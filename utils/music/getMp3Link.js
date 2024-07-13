// ! the functions in auth folder don't work
// ! refresh token or drive token doesn't work
// FIX: Wait for music file until it appears

import fs from "fs";
import { google } from "googleapis";
import path from "path";
import config from "../../config.json" assert { type: "json" };
import authorize from "../auth/authorize.js";
import delay from "../others/delay.js";
import downloadMusic from "./downloadMusic.js";
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.clientId, config.clientSecret, config.redirectUrl);

export default async function (link) {
	const musicPath = path.resolve("./assets/music/music.mp3");
	downloadMusic(link);
	delay(60000);
	authorize();
	oauth2Client.setCredentials({ refresh_token: config.driveToken });

	const drive = google.drive({
		version: "v3",
		auth: oauth2Client,
	});

	const response1 = await drive.files.create({
		uploadType: "media",
		ignoreDefaultVisibility: true,
		includePermissionsForView: "published",
		requestBody: {
			copyRequiresWriterPermission: false,
			writersCanShare: false,
			name: "musicToDelete.mp3",
			mimeType: "audio/mpeg",
		},
		media: {
			mimeType: "audio/mpeg",
			body: fs.createReadStream(musicPath),
		},
	});

	drive.permissions.create({
		fileId: response1.data.id,
		requestBody: {
			role: "reader",
			type: "anyone",
		},
	});

	const res3 = await drive.files.get({
		fileId: response1.data.id,
		fields: "webViewLink",
	});

	return { id: response1.data.id, link: res3.data.webViewLink };
}
