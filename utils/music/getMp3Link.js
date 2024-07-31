import fs from "fs";
import { google } from "googleapis";
import config from "../../config.json" assert { type: "json" };
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.clientId, config.clientSecret, config.redirectUrl);

export default async function (link) {
	const musicPath = await downloadMusic(link);

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

	const res3 = drive.files.get({
		fileId: response1.data.id,
		fields: "webViewLink",
	});

	return { id: response1.data.id, link: res3.data.webViewLink };
}
