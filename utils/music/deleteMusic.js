import fs from "fs";
import { google } from "googleapis";
import path from "path";
import config from "../../config.json" assert { type: "json" };
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.clientId, config.clientSecret, config.redirectUrl);

export default function (fileId) {
	oauth2Client.setCredentials({ refresh_token: config.driveToken });
	const service = google.drive({
		version: "v3",
		auth: oauth2Client,
	});

	service.files.delete({
		fileId: fileId,
	});
	const file = fs.readdirSync(path.resolve("./assets/music"));
	fs.unlinkSync(path.join(path.resolve("./assets/music"), file[0]));
}
